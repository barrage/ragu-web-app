<script lang="ts" setup>
// IMPORTS
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'
import { useAgentStore } from '~/stores/agents'
import type { AgentDetail, EmbeddingProvider } from '~/types/agent'

definePageMeta({
  layout: 'admin-layout',
})

// CONSTANTS
const agentStore = useAgentStore()
const providerStore = useProviderStore()
const collectionStore = useCollectionsStore()
const { t } = useI18n()
const localePath = useLocalePath()

// STATE

const maxContext = 1000
const embeddingProviders: EmbeddingProvider[] = ['azure', 'openai', 'ollama']
const formRef = ref<FormInstance>()
const form = reactive<AgentDetail>({
  active: false,
  description: '',
  embeddingModel: '',
  embeddingProvider: '',
  language: '',
  name: '',
  vectorProvider: '',
  configuration: {
    context: '',
    llmProvider: '',
    model: '',
    temperature: 0.1,
    instructions: {
      languageInstruction: '',
      summaryInstruction: '',
      titleInstruction: '',
    },
  },
})

// Validation Rules (Update field paths for new structure)
const rules = reactive<FormRules<typeof form>>({
  'name': [
    { required: true, message: t('agents.rules.name.required_message'), trigger: 'blur' },
    { min: 3, max: 50, message: t('agents.rules.name.length_message', { min: 3, max: 50 }), trigger: 'blur' },
  ],
  'configuration.context': [
    { required: true, message: t('agents.rules.context.required_message'), trigger: 'blur' },
    { min: 30, max: maxContext, message: t('agents.rules.context.length_message', { min: 30, max: maxContext }), trigger: 'blur' },
  ],
  'description': [
    { required: true, message: t('agents.rules.description.required_message'), trigger: 'blur' },
  ],
  'configuration.llmProvider': [
    { required: true, message: t('agents.rules.llmProvider.required_message'), trigger: 'change' },
  ],
  'configuration.model': [
    { required: true, message: t('agents.rules.model.required_message'), trigger: 'blur' },
  ],
  'language': [
    { required: true, message: t('agents.rules.language.required_message'), trigger: 'blur' },
  ],
  'configuration.temperature': [
    { required: true, message: t('agents.rules.temperature.required_message'), trigger: 'change' },
  ],
  'vectorProvider': [
    { required: true, message: t('agents.rules.vectorProvider.required_message'), trigger: 'change' },
  ],
  'embeddingProvider': [
    { required: true, message: t('agents.rules.embeddingProvider.required_message'), trigger: 'change' },
  ],
  'embeddingModel': [
    { required: true, message: t('agents.rules.embeddingModel.required_message'), trigger: 'blur' },
  ],
  'active': [
    { required: true, message: t('agents.rules.active.required_message'), trigger: 'change' },
  ],
})

// WATCHERs

watch(() => form.configuration.llmProvider, async (newProvider) => {
  if (newProvider) {
    form.configuration.model = ''
    await providerStore.GET_AvailableListLlms(newProvider)
  }
})

watch(() => form.embeddingProvider, async (newModel) => {
  form.embeddingModel = ''

  const provider = newModel === 'azure' ? 'openai' : newModel
  await collectionStore.GET_ListEmbeddingModels(provider)
})

// API CALLS
const { execute: createExecute, error: createError, status: createStatus, data } = await useAsyncData(() => agentStore.POST_CreateAgent(form), {
  immediate: false,
})

providerStore.GET_List_Providers()

