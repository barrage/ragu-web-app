<script lang="ts" setup>
import type { SortingValues } from '~/types/sort'
import FilterIcon from '~/assets/icons/svg/filter.svg'
import type { UsersListFilterForm } from '~/types/users'

const props = defineProps<{
  selectedSortBy: string
  selectedSortDirection: 'asc' | 'desc'
  filterForm: UsersListFilterForm
  selectedSearch: string | null
}>()

const emits = defineEmits<{
  (event: 'sortChange', sort: SortingValues): void
  (event: 'filterApplied', filter: UsersListFilterForm): void
  (event: 'searchChange', search: string): void
}>()

const { t } = useI18n()

const sortOptions = computed(() => [
  { name: t('users.user_card.username'), value: 'fullName' },
  { name: t('users.user_card.created_at'), value: 'createdAt' },
  { name: t('users.user_card.status'), value: 'active' },
  { name: t('users.user_card.email'), value: 'email' },
])

const updateSort = (sortingValues: SortingValues) => {
  emits('sortChange', sortingValues)
}
/* Filter */
const usersFilterOpen = ref(false)

const toggleFilterDrawer = () => {
  usersFilterOpen.value = !usersFilterOpen.value
}

const updateFilter = (filter: UsersListFilterForm) => {
  emits('filterApplied', filter)
}

/* Search */
const updateSearch = (search: string) => {
  emits('searchChange', search)
}

const numberOfFiltersApplied = computed(() =>
  Object.values(props.filterForm).filter(value => value !== null && value !== undefined).length,
)
</script>

<template>
  <div class="users-list-actions-container">
    <p class="user-list-title">
      {{ $t('users.all_users') }}
    </p>

    <div
      v-motion-pop
      :delay="300"
      class="actions-wrapper"
    >
      <SearchInput
        :placeholder="t('users.placeholders.search_users')"
        :initial-value="props.selectedSearch"
        @update-search="updateSearch"
      />

      <SortSelect
        :initial-sort-by="props.selectedSortBy"
        :initial-sort-direction="props.selectedSortDirection"
        data-testid="bo-users-list-sort"
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
  <UsersListFilterDrawer
    v-model="usersFilterOpen"
    :filter="filterForm"
    @filter-applied="updateFilter"
  />
</template>

<style lang="scss" scoped>
.users-list-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.7rem;

  & .user-list-title {
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
  .users-list-actions-container {
    & .user-list-title {
      color: var(--color-primary-100);
    }
  }
}
</style>
