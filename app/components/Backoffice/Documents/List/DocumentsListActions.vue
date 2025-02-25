<script lang="ts" setup>
import type { SortingValues } from '~/types/sort'
import FilterIcon from '~/assets/icons/svg/filter.svg'
import type { DocumentListFilterForm } from '~/types/document'

const props = defineProps<{
  selectedSortBy: string
  selectedSortDirection: 'asc' | 'desc'
  filterForm: DocumentListFilterForm
  selectedSearch: string | null

}>()

const emits = defineEmits<{
  (event: 'sortChange', sort: SortingValues): void
  (event: 'filterApplied', filter: DocumentListFilterForm): void
  (event: 'searchChange', search: string): void

}>()

const { t } = useI18n()

const updateFilter = (filter: DocumentListFilterForm) => {
  emits('filterApplied', filter)
}

const sortOptions = computed(() => [
  { name: t('documents.name'), value: 'name' },
  { name: t('documents.extension'), value: 'ext' },
])

const updateSort = (sortingValues: SortingValues) => {
  emits('sortChange', sortingValues)
}

/* Filter */
const documentsFilterOpen = ref(false)

const toggleFilterDrawer = () => {
  documentsFilterOpen.value = !documentsFilterOpen.value
}

const numberOfFiltersApplied = computed(() => {
  let count = 0

  if (props.filterForm.ready !== null && props.filterForm.ready !== undefined) {
    count += 1
  }

  return count
})

/* Search */
const updateSearch = (search: string) => {
  emits('searchChange', search)
}
</script>

<template>
  <div class="documents-actions-container">
    <p class="documents-list-title">
      {{ $t('documents.all_documents') }}
    </p>
    <div
      v-motion-pop
      :delay="300"
      class="actions-wrapper"
    >
      <SearchInput
        :placeholder="t('documents.placeholders.search_documents')"
        :initial-value="props.selectedSearch"
        @update-search="updateSearch"
      />
      <SortSelect
        :initial-sort-by="props.selectedSortBy"
        :initial-sort-direction="props.selectedSortDirection"
        :options="sortOptions"
        @sort-updated="updateSort"
      />
      <el-badge
        :value="numberOfFiltersApplied"
        :max="10"
        :show-zero="false"
        type="info"
      >
        <el-button
          size="small"
          data-testid="open-filter-button"
          @click="toggleFilterDrawer"
        >
          <FilterIcon />  Filter
        </el-button>
      </el-badge>
    </div>
  </div>
  <DocumentListFilterDrawer
    v-model="documentsFilterOpen"
    :filter="filterForm"
    @filter-applied="updateFilter"
  />
</template>

<style lang="scss" scoped>
.documents-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  margin-top: 1rem;

  & .documents-list-title {
    font-size: var(--font-size-fluid-4);
    color: var(--color-primary-800);
    margin-left: 1.4rem;
  }
  & .actions-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 22px;
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
