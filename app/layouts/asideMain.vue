<script lang="ts" setup></script>

<template>
  <div class="layout">
    <aside>
      Aside
    </aside>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  --aside-width: 250px;
  display: grid;
  grid-template-columns: var(--aside-width) 1fr;
  grid-template-rows: 1fr;
  min-height: 100vh;
  grid-template-areas: 'aside main';
}

aside {
  grid-area: aside;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: var(--aside-width);
  background: var(--color-blue-200);
  padding: 10px;
  overflow-y: auto;
  z-index: 100;
}

main {
  grid-area: main;
  padding: 20px;
  overflow-x: hidden;
  min-height: 100vh;
}
</style>
