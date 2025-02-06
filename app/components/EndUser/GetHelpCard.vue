<script setup lang="ts">
defineProps<{
  icon: any
  title: string
  description: string
}>()
</script>

<template>
  <div v-motion-fade class="get-help-card">
    <component
      :is="icon"
      class="card-icon"
      size="48px"
    />
    <h3 class="card-title">
      {{ title }}
    </h3>
    <p class="card-description">
      {{ description }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.get-help-card {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;

  .card-icon {
    color: var(--color-primary-600);
    border: 0.0625rem solid var(--color-primary-400);
    border-radius: 0.625rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
    margin-bottom: 1rem;
    padding: 0.5rem;
  }

  .card-title {
    color: var(--color-primary-900);
    margin-bottom: 0.5rem;
    font-size: var(--font-size-fluid-4);
  }

  .card-description {
    color: var(--color-primary-700);
    font-size: var(--font-size-fluid-2);
    line-height: 1.5;
  }
}

html.dark {
  .get-help-card {
    .card-icon {
      color: var(--color-primary-300);
      border: 0.0625rem solid var(--color-primary-600);
      box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
    }

    .card-title {
      color: var(--color-primary-0);
    }

    .card-description {
      color: var(--color-primary-100);
    }
  }
}
</style>
