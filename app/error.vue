<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <section class="wrapper-grid">
    <div class="content">
      <div><h1>ERROR</h1></div>
      <div v-if="error?.statusCode === 500">
        <h2>Oh, oh, server error</h2>
        <h3>{{ error?.statusCode }}</h3>
        <p>{{ error?.message }}</p>
      </div>
      <div v-else-if="error?.statusCode === 404">
        <h2>Oh, no page does not exist!</h2>
        <h3>{{ error?.statusCode }}</h3>
        <p>We don't have the page you're looking for.</p>
      </div>
      <div v-else>
        <h1>We have an error!</h1>
        <p>Contact us to fix it.</p>
      </div>
      <button @click="handleError">
        Go to home page
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.content {
  grid-column: content-start;
}
</style>
