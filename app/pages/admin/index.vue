<script lang="ts" setup>
definePageMeta({
  layout: 'admin-layout',
})
const appConfigStore = useAppConfigStore()

appConfigStore.GET_AppConfig()

const currentAppConfig = computed(() => {
  return appConfigStore.appConfig
})
</script>

<template>
  <div class="admin-dashboard-page-container">
    <h4 class="page-title">
      Dashboard
    </h4>
    <p class="description">
      Manage app features, user roles, and analytics seamlessly
    </p>
    <AppConfig :app-config="currentAppConfig" />
  </div>
</template>

<style lang="scss" scoped>
.admin-dashboard-page-container {
  padding: 1rem 2rem;

  & .page-title {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--color-primary-900);
  }
  & .description {
    color: var(--color-primary-700);
  }
}
.dark {
  & .page-title {
    color: var(--color-primary-100);
  }
  & .description {
    color: var(--color-primary-300);
  }
}
</style>
