<script setup lang="ts">
definePageMeta({
  middleware: ['example-named-middleware'],
})
</script>

<template>
  <div class="page-container">
    <h5>Oops! You shouldn't be on the <strong>/middleware-test-named</strong> page.</h5>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}
</style>
