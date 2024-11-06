<script lang="ts" setup>
import type { SortingValues } from '~/types/sort'

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
  <div class="agents-actions-container">
    <SortSelect :options="sortOptions" @sort-updated="updateSort" />
  </div>
</template>

<style lang="scss" scoped>
  .agents-actions-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-inline: 1rem;
  margin-bottom: 1.5rem;
}
</style>
