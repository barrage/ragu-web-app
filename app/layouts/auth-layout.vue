<script setup lang="ts">
const themeStore = useThemeStore()
const { isDarkMode } = storeToRefs(themeStore)
</script>

<template>
  <main class="main-content" :class="{ dark: isDarkMode }">
    <NuxtPage />
  </main>
</template>

<style lang="scss" scoped>
.main-content {
  background: var(--color-app-background);
  min-height: 100vh;
  padding: 0.75rem;
  overflow: hidden;
  height: 100vh;
  animation: fade-in 2s ease forwards;
  background: linear-gradient(
    var(--color-lightmode-0),
    var(--color-primary-200)
  );
}
</style>
