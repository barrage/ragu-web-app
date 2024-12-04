<script lang="ts" setup>
// IMPORTS
import type { FormInstance, FormRules } from 'element-plus'
import { useAgentStore } from '~/stores/agents'
import type { EmbeddingProvider } from '~/types/agent'

// LAYOUT
definePageMeta({
  layout: 'admin-layout',
})

// CONSTANTS
const agentStore = useAgentStore()
const providerStore = useProviderStore()

const route = useRoute()
const { t } = useI18n()
const maxContext = 1000
const embeddingProviders: EmbeddingProvider[] = ['azure', 'openai', 'ollama']
const agentId = ref(route.params.agentId as string)

// STATE
const formRef = ref<FormInstance>()
const form = reactive({
  active: true,
  description: '',
  language: '',
  name: '',
  configuration: {
    context: '',
    llmProvider: '',
    model: '',
    temperature: 0.1,
    instructions: {
      titleInstruction: '',
      languageInstruction: '',
      summaryInstruction: '',
    },
  },
})

const rules = computed<FormRules>(() => ({
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
  'active': [
    { required: true, message: t('agents.rules.active.required_message'), trigger: 'change' },
  ],
}))

// API CALLS

const { execute: updateExecute, error: updateError, status: updateStatus } = await useAsyncData(() => agentStore.PUT_UpdateAgent(agentId.value, form), {
  immediate: false,
})
await useAsyncData(() => providerStore.GET_List_Providers())

// HELPERS
const updateAgent = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }

  try {
    await formEl.validate(async (valid) => {
      if (valid) {
        await updateExecute()

        if (updateStatus.value === 'success') {
          ElNotification({
            title: t('agents.notifications.update_title'),
            message: t('agents.notifications.update_message', { name: agentStore.singleAgent?.agent?.name }),
            type: 'success',
            customClass: 'success',
            duration: 2500,
          })
        }
      }
    })
  }
  catch (error) {
    console.error('Validation error:', error)
    ElNotification({
      title: t('agents.notifications.form_title'),
      message: t('agents.notifications.form_message'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
  }
  finally {
    agentStore.setEditMode(false)
  }
}

const cancelUpdate = (): void => {
  agentStore.setEditMode(false)
}

// ERROR HANDLERS
errorHandler(updateError)

// WATCHER FOR LLM PROVIDER
watch(() => form.configuration?.llmProvider, async (newProvider) => {
  if (newProvider) {
    await providerStore.GET_AvailableListLlms(newProvider)
  }
})

onMounted(async () => {
  form.name = agentStore.singleAgent?.agent?.name ?? ''
  form.configuration.context = agentStore.singleAgent?.configuration?.context ?? ''
  form.description = agentStore.singleAgent?.agent?.description ?? ''
  form.configuration.llmProvider = agentStore.singleAgent?.configuration?.llmProvider ?? ''
  form.configuration.model = agentStore.singleAgent?.configuration?.model ?? ''
  form.language = agentStore.singleAgent?.agent?.language ?? ''
  form.configuration.temperature = agentStore.singleAgent?.configuration?.temperature ?? 0.1
  form.configuration.instructions.titleInstruction = agentStore.singleAgent?.configuration?.agentInstructions?.titleInstruction ?? ''
  form.configuration.instructions.languageInstruction = agentStore.singleAgent?.configuration?.agentInstructions?.languageInstruction ?? ''
  form.configuration.instructions.summaryInstruction = agentStore.singleAgent?.configuration?.agentInstructions?.summaryInstruction ?? ''
  form.active = agentStore.singleAgent?.agent?.active ?? true
})

onUnmounted(() => {
  agentStore.setEditMode(false)
})
</script>

<template>
  <el-card class="edit-agent-card is-primary">
    <h4 class="section-title">
      {{ agentStore.editMode ? t('agents.titles.edit') : t('agents.titles.details') }}
    </h4>

    <div v-if="agentStore.editMode" class="edit-form">
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
        <!-- Language -->
        <ElFormItem
          class="group"
          :label="t('agents.labels.language')"
          prop="language"
        >
          <ElInput v-model="form.language" />
        </ElFormItem>

        <!-- Language Instruction -->
        <ElFormItem
          class="group"
          :label="t('agents.labels.languageInstruction')"
          prop="configuration.instructions.language"
        >
          <ElInput v-model="form.configuration.instructions.languageInstruction" />
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

        <!-- Context -->
        <ElFormItem
          class="group context-form-item"
          :label="t('agents.labels.context')"
          prop="configuration.context"
        >
          <ElInput v-model="form.configuration.context" type="textarea" />
        </ElFormItem>

        <!-- LLM Provider -->
        <ElFormItem
          class="group"
          :label="t('agents.labels.llmProvider')"
          prop="configuration.llmProvider"
        >
          <ElSelect v-model="form.configuration.llmProvider" placeholder="Select LLM Provider">
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
          prop="configuration.model"
        >
          <ElSelect
            v-model="form.configuration.model"
            placeholder="Select Model"
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

        <!-- Temperature -->
        <ElFormItem
          class="group"
          :label="t('agents.labels.temperature')"
          prop="configuration.temperature"
        >
          <ElSlider
            v-model="form.configuration.temperature"
            :min="0"
            :max="1"
            :step="0.1"
          />
        </ElFormItem>

        <!-- Active Status -->
        <ElFormItem :label="t('agents.labels.status')" class="range-checkbox">
          <el-switch v-model="form.active" />
        </ElFormItem>

        <ElFormItem class="actions">
          <ElButton
            class="left-button"
            @click="cancelUpdate"
          >
            {{ t('agents.buttons.cancel') }}
          </ElButton>
          <ElButton
            type="primary"
            :loading="updateStatus === 'pending'"
            @click="updateAgent(formRef)"
          >
            {{ t('agents.buttons.save') }}
          </ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.edit-agent-card {
  margin-top: 32px;
}
.section-title {
  grid-column: 1/-1;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--color-primary-900);
}

.edit-form {
  grid-column: 1/-1;
}
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

  .date {
    position: absolute;
    top: var(--spacing-fluid-3-xs);
    right: var(--spacing-fluid-m);
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: flex-end;

    p {
      --paragraph-color: var(--lable-text-color);
      --paragraph-font-size: var(--font-size-fluid-2);
      font-weight: var(--font-weight-semibold);
      --paragraph-margin-block: 0 var(--spacing-fluid-6-xs);
    }
  }

  .group {
    display: flex;
    flex-direction: column;
    padding-bottom: var(--spacing-fluid-5-xs);

    label {
      color: var(--lable-text-color);
    }

    p {
      padding-block: var(--spacing-mobile-m) var(--spacing-mobile-7-xs);
    }
  }

  .actions {
    display: flex;
    flex-direction: row;

    :deep(div) {
      display: flex;
      flex-direction: row;
      gap: var(--spacing-fluid-m);
    }
  }

  .left-button {
    margin-right: var(--spacing-fluid-m);
  }
}

.dark {
  .container {
    --container-background-color: var(--color-primary-800);
    --lable-text-color: var(--color-gray-600);
  }
  .section-title {
    color: var(--color-primary-100);
  }
}
</style>
