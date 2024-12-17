<script lang="ts" setup>
const props = defineProps<{
  skeletonCount: number
  type: 'user' | 'chat' | 'agent' | 'collection' | 'document'
}>()

const skeletonCardData = computed(() => {
  if (props.type === 'user') {
    return {
      numberOfLabelDescriptions: 3,
      numberOfActions: 4,
      hasProfileDescription: true,
    }
  }
  if (props.type === 'chat') {
    return {
      numberOfLabelDescriptions: 3,
      numberOfActions: 3,
      hasProfileDescription: false,
    }
  }
  if (props.type === 'agent') {
    return {
      numberOfLabelDescriptions: 4,
      numberOfActions: 3,
      hasProfileDescription: true,
    }
  }
  if (props.type === 'collection') {
    return {
      numberOfLabelDescriptions: 3,
      numberOfActions: 2,
      hasProfileDescription: true,
    }
  }
  if (props.type === 'document') {
    return {
      numberOfLabelDescriptions: 1,
      numberOfActions: 2,
      hasProfileDescription: true,
    }
  }
  else {
    return {
      numberOfLabelDescriptions: 3,
      numberOfActions: 3,
      hasProfileDescription: true,
    }
  }
})
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
        :number-of-label-descriptions="skeletonCardData?.numberOfLabelDescriptions"
        :number-of-actions="skeletonCardData?.numberOfActions"
        :has-profile-description="skeletonCardData?.hasProfileDescription"
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
