<script lang="ts" setup>
import LocaleIcon from '~/assets/icons/svg/locale.svg'
import CheckIcon from '~/assets/icons/svg/check.svg'

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
</script>

<template>
  <ClientOnly>
    <el-dropdown trigger="hover" :popper-options="popperOptions">
      <el-button class="locale-switch-button " size="small">
        <LocaleIcon size="20" />
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <div class="lozalization-options-container">
            <template
              v-for="language in locales"
              :key="language.value"
            >
              <div class="language-option" @click="setLocale(language.code)">
                <span :class="{ selected: language.code === locale }">{{ language.name }}</span>  <CheckIcon v-if="language.code === locale" size="16" />
              </div>
            </template>
          </div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
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
}
.language-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
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
