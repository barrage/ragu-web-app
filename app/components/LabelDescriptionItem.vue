<script lang="ts" setup>
const props = defineProps<{
  label: string | undefined
  description: string | undefined
}>()
</script>

<template>
  <div class="label-description-item-container">
    <span class="label">
      {{ props.label }}
    </span>
    <span class="description">
      {{ props.description }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.label-description-item-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & .label {
    font-size: var(--font-size-fluid-2);
    line-height: normal;
    color: var(--color-primary-400);
  }
  & .description {
    font-size: var(--font-size-fluid-3);
    line-height: normal;
    color: var(--color-primary-700);
  }
}

.dark {
  & .label {
    color: var(--color-primary-400);
  }
  & .description {
    color: var(--color-primary-100);
  }
}
</style>
