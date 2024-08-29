<script lang="ts" setup>
import { useThemeStore } from '~/stores/theme'
import PalleteIcon from '~/assets/icons/svg/palette-theme.svg'
import LightDarkMode from '~/assets/icons/svg/light-dark-mode.svg'

const popperOptions = {
  placement: 'bottom-end',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 6],
      },
    },
    {
      name: 'flip',
      options: {
        fallbackPlacements: ['top-start'],
      },
    },
  ],
}
const isDark = useDark()

const toggleDark = useToggle(isDark)
const themeStore = useThemeStore()
const themeOptions = ref([
  {
    name: 'default',
    value: 'default',
  },

  {
    name: 'blue',
    value: 'blue',
  },
  {
    name: 'violet',
    value: 'violet',
  },
  {
    name: 'green',
    value: 'green',
  },
  {
    name: 'orange',
    value: 'orange',
  },
  {
    name: 'red',
    value: 'red',
  },
  {
    name: 'magenta',
    value: 'magenta',
  },
  {
    name: 'yellow',
    value: 'yellow',
  },
  {
    name: 'lime',
    value: 'lime',
  },
  {
    name: 'teal',
    value: 'teal',
  },
])
</script>

<template>
  <div style="display: flex;justify-content: flex-end;gap: 22px;">
    <ClientOnly>
      <el-dropdown trigger="click" :popper-options="popperOptions">
        <el-button class="theme-switch-button " size="small">
          <PalleteIcon />
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <!--   <el-dropdown-item
            v-for="theme in themeOptions"
            :key="theme.value"
            @click="themeStore.selectedColor = theme.value"
          >
            {{ theme.name }}
          </el-dropdown-item> -->
            <div class="colors-container">
              <template v-for="color in themeOptions" :key="color.name">
                <div :style="{ background: color.value === themeStore.selectedPrimaryColor ? `var(--color-primary-0)` : 'transparent', padding: '10px', borderRadius: '5px' }">
                  <div
                    class="color-circle"
                    :value="color.value"
                    :style="{ background: `var(--color-${color.value}-300)` }"
                    @click="themeStore.selectedPrimaryColor = color.value"
                  />
                </div>
              </template>
            </div>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </ClientOnly>
    <button class="theme-switch-button" @click="toggleDark()">
      <LightDarkMode size="24" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.colors-container {
  display: grid;
  padding: 8px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 1px;
}
.color-circle {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  cursor: pointer;
}
.theme-switch-button {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-primary-600);
}

.dark {
  & .theme-switch-button {
    &:hover {
    }
  }
}
</style>
