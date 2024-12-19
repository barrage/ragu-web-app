<script lang="ts" setup>
import type { SortingValues } from '~/types/sort'

const props = defineProps<{
  selectedSortBy: string
  selectedSortDirection: 'asc' | 'desc'
}>()

const emits = defineEmits<{
  (event: 'sortChange', sort: SortingValues): void
}>()

const { t } = useI18n()

const sortOptions = computed(() => [
  { name: t('documents.name'), value: 'name' },
  { name: t('documents.extension'), value: 'ext' },
])

const updateSort = (sortingValues: SortingValues) => {
  emits('sortChange', sortingValues)
}
</script>

<template>
  <div class="documents-actions-container">
    <p class="documents-list-title">
      {{ $t('documents.title') }}
    </p>
    <div
      v-motion-pop
      :delay="300"
      class="actions-wrapper"
    >
      <SortSelect
        :initial-sort-by="props.selectedSortBy"
        :initial-sort-direction="props.selectedSortDirection"
        :options="sortOptions"
        @sort-updated="updateSort"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.documents-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 1rem;

  & .documents-list-title {
    font-size: var(--font-size-fluid-4);
    color: var(--color-primary-800);
    margin-left: 1.4rem;
  }
}
.dark {
  .documents-actions-container {
    & .documents-list-title {
      color: var(--color-primary-100);
    }
  }
}
</style>
