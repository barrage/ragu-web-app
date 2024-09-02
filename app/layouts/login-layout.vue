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
  background: radial-gradient(
    circle,
    var(--color-lightmode-0) 0%,
    var(--color-primary-subtle) 100%
  );
}
.main-wrapper {
  max-width: 120rem;
  margin-inline: auto;
  height: 100vh;
}
</style>
