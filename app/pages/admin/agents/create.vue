<script lang="ts" setup>
// IMPORTS
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'
import { useAgentStore } from '~/stores/agents'
import type { AgentDetail, EmbeddingProvider } from '~/types/agent'
import AddPersonIcon from '~/assets/icons/svg/person-add.svg'

const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('agents.titles.create')),
})

// CONSTANTS
const agentStore = useAgentStore()
const providerStore = useProviderStore()
const collectionStore = useCollectionsStore()

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

// ERROR HANDLERS
errorHandler(createError)
</script>

<template>
  <AdminPageContainer>
    <LlmLink to="/admin/agents" type="link">
      <ArrowLeftIcon size="20px" /> {{ t('agents.title') }}
    </LlmLink>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('agents.titles.create')"
          :description="t('agents.titles.createDescription')"
        >
          <template #icon>
            <AddPersonIcon size="58px" />
          </template>
        </AdminPageTitleContainer>
      </template>
    </AdminPageHeadingTemplate>
    <el-card class="is-primary">
      <ElForm
        ref="formRef"
        class="container"
        :model="form"
        :rules="rules"
      >
        <ElFormItem :label="t('agents.labels.name')" prop="name">
          <ElInput v-model="form.name" :placeholder="t('agents.placeholder.agentName')" />
        </ElFormItem>

        <ElFormItem :label="t('agents.labels.language')" prop="language">
          <ElInput v-model="form.language" :placeholder="t('agents.placeholder.language')" />
        </ElFormItem>

        <ElFormItem :label="t('agents.labels.languageInstruction')" prop="configuration.instructions.languageInstruction">
          <ElInput v-model="form.configuration.instructions.languageInstruction" :placeholder="t('agents.placeholder.languageInstruction')" />
        </ElFormItem>

        <ElFormItem
          :label="t('agents.labels.description')"
          class="context-form-item"
          prop="description"
        >
          <ElInput
            v-model="form.description"
            type="textarea"
            :placeholder="t('agents.placeholder.description')"
          />
        </ElFormItem>

        <ElFormItem
          :label="t('agents.labels.titleInstruction')"
          prop="configuration.instructions.titleInstruction"
          class="context-form-item"
        >
          <ElInput
            v-model="form.configuration.instructions.titleInstruction"
            :placeholder="t('agents.placeholder.titleInstruction')"
            type="textarea"
          />
        </ElFormItem>

        <ElFormItem
          :label="t('agents.labels.summaryInstruction')"
          prop="configuration.instructions.summaryInstruction"
          class="context-form-item"
        >
          <ElInput
            v-model="form.configuration.instructions.summaryInstruction"
            :placeholder="t('agents.placeholder.summaryInstruction')"
            type="textarea"
          />
        </ElFormItem>

        <ElFormItem
          :label="t('agents.labels.context')"
          class="context-form-item"
          prop="configuration.context"
        >
          <ElInput
            v-model="form.configuration.context"
            type="textarea"
            :placeholder="t('agents.placeholder.context')"
          />
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
          :label="t('agents.labels.embeddingModel')"
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
        <ElFormItem :label="t('agents.labels.temperature')" prop="configuration.temperature">
          <ElSlider
            v-model="form.configuration.temperature"
            :min="0"
            :max="1"
            :step="0.1"
          />
        </ElFormItem>
        <ElFormItem class="actions">
          <LlmLink to="/admin/agents" type="button">
            {{ t('agents.buttons.cancel') }}
          </LlmLink>
          <ElButton
            type="primary"
            :loading="createStatus === 'pending'"
            @click="createAgent(formRef)"
          >
            {{ t('agents.buttons.create') }}
          </ElButton>
        </ElFormItem>
      </ElForm>
    </el-card>
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.container {
  padding: 0.7rem;
  --container-background-color: var(--color-primary-100);
  --form-gap: 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  column-gap: var(--spacing-fluid-2-xl);
  row-gap: var(--spacing-fluid-m);
  position: relative;

  width: 100%;
  @include viewport-ml {
    grid-template-columns: repeat(3, 1fr);
    column-gap: var(--spacing-fluid-3-xl);

    & .context-form-item {
      grid-column: span 3;
    }

    & .actions {
      grid-column: span 3;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: flex-end;
      gap: var(--spacing-fluid-3-xl);
    }
  }
  @include viewport-xl {
    column-gap: var(--spacing-fluid-5-xl);
  }

  .context {
    width: 100%;
  }

  &:deep(.actions) {
    .barrage-form-item__content {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: var(--spacing-fluid-3-xl);
    }
  }

  .left-button {
    margin-right: var(--spacing-fluid-m);
  }
}
</style>
