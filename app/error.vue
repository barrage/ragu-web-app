<script setup lang="ts">
// IMPORTS
import type { NuxtError } from '#app'

// PROPS
defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <section class="wrapper-grid">
    <div class="content">
      <div v-if="error?.statusCode === 500">
        <LlmError
          title="Oh, oh, server error"
          :description=" error?.message "
          :error="error?.statusCode"
        >
          <template #image>
            <img src="~/assets/images/login-img.jpg" alt="Error">
          </template>
        </LlmError>
      </div>
      <div v-else-if="error?.statusCode === 404">
        <LlmError
          title="Oh no, page not found"
          :description=" error?.message "
          :error="error?.statusCode"
        >
          <template #image>
            <img src="~/assets/images/login-img.jpg" alt="Error">
          </template>
        </LlmError>
      </div>
      <div v-else>
        <h1>We have an error!</h1>
        <p>Contact us to fix it.</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.content {
  grid-column: content-start;
}
</style>
