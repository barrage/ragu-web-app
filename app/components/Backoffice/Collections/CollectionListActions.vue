<script lang="ts" setup>
import type { SortingValues } from '~/types/sort'
import FilterIcon from '~/assets/icons/svg/filter.svg'

const props = defineProps<{
  selectedSortBy: string
  selectedSortDirection: 'asc' | 'desc'
  /*  filterForm: CollectionListFilterForm */
  selectedSearch: string | null
}>()

const emits = defineEmits<{
  (event: 'sortChange', sort: SortingValues): void
  /*   (event: 'filterApplied', filter: CollectionListFilterForm): void */
  (event: 'searchChange', search: string): void
}>()

const { t } = useI18n()

const sortOptions = computed(() => [
  { name: t('collections.labels.created_at'), value: 'created_at' },
  { name: t('collections.labels.name'), value: 'name' },
  { name: t('collections.labels.updated_at'), value: 'updated_at' },
])

// FUNCTIONS

const updateSort = (sortingValues: SortingValues) => {
  emits('sortChange', sortingValues)
}

/* Filter */
const collectionsListFilterOpen = ref(false)

const toggleFilterDrawer = () => {
  collectionsListFilterOpen.value = !collectionsListFilterOpen.value
}

/* const updateFilter = (filter: CollectionListFilterForm) => {
  emits('filterApplied', filter)
} */

/* Search */
const updateSearch = (search: string) => {
  emits('searchChange', search)
}
</script>

<template>
  <div class="collection-actions-container">
    <p class="collection-list-title">
      {{ $t('collections.all_collections') }}
    </p>
    <div class="actions-wrapper">
      <SearchInput
        :placeholder="t('collections.placeholders.search')"
        :initial-value="props.selectedSearch"
        @update-search="updateSearch"
      />

      <SortSelect
        :initial-sort-by="props.selectedSortBy"
        :initial-sort-direction="props.selectedSortDirection"
        data-testid="bo-collections-list-sort"
        :options="sortOptions"
        @sort-updated="updateSort"
      />

      <el-button
        size="small"
        data-testid="open-filter-button"
        @click="toggleFilterDrawer"
      >
        <FilterIcon />  Filter
      </el-button>
    </div>
  </div>
  <el-drawer
    v-model="collectionsListFilterOpen"
    direction="rtl"
    title="Filter"
  />
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
  & .actions-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 22px;
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
