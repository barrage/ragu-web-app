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
  <el-card class="settings-overview-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <h6>{{ t('global_settings.overview_title') }}</h6>
      </div>
    </template>

    <div class="settings-grid">
      <template
        v-for="(setting, key, index) in appConfig"
        :key="key"
      >
        <div
          v-motion-fade
          class="setting-item"
          :delay="(index * 100)"
        >
          <div class="setting-info">
            <div class="setting-header">
              <span class="setting-title">{{ settingsText[key].label }}</span>
              <el-tag
                size="small"
                type="primary"
                class="setting-value"
              >
                {{ setting.value }}
              </el-tag>
            </div>
            <p class="setting-description">
              {{ settingsText[key].description }}
            </p>
          </div>
        </div>
      </template>
    </div>
  </el-card>

  <ChatSettingsForm
    :settings="appConfig"
    :text="settingsText"
    @settings-updated="handleSettingsUpdate"
  />
</template>

<style lang="scss" scoped>
.settings-overview-card {
  margin-bottom: var(--spacing-fluid-l);
  .card-header {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-fluid-xs);

    h4 {
      margin: 0;
      color: var(--color-primary-900);
      font-weight: var(--font-weight-semibold);
    }

    .header-description {
      color: var(--color-primary-600);
      font-size: var(--font-size-fluid-1);
    }
  }

  .settings-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-fluid-m);
    padding: var(--spacing-fluid-s);

    @include viewport-xs {
      grid-template-columns: repeat(2, 1fr);
    }
    @include viewport-m {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .setting-item {
    background-color: var(--color-primary-50);
    border-radius: var(--border-radius-m);
    padding: var(--spacing-fluid-m);
    transition: all 0.3s ease;
    border: 1px solid var(--color-primary-200);
    border-radius: var(--radius-6);

    &:hover {
      background-color: var(--color-primary-100);
      transform: translateY(-2px);
    }

    .setting-info {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-fluid-xs);
    }

    .setting-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .setting-title {
      font-weight: var(--font-weight-medium);
      color: var(--color-primary-800);
      font-size: var(--font-size-fluid-2);
    }

    .setting-value {
      font-weight: var(--font-weight-semibold);
    }

    .setting-description {
      color: var(--color-primary-600);
      font-size: var(--font-size-fluid-1);
      margin: 0;
    }
  }
}

html.dark {
  .settings-overview-card {
    .card-header {
      h4 {
        color: var(--color-primary-100);
      }

      .header-description {
        color: var(--color-primary-400);
      }
    }

    .setting-item {
      background-color: var(--color-primary-800);
      border: 0;

      &:hover {
        background-color: var(--color-primary-700);
      }

      .setting-title {
        color: var(--color-primary-200);
      }

      .setting-description {
        color: var(--color-primary-400);
      }
    }
  }
}
</style>
