<script lang="ts" setup>
// CONSTANTS
const navigationStore = useNavigationStore()
</script>

<template>
  <div class="main-layout" :class="{ 'sidebar-collapsed': navigationStore.isSidebarCollapsed }">
    <LlmHeader />
    <LlmAside />
    <main class="main">
      <NuxtPage />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  display: grid;
  grid-template-areas:
    'header header'
    'aside main';
  grid-template-columns: 16.25rem 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  position: relative;
  transition: grid-template-columns 0.3s ease;

  &.sidebar-collapsed {
    grid-template-columns: 5rem 1fr;
  }
}

.main {
  grid-area: main;
  background-color: var(--color-primary-subtle);
  padding: 0.75rem;
}
.dark {
  .main {
    background-color: var(--color-primary-900);
  }
}
</style>
