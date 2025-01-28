<script lang="ts" setup>
import type { SortingValues } from '~/types/sort'
import FilterIcon from '~/assets/icons/svg/filter.svg'
import type { ChatListFilterForm } from '~/types/chat'

const props = defineProps<{
  selectedSortBy: string
  selectedSortDirection: 'asc' | 'desc'
  selectedSearch: string | null
  filterForm: ChatListFilterForm
}>()

const emits = defineEmits<{
  (event: 'sortChange', sort: SortingValues): void
  (event: 'searchChange', search: string): void
  (event: 'filterApplied', filter: ChatListFilterForm): void
}>()

const { t } = useI18n()

const sortOptions = computed(() => [
  { name: t('chat.admin.chat_card.updated_at'), value: 'updatedAt' },
  { name: t('chat.admin.chat_card.created_at'), value: 'createdAt' },
  { name: t('chat.admin.chat_card.title'), value: 'title' },
])

const updateSort = (sortingValues: SortingValues) => {
  emits('sortChange', sortingValues)
}

/* Filter */
const chatListFilterOpen = ref(false)

const toggleFilterDrawer = () => {
  chatListFilterOpen.value = !chatListFilterOpen.value
}

const updateFilter = (filter: ChatListFilterForm) => {
  emits('filterApplied', filter)
}
/* Search */
const updateSearch = (search: string) => {
  emits('searchChange', search)
}

/* Computed */
const numberOfFiltersApplied = computed(() =>
  Object.values(props.filterForm).filter(value => value !== null && value !== undefined).length,
)
</script>

<template>
  <div class="chats-actions-container">
    <p class="chats-list-title">
      {{ $t('chat.all_chats') }}
    </p>
    <div
      v-motion-pop
      :delay="300"
      class="actions-wrapper"
    >
      <SearchInput
        :placeholder="t('chat.placeholders.search_chats')"
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
  <ChatListAdminFilterDrawer
    v-model="chatListFilterOpen"
    :filter="filterForm"
    @filter-applied="updateFilter"
  />
</template>

<style lang="scss" scoped>
.chats-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.7rem;

  & .chats-list-title {
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
  .chats-actions-container {
    & .chats-list-title {
      color: var(--color-primary-100);
    }
  }
}
</style>
