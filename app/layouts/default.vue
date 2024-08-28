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
  grid-template-columns: 260px 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  position: relative;
  transition: grid-template-columns 0.3s ease;

  &.sidebar-collapsed {
    grid-template-columns: 80px 1fr;
  }
}

.main {
  grid-area: main;
  background-color: #ffffff;
  padding: 0.75rem;
}
</style>
