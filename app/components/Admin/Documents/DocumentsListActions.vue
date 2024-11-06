<script lang="ts" setup>
import type { SortingValues } from '~/types/sort'

const emits = defineEmits<{
  (event: 'sortChange', sort: SortingValues): void
}>()

const { t } = useI18n()

const sortOptions = computed(() => [
  { name: t('documents.name'), value: 'name' },
  { name: t('documents.extension'), value: 'extension' },
])

const updateSort = (sortingValues: SortingValues) => {
  emits('sortChange', sortingValues)
}
</script>

<template>
  <div class="documents-actions-container">
    <SortSelect :options="sortOptions" @sort-updated="updateSort" />
  </div>
</template>

<style lang="scss" scoped>
.documents-actions-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1.5rem;
  margin-top: 1rem;
}
</style>
