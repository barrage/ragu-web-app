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
        <ElDropdownMenu class="dropdown-menu">
          <ElDropdownItem
            v-for="language in locales"
            :key="language.value"
            @click="setLocale(language.code)"
          >
            <div
              class="language-option"
              tabindex="0"
            >
              <p :class="{ selected: language.code === locale }">
                {{ language.name }}
              </p>
              <CheckIcon
                v-if="language.code === locale"
                class="selected"
                size="16px"
              />
            </div>
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.dropdown-menu {
  min-width: 138px;
  padding: 8px 12px;

  &:deep(.barrage-dropdown-menu__item) {
    border-radius: 0.5rem;
    padding: 2px 8px;
  }
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
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  color: var(--color-primary-1000);

  & p {
    font-size: var(--font-size-fluid-2);
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
    background-color: transparent;
    color: var(--color-primary-0);
  }
  & .selected {
    color: var(--color-primary-0);
  }
}
</style>
