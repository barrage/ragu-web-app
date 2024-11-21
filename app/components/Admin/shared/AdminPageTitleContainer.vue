<script lang="ts" setup>
const props = defineProps<{
  title: string | null | undefined
  description: string | null | undefined
}>()
</script>

<template>
  <div class="admin-page-title-container">
    <div class="title-icon-wrapper">
      <div v-if="$slots.icon" class="title-icon">
        <slot name="icon" />
      </div>
      <h1 class="admin-page-title">
        {{ props.title }}
      </h1>
    </div>

    <p class="admin-page-description typing-effect">
      {{ props.description }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.admin-page-title-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & .title-icon-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;

    & .title-icon {
      color: var(--color-primary-800);
    }

    & .admin-page-title {
      font-weight: 600;
      color: var(--color-primary-800);
      font-size: var(--font-size-fluid-8);
    }
  }

  & .admin-page-description {
    color: var(--color-primary-700);
  }
}

.typing-effect {
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid var(--color-primary-900);
  display: inline-block;
  max-width: max-content;
  animation:
    typing 1s steps(30, end) forwards,
    blink 0.1s step-end infinite;
}
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
    border: none;
  }
}

.dark {
  & .admin-page-title-container {
    & .title-icon {
      color: var(--color-primary-0);
    }

    & .admin-page-title {
      color: var(--color-primary-0);
    }
    & .admin-page-description {
      color: var(--color-primary-200);
    }
  }
  & .typing-effect {
    border-right: 2px solid var(--color-primary-100);
  }
}
</style>
