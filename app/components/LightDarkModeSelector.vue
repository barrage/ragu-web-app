<script lang="ts" setup>
import MoonIcon from '~/assets/icons/svg/moon.svg'
import SunIcon from '~/assets/icons/svg/sun.svg'

const themeStore = useThemeStore()
const toggleDark = () => {
  (themeStore.isDarkMode = !themeStore.isDarkMode)
}

const isDarkMode = useDark()
</script>

<template>
  <el-button
    class="theme-switch-button"
    size="small"
    @click="toggleDark()"
  >
    <template v-if="isDarkMode">
      <MoonIcon
        size="20"
        color="currentColor"
      />
    </template>
    <template v-else>
      <SunIcon
        size="20"
        color="currentColor"
      />
    </template>
  </el-button>
</template>

<style lang="scss" scoped>
.theme-switch-button {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-primary-800);
  &:hover {
    background: var(--color-primary-100);
  }
}

.dark {
  & .theme-switch-button {
    color: var(--color-primary-100);
    &:hover {
      color: var(--color-primary-200);
      background: var(--color-primary-600);
    }
  }
}
</style>
