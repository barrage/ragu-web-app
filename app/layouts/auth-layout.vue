<script setup lang="ts">
// TODO list
// This is a dummy layout used to prevent loading the ChatInputSection
// component from the default layout. It is janky and is a temporary fix.
// Eventually, the ChatInputSection component should be removed from the layout
// and should be used in components/pages that actually need it.

const themeStore = useThemeStore()
const { isDarkMode } = storeToRefs(themeStore)
</script>

<template>
  <main class="main-content" :class="{ dark: isDarkMode }">
    <NuxtPage />
  </main>
</template>
