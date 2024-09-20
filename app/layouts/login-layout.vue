<script lang="ts" setup>

</script>

<template>
  <div class="login-layout">
    <main class="main-wrapper grid">
      <NuxtPage />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.login-layout {
  background: var(--color-primary-subtle);
}
.main-wrapper {
  max-width: 120rem;
  margin-inline: auto;
  height: 100vh;
}

.dark {
  .login-layout {
    background: var(--color-primary-900);
  }
}
</style>
