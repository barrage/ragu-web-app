<script lang="ts" setup>
// CONSTANTS
const navigationStore = useNavigationStore()
const { width } = useWindowSize()

// WATCHERS
watch(width, (newWidth) => {
  if (newWidth <= 990) {
    navigationStore.isAdminSidebarCollapsed = true
  }
  else {
    navigationStore.isAdminSidebarCollapsed = false
  }
}, { immediate: true })
</script>

<template>
  <div class="main-layout" :class="{ 'sidebar-collapsed': navigationStore.isAdminSidebarCollapsed }">
    <LlmHeader />
    <LlmAdminAside />
    <main class="main">
      <NuxtPage
        :transition="{
          name: 'page',
          mode: 'out-in',
        }"
      />
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
  overflow-x: auto;

  @include viewport-xxl {
    scrollbar-width: none;

    .wrapper::-webkit-scrollbar {
      display: none;
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
