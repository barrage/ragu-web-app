<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { AgentDetail } from '~/types/agent'
import CheckIcon from '~/assets/icons/svg/check.svg'
import OpenAiIcon from '~/assets/icons/svg/openai.svg'
import AzureIcon from '~/assets/icons/svg/azure.svg'
import OllamaIcon from '~/assets/icons/svg/ollama.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import MeetUpLoader from '~/components/MeetUpLoader.vue'
import AddIcon from '~/assets/icons/svg/add.svg'
import MinusIcon from '~/assets/icons/svg/minus.svg'

const emits = defineEmits<Emits>()

interface Emits {
  (event: 'agentCreated', id: string): void

}

const { t } = useI18n()
const { $api } = useNuxtApp()

const createAgentFormRef = ref<FormInstance>()
const createAgentForm = reactive<AgentDetail>({
  active: true,
  description: '',
  language: '',
  name: '',
  configuration: {
    context: '',
    llmProvider: '',
    model: '',
    temperature: 0.1,
    presencePenalty: 0,
    maxCompletionTokens: null,
    instructions: {
      titleInstruction: null,
      errorMessage: null,
    },
  },
})

const maxCompletionTokens = computed({
  get: () => createAgentForm.configuration.maxCompletionTokens ?? 0,
  set: (value: number) => {
    createAgentForm.configuration.maxCompletionTokens = value === 0 ? null : value
  },
})
const titleInstruction = computed({
  get: () => createAgentForm.configuration.instructions.titleInstruction ?? '',
  set: (value: string) => {
    createAgentForm.configuration.instructions.titleInstruction = value.trim() === '' ? null : value
  },
})

const errorMessage = computed({
  get: () => createAgentForm.configuration.instructions.errorMessage ?? '',
  set: (value: string) => {
    createAgentForm.configuration.instructions.errorMessage = value.trim() === '' ? null : value
  },
})

const selectedLlmProvider = computed(() => createAgentForm.configuration.llmProvider)

const validateField = (
  value: string,
  options: { requiredMessage: string, min?: number, max?: number, lengthMessage?: string },
  callback: (error?: Error) => void,
) => {
  if (!value || !value.trim()) {
    callback(new Error(t(options.requiredMessage)))
  }
  else if (
    (options.min && value.trim().length < options.min)
    || (options.max && value.trim().length > options.max)
  ) {
    callback(
      new Error(
        t(options.lengthMessage || '', { min: options.min, max: options.max }),
      ),
    )
  }
  else {
    callback()
  }
}

const validateFieldWrapper
  = (options: { requiredMessage: string, min?: number, max?: number, lengthMessage?: string }) =>
    (_rule: any, value: string, callback: (error?: Error) => void) => {
      validateField(value, options, callback)
    }

const rules = computed<FormRules>(() => ({
  'name': [
    { required: true, message: t('agents.rules.name.required_message'), trigger: 'blur' },
    {
      validator: validateFieldWrapper({
        requiredMessage: 'agents.rules.name.required_message',
        min: 3,
        max: 50,
        lengthMessage: 'agents.rules.name.length_message',
      }),
      trigger: 'blur',
    },

  ],
  'configuration.context': [
    { required: true, message: t('agents.rules.context.required_message'), trigger: 'blur' },
  ],

  'configuration.llmProvider': [
    { required: true, message: t('agents.rules.llmProvider.required_message'), trigger: 'change' },
  ],
  'configuration.model': [
    { required: true, message: t('agents.rules.model.required_message'), trigger: 'change' },
  ],

  'configuration.temperature': [
    { required: true, message: t('agents.rules.temperature.required_message'), trigger: 'change' },
  ],
  'active': [
    { required: true, message: t('agents.rules.active.required_message'), trigger: 'change' },
  ],
  'configuration.presencePenalty': [
    { required: true, message: t('agents.rules.presencePenalty.required_message'), trigger: 'change' },
  ],
  'language': [
    { required: true, message: t('agents.rules.language.required_message'), trigger: 'blur' },
    {
      validator: validateFieldWrapper({
        requiredMessage: 'agents.rules.language.required_message',
      }),
      trigger: 'blur',
    },
  ],

}))

const { execute: createExecute, error: createError, status: createStatus, data: CreateAgentData } = await useAsyncData(() => $api.agent.CreateAgent(createAgentForm), {
  immediate: false,
})
const { data: providers } = await useAsyncData(() => $api.provider.GetListProviders(), { lazy: true })

