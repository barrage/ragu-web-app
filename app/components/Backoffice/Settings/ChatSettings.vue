<script lang="ts" setup>
const { $api } = useNuxtApp()
const { t } = useI18n()

const { data: appConfig, execute: getSettings } = await useAsyncData(() => $api.settings.GetAdminSettings())

// Settings metadata for better display
const settingsText = computed(() => ({
  CHAT_MAX_HISTORY_TOKENS: {
    label: t('global_settings.titles.chat_max_history_tokens'),
    description: t('global_settings.descriptions.chat_max_history_tokens'),
  },
  AGENT_PRESENCE_PENALTY: {
    label: t('global_settings.titles.agent_presence_penalty'),
    description: t('global_settings.descriptions.agent_presence_penalty'),
  },
  AGENT_TITLE_MAX_COMPLETION_TOKENS: {
    label: t('global_settings.titles.agent_title_max_completion_tokens'),
    description: t('global_settings.descriptions.agent_title_max_completion_tokens'),
  },
  AGENT_SUMMARY_MAX_COMPLETION_TOKENS: {
    label: t('global_settings.titles.agent_summary_max_completion_tokens'),
    description: t('global_settings.descriptions.agent_summary_max_completion_tokens'),
  },
  WHATSAPP_AGENT_MAX_COMPLETION_TOKENS: {
    label: t('global_settings.titles.whatsapp_agent_max_completion_tokens'),
    description: t('global_settings.descriptions.whatsapp_agent_max_completion_tokens'),
  },
}))

const handleSettingsUpdate = async () => {
  await getSettings()
}
</script>

<template>
  <div v-motion-fade class="group-heading-wrapper">
    <h5 class="group-title">
      {{ t('global_settings.titles.settings') }}
    </h5>
    <span class="group-description">{{ t('global_settings.descriptions.settings_description') }}</span>
  </div>
  <el-divider class="is-weak" />

  <ChatSettingsForm
    :settings="appConfig"
    :text="settingsText"
    @settings-updated="handleSettingsUpdate"
  />
</template>

<style lang="scss" scoped>
.group-heading-wrapper {
  margin-block: var(--font-size-fluid-3) var(--spacing-fluid-l);
  & .group-title {
    color: var(--color-primary-900);
  }
  & .group-description {
    color: var(--color-primary-700);
  }
}

html.dark {
  .group-heading-wrapper {
    & .group-title {
      color: var(--color-primary-0);
    }
    & .group-description {
      color: var(--color-primary-300);
    }
  }
}
</style>
