<script lang="ts" setup></script>

<template>
  <div class="header-main-layout">
    <header>
      <h1>Header</h1>
    </header>
    <main class="main-container">
      <NuxtPage />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.header-main-layout {
  --header-height: 100px;
  display: grid;
  grid-template-rows: var(--header-height) 1fr;
  grid-template-columns: 1fr;
  min-height: 100vh;
}

header {
  grid-row: 1;
  height: var(--header-height);
  background: var(--color-blue-100);
  padding: 1rem;
  text-align: center;
}

.main-container {
  grid-row: 2;
  overflow-x: hidden;
  padding: 1rem;
}
</style>
