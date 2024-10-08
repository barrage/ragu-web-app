<script lang="ts" setup>

</script>

<template>
  <div class="loader-overlay">
    <LlmLoader vertical />
  </div>
</template>

<style lang="scss" scoped>
.loader-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-primary-300);

  &:deep(.loader) {
    svg {
      width: 80px !important;
      height: 80px !important;
    }
  }
}

.dark {
  & .loader-overlay {
    background: var(--color-primary-900);
  }
}
</style>
