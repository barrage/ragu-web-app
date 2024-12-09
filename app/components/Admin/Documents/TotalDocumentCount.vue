<script setup lang="ts">
import DocumentDatabaseIcon from '~/assets/icons/svg/document-database.svg'

const props = defineProps<{ total: number }>()

const { t } = useI18n()
</script>

<template>
  <LlmTooltip
    :content="$t('documents.tooltip.display_total')"
    delayed
  >
    <div class="total-document-count">
      <h6>{{ t('documents.total') }}</h6>
      <div class="total-count-info">
        <h4> {{ props.total }}</h4>
        <DocumentDatabaseIcon size="32px" />
      </div>
    </div>
  </LlmTooltip>
</template>

  <style lang="scss" scoped>
  .total-document-count {
  padding: 10px;
  background: var(--color-primary-100);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 12px 0px var(--color-primary-100);
  border: 0.5px solid var(--color-primary-200);

  & h6 {
    color: var(--color-primary-800);
    font-weight: var(--font-weight-semibold);
  }

  & .total-count-info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-bottom: 22px;
    color: var(--color-primary-900);
  }

  & h4 {
    color: var(--color-primary-900);
    font-weight: var(--font-weight-bold);
  }
}
.dark {
  & .total-document-count {
    background: var(--color-primary-800);
    box-shadow: 0px 4px 12px 0px var(--color-primary-800);
    border: 0.5px solid var(--color-primary-600);

    & h6 {
      color: var(--color-primary-100);
    }
    & .total-count-info {
      color: var(--color-primary-100);
    }
    & h4 {
      color: var(--color-primary-0);
    }
  }
}
</style>
