<script lang="ts" setup>
// CONSTANTS
const navigationStore = useNavigationStore()
const { width } = useWindowSize()
const { t } = useI18n()

// WATCHERS
watch(width, (newWidth) => {
  if (newWidth <= 990) {
    navigationStore.isSidebarCollapsed = true
  }
  else {
    navigationStore.isSidebarCollapsed = false
  }
}, { immediate: true })
</script>

<template>
  <div class="main-layout" :class="{ 'sidebar-collapsed': navigationStore.isSidebarCollapsed }">
    <LlmHeader />
    <LlmAside />
    <main class="main">
      <div class="page-wrapper">
        <NuxtPage />
      </div>

      <div class="chat-page-footer">
        <ChatInputSection />
        <p class="chat-page-footer__text">
          {{ t('global_disclaimer') }}
        </p>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  max-width: 2560px;
  margin-inline: auto;
  display: grid;
  grid-template-areas:
    'header header'
    'aside main';
  grid-template-columns: 16.25rem 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  max-height: 100vh;
  position: relative;
  transition: grid-template-columns 0.3s ease;
  background: var(--color-app-background);
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;

  &.sidebar-collapsed {
    grid-template-columns: 100px 1fr;
  }

  @include viewport-xl {
    grid-template-columns: 22.25rem 1fr;
  }
}

.main {
  grid-area: main;
  background-color: transparent;
  padding: 0.75rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  & .page-wrapper {
    flex: 1 0 calc(90%);
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 100%;
  }

  & .chat-page-footer {
    flex: 1 0 calc(10%);

    &__text {
      color: var(--color-primary-500);
      font-size: var(--font-size-fluid-2);
      text-align: center;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
