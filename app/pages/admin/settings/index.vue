<script lang="ts" setup>
// IMPORTS
import Settings from '~/assets/icons/svg/settings.svg'

const { t } = useI18n()
const appConfigStore = useAppConfigStore()

definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('global_settings.title')),
})

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
      <h5 class="overview-title">
        {{ t('global_settings.info.title') }}
      </h5>
      <SettingsInfoOverview :app-config="appConfigStore.appConfig" />
    </template>
    <h5 class="overview-title">
      {{ t('global_settings.chats_config.title') }}
    </h5>
    <ChatSettings />
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
</style>