const { data: availableLLms, status: getLlmModelsStatus } = await useAsyncData(() => $api.provider.GetListAvailableLLms(createAgentForm.configuration.llmProvider), { immediate: false, watch: [selectedLlmProvider] })

const isLlmModelsLoading = computed(() => {
  return getLlmModelsStatus.value === 'pending'
})

errorHandler(createError)

const createAgent = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }

  try {
    await formEl.validate(async (valid) => {
      if (valid) {
        await createExecute()

        if (createStatus.value === 'success' && CreateAgentData.value?.agent?.id) {
          ElNotification({
            title: t('agents.notifications.create_title'),
            message: t('agents.notifications.create_message', { name: createAgentForm.name }),
            type: 'success',
            customClass: 'success',
            duration: 2500,
          })

          const agentId = CreateAgentData.value.agent.id
          emits('agentCreated', agentId)
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
}

const selectLlmProvider = (provider: string) => {
  createAgentForm.configuration.llmProvider = provider
  createAgentForm.configuration.model = ''
}

const selectLlmModel = (model: string) => {
  createAgentForm.configuration.model = model
  createAgentFormRef.value?.validateField('configuration.model')
}

const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}
</script>

<template>
  <ElForm
    ref="createAgentFormRef"
    class="container"
    :model="createAgentForm"
    :rules="rules"
    :scroll-to-error="true"
    :scroll-into-view-options="scrollIntoViewOptions"
  >
    <div class="group-heading-wrapper agent-details-title">
      <h5 class="group-title">
        {{ t('agents.titles.details') }}
      </h5>
      <span class="group-description">   {{ t('agents.descriptions.general_agent_details') }}</span>
    </div>

    <ElFormItem
      class="agent-name-form-item name"
      :label="t('agents.labels.name')"
      prop="name"
    >
      <ElInput
        v-model="createAgentForm.name"
        data-testid="bo-Create-agent-form-name-input"
        size="small"
        class="agent-name-form-item"
        :placeholder="t('agents.placeholder.agentName')"
      />
    </ElFormItem>

    <ElFormItem
      :label="t('agents.labels.description')"
      class="context-form-item"
      prop="description"
    >
      <ElInput
        v-model="createAgentForm.description"
        type="textarea"
        size="small"
        data-testid="bo-Create-agent-form-description-input"
        :placeholder="t('agents.placeholder.description')"
      />
    </ElFormItem>

    <div class="group-heading-wrapper">
      <h5 class="group-title">
        {{ t('agents.titles.configuration') }}
      </h5>
      <span class="group-description">{{ t('agents.descriptions.configuration_description') }}</span>
    </div>
    <ElFormItem
      class="context-form-item"
      :label="t('agents.labels.llmProvider')"
      prop="configuration.llmProvider"
    >
      <div class="llm-providers-wrapper">
        <template
          v-for="provider in providers?.llm"
          :key="provider"
        >
          <el-card
            class="is-accent select-provider-card"
            :data-testid="`bo-Create-agent-form-provider-select-card-${provider}`"
            :class="{
              selected: provider === createAgentForm.configuration.llmProvider,
            }"

            @click="selectLlmProvider(provider)"
          >
            <div class="select-provider-card-body">
              <div class="title-wrapper">
                <p class="provider-label">
                  <OpenAiIcon v-if="provider === 'openai'" size="36px" />
                  <AzureIcon
                    v-if="provider === 'azure'"
                    original
                    size="36px"
                  />
                  <OllamaIcon
                    v-if="provider === 'ollama'"
                    original
                    size="36px"
                  />

                  {{ provider }}
                </p>
                <CheckIcon v-if="provider === createAgentForm.configuration.llmProvider" size="22px" />
              </div>

              <span class="provider-description">{{ t('agents.descriptions.providers_description', { provider }) }}</span>
            </div>
          </el-card>
        </template>
      </div>
    </ElFormItem>

    <ElFormItem
      class="context-form-item"
      :label="t('agents.labels.model')"
      prop="configuration.model"
    >
      <div class="llm-providers-wrapper">
        <template v-if="!isLlmModelsLoading">
          <template
            v-for="(model, index) in availableLLms"
            :key="model"
          >
            <el-card
              v-motion-pop
              :delay="(index * 80)"
              :duration="250"
              class="is-accent select-provider-card"
              :data-testid="`bo-Create-agent-form-model-select-card-${model}`"
              :class="{
                selected: model === createAgentForm.configuration.model,
              }"

              @click="selectLlmModel(model)"
            >
              <div class="select-provider-card-body">
                <div class="title-wrapper">
                  <p class="provider-label">
                    <BrainIcon size="36px" />

                    {{ model }}
                  </p>
                  <CheckIcon v-if="model === createAgentForm.configuration.model" size="22px" />
                </div>

                <span class="provider-description">{{ t('agents.descriptions.model_description', { model }) }}</span>
              </div>
            </el-card>
          </template>
        </template>
        <div v-else class="loading-container">
          <MeetUpLoader />
        </div>
      </div>
    </ElFormItem>

    <ElFormItem
      class="agent-temperature-form-item"
      :label="t('agents.labels.temperature')"
      prop="configuration.temperature"
    >
      <el-card class="is-accent">
        <div class="card-body ">
          <ElTag
            type="primary"
          >
            {{ createAgentForm.configuration.temperature }}
          </ElTag>
          <ElSlider
            v-model="createAgentForm.configuration.temperature"
            :min="0"
            :max="1"
            :step="0.1"
            data-testid="bo-Create-agent-form-temperature-input"
          />
        </div>
      </el-card>
    </ElFormItem>

    <!-- Active Status -->
    <ElFormItem :label="t('agents.labels.status')" class="agent-temperature-form-item">
      <el-card class="is-accent">
        <div class="card-body">
          <ElTag
            :type="createAgentForm?.active === true ? 'success' : 'danger'"
            size="small"
          >
            <span class="status-dot" />  {{ createAgentForm?.active === true ? t('agents.agent_card.active_status') : t('agents.agent_card.inactive_status') }}
          </ElTag>
          <el-switch v-model="createAgentForm.active" data-testid="bo-Create-agent-form-active-input" />
        </div>
      </el-card>
    </ElFormItem>

    <!-- Context -->
    <ElFormItem
      class="group context-form-item"
      :label="t('agents.labels.context')"
      prop="configuration.context"
    >
      <ElInput
        v-model="createAgentForm.configuration.context"
        type="textarea"
        data-testid="bo-Create-agent-form-context-input"
      />
    </ElFormItem>

    <!-- Presence Penalty -->
    <ElFormItem
      class="agent-temperature-form-item"
      :label="t('agents.labels.presencePenalty')"
      prop="configuration.presencePenalty"
    >
      <el-card class="is-accent">
        <div class="card-body ">
          <ElTag
            type="primary"
          >
            {{ createAgentForm.configuration.presencePenalty }}
          </ElTag>
          <ElSlider
            v-model="createAgentForm.configuration.presencePenalty"
            :min="-2"
            :max="2"
            :step="0.1"
            data-testid="bo-Create-agent-form-presencePenalty-input"
          />
        </div>
      </el-card>
    </ElFormItem>

    <!-- Max Completion Tokens -->
    <ElFormItem
      class="agent-temperature-form-item"
      :label="t('agents.labels.maxCompletionTokens')"
      prop="configuration.maxCompletionTokens"
    >
      <ElInputNumber
        v-model="maxCompletionTokens"
        :min="0"
      >
        <template #increase-icon>
          <AddIcon />
        </template>
        <template #decrease-icon>
          <MinusIcon />
        </template>
      </ElInputNumber>
    </ElFormItem>

    <div class="group-heading-wrapper">
      <h5 class="group-title">
        {{ t('agents.labels.language') }}
      </h5>
      <span class="group-description"> {{ t('agents.descriptions.language_form') }}</span>
    </div>
    <ElFormItem
      class="group"
      :label="t('agents.labels.language')"
      prop="language"
    >
      <ElInput
        v-model="createAgentForm.language"
        data-testid="bo-Create-agent-form-language-input"
        size="small"
        :placeholder="t('agents.placeholder.language')"
      />
    </ElFormItem>

    <div class="group-heading-wrapper">
      <h5 class="group-title">
        {{ t('agents.titles.instructions') }}
      </h5>
      <span class="group-description"> {{ t('agents.descriptions.instructions_form') }}</span>
    </div>

    <!-- Title Instruction -->
    <ElFormItem
      :label="t('agents.labels.titleInstruction')"
      prop="configuration.instructions.titleInstruction"
      class="context-form-item"
    >
      <ElInput
        v-model="titleInstruction"
        :placeholder="t('agents.placeholder.titleInstruction')"
        data-testid="bo-Create-agent-form-title-instruction-input"
        type="textarea"
        size="small"
      />
    </ElFormItem>

    <!-- Error message Instruction -->
    <ElFormItem
      :label="t('agents.labels.errro_message')"
      prop="configuration.instructions.errorMessage"
      class="context-form-item"
    >
      <ElInput
        v-model="errorMessage"
        :placeholder="t('agents.placeholder.errorInstruction')"
        data-testid="bo-Create-agent-form-summary-instruction-input"
        type="textarea"
        size="small"
      />
    </ElFormItem>

    <ElFormItem class="actions">
      <ElButton
        type="primary"
        size="large"
        :disabled="createStatus === 'pending'"
        data-testid="bo-Create-agent-form-confirm-button"
        @click="createAgent(createAgentFormRef)"
      >
        {{ t('agents.buttons.save') }}
      </ElButton>
    </ElFormItem>
  </ElForm>
</template>

<style lang="scss" scoped>
.section-title {
  grid-column: 1/-1;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--color-primary-900);
}
.llm-providers-wrapper {
  display: flex;
  gap: 22px;
  margin-bottom: var(--spacing-fluid-m);
  flex-wrap: wrap;

  @include viewport-m {
    flex-wrap: nowrap;
  }
}

