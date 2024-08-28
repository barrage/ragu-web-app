<script lang="ts" setup></script>

<template>
  <div class="layout-container">
    <header>
      Header
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer>
      Footer
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  min-height: 100vh;
}

header {
  grid-row: 1;
  grid-column: 1 / -1;
  background: var(--color-blue-100);
  color: white;
  padding: 10px;
}

main {
  grid-row: 2;
  grid-column: 1 / -1;
  padding: 20px;
  overflow-x: hidden;
}

footer {
  grid-row: 3;
  grid-column: 1 / -1;
  background: var(--color-blue-300);
  text-align: center;
  padding: 10px;
}
</style>
