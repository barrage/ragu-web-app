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
    class="settings-container"
    :scroll-to-error="true"
  >
    <!-- Chat Max History Tokens -->
    <ElFormItem
      v-motion-fade
      :delay="100"
      prop="chatMaxHistoryTokens"
      class="settings-form-item"
    >
      <div class="setting-info">
        <div class="setting-header">
          <span class="setting-title">{{ props.text.CHAT_MAX_HISTORY_TOKENS.label }}</span>
          <el-tag
            size="small"
            type="info"
            class="current-value"
          >
            {{ settingsForm.chatMaxHistoryTokens }}
          </el-tag>
        </div>
        <p class="setting-description">
          {{ props.text.CHAT_MAX_HISTORY_TOKENS.description }}
        </p>
      </div>
      <ElInputNumber
        v-model="settingsForm.chatMaxHistoryTokens"
        :min="1000"
        controls-position="right"
        class="setting-input"
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
      :delay="200"
      prop="agentPresencePenalty"
      class="settings-form-item"
    >
      <div class="setting-info">
        <div class="setting-header">
          <span class="setting-title">{{ props.text.AGENT_PRESENCE_PENALTY.label }}</span>
          <el-tag
            size="small"
            type="info"
            class="current-value"
          >
            {{ settingsForm.agentPresencePenalty }}
          </el-tag>
        </div>
        <p class="setting-description">
          {{ props.text.AGENT_PRESENCE_PENALTY.description }}
        </p>
      </div>
      <el-card class="is-accent">
        <div class="card-body">
          <ElTag
            type="primary"
          >
            {{ settingsForm.agentPresencePenalty }}
          </ElTag>
          <ElSlider
            v-model="settingsForm.agentPresencePenalty"
            :min="-2"
            :max="2"
            :step="0.1"
            class="setting-input"
          />
        </div>
      </el-card>
    </ElFormItem>
    <el-divider class="is-weak" />
    <!-- Agent Title Max Completion Tokens -->
    <ElFormItem
      v-motion-fade
      :delay="300"
      prop="agentTitleMaxCompletionTokens"
      class="settings-form-item"
    >
      <div class="setting-info">
        <div class="setting-header">
          <span class="setting-title">{{ props.text.AGENT_TITLE_MAX_COMPLETION_TOKENS.label }}</span>
          <el-tag
            size="small"
            type="info"
            class="current-value"
          >
            {{ settingsForm.agentTitleMaxCompletionTokens }}
          </el-tag>
        </div>
        <p class="setting-description">
          {{ props.text.AGENT_TITLE_MAX_COMPLETION_TOKENS.description }}
        </p>
      </div>
      <ElInputNumber
        v-model="settingsForm.agentTitleMaxCompletionTokens"
        :min="10"
        controls-position="right"
        class="setting-input"
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
      :delay="400"
      prop="agentSummaryMaxCompletionTokens"
      class="settings-form-item"
    >
      <div class="setting-info">
        <div class="setting-header">
          <span class="setting-title">{{ props.text.AGENT_SUMMARY_MAX_COMPLETION_TOKENS.label }}</span>
          <el-tag
            size="small"
            type="info"
            class="current-value"
          >
            {{ settingsForm.agentSummaryMaxCompletionTokens }}
          </el-tag>
        </div>
        <p class="setting-description">
          {{ props.text.AGENT_SUMMARY_MAX_COMPLETION_TOKENS.description }}
        </p>
      </div>
      <ElInputNumber
        v-model="settingsForm.agentSummaryMaxCompletionTokens"
        :min="10"
        controls-position="right"
        class="setting-input"
      >
        <template #increase-icon>
          <AddIcon />
        </template>
        <template #decrease-icon>
          <MinusIcon />
        </template>
      </ElInputNumber>
    </ElFormItem>
    <el-divider class="is-weak" />
    <!-- WhatsApp Agent Max Completion Tokens -->
    <ElFormItem
      v-motion-fade
      :delay="500"
      prop="whatsappAgentMaxCompletionTokens"
      class="settings-form-item"
    >
      <div class="setting-info">
        <div class="setting-header">
          <span class="setting-title">{{ props.text.WHATSAPP_AGENT_MAX_COMPLETION_TOKENS.label }}</span>
          <el-tag
            size="small"
            type="info"
            class="current-value"
          >
            {{ settingsForm.whatsappAgentMaxCompletionTokens }}
          </el-tag>
        </div>
        <p class="setting-description">
          {{ props.text.WHATSAPP_AGENT_MAX_COMPLETION_TOKENS.description }}
        </p>
      </div>
      <ElInputNumber
        v-model="settingsForm.whatsappAgentMaxCompletionTokens"
        :min="10"
        controls-position="right"
        class="setting-input"
      >
        <template #increase-icon>
          <AddIcon />
        </template>
        <template #decrease-icon>
          <MinusIcon />
        </template>
      </ElInputNumber>
    </ElFormItem>

    <!-- Submit Button -->
    <div
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
    </div>
  </ElForm>
</template>

  <style lang="scss" scoped>
 .settings-container {
  padding: 0.7rem;
  --container-background-color: var(--color-primary-100);
  --form-gap: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: var(--spacing-fluid-2-xl);
  position: relative;
  width: 100%;
}

.settings-form-item {
  grid-column: span 2;
  margin-bottom: var(--spacing-fluid-l);
  @include viewport-m {
    grid-column: span 1;
  }

  .setting-info {
    margin-bottom: var(--spacing-fluid-xs);
  }

  .setting-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .setting-title {
    font-size: var(--font-size-fluid-4);
    font-weight: 500;
    color: var(--color-primary-900);
  }

  .setting-description {
    font-size: var(--font-size-fluid-3);
    color: var(--color-primary-700);
    margin: 0;
  }
}

.actions {
  margin-top: var(--spacing-fluid-xl);
  display: flex;
  justify-content: flex-end;
  height: fit-content;
  margin-top: auto;
}

.is-weak {
  grid-column: span 2;
  margin-bottom: var(--spacing-fluid-l);
}
.card-body {
  display: flex;
  gap: 1.375rem;
  align-items: center;
}

.is-accent {
  background-color: var(--color-primary-50);
  border: 1px solid var(--color-primary-200);
}
html.dark {
  .settings-form-item {
    .setting-title {
      color: var(--color-primary-0);
    }
    .setting-description {
      color: var(--color-primary-300);
    }
  }
  .settings-container {
    --container-background-color: var(--color-primary-800);
  }
  .is-accent {
    background-color: var(--color-primary-900);
    border-color: var(--color-primary-700);
  }
}
</style>
