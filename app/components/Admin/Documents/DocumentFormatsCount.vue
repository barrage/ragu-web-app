<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{ formats: { value: number, name: string }[] }>()

const customTitle = computed(() => {
  return props.formats.length.toString()
})
</script>

<template>
  <ElTooltip
    content="Shows the distribution of different document formats in a pie chart"
    :show-after="3000"
    :enterable="false"
    placement="top"
  >
    <div class="document-formats-count">
      <h6>Formats</h6>

      <PieChart
        :data="formats"
        series-name="Format"
        :title-text="customTitle"
        title-subtext="Specific formats"
      />
    </div>
  </ElTooltip>
</template>

  <style lang="scss" scoped>
  .document-formats-count {
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
