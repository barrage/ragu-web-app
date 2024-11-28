<script lang="ts" setup>
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <div class="highlighted-text-area">
    <span class="highlighted-text"> <i>{{ props.text }}</i> </span>
  </div>
</template>

<style lang="scss" scoped>
.highlighted-text-area {
  background: var(--color-primary-0);
  width: fit-content;
  border: 1px solid var(--color-primary-200);
  border-radius: 8px;
  padding-inline: 12px;
  padding-block: 4px;

  & .highlighted-text {
    font-size: var(--font-size-fluid-2);
    color: var(--color-primary-900);
  }
}

.dark {
  .highlighted-text-area {
    background: var(--color-primary-900);
    border: 1px solid var(--color-primary-700);

    & .highlighted-text {
      color: var(--color-primary-0);
    }
  }
}
</style>
