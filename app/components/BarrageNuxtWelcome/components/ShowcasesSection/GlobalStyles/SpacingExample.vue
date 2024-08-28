<script setup>
defineProps({
  spacing: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="spacing-example">
    <div class="spacing-label">
      {{ spacing.variable }}
    </div>
    <span class="variable-value">{{ spacing.value }}</span>
    <div
      class="box-examples-wrapper"
      :style="{ '--spacing': `var(${spacing.variable})` }"
    >
      <div class="box" />
    </div>
  </div>
</template>

  <style lang="scss" scoped>
  .spacing-example {
  padding: 8px 8px 8px 16px;
  border: 1px solid var(--color-gray-200);
  border-radius: 4px;
  font-family: var(--font-primary);
  display: flex;
  align-items: center;
  gap: 22px;
  background: var(--color-gray-100);
}

.box-examples-wrapper {
  display: flex;
  flex: 1 0 calc(40% - 22px);
}

.box {
  width: var(--spacing);
  height: 30px;
  background: var(--color-lightmode-600);
  margin: auto;
}

.variable-value {
  font-size: var(--font-size-fluid-3);
  flex: 0 0 calc(40% - 22px);
}

.spacing-label {
  flex: 0 0 calc(20% - 22px);
}

.dark {
  & .spacing-example {
    background: var(--color-darkmode-100);
    border-color: var(--color-darkmode-500);
  }
  & .box {
    background: var(--color-lightmode-800);
  }
}
</style>
