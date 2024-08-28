<script lang="ts" setup>
import BarrageLogo from '~/assets/icons/svg/barrage-logo.svg'
import LightDarkMode from '~/assets/icons/svg/light-dark-mode.svg'

const isDark = useDark()

const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="welcome-header">
    <BarrageLogo width="140" height="100" />

    <button class="theme-switch-button" @click="toggleDark()">
      <LightDarkMode size="42" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.welcome-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.theme-switch-button {
  background: transparent;
  border: none;
  color: var(--color-gray-700);
  cursor: pointer;
  &:hover {
    color: var(--color-green-600);
  }
}

.dark {
  & .theme-switch-button {
    color: var(--color-gray-400);
    &:hover {
      color: var(--color-green-200);
    }
  }
}
</style>