// HELPERS
const createAgent = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }

  await formEl.validate(async (valid) => {
    if (valid) {
      await createExecute()
      if (createStatus.value === 'success') {
        ElNotification({
          title: t('agents.notifications.create_title'),
          message: t('agents.notifications.create_message', { name: form.name }),
          type: 'success',
          customClass: 'success',
          duration: 2500,
        })

        navigateTo({ path: localePath(`/admin/agents/${data.value?.agent?.id}`) })
      }
    }
    else {
      ElNotification({
        title: t('agents.notifications.form_title'),
        message: t('agents.notifications.form_message'),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
  })
}

const cancelCreate = () => {
  navigateTo({ path: localePath('/admin/agents') })
}

// ERROR HANDLERS
errorHandler(createError)
</script>

<template>
  <section class="agent-section">
    <h4 class="page-title">
      {{ t('agents.titles.create') }}
    </h4>
    <p class="description">
      {{ t('agents.titles.createDescription') }}
    </p>

    <ElForm
      ref="formRef"
      class="container"
      :model="form"
      :rules="rules"
    >
      <ElFormItem :label="t('agents.labels.name')" prop="name">
        <ElInput v-model="form.name" :placeholder="t('agents.placeholder.agentName')" />
      </ElFormItem>

      <ElFormItem :label="t('agents.labels.context')" prop="configuration.context">
        <ElInput
          v-model="form.configuration.context"
          type="textarea"
          :placeholder="t('agents.placeholder.context')"
        />
      </ElFormItem>

      <ElFormItem :label="t('agents.labels.description')" prop="description">
        <ElInput v-model="form.description" :placeholder="t('agents.placeholder.description')" />
      </ElFormItem>

      <ElFormItem :label="t('agents.labels.llmProvider')" prop="configuration.llmProvider">
        <ElSelect v-model="form.configuration.llmProvider" :placeholder="t('agents.placeholder.llmProvider')">
          <ElOption
            v-for="provider in embeddingProviders"
            :key="provider"
            :label="provider"
            :value="provider"
          />
        </ElSelect>
      </ElFormItem>

      <ElFormItem :label="t('agents.labels.model')" prop="configuration.model">
        <ElSelect v-model="form.configuration.model" :disabled="providerStore?.availableLlmList?.length === 0">
          <ElOption
            v-for="model in providerStore?.availableLlmList"
            :key="model"
            :label="model"
            :value="model"
          />
        </ElSelect>
      </ElFormItem>

      <ElFormItem :label="t('agents.labels.language')" prop="language">
        <ElInput v-model="form.language" :placeholder="t('agents.placeholder.language')" />
      </ElFormItem>

      <ElFormItem :label="t('agents.labels.temperature')" prop="configuration.temperature">
        <ElSlider
          v-model="form.configuration.temperature"
          :min="0"
          :max="1"
          :step="0.1"
        />
      </ElFormItem>

      <ElFormItem :label="t('agents.labels.vectorProvider')" prop="vectorProvider">
        <ElSelect v-model="form.vectorProvider" :placeholder="t('agents.placeholder.vecotrProvider')">
          <ElOption
            v-for="provider in providerStore?.listProviders?.vector"
            :key="provider"
            :label="provider"
            :value="provider"
          />
        </ElSelect>
      </ElFormItem>

      <ElFormItem :label="t('agents.labels.embeddingProvider')" prop="embeddingProvider">
        <ElSelect v-model="form.embeddingProvider" :placeholder="t('agents.placeholder.embeddingProvider')">
          <ElOption
            v-for="provider in providerStore.listProviders?.embedding"
            :key="provider"
            :label="provider"
            :value="provider"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem

        class="group"
        :label="t('agents.labels.model')"
        prop="embeddingModel"
      >
        <ElSelect
          v-model="form.embeddingModel"
          placeholder="Select Model"
          :disabled="collectionStore?.listEmbeddingsModels?.length === 0"
        >
          <ElOption
            v-for="(dimension, model) in collectionStore?.listEmbeddingsModels"
            :key="model"
            :label="`${model} - ${dimension}`"
            :value="model"
          />
        </ElSelect>
      </ElFormItem>

      <ElFormItem :label="t('agents.labels.languageInstruction')" prop="configuration.instructions.languageInstruction">
        <ElInput v-model="form.configuration.instructions.languageInstruction" :placeholder="t('agents.placeholder.languageInstruction')" />
      </ElFormItem>

      <ElFormItem :label="t('agents.labels.summaryInstruction')" prop="configuration.instructions.summaryInstruction">
        <ElInput v-model="form.configuration.instructions.summaryInstruction" :placeholder="t('agents.placeholder.summaryInstruction')" />
      </ElFormItem>

      <ElFormItem :label="t('agents.labels.titleInstruction')" prop="configuration.instructions.titleInstruction">
        <ElInput v-model="form.configuration.instructions.titleInstruction" :placeholder="t('agents.placeholder.titleInstruction')" />
      </ElFormItem>

      <ElFormItem class="actions">
        <ElButton @click="cancelCreate">
          {{ t('agents.buttons.cancel') }}
        </ElButton>
        <ElButton
          type="primary"
          :loading="createStatus === 'pending'"
          @click="createAgent(formRef)"
        >
          {{ t('agents.buttons.create') }}
        </ElButton>
      </ElFormItem>
    </ElForm>
  </section>
</template>

<style lang="scss" scoped>
.agent-section {
  padding-block: var(--spacing-fluid-l);
  padding-inline: 2.5rem;

  & .page-title {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--color-primary-900);
  }
  & .description {
    color: var(--color-primary-700);
    margin-bottom: 1.5rem;
  }
}

.container {
  --container-background-color: var(--color-primary-100);
  --form-gap: 0;
  background: var(--container-background-color);
  border: var(--border-global-transparent);
  border-radius: var(--radius-4);
  box-shadow: 0 0.2rem 0.3rem var(--color-primary-200);
  padding: var(--spacing-fluid-m);
  position: relative;
  width: 100%;

  .context {
    width: 100%;
  }

  &:deep(.actions) {
    .barrage-form-item__content {
      display: flex;
      flex-direction: row;
      gap: 20px;
    }
  }

  .left-button {
    margin-right: var(--spacing-fluid-m);
  }
}

:deep(.barrage-input__inner) {
  background-color: var(--color-primary-200);
  color: var(--color-primary-700);
}

html.dark {
  & .page-title {
    color: var(--color-primary-100);
  }
  & .description {
    color: var(--color-primary-300);
  }
  & .users-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }

  .container {
    --container-background-color: var(--color-primary-800);
  }
}
</style>
