<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import AddIcon from '~/assets/icons/svg/add.svg'
import MinusIcon from '~/assets/icons/svg/minus.svg'
import type { AgentSettingsResponse } from '~/types/settings'

const props = defineProps<{
  settings: AgentSettingsResponse | undefined
  text: Record<string, any>
}>()

const emits = defineEmits<{
  (e: 'settingsUpdated'): void
}>()

const { $api } = useNuxtApp()
const { t } = useI18n()

const settingsFormRef = ref<FormInstance>()
const settingsForm = reactive({
  chatMaxHistoryTokens: '',
  agentPresencePenalty: 0,
  agentTitleMaxCompletionTokens: '',
  agentSummaryMaxCompletionTokens: '',
  whatsappAgentMaxCompletionTokens: '',
})

const settingsKeyMap = {
  CHAT_MAX_HISTORY_TOKENS: 'chatMaxHistoryTokens',
  AGENT_PRESENCE_PENALTY: 'agentPresencePenalty',
  AGENT_TITLE_MAX_COMPLETION_TOKENS: 'agentTitleMaxCompletionTokens',
  AGENT_SUMMARY_MAX_COMPLETION_TOKENS: 'agentSummaryMaxCompletionTokens',
  WHATSAPP_AGENT_MAX_COMPLETION_TOKENS: 'whatsappAgentMaxCompletionTokens',
}

const initialPresencePenalty = ref(0)

watch(() => props.settings, async (newSettings) => {
  if (newSettings) {
    Object.entries(newSettings).forEach(([key, setting]) => {
      const formKey = settingsKeyMap[key as keyof typeof settingsKeyMap]
      if (formKey) {
        if (formKey === 'agentPresencePenalty') {
          initialPresencePenalty.value = Number(setting.value)
        }
        settingsForm[formKey] = setting.value
      }
    })
  }
}, { immediate: true })

onMounted(async () => {
  await nextTick()
  settingsForm.agentPresencePenalty = initialPresencePenalty.value
})

const updates = computed(() => {
  return [
    { key: 'CHAT_MAX_HISTORY_TOKENS', value: String(settingsForm.chatMaxHistoryTokens) },
    { key: 'AGENT_PRESENCE_PENALTY', value: String(settingsForm.agentPresencePenalty) },
    { key: 'AGENT_TITLE_MAX_COMPLETION_TOKENS', value: String(settingsForm.agentTitleMaxCompletionTokens) },
    { key: 'AGENT_SUMMARY_MAX_COMPLETION_TOKENS', value: String(settingsForm.agentSummaryMaxCompletionTokens) },
    { key: 'WHATSAPP_AGENT_MAX_COMPLETION_TOKENS', value: String(settingsForm.whatsappAgentMaxCompletionTokens) },
  ]
})

const { execute: updateSettings, error: updateSettingsError, status: updateSettingsStatus } = await useAsyncData(
  () => $api.settings.UpdateAdminSettings({ updates: updates.value }),
  { immediate: false },
)

// Form validation rules
const rules = computed<FormRules>(() => ({
  chatMaxHistoryTokens: [
    { required: true, message: t('global_settings.rules.required'), trigger: 'blur' },
  ],
  agentPresencePenalty: [
    { required: true, message: t('global_settings.rules.required'), trigger: 'blur' },
  ],
  agentTitleMaxCompletionTokens: [
    { required: true, message: t('global_settings.rules.required'), trigger: 'blur' },
  ],
  agentSummaryMaxCompletionTokens: [
    { required: true, message: t('global_settings.rules.required'), trigger: 'blur' },
  ],
  whatsappAgentMaxCompletionTokens: [
    { required: true, message: t('global_settings.rules.required'), trigger: 'blur' },
  ],
}))

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) { return }

  await formEl.validate(async (valid) => {
    if (valid) {
      await updateSettings()

      if (updateSettingsError.value) {
        ElNotification({
          title: t('global_settings.update_error_title'),
          message: t('global_settings.update_error_description'),
          type: 'error',
          customClass: 'error',
          duration: 2500,
        })
      }
      else {
        ElNotification({
          title: t('global_settings.update_success_title'),
          message: t('global_settings.update_success_description'),
          type: 'success',
          customClass: 'success',
          duration: 2500,
        })
        emits('settingsUpdated')
      }
    }
  })
}
</script>

