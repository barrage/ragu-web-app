<script lang="ts" setup>
import { useThemeStore } from '~/stores/theme'
import PalleteIcon from '~/assets/icons/svg/palette-theme.svg'

defineProps<{
  loginLayout?: boolean
}>()

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
    name: 'sage',
    value: 'sage',
  },
  {
    name: 'teal',
    value: 'teal',
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
    name: 'lime',
    value: 'lime',
  },
  {
    name: 'green',
    value: 'green',
  },
  {
    name: 'yellow',
    value: 'yellow',
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
    name: 'brown',
    value: 'brown',
  },
])

// Keyboard friendly logic

const dropdownRef = ref(null)
const focusedIndex = ref(-1)
const isDropdownOpen = ref(false)

function addKeyEventListener() {
  document.addEventListener('keydown', handleKeyDown)
}

function removeKeyEventListener() {
  document.removeEventListener('keydown', handleKeyDown)
}

function handleKeyDown(event: KeyboardEvent) {
  const itemCount = themeOptions.value.length

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    focusedIndex.value = (focusedIndex.value + 1) % itemCount
  }
  else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    focusedIndex.value = (focusedIndex.value - 1 + itemCount) % itemCount
  }
  else if (event.key === 'ArrowDown') {
    event.preventDefault()
    focusedIndex.value = (focusedIndex.value + 4) % itemCount
  }
  else if (event.key === 'ArrowUp') {
    event.preventDefault()
    focusedIndex.value = (focusedIndex.value - 4 + itemCount) % itemCount
  }
  else if ((event.key === 'Enter' || event.key === ' ') && isDropdownOpen.value) {
    event.preventDefault()
    if (focusedIndex.value >= 0) {
      themeStore.selectedPrimaryColor = themeOptions.value[focusedIndex.value].value
      dropdownRef.value.handleClose()
    }
  }
}

function toggleDropdown(open: boolean) {
  isDropdownOpen.value = open
  if (!open) {
    focusedIndex.value = -1
    removeKeyEventListener()
  }
  else {
    addKeyEventListener()
    focusedIndex.value = themeOptions.value.findIndex(option => option.value === themeStore.selectedPrimaryColor)
  }
}
</script>

<template>
  <ClientOnly>
    <el-dropdown
      ref="dropdownRef"
      trigger="hover"
      :popper-options="popperOptions"
      @visible-change="toggleDropdown"
    >
      <el-button
        class="theme-switch-button"
        :class="{ 'theme-switch-button--login': loginLayout }"
        size="small"
        @focus="isDropdownOpen.value && (focusedIndex.value = 0)"
      >
        <PalleteIcon size="20px" />
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <div class="colors-container">
            <template v-for="(color, index) in themeOptions" :key="color.name">
              <div
                class="color-section"
                :class="{ selected: color.value === themeStore.selectedPrimaryColor, focused: index === focusedIndex }"
                tabindex="0"
                @click="themeStore.selectedPrimaryColor = color.value"
                @focus="focusedIndex = index"
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
    background: var(--color-primary-100);
  }

  &.focused {
    outline: 2px solid var(--color-primary-500);
  }

  &:hover {
    background: var(--color-primary-100);
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
  &--login {
    color: var(--color-primary-600);
    @include viewport-m {
      color: var(--color-primary-300);
    }
  }
}

.dark {
  & .theme-switch-button {
    color: var(--color-primary-100);
    &:hover {
      color: var(--color-primary-0);
      background: var(--color-primary-600);
    }
    &--login {
      color: var(--color-primary-300);
      @include viewport-m {
        color: var(--color-primary-600);
      }
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
