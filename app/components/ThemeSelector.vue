<script lang="ts" setup>
import { useThemeStore } from '~/stores/theme'
import PalleteIcon from '~/assets/icons/svg/palette-theme.svg'

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
  <ClientOnly>
    <el-dropdown trigger="hover" :popper-options="popperOptions">
      <el-button class="theme-switch-button " size="small">
        <PalleteIcon size="20" />
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
              <div
                class="color-section"
                :class="{ selected: color.value === themeStore.selectedPrimaryColor }"
                @click="themeStore.selectedPrimaryColor = color.value"
              >
                <div
                  class="color-circle"
                  :value="color.value"
                  :style="{
                    background: color.value === 'default'
                      ? 'linear-gradient(90deg, black 50%, white 50%)'
                      : `var(--color-${color.value}-300)`,

                  }"
                />
              </div>
            </template>
          </div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.colors-container {
  display: grid;
  padding: 8px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 1px;
}

.color-section {
  transition: all 0.5s ease-out;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &.selected {
    background: var(--color-primary-0);
  }

  &:hover {
    background: var(--color-primary-0);
  }
}
.color-circle {
  width: 14px;
  height: 14px;
  border-radius: 50%;
}
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
      color: var(--color-primary-0);
      background: var(--color-primary-600);
    }
  }
  & .color-section {
    &.selected {
      background: var(--color-primary-600);
    }

    &:hover {
      background: var(--color-primary-500);
    }
  }
}
</style>
