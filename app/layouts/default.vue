<script lang="ts" setup></script>

<template>
  <div class="default-layout">
    <main class="main-container">
      <NuxtPage />
    </main>
    <ScrollToTop />
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
  max-width: 120rem;
  padding-inline: 1.25rem;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
}

.main-container {
  grid-row: 1;
}
</style>
