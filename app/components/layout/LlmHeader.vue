<script lang="ts" setup>
import RaguLogo from '~/assets/icons/svg/Ragu_logo_dark.svg'
</script>

<template>
  <header>
    <LlmLink
      v-motion-slide-top
      to="/"
      :delay="500"
      type="link"
      tabindex="0"
    >
      <RaguLogo
        width="110px"
        height="40px"
        class="logo"
      />
    </LlmLink>
    <div class="header-right">
      <div v-motion-slide-top :delay="1000">
        <ThemeSelector />
      </div>
      <div
        v-motion-slide-top
        class="vertical-divider"
        :delay="1000"
      />

      <div v-motion-slide-top :delay="1100">
        <LightDarkModeSelector />
      </div>

      <div
        v-motion-slide-top
        class="vertical-divider"
        :delay="1200"
      />

      <div v-motion-slide-top :delay="1300">
        <LocalizationSelector />
      </div>
      <div
        v-motion-slide-top
        class="vertical-divider"
        :delay="1400"
      />
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

  .logo {
    color: var(--color-primary-900);
    transition: 0.2s ease-in-out;
    &:hover {
      color: var(--color-primary-600);
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    column-gap: 0.75rem;
  }
}
.vertical-divider {
  width: 1px;
  height: 1.75rem;
  background: var(--color-primary-300);
}

.dark {
  header {
    .logo {
      color: var(--color-primary-100);
      &:hover {
        color: var(--color-primary-400);
      }
    }

    & .vertical-divider {
      background: var(--color-primary-700);
    }
  }
}
</style>
