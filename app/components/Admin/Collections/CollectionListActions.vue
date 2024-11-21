<script lang="ts" setup>
import type { SortingValues } from '~/types/sort'

const emits = defineEmits<{
  (event: 'sortChange', sort: SortingValues): void
}>()

const { t } = useI18n()

const sortOptions = computed(() => [
  { name: t('collections.labels.created_at'), value: 'created_at' },
  { name: t('collections.labels.name'), value: 'name' },
  { name: t('collections.labels.updated_at'), value: 'updated_at' },
])

const updateSort = (sortingValues: SortingValues) => {
  emits('sortChange', sortingValues)
}
</script>

<template>
  <div class="collection-actions-container">
    <p class="collection-list-title">
      {{ $t('collections.all_collections') }}
    </p>
    <div class="actions-wrapper">
      <SortSelect :options="sortOptions" @sort-updated="updateSort" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collection-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
  margin-bottom: 0.7rem;

  & .collection-list-title {
    font-size: var(--font-size-fluid-4);
    color: var(--color-primary-800);
  }
}
.dark {
  .collection-actions-container {
    & .collection-list-title {
      color: var(--color-primary-100);
    }
  }
}
</style>
