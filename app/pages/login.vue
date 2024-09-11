<script lang="ts" setup>
// CONSTANTS
const authStore = useAuthStore()

// STATE
const isLeftVisible = ref(true)
const isRightVisible = ref(true)

// LIFECYCLE
definePageMeta({
  layout: 'login-layout',
})

// API CALLS
const { error } = await useAsyncData(() => authStore.handleOAuthLogin())

errorHandler(error, true)
</script>

<template>
  <div class="left" :class="{ hidden: !isLeftVisible }">
    <div class="login-container">
      <h3>Login</h3>
      <LlmOauthLogin />
    </div>
  </div>
  <div class="right" :class="{ hidden: !isRightVisible }" />
</template>

<style lang="scss" scoped>
.left {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 1/-1;
  grid-row: 1;
  background-color: var(--color-primary-100);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;

  &.hidden {
    opacity: 0;
    transform: translateX(-100%);
    pointer-events: none;
  }

  @include viewport-ml {
    grid-column: span 5;
    margin-block: 0.625rem;
    border-radius: 0.5rem;
  }

  .login-container {
    padding: 0.75rem;
    width: 100%;
    border-radius: 0.5rem;
    background-color: var(--color-gray-100);
    opacity: 0.8;
    z-index: 2;
    margin-inline: 0.625rem;
    padding-block: 1.25rem;

    @include viewport-ml {
      color: var(--color-gray-900);
      margin-inline: var(--spacing-desktop-6-xl);
      background-color: transparent;
    }
  }

  h3 {
    margin-bottom: var(--spacing-fluid-xl);
    color: black;

    @include viewport-ml {
      color: var(--color-gray-900);
    }
  }
}

.right {
  background-image: url('~/assets/images/login-img.jpg');
  background-size: cover;
  background-position: center;
  grid-column: 1/-1;
  grid-row: 1;
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;

  &.hidden {
    opacity: 0;
    transform: translateX(100%);
    pointer-events: none;
  }

  @include viewport-ml {
    grid-column: span 7;
    margin-block: 0.625rem;
    border-radius: 0.5rem;
  }
}
</style>
