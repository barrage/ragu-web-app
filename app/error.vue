<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { NuxtError } from '#app'

const props = defineProps({
  error: {
    type: Object as () => NuxtError,
    required: true,
  },
})

const { t } = useI18n()
const themeStore = useThemeStore()

onMounted(() => {
  themeStore.updateHtmlClass()
})

const displayErrorData = computed(() => {
  if (!props.error) {
    return {
      title: t('error.unexpected_title'),
      description: t('error.unexpected_description'),
      statusCode: null,
    }
  }

  const { statusCode } = props.error

  if (statusCode === 500) {
    return {
      title: t('error.title_500'),
      description: t('error.description_500'),
      statusCode,
    }
  }

  if (statusCode === 404) {
    return {
      title: t('error.title_404'),
      description: t('error.description_404'),
      statusCode,
    }
  }

  if (statusCode === 403) {
    return {
      title: t('error.title_403'),
      description: t('error.description_403'),
      statusCode,
    }
  }

  if (statusCode === 401) {
    return {
      title: t('error.title_401'),
      description: t('error.description_401'),
      statusCode,
    }
  }

  if (statusCode === 400) {
    return {
      title: t('error.title_400'),
      description: t('error.description_400'),
      statusCode,
    }
  }

  if (statusCode === 502) {
    return {
      title: t('error.title_502'),
      description: t('error.description_502'),
      statusCode,
    }
  }

  if (statusCode === 503) {
    return {
      title: t('error.title_503'),
      description: t('error.description_503'),
      statusCode,
    }
  }

  if (statusCode === 504) {
    return {
      title: t('error.title_504'),
      description: t('error.description_504'),
      statusCode,
    }
  }

  return {
    title: t('error.title_default'),
    description: t('error.description_default'),
    statusCode,
  }
})
</script>

<template>
  <section class="error-page grid">
    <div class="display-error-template">
      <ErrorDisplay
        :title="displayErrorData.title"
        :description="displayErrorData.description"
        :error="displayErrorData.statusCode"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.error-page {
  background: var(--color-primary-100);
  min-height: 100vh;
  padding-inline: var(--spacing-fluid-3-xl);

  & .display-error-template {
    grid-column: span 12;
    max-width: 2520px;
    width: 100%;
    margin: auto;
  }
}

.dark {
  .error-page {
    background: var(--color-primary-900);
  }
}
</style>
