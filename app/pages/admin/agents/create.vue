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
  name: '',
  context: '',
  description: '',
  llmProvider: '',
  model: '',
  language: '',
  temperature: 0.1,
  vectorProvider: '',
  embeddingProvider: '',
  embeddingModel: '',
  active: true,
})
const rules = reactive<FormRules<AgentDetail>>({
  name: [
    { required: true, message: t('agents.rules.name.required_message'), trigger: 'blur' },
    { min: 3, max: 50, message: t('agents.rules.name.length_message', { min: 3, max: 50 }), trigger: 'blur' },
  ],
  context: [
    { required: true, message: t('agents.rules.context.required_message'), trigger: 'blur' },
    { min: 30, max: maxContext, message: t('agents.rules.context.length_message', { min: 30, max: maxContext }), trigger: 'blur' },
  ],
  description: [
    { required: true, message: t('agents.rules.description.required_message'), trigger: 'blur' },
  ],
  llmProvider: [
    { required: true, message: t('agents.rules.llmProvider.required_message'), trigger: 'change' },
  ],
  model: [
    { required: true, message: t('agents.rules.model.required_message'), trigger: 'blur' },
  ],
  language: [
    { required: true, message: t('agents.rules.language.required_message'), trigger: 'blur' },
  ],
  temperature: [
    { required: true, message: t('agents.rules.temperature.required_message'), trigger: 'change' },
  ],
  vectorProvider: [
    { required: true, message: t('agents.rules.vectorProvider.required_message'), trigger: 'change' },
  ],
  embeddingProvider: [
    { required: true, message: t('agents.rules.embeddingProvider.required_message'), trigger: 'change' },
  ],
  embeddingModel: [
    { required: true, message: t('agents.rules.embeddingModel.required_message'), trigger: 'blur' },
  ],
  active: [
    { required: true, message: t('agents.rules.active.required_message'), trigger: 'change' },
  ],
})

// WATCHERs

watch(
  () => form.llmProvider,
  async (newProvider) => {
    if (newProvider) {
      form.model = ''
      await providerStore.GET_AvailableListLlms(newProvider)
    }
  },
)

watch(() => form.embeddingProvider, async (newModel) => {
  form.embeddingModel = ''

  const provider = newModel === 'azure' ? 'openai' : newModel
  await collectionStore.GET_ListEmbeddingModels(provider)
})

// API CALLS
const { execute: createExecute, error: createError, status: createStatus } = await useAsyncData(() => agentStore.POST_CreateAgent(form), {
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
          message: t('agents.notifications.create_message', { name: agentStore.selectedAgent?.name }),
          type: 'success',
          customClass: 'success',
          duration: 2500,
        })

        navigateTo({ path: localePath(`/admin/agents/${agentStore.selectedAgent?.id}`) })
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
  {{ agentStore.selectedAgent }}
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
      <!-- Name -->
      <ElFormItem
        class="group"
        :label="t('agents.labels.name')"
        prop="name"
      >
        <ElInput v-model="form.name" />
      </ElFormItem>

      <!-- Context -->
      <ElFormItem
        class="group context"
        :label="t('agents.labels.context')"
        prop="context"
      >
        <ElInput v-model="form.context" type="textarea" />
      </ElFormItem>

      <!-- Description -->
      <ElFormItem
        class="group description"
        :label="t('agents.labels.description')"
        prop="description"
      >
        <ElInput v-model="form.description" />
      </ElFormItem>

      <!-- LLM Provider -->
      <ElFormItem
        class="group"
        :label="t('agents.labels.llmProvider')"
        prop="llmProvider"
      >
        <ElSelect v-model="form.llmProvider" :placeholder="t('agents.placeholder.llmProvider')">
          <ElOption
            v-for="provider in embeddingProviders"
            :key="provider"
            :label="provider"
            :value="provider"
          />
        </ElSelect>
      </ElFormItem>

      <!-- Model -->
      <ElFormItem
        class="group"
        :label="t('agents.labels.model')"
        prop="model"
      >
        <ElSelect
          v-model="form.model"
          :placeholder="t('agents.placeholder.model')"
          :disabled="providerStore?.availableLlmList?.length === 0"
        >
          <ElOption
            v-for="model in providerStore?.availableLlmList"
            :key="model"
            :label="model"
            :value="model"
          />
        </ElSelect>
      </ElFormItem>

      <!-- Language -->
      <ElFormItem
        class="group"
        :label="t('agents.labels.language')"
        prop="language"
      >
        <ElInput v-model="form.language" />
      </ElFormItem>

      <!-- Temperature -->
      <ElFormItem
        class="group"
        :label="t('agents.labels.temperature')"
        prop="temperature"
      >
        <ElSlider
          v-model="form.temperature"
          :min="0"
          :max="1"
          :step="0.1"
        />
      </ElFormItem>

      <!-- Vector Provider -->
      <ElFormItem
        class="group"
        :label="t('agents.labels.vectorProvider')"
        prop="vectorProvider"
      >
        <ElSelect v-model="form.vectorProvider" :placeholder="t('agents.placeholder.vecotrProvider')">
          <ElOption
            v-for="provider in providerStore?.listProviders?.vector"
            :key="provider"
            :label="provider"
            :value="provider"
          />
        </ElSelect>
      </ElFormItem>

      <!-- Embedding Provider -->
      <ElFormItem
        class="group"
        :label="t('agents.labels.embeddingProvider')"
        prop="embeddingProvider"
      >
        <ElSelect v-model="form.embeddingProvider" :placeholder="t('agents.placeholder.embeddingProvider')">
          <ElOption
            v-for="provider in providerStore.listProviders?.embedding"
            :key="provider"
            :label="provider"
            :value="provider"
          />
        </ElSelect>
      </ElFormItem>

      <!-- Embedding Model -->
      <ElFormItem
        class="group"
        :label="t('agents.labels.model')"
        prop="embeddingModel"
      >
        <ElSelect
          v-model="form.embeddingModel"
          :placeholder="t('agents.placeholder.model')"
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

      <!-- Form Actions -->
      <ElFormItem class="actions">
        <ElButton
          type="primary"
          class="left-button"
          @click="cancelCreate"
        >
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