.agent-temperature-form-item {
  grid-column: 1/-1;

  @include viewport-m {
    grid-column: span 2;
  }
}

.agent-status-form-item {
  grid-column: 1/-1;

  @include viewport-m {
    grid-column: span 2;
  }
}
.card-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.375rem;
}
.agent-name-form-item {
  grid-column: 1/-1;

  @include viewport-m {
    grid-column: span 2;
  }
}

.name {
  grid-column: 1/-1;
}
.select-provider-card {
  border: 1.5px solid var(--color-primary-200);
  background: var(--color-primary-0);
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    border: 1.5px solid var(--color-primary-400);
    background: var(--color-primary-100);
  }
  &.selected {
    border: 1.5px solid var(--color-primary-600);
    background: var(--color-primary-200);
  }

  & .select-provider-card-body {
    display: flex;
    flex-direction: column;
    gap: 12px;

    & .title-wrapper {
      display: flex;
      gap: 22px;
      justify-content: space-between;
      align-items: center;

      .provider-label {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        color: var(--color-primary-800);
        font-weight: var(--font-weight-semibold);
        font-size: var(--font-size-fluid-3);
      }
    }

    & .provider-description {
      color: var(--color-primary-800);
      line-height: normal;
      font-size: var(--font-size-fluid-1);
    }
  }
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 6.25rem;
  width: 100%;
}

