<script lang="ts" setup>
// CONSTANTS
const navigationStore = useNavigationStore()
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
  background: transparent;
  background: var(--color-primary-subtle);
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
  overflow-y: auto;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.dark {
  .main-layout {
    background: var(--color-primary-1000);
  }
}
</style>
