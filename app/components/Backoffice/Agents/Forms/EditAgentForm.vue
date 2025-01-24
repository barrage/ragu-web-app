<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { Agent, EditAgentPayload } from '~/types/agent'
import CheckIcon from '~/assets/icons/svg/check.svg'
import OpenAiIcon from '~/assets/icons/svg/openai.svg'
import AzureIcon from '~/assets/icons/svg/azure.svg'
import OllamaIcon from '~/assets/icons/svg/ollama.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import MeetUpLoader from '~/components/MeetUpLoader.vue'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import DeleteIcon from '~/assets/icons/svg/delete-person.svg'

const props = defineProps<{
  singleAgent: Agent | null | undefined
}>()

const emits = defineEmits<Emits>()

interface Emits {
  (event: 'agentUpdated'): void
  (event: 'agentEditCanceled'): void
}

const { $api } = useNuxtApp()
const { t } = useI18n()
const MAX_CONTEXT = 1000

const editAgentFormRef = ref<FormInstance>()
const editAgentForm = reactive<EditAgentPayload>({
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
      promptInstruction: '',
    },
  },
})

const selectedLlmProvider = computed(() => editAgentForm.configuration.llmProvider)

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
    {
      validator: validateFieldWrapper({
        requiredMessage: 'agents.rules.context.required_message',
        min: 30,
        max: MAX_CONTEXT,
        lengthMessage: 'agents.rules.context.length_message',
      }),
      trigger: 'blur',
    },
  ],
  'description': [
    { required: true, message: t('agents.rules.description.required_message'), trigger: 'blur' },
    {
      validator: validateFieldWrapper({
        requiredMessage: 'agents.rules.description.required_message',
      }),
      trigger: 'blur',
    },
  ],
  'configuration.llmProvider': [
    { required: true, message: t('agents.rules.llmProvider.required_message'), trigger: 'change' },
  ],
  'configuration.model': [
    { required: true, message: t('agents.rules.model.required_message'), trigger: 'change' },
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
  'configuration.temperature': [
    { required: true, message: t('agents.rules.temperature.required_message'), trigger: 'change' },
  ],
  'active': [
    { required: true, message: t('agents.rules.active.required_message'), trigger: 'change' },
  ],
}))

const { execute: updateExecute, error: updateError, status: updateStatus } = await useAsyncData(() => $api.agent.UpdateAgent(props.singleAgent?.agent?.id as string, editAgentForm), {
  immediate: false,
})
const { data: providers } = await useAsyncData(() => $api.provider.GetListProviders(), { lazy: true })

const { data: availableLLms, status: getLlmModelsStatus } = await useAsyncData(() => $api.provider.GetListAvailableLLms(editAgentForm.configuration.llmProvider), { immediate: false, watch: [selectedLlmProvider] })

const isLlmModelsLoading = computed(() => {
  return getLlmModelsStatus.value === 'pending'
})

errorHandler(updateError)

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
            message: t('agents.notifications.update_message', { name: props.singleAgent?.agent?.name }),
            type: 'success',
            customClass: 'success',
            duration: 2500,
          })
          emits('agentUpdated')
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

const setForm = () => {
  editAgentForm.name = props.singleAgent?.agent?.name ?? ''
  editAgentForm.configuration.context = props.singleAgent?.configuration?.context ?? ''
  editAgentForm.description = props.singleAgent?.agent?.description ?? ''
  editAgentForm.configuration.llmProvider = props.singleAgent?.configuration?.llmProvider ?? ''
  editAgentForm.configuration.model = props.singleAgent?.configuration?.model ?? ''
  editAgentForm.language = props.singleAgent?.agent?.language ?? ''
  editAgentForm.configuration.temperature = props.singleAgent?.configuration?.temperature ?? 0.1
  editAgentForm.configuration.instructions.titleInstruction = props.singleAgent?.configuration?.agentInstructions?.titleInstruction ?? ''
  editAgentForm.configuration.instructions.languageInstruction = props.singleAgent?.configuration?.agentInstructions?.languageInstruction ?? ''
  editAgentForm.configuration.instructions.summaryInstruction = props.singleAgent?.configuration?.agentInstructions?.summaryInstruction ?? ''
  editAgentForm.configuration.instructions.promptInstruction = props.singleAgent?.configuration?.agentInstructions?.promptInstruction ?? ''
  editAgentForm.active = props.singleAgent?.agent?.active ?? true
}