.group-heading-wrapper {
  grid-column: 1/-1;
  & .group-title {
    font-size: var(--font-size-fluid-5);
    color: var(--color-primary-900);
  }
  & .group-description {
    font-size: var(--font-size-fluid-3);
    color: var(--color-primary-700);
  }
}

.container {
  padding: 0.7rem;
  --container-background-color: var(--color-primary-100);
  --form-gap: 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  column-gap: var(--spacing-fluid-2-xl);
  position: relative;
  width: 100%;
  @include viewport-m {
    grid-template-columns: repeat(4, 1fr);
    column-gap: var(--spacing-fluid-3-xl);

    & .context-form-item {
      grid-column: 1/-1;
    }

    & .actions {
      grid-column: span 4;
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

.agent-details-title {
  grid-column: 1/-1;

  @include viewport-m {
    grid-column: span 2;
  }
}

html.dark {
  .section-title {
    color: var(--color-primary-100);
  }

  & .group-heading-wrapper {
    & .group-title {
      color: var(--color-primary-0);
    }
    & .group-description {
      color: var(--color-primary-300);
    }
  }
  & .select-provider-card {
    background: var(--color-primary-800);
    border: 1.5px solid var(--color-primary-600);
    &:hover {
      cursor: pointer;
    }
    &.selected {
      background: var(--color-primary-700);
      border: 1.5px solid var(--color-primary-0);
    }

    & .select-provider-card-body {
      & .title-wrapper {
        .provider-label {
          color: var(--color-primary-0);
        }
      }

      & .provider-description {
        color: var(--color-primary-100);
      }
    }
  }
}
</style>
