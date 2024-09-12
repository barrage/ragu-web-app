<script lang="ts" setup>
// IMPORTS
import BarrageLogo from '~/assets/icons/svg/barrage-logo.svg'
</script>

<template>
  <header>
    <BarrageLogo
      width="110px"
      height="40px"
    />

    <div class="header-right">
      <ThemeSelector />
      <div class="vertical-divider" />
      <LightDarkModeSelector />
      <div class="vertical-divider" />
      <LocalizationSelector />
      <div class="vertical-divider" />
      <ProfileDropdown />
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-area: header;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 1rem;
  background-color: transparent;

  .header-right {
    display: flex;
    align-items: center;
    column-gap: 0.75rem;
  }
}
.vertical-divider {
  width: 1px;
  height: 32px;
  background: var(--color-primary-200);
}

.dark {
  header {
    & .vertical-divider {
      background: var(--color-primary-800);
    }
  }
}
</style>
