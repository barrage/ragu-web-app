<script setup lang="ts">
import RaguLogo from '~/assets/icons/svg/Ragu_logo_dark.svg'
</script>

<template>
  <div class="get-help-layout">
    <header>
      <RaguLogo
        width="110px"
        height="40px"
        class="logo"
      />
      <div class="header-right">
        <ThemeSelector />
        <div class="vertical-divider" />
        <LightDarkModeSelector />
        <div class="vertical-divider" />
        <LocalizationSelector />
      </div>
    </header>
    <main class="main-content">
      <NuxtPage />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.get-help-layout {
  min-height: 100vh;
  background: var(--color-app-background);

  header {
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--color-app-background);
    border-bottom: 1px solid var(--color-primary-300);

    .logo {
      color: var(--color-primary-900);
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .vertical-divider {
      width: 1px;
      height: 1.75rem;
      background: var(--color-primary-300);
    }
  }

  .main-content {
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 1440px;
    margin: 0 auto;

    @include viewport-s {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.dark {
  header {
    .logo {
      color: var(--color-primary-100);
    }
  }
  main {
    .vertical-divider {
      background: var(--color-primary-300);
      @include viewport-m {
        background: var(--color-primary-600);
      }
    }
  }
}
</style>
