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
  { name: t('agents.labels.status'), value: 'active' },
  { name: t('agents.labels.name'), value: 'name' },
  { name: t('agents.labels.created_at'), value: 'createdAt' },
  { name: t('agents.labels.updated_at'), value: 'updatedAt' },
])

const updateSort = (sortingValues: SortingValues) => {
  emits('sortChange', sortingValues)
}
</script>

<template>
  <div class="whatsapp-agents-actions-container">
    <p class="whatsapp-agents-list-title">
      {{ $t('agents.all_agents') }}
    </p>
    <div class="actions-wrapper">
      <SortSelect
        :initial-sort-by="props.selectedSortBy"
        :initial-sort-direction="props.selectedSortDirection"
        data-testid="bo-agents-list-sort"
        :options="sortOptions"
        @sort-updated="updateSort"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.whatsapp-agents-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
  margin-bottom: 0.7rem;

  & .whatsapp-agents-list-title {
    font-size: var(--font-size-fluid-4);
    color: var(--color-primary-800);
  }
  & .actions-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 22px;
  }
}
.dark {
  .whatsapp-agents-actions-container {
    & .whatsapp-agents-list-title {
      color: var(--color-primary-100);
    }
  }
}
</style>
