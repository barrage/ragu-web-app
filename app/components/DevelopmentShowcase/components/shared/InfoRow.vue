<script lang="ts" setup>
/* PROPS & EMITS */
withDefaults(
  defineProps<{
    name?: string | null
    description?: string | null
  }>(),
  {
    name: null,
    description: null,
  },
)
</script>

<template>
  <div class="info-showcase">
    <p class="info-name">
      {{ name }}
    </p>
    <span class="info-description">
      {{ description }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.info-showcase {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-bottom: 0.5714286em;
  padding-top: 0.5714286em;
  border-top: 1px solid var(--color-gray-200);

  & .info-name {
    padding: 3px 8px;
    border-radius: 5px;
    background: var(--color-gray-100);
    color: var(--color-green-500);
  }
  & .info-description {
    color: var(--color-gray-600);
  }
}
.dark {
  & .info-showcase {
    border-top: 1px solid var(--color-gray-700);
    & .info-name {
      color: var(--color-green-500);
      background: var(--color-darkmode-0);
    }
    & .info-description {
      color: var(--color-gray-400);
    }
  }
}
</style>
