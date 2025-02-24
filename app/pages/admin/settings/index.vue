<script lang="ts" setup>
// IMPORTS
import Settings from '~/assets/icons/svg/settings.svg'
import ChatIcon from '~/assets/icons/svg/chat-icon.svg'
import type { TabOption } from '~/types/tab'

const { t } = useI18n()
const appConfigStore = useAppConfigStore()

definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('global_settings.title')),
})

const tabOptions = computed((): TabOption[] => {
  return [
    {
      name: 'overview',
      label: t('global_settings.info.title'),
      icon: Settings,
      component: defineAsyncComponent(() =>
        import('~/components/Backoffice/Settings/SettingsInfoOverview.vue'),
      ),
    },
    {
      name: 'chat',
      label: t('global_settings.chats_config.title'),
      icon: ChatIcon,
      component: defineAsyncComponent(() =>
        import('~/components/Backoffice/Settings/ChatSettings.vue'),
      ),
    },
  ]
})

const { activeTab } = useTabQuery('overview', tabOptions.value.map(tab => tab.name))

const { error: getAppConfigError, status: getAppConfigStatus } = await useAsyncData(() => appConfigStore.GET_AppConfig())

errorHandler(getAppConfigError)
</script>

<template>
  <AdminPageContainer>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('global_settings.title')"
          :description="t('global_settings.description')"
        >
          <template #icon>
            <Settings size="48px" />
          </template>
        </AdminPageTitleContainer>
      </template>
    </AdminPageHeadingTemplate>
    <template v-if="getAppConfigStatus === 'pending'">
      <div class="app-config-loader">
        <MeetUpLoader />
      </div>
    </template>
    <template v-else>
      <ElTabs
        v-model="activeTab"
        class="settings-tabs"
        data-testid="settings-tabs"
      >
        <ElTabPane
          v-for="tab in tabOptions"
          :key="tab.name"
          :label="tab.label"
          :name="tab.name"
        >
          <template #label>
            <div class="custom-tab-label-wrapper">
              <component :is="tab.icon" size="24px" />
              <span>{{ tab.label }}</span>
            </div>
          </template>

          <component
            :is="tab.component"
            v-if="activeTab === tab.name"
            v-motion-slide-bottom
            :duration="400"
            :app-config="appConfigStore.appConfig"
          />
        </ElTabPane>
      </ElTabs>
    </template>
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
  .overview-title {
  font-weight: var(--font-weight-semibold);
  margin-block: var(--spacing-fluid-xl) var(--spacing-fluid-m);
}
.app-config-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block: 50px;
}
.settings-tabs {
  margin-top: var(--spacing-fluid-xs);

  :deep(.custom-tab-label-wrapper) {
    display: flex;
    align-items: center;
    gap: var(--spacing-fluid-5-xs);
  }
}
</style>
