<script lang="ts" setup>
/* PROPS & EMITS */
withDefaults(
  defineProps<{
    file?: string | null
    redirectUrl?: string | null
  }>(),
  {
    file: null,
    redirectUrl: null,
  },
)
</script>

<template>
  <template v-if="file && redirectUrl">
    <a
      v-if="file"
      class="file-container"
      :href="redirectUrl"
      target="_blank"
    >
      <code>{{ file }}</code>
    </a>
  </template>
  <template v-else-if="file">
    <div
      v-if="file"
      class="file-container"
    >
      <code>{{ file }}</code>
    </div>
  </template>
  <template v-else>
    <p />
  </template>
</template>

<style lang="scss" scoped>
.file-container {
  display: flex;
  align-items: center;
  border: 1.5px dashed var(--color-gray-600);
  background: var(--color-gray-100);
  padding: 6px 10px;
  border-radius: 5px;
  transition: all 0.2s;
  width: fit-content;

  &:hover {
    cursor: pointer;
    border-color: var(--color-green-500);
    background: var(--color-lightmode-0);
  }
}

.dark {
  & .file-container {
    border: 1px dashed var(--color-gray-600);
    background: var(--color-gray-700);
    &:hover {
      background: var(--color-gray-900);
      border-color: var(--color-green-500);
    }
  }
}
</style>
