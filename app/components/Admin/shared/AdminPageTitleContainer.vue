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
      <h3 class="admin-page-title">
        {{ props.title }}
      </h3>
    </div>

    <p class="admin-page-description">
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
    }
  }

  & .admin-page-description {
    color: var(--color-primary-700);
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
}
</style>
