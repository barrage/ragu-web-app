<script lang="ts" setup>
const props = withDefaults(defineProps<{
  numberOfLabelDescriptions?: number
  numberOfActions?: number
  hasProfileDescription?: boolean
  gridColumns?: number
  mergeButtons?: boolean
}>(), {
  numberOfLabelDescriptions: 3,
  numberOfActions: 3,
  hasProfileDescription: true,
  gridColumns: 6,
  mergeButtons: false,
})

const gridTemplateColumns = computed(() => `repeat(${props.gridColumns}, 1fr)`)
</script>

<template>
  <el-card
    class="skeleton-card"
  >
    <div class="skeleton-card-body" :style="{ gridTemplateColumns }">
      <div class="skeleton-profile">
        <div class="skeleton-avatar" />
        <div class="skeleton-name-wrapper">
          <div class="skeleton-line" />
          <div v-if="props.hasProfileDescription" class="skeleton-line skeleton-line-short" />
        </div>
      </div>
      <template v-for="n in props.numberOfLabelDescriptions" :key="n">
        <div class="skeleton-data-item">
          <div class="skeleton-line skeleton-line-short" />
          <div class="skeleton-line" />
        </div>
      </template>
      <div class="skeleton-actions">
        <template v-for="n in props.numberOfActions" :key="n">
          <div class="skeleton-button" :class="{ 'last-button': !props.mergeButtons && n === props.numberOfActions }" />
        </template>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.skeleton-card {
  padding-inline: 0.6rem;
  padding-block: 0.8rem;
  background-color: var(--color-primary-100);
  animation: pulse-light 1.5s infinite ease-in-out;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  & .skeleton-card-body {
    display: grid;
    column-gap: 16px;

    & .skeleton-profile {
      display: flex;
      gap: 8px;
      align-items: center;
      grid-column: span 6;

      @include viewport-ml {
        grid-column: span 2;
      }

      & .skeleton-name-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    }
    & .skeleton-data-item {
      grid-column: span 2;
      @include viewport-s {
        grid-column: span 1;
      }
      @include viewport-ml {
        grid-column: span 1;
      }
    }

    & .skeleton-actions {
      grid-column: span 6;
      justify-self: flex-end;
      display: flex;
      gap: 12px;
      @include viewport-s {
        grid-column: span 3;
      }
      @include viewport-ml {
        grid-column: span 1;
      }
    }
  }
}

.skeleton-avatar {
  min-width: 36px;
  min-height: 36px;
  background: var(--color-primary-300);
  border-radius: 50%;
}

.skeleton-line {
  height: 10px;
  background: var(--color-primary-300);
  margin-bottom: 0.5rem;
  border-radius: 4px;
  width: 50%;
}

.skeleton-line-short {
  width: 20%;
}

.skeleton-button {
  width: 38px;
  height: 38px;
  background: var(--color-primary-300);
  border-radius: var(--radius-4);

  &.last-button {
    margin-left: 2rem;
  }
}

.skeleton-line:last-child {
  margin-bottom: 0;
}

.dark {
  .skeleton-card {
    background-color: var(--color-primary-900);
    animation: pulse-dark 1.5s infinite ease-in-out;
  }

  .skeleton-avatar {
    background: var(--color-primary-700);
  }

  .skeleton-line {
    background: var(--color-primary-700);
  }
  .skeleton-button {
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
