<script lang="ts" setup>
import BarrageLogo from '~/assets/icons/svg/barrage-logo.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'

useThemeStore()

definePageMeta({
  layout: 'login-layout',
})

// API CALLS
/* const { error } = await useAsyncData(() => authStore.handleOAuthLogin()) */
</script>

<template>
  <div class="login-page-container">
    <header>
      <BarrageLogo
        width="110px"
        height="48px"
      />

      <LocalizationSelector />
      <ThemeSelector />
      <LightDarkModeSelector />
    </header>
    <div class="login-wrapper">
      <div class="login-header">
        <div class="logo-icon-wrapper">
          <BrainIcon size="42" />
        </div>

        <h4 class="login-title typing-effect">
          {{ $t('login.title') }}
        </h4>
        <p class="login-description">
          {{ $t('login.description') }}
        </p>
      </div>

      <LlmOauthLogin />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page-container {
  width: 100%;
  min-height: 100%;
  grid-column: span 12;

  & header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-area: header;
    position: sticky;
    top: 0;

    padding: 1rem;
    background-color: transparent;
    min-height: fit-content;
  }

  & .login-wrapper {
    max-width: fit-content;
    min-width: 400px;
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: 2.5rem;
    border: 0.5px solid var(--color-primary-300);
    border-radius: 10px;
    box-shadow:
      0 2px 4px var(--color-primary-200),
      0 3px 10px var(--color-primary-200);

    padding: 1.5rem;
    background: var(--color-primary-100);

    & .login-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    & .login-title {
      min-height: fit-content;
      color: var(--color-primary-700);
      line-height: normal;
      margin: auto;
    }

    & .login-description {
      color: var(--color-primary-800);
    }
  }
}

.logo-icon-wrapper {
  border: 1px solid var(--color-primary-300);
  background: var(--color-primary-200);
  margin: auto;
  color: var(--color-primary-800);
  padding: 0.5rem;
  border-radius: 15%;
}
.typing-effect {
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid black;
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  max-width: max-content;
  color: var(--color-primary-800);
  font-weight: 600;
  animation:
    typing 1.75s steps(30, end) forwards,
    blink 0.75s step-end infinite;
}

.dark {
  & .login-wrapper {
    background: var(--color-primary-800);
    border: 1px solid var(--color-primary-600);
    border-top: 2px solid var(--color-primary-600);

    box-shadow: none;
    & .login-title {
      color: var(--color-primary-100);
    }
    & .login-description {
      color: var(--color-primary-100);
    }
  }
  & .logo-icon-wrapper {
    border: 1px solid var(--color-primary-600);
    background: var(--color-primary-700);
    color: var(--color-primary-100);
  }
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
    border: none;
  }
}
</style>