onMounted(() => {
  setForm()
})

const selectLlmProvider = (provider: string) => {
  editAgentForm.configuration.llmProvider = provider
  editAgentForm.configuration.model = ''
}

const selectLlmModel = (model: string) => {
  editAgentForm.configuration.model = model
  editAgentFormRef.value?.validateField('configuration.model')
}

const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}
/* Profile Picture */
const isDeleteModalOpen = ref(false)

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
}

const isUploadModalVisible = defineModel<boolean>()
const openUploadModal = () => {
  isUploadModalVisible.value = true
}

const { execute: deleteProfilePicture, error } = await useAsyncData(() => $api.agent.DeleteAgentAvatar(props.singleAgent?.agent?.id as string), { immediate: false })
const handleRemovePicture = async () => {
  await deleteProfilePicture()
  if (error.value) {
    ElNotification({
      title: t('profile.notifications.import.error_title'),
      message: t('profile.notifications.import.error_description'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
  }
  else {
    ElNotification({
      title: t('profile.notifications.import.success_title'),
      message: t('profile.notifications.import.success_delete_description'),
      type: 'success',
      customClass: 'success',
      duration: 2500,
    })
  }

  closeDeleteModal()
}
</script>

<template>
  <div class="edit-form">
    <ElForm
      ref="editAgentFormRef"
      class="container"
      :model="editAgentForm"
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
      <div class="edit-agent-avatar-wrapper">
        <LlmAvatar
          :avatar="props.singleAgent?.agent?.avatar"
          :alt="t('agents.agent_avatar')"
          fit="cover"
          default-image="agent"
          :size="176"
        />
        <div class="change-picture">
          <el-button
            class="edit-picture-button"
            size="small"
            @click="openUploadModal"
          >
            <EditIcon size="16px" />
            {{ t('profile.change_picture.title') }}
          </el-button>
          <el-button
            v-if="props.singleAgent?.agent?.avatar"
            class="remove-picture-button"
            type="danger"
            plain
            size="small"
            @click="isDeleteModalOpen = true"
          >
            <DeleteIcon size="16px" />
            {{ t('profile.change_picture.delete_title') }}
          </el-button>
        </div>
      </div>
      <ElFormItem
        class="agent-name-form-item"
        :label="t('agents.labels.name')"
        prop="name"
      >
        <ElInput
          v-model="editAgentForm.name"
          data-testid="bo-edit-agent-form-name-input"
          size="small"
          class="agent-name-form-item"
        />
      </ElFormItem>

      <ElFormItem
        :label="t('agents.labels.description')"
        class="context-form-item"
        prop="description"
      >
        <ElInput
          v-model="editAgentForm.description"
          type="textarea"
          size="small"
          data-testid="bo-edit-agent-form-description-input"
          :placeholder="t('agents.placeholder.description')"
        />
      </ElFormItem>

      <div class="group-heading-wrapper">
        <h5 class="group-title">
          {{ t('agents.titles.configuration') }}
        </h5>
        <span class="group-description">Set technical parameters for the AI model.</span>
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
              :data-testid="`bo-edit-agent-form-provider-select-card-${provider}`"
              :class="{
                selected: provider === editAgentForm.configuration.llmProvider,
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
                  <CheckIcon v-if="provider === editAgentForm.configuration.llmProvider" size="22px" />
                </div>

                <span class="provider-description">Choose {{ provider }} as your LLM provider</span>
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
                :data-testid="`bo-edit-agent-form-model-select-card-${model}`"
                :class="{
                  selected: model === editAgentForm.configuration.model,
                }"

                @click="selectLlmModel(model)"
              >
                <div class="select-provider-card-body">
                  <div class="title-wrapper">
                    <p class="provider-label">
                      <BrainIcon size="36px" />

                      {{ model }}
                    </p>
                    <CheckIcon v-if="model === editAgentForm.configuration.model" size="22px" />
                  </div>

                  <span class="provider-description">Choose {{ model }} as your LLM model</span>
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
              {{ editAgentForm.configuration.temperature }}
            </ElTag>
            <ElSlider
              v-model="editAgentForm.configuration.temperature"
              :min="0"
              :max="1"
              :step="0.1"
              data-testid="bo-edit-agent-form-temperature-input"
            />
          </div>
        </el-card>
      </ElFormItem>
      <!-- Active Status -->
      <ElFormItem :label="t('agents.labels.status')" class="agent-temperature-form-item">
        <el-card class="is-accent">
          <div class="card-body">
            <ElTag
              :type="editAgentForm?.active === true ? 'success' : 'danger'"
              size="small"
            >
              <span class="status-dot" />  {{ editAgentForm?.active === true ? t('agents.agent_card.active_status') : t('agents.agent_card.inactive_status') }}
            </ElTag>
            <el-switch v-model="editAgentForm.active" data-testid="bo-edit-agent-form-active-input" />
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
          v-model="editAgentForm.configuration.context"
          type="textarea"
          data-testid="bo-edit-agent-form-context-input"
        />
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
          v-model="editAgentForm.language"
          data-testid="bo-edit-agent-form-language-input"
          size="small"
        />
      </ElFormItem>

      <!-- Language Instruction -->
      <ElFormItem
        class="context-form-item"
        :label="t('agents.labels.languageInstruction')"
        prop="configuration.instructions.language"
      >
        <ElInput
          v-model="editAgentForm.configuration.instructions.languageInstruction"
          data-testid="bo-edit-agent-form-language-instruction-input"
          size="small"
          type="textarea"
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
          v-model="editAgentForm.configuration.instructions.titleInstruction"
          :placeholder="t('agents.placeholder.titleInstruction')"
          data-testid="bo-edit-agent-form-title-instruction-input"
          type="textarea"
          size="small"
        />
      </ElFormItem>

      <!-- Prompt Instruction -->
      <ElFormItem
        :label="t('agents.labels.promptInstruction')"
        prop="configuration.instructions.promptInstruction"
        class="context-form-item"
      >
        <ElInput
          v-model="editAgentForm.configuration.instructions.promptInstruction"
          :placeholder="t('agents.placeholder.promptInstruction')"
          data-testid="bo-edit-agent-form-prompt-instruction-input"
          type="textarea"
          size="small"
        />
      </ElFormItem>

      <!-- Summary Instruction -->
      <ElFormItem
        :label="t('agents.labels.summaryInstruction')"
        prop="configuration.instructions.summaryInstruction"
        class="context-form-item"
      >
        <ElInput
          v-model="editAgentForm.configuration.instructions.summaryInstruction"
          :placeholder="t('agents.placeholder.summaryInstruction')"
          data-testid="bo-edit-agent-form-summary-instruction-input"
          type="textarea"
          size="small"
        />
      </ElFormItem>

      <ElFormItem class="actions">
        <ElButton
          type="primary"
          size="large"
          :disabled="updateStatus === 'pending'"
          data-testid="bo-edit-agent-form-confirm-button"
          @click="updateAgent(editAgentFormRef)"
        >
          {{ t('agents.buttons.save') }}
        </ElButton>
      </ElFormItem>
    </ElForm>
  </div>
  <ConformationModal
    :is-visible="isDeleteModalOpen"
    :title="t('profile.delete_picture.title')"
    :message="t('profile.delete_picture.description')"
    :confirm-button-text="t('settings.delete') "
    :cancel-button-text="t('settings.cancel')"
    @confirm="handleRemovePicture"
    @cancel="closeDeleteModal"
  />

  <ChangePictureModal
    v-model="isUploadModalVisible"
    upload-type="agents"
    :agent-id="props.singleAgent?.agent?.id"
  />
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
}
.agent-name-form-item {
  grid-column: span 2;
}

.agent-temperature-form-item {
  grid-column: span 2;
}

.agent-status-form-item {
  grid-column: span 2;
}
.card-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.375rem;
}
.agent-name-form-item {
  grid-column: span 2;
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

.edit-agent-avatar-wrapper {
  display: flex;
  gap: 2.5rem;
  align-items: center;
  grid-column: span 2;
  grid-row: span 2;
  justify-content: center;

  & .change-picture {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
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
  position: relative;
  width: 100%;
  @include viewport-ml {
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
  grid-column: span 2;
}

.dark {
  .container {
    --container-background-color: var(--color-primary-800);
    --lable-text-color: var(--color-gray-600);
  }
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
