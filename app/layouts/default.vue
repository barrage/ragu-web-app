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
  background: transparent;
  background: radial-gradient(
    circle,
    var(--color-lightmode-0) 0%,
    var(--color-primary-subtle) 100%
  );
  &.sidebar-collapsed {
    grid-template-columns: 100px 1fr;
  }
}

.main {
  grid-area: main;
  background-color: var(--color-primary-subtle);
  background-color: transparent;
  padding: 0.75rem;
}
.dark {
  .main-layout {
    background: radial-gradient(
      circle,
      var(--color-darkmode-300) 0%,
      var(--color-primary-900) 100%
    );
  }
}
</style>