<template>
  <ElForm
    ref="settingsFormRef"
    :model="settingsForm"
    :rules="rules"
    class="container"
    :scroll-to-error="true"
  >
    <div class="group-heading-wrapper">
      <h6 class="group-title">
        {{ t('global_settings.titles.settings') }}
      </h6>
      <span class="group-description">{{ t('global_settings.descriptions.settings_description') }}</span>
    </div>

    <!-- Chat Max History Tokens -->
    <ElFormItem
      v-motion-fade
      :label="props.text.CHAT_MAX_HISTORY_TOKENS.label"
      prop="chatMaxHistoryTokens"
      :delay="100"
    >
      <ElInputNumber
        v-model="settingsForm.chatMaxHistoryTokens"
        :min="1000"
        controls-position="right"
      >
        <template #increase-icon>
          <AddIcon />
        </template>
        <template #decrease-icon>
          <MinusIcon />
        </template>
      </ElInputNumber>
    </ElFormItem>

    <!-- Agent Title Max Completion Tokens -->
    <ElFormItem
      v-motion-fade
      :label="props.text.AGENT_TITLE_MAX_COMPLETION_TOKENS.label"
      prop="agentTitleMaxCompletionTokens"
      :delay="200"
    >
      <ElInputNumber
        v-model="settingsForm.agentTitleMaxCompletionTokens"
        :min="10"
        controls-position="right"
      >
        <template #increase-icon>
          <AddIcon />
        </template>
        <template #decrease-icon>
          <MinusIcon />
        </template>
      </ElInputNumber>
    </ElFormItem>

    <!-- Agent Summary Max Completion Tokens -->
    <ElFormItem
      v-motion-fade
      :label="props.text.AGENT_SUMMARY_MAX_COMPLETION_TOKENS.label"
      prop="agentSummaryMaxCompletionTokens"
      :delay="300"
    >
      <ElInputNumber
        v-model="settingsForm.agentSummaryMaxCompletionTokens"
        :min="100"
        controls-position="right"
      >
        <template #increase-icon>
          <AddIcon />
        </template>
        <template #decrease-icon>
          <MinusIcon />
        </template>
      </ElInputNumber>
    </ElFormItem>

    <!-- WhatsApp Agent Max Completion Tokens -->
    <ElFormItem
      v-motion-fade
      :delay="400"
      :label="props.text.WHATSAPP_AGENT_MAX_COMPLETION_TOKENS.label"
      prop="whatsappAgentMaxCompletionTokens"
    >
      <ElInputNumber
        v-model="settingsForm.whatsappAgentMaxCompletionTokens"
        :min="50"
        controls-position="right"
      >
        <template #increase-icon>
          <AddIcon />
        </template>
        <template #decrease-icon>
          <MinusIcon />
        </template>
      </ElInputNumber>
    </ElFormItem>

    <!-- Agent Presence Penalty -->
    <ElFormItem
      v-motion-fade
      :delay="500"
      class="settings-form-item"
      :label="props.text.AGENT_PRESENCE_PENALTY.label"
      prop="agentPresencePenalty"
    >
      <el-card class="is-accent">
        <div class="card-body">
          <ElTag type="primary">
            {{ settingsForm.agentPresencePenalty }}
          </ElTag>
          <ElSlider
            v-model="settingsForm.agentPresencePenalty"
            :min="-2"
            :max="2"
            :step="0.1"
          />
        </div>
      </el-card>
    </ElFormItem>

    <ElFormItem
      v-motion-fade
      class="actions"
      :delay="600"
    >
      <el-button
        type="primary"
        :loading="updateSettingsStatus === 'pending'"
        @click="handleSubmit(settingsFormRef)"
      >
        {{ t('global_settings.update_button') }}
      </el-button>
    </ElFormItem>
  </ElForm>
</template>

  <style lang="scss" scoped>
.container {
  padding: 0.7rem;
  --container-background-color: var(--color-primary-100);
  --form-gap: 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  column-gap: var(--spacing-fluid-2-xl);
  position: relative;
  width: 100%;

  @include viewport-xs {
    grid-template-columns: repeat(2, 1fr);

    & .actions {
      grid-column: span 2;
    }
  }

  @include viewport-ml {
    grid-template-columns: repeat(3, 1fr);
    column-gap: var(--spacing-fluid-3-xl);

    & .actions {
      grid-column: 2/-1;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: flex-end;
      gap: var(--spacing-fluid-3-xl);
    }
  }

  .actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: var(--spacing-fluid-m);
  }
}

.settings-form-item {
  grid-column: span 1;

  @include viewport-xs {
    grid-column: span 2;
  }
}

.card-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.375rem;
}

.group-heading-wrapper {
  grid-column: 1/-1;
  margin-bottom: var(--font-size-fluid-3);
  & .group-title {
    font-size: var(--font-size-fluid-5);
    color: var(--color-primary-900);
  }
  & .group-description {
    font-size: var(--font-size-fluid-3);
    color: var(--color-primary-700);
  }
}

html.dark {
  .container {
    --container-background-color: var(--color-primary-800);
  }
  & .group-heading-wrapper {
    margin-bottom: var(--font-size-fluid-3);
    & .group-title {
      color: var(--color-primary-0);
    }
    & .group-description {
      color: var(--color-primary-300);
    }
  }
}
</style>
