<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  titleType: {
    type: String,
    default: 'p',
  },
  descriptionType: {
    type: String,
    default: 'span',
  },
})
</script>

<template>
  <div class="content-wrapper">
    <component :is="titleType" class="title">
      {{ title }}
    </component>
    <component
      :is="descriptionType"
      v-if="props.description"
      class="description"
    >
      {{ description }}
    </component>
  </div>
</template>

<style lang="scss" scoped>
  .content-wrapper {
  display: flex;
  flex-direction: column;
}

.title {
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-800);
  font-size: var(--font-size-fluid-4);
}

.description {
  color: var(--color-primary-700);
  margin-bottom: var(--spacing-fluid-5-xs);
  font-size: var(--font-size-fluid-2);
}
.dark {
  .title {
    color: var(--color-primary-0);
  }

  .description {
    color: var(--color-primary-200);
  }
}
</style>
