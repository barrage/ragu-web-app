<script lang="ts" setup>
import { useDropdownKeyboard } from '~/utils/useDropdownKeyboard'
import LocaleIcon from '~/assets/icons/svg/locale.svg'
import CheckIcon from '~/assets/icons/svg/check.svg'

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

const { setLocale, locales, locale } = useI18n()
const currentLocale = computed (() => locales.value.findIndex(lang => lang.code === locale.value))
const dropdownRef = ref(null)
const { toggleDropdown, handleDropdownVisibleChange } = useDropdownKeyboard(
  locales.value,
  currentLocale,
  'language-option',
  (selectedItem) => {
    setLocale(selectedItem.code)
    dropdownRef.value.handleClose()
  },
)
</script>

<template>
  <ClientOnly>
    <ElDropdown
      ref="dropdownRef"
      trigger="hover"
      :popper-options="popperOptions"
      @visible-change="handleDropdownVisibleChange"
    >
      <ElButton
        class="locale-switch-button"
        :class="{ 'locale-switch-button--login': loginLayout }"
        size="small"
        @keyup.enter="toggleDropdown"
        @keyup.space="toggleDropdown"
      >
        <LocaleIcon size="20px" />
      </ElButton>
      <template #dropdown>
        <ElDropdownMenu>
          <div class="lozalization-options-container">
            <template
              v-for="language in locales"
              :key="language.value"
            >
              <div
                class="language-option"
                tabindex="0"
                @click="setLocale(language.code)"
              >
                <span :class="{ selected: language.code === locale }">
                  {{ language.name }}
                </span>
                <CheckIcon v-if="language.code === locale" size="16px" />
              </div>
            </template>
          </div>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.lozalization-options-container {
  min-width: 138px;
}

.selected {
  font-weight: 700;
  color: var(--color-primary-800);
}
.locale-switch-button {
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
.language-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 10px;
  color: var(--color-primary-700);
  font-size: var(--font-size-fluid-2);

  &:hover {
    color: var(--color-primary-900);
    cursor: pointer;
  }
}

.dark {
  & .locale-switch-button {
    color: var(--color-primary-100);
    &:hover {
      color: var(--color-primary-200);
      background: var(--color-primary-600);
    }
    &--login {
      color: var(--color-primary-300);
      @include viewport-m {
        color: var(--color-primary-600);
      }
    }
  }
  & .language-option {
    color: var(--color-primary-100);
    &:hover {
      color: var(--color-primary-300);
    }
  }
  & .selected {
    color: var(--color-primary-0);
  }
}
</style>
