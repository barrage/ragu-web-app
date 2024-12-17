<script lang="ts" setup>
const props = defineProps<{
  skeletonCount: number
}>()
</script>

<template>
  <div class="skeleton-users-list-container">
    <template
      v-for="index in props.skeletonCount"
      :key="index"
    >
      <GlobalCardLoader
        v-motion-fade
        :delay="((index + 1) * 50)"
        :number-of-label-descriptions="3"
        :number-of-actions="4"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.skeleton-users-list-container {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
}
</style>
