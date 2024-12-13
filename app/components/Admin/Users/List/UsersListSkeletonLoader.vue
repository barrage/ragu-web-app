<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  skeletonCount: number
}>()

const skeletonArray = computed(() => {
  return Array.from({ length: props.skeletonCount }, (_, i) => i)
})

const skeletonClasses = ref<string[]>([])

const applySkeletonClasses = () => {
  skeletonClasses.value = []
  skeletonArray.value.forEach((_, index) => {
    setTimeout(() => {
      skeletonClasses.value[index] = 'skeleton-item-visible'
    }, index * 350)
  })
}

const removeSkeletonClasses = () => {
  skeletonArray.value.forEach((_, index) => {
    setTimeout(() => {
      skeletonClasses.value[index] = 'skeleton-item-exit'
    }, index * 50)
  })
}

onMounted(applySkeletonClasses)

onUnmounted(() => {
  removeSkeletonClasses()
})
</script>

<template>
  <div class="skeleton-users-list-container">
    <div
      v-for="index in skeletonArray"
      :key="index"
      class="skeleton-list-item"
      :class="[skeletonClasses[index]]"
    >
      <div class="skeleton-avatar" />
      <div class="skeleton-text">
        <div class="skeleton-line skeleton-line-short" />
        <div class="skeleton-line" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.skeleton-users-list-container {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
}

.skeleton-list-item {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-primary-100);
  border-radius: 8px;
  opacity: 0;
  transform: translateY(20px);
  animation: pulse-light 1.5s infinite ease-in-out;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.skeleton-item-visible {
  opacity: 1;
  transform: translateY(0);
}

.skeleton-item-exit {
  opacity: 0;
  transform: translateY(-10px);
  animation: none;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.skeleton-avatar {
  width: 40px;
  height: 40px;
  background: var(--color-primary-300);
  border-radius: 50%;
}

.skeleton-text {
  flex-grow: 1;
}

.skeleton-line {
  height: 10px;
  background: var(--color-primary-300);
  margin-bottom: 0.5rem;
  border-radius: 4px;
}

.skeleton-line-short {
  width: 50%;
}

.skeleton-line:last-child {
  margin-bottom: 0;
}

.dark {
  .skeleton-list-item {
    background-color: var(--color-primary-900);
    animation: pulse-dark 1.5s infinite ease-in-out;
  }

  .skeleton-avatar {
    background: var(--color-primary-700);
  }

  .skeleton-line {
    background: var(--color-primary-700);
  }
}

@keyframes pulse-light {
  0% {
    background-color: var(--color-primary-100);
  }
  50% {
    background-color: var(--color-primary-200);
  }
  100% {
    background-color: var(--color-primary-100);
  }
}

@keyframes pulse-dark {
  0% {
    background-color: var(--color-primary-900);
  }
  50% {
    background-color: var(--color-primary-800);
  }
  100% {
    background-color: var(--color-primary-900);
  }
}
</style>
