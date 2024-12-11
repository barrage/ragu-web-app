<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import CloudErrorIcon from '~/assets/icons/svg/cloud-error.svg'
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'

interface Props {
  title: string
  description: string
  error: any
}
defineProps<Props>()
const { t } = useI18n()
</script>

<template>
  <div class="error-display-container grid">
    <div class="error-info-container">
      <h1 class="error-status">
        {{ error }}
      </h1>

      <h1 class="title">
        {{ title }}
      </h1>
      <p class="text">
        {{ description }}
      </p>

      <LlmLink
        to="/"
        type="button"
      >
        <ArrowLeftIcon size="20px" />  {{ t('error.go_back') }}
      </LlmLink>
    </div>

    <div class="error-icon-wrapper">
      <CloudErrorIcon size="280px" class="error-icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-display-container {
  grid-column: span 12;
  & .error-info-container {
    grid-column: span 6;
    display: flex;
    margin: auto;
    flex-direction: column;
    gap: 22px;

    & .error-status {
      font-size: var(--font-size-fluid-10);
      line-height: normal;
      color: var(--color-primary-600);
      font-weight: var(--font-weight-bold);
    }

    & .title {
      font-size: var(--font-size-fluid-8);
      line-height: normal;
      color: var(--color-primary-800);
      font-weight: var(--font-weight-semibold);
    }
  }
  & .error-icon-wrapper {
    grid-column: span 6;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    & .error-icon {
      color: var(--color-red-900);
    }
  }
}

.dark {
  .error-display-container {
    & .error-info-container {
      & .error-status {
        color: var(--color-primary-200);
      }

      & .title {
        color: var(--color-primary-100);
      }
    }
    & .error-icon-wrapper {
      & .error-icon {
        color: var(--color-red-300);
      }
    }
  }
}
</style>
