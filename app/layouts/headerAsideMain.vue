<script lang="ts" setup></script>

<template>
  <div class="grid-layout">
    <header>
      Header
    </header>
    <aside>Aside</aside>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.grid-layout {
  --header-height: 60px;
  --sidebar-width: 250px;
  --footer-height: 50px;
  display: grid;
  grid-template-rows: var(--header-height) 1fr var(--footer-height);
  grid-template-columns: var(--sidebar-width) 1fr;
  min-height: 100vh;

  header {
    grid-column: 1 / -1;
    grid-row: 1;
    position: fixed;
    height: var(--header-height);
    text-align: center;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--color-blue-100);
    padding: 10px;
    z-index: 100;
  }

  aside {
    grid-column: 1;
    text-align: center;
    grid-row: 2;
    height: calc(100vh - var(--header-height));
    width: var(--sidebar-width);
    background: var(--color-blue-200);
    padding: 10px;
    overflow-y: auto;
    position: fixed;
    top: var(--header-height);
    bottom: 0;
  }

  main {
    grid-column: 2;
    grid-row: 2;
    padding: 20px;
    overflow-x: hidden;
  }
}
</style>
