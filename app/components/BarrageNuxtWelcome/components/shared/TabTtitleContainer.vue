<script lang="ts" setup>
/* PROPS & EMITS */
withDefaults(
  defineProps<{
    title?: string | null
    file?: string | null
    redirectUrl?: string | null
  }>(),
  {
    title: null,
    file: null,
    redirectUrl: null,
  },
)
</script>

<template>
  <div class="tab-title-container">
    <h5>{{ title }}</h5>
    <FileRedirect :file="file" :redirect-url="redirectUrl" />
  </div>
</template>

<style lang="scss" scoped>
.tab-title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  margin-bottom: 22px;

  & h5 {
    font-weight: 600;
  }
}
</style>
