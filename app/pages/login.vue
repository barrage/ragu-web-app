<script lang="ts" setup>
import BarrageLogo from '~/assets/icons/svg/barrage-logo.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'

useThemeStore()

definePageMeta({
  layout: 'login-layout',
})
</script>

<template>
  <div class="login-page-container">
    <header>
      <BarrageLogo
        width="110px"
        height="48px"
      />
      <div class="header-right">
        <ThemeSelector />
        <div class="vertical-divider" />
        <LightDarkModeSelector />
        <div class="vertical-divider" />
        <LocalizationSelector />
      </div>
    </header>
    <div class="login-wrapper">
      <div class="login-header">
        <div class="logo-icon-wrapper">
          <BrainIcon size="42px" />
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
    justify-content: center;
    align-items: center;
    grid-area: header;
    position: sticky;
    top: 0;
    gap: clamp(4.375rem, -6.699rem + 47.2492vw, 50rem);
    padding: 1rem;
    background-color: transparent;
    min-height: fit-content;

    .header-right {
      display: flex;
      align-items: center;
      column-gap: 0.75rem;
    }
    .vertical-divider {
      width: 1px;
      height: 1.75rem;
      background: var(--color-primary-300);
    }
  }

  & .login-wrapper {
    max-width: 400px;
    width: 100%;
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
  border-right: 2px solid var(--color-primary-900);
  display: inline-block;
  max-width: max-content;
  animation:
    typing 1s steps(30, end) forwards,
    blink 0.1s step-end infinite;
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
</style>
