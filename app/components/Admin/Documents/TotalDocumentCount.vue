<script setup lang="ts">
import DocumentDatabaseIcon from '~/assets/icons/svg/document-database.svg'

const props = defineProps<{ total: number }>()
</script>

<template>
  <ElTooltip
    content="Displays the total number of documents,"
    :show-after="1000"
    :enterable="false"
    placement="top"
  >
    <div class="total-document-count">
      <h6>Total</h6>
      <div class="total-count-info">
        <h4> {{ props.total }}</h4>
        <DocumentDatabaseIcon size="32" />
      </div>
    </div>
  </ElTooltip>
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
