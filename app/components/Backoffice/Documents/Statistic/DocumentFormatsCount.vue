<script setup lang="ts">
import type { AsyncDataRequestStatus } from '#app'
import FolderWarningIcon from '~/assets/icons/svg/folder-warning.svg'

const props = defineProps<{
  formats: { value: number, name: string }[]
  chartLoading: AsyncDataRequestStatus
}>()

const { t } = useI18n()

const customTitle = computed(() => {
  return props.formats.length.toString()
})
</script>

<template>
  <LlmTooltip
    :content="$t('documents.tooltip.document_formats')"
    delayed
  >
    <div class="document-formats-count">
      <h6>{{ t('documents.formats') }}</h6>

      <div v-if="chartLoading === 'pending'" class="loader-container">
        <MeetUpLoader />
      </div>
      <PieChart
        v-else-if="formats.length"
        :data="formats"
        :series-name="t('documents.series_name')"
        :title-text="customTitle"
        :title-subtext="t('documents.specific_formats')"
      />
      <div v-else class="recent-chat-list">
        <EmptyState
          :title="$t('documents.chart.title')"
          :description="$t('documents.chart.description')"
        >
          <template #icon>
            <FolderWarningIcon size="44px" />
          </template>
        </EmptyState>
      </div>
    </div>
  </LlmTooltip>
</template>

  <style lang="scss" scoped>
  .document-formats-count {
  height: 377px;
  background: var(--color-primary-100);
  padding: 16px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 4px 12px 0px var(--color-primary-100);
  border: 0.5px solid var(--color-primary-200);
  & h6 {
    color: var(--color-primary-800);
    font-weight: var(--font-weight-semibold);
  }
  ul {
    li {
      display: flex;
      align-items: center;
      font-size: var(--font-size-fluid-2);
      gap: 4px;
      margin-bottom: 6px;
      line-height: normal;
    }
  }

  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
.dark {
  & .document-formats-count {
    background: var(--color-primary-800);
    box-shadow: 0px 4px 12px 0px var(--color-primary-800);
    border: 0.5px solid var(--color-primary-600);

    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
