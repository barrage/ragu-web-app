<script lang="ts" setup>
import type { SortingValues } from '~/types/sort'
import FilterIcon from '~/assets/icons/svg/filter.svg'
import type { AgentVersionEvaluationMessagesFilter } from '~/types/agent'
import LikeDislikeIcon from '~/assets/icons/svg/like_dislike.svg'

const props = defineProps<{
  selectedSortBy: string
  selectedSortDirection: 'asc' | 'desc'
  filterForm: AgentVersionEvaluationMessagesFilter
}>()

const emits = defineEmits<{
  (event: 'sortChange', sort: SortingValues): void
  (event: 'filterApplied', filter: AgentVersionEvaluationMessagesFilter): void
}>()

const { t } = useI18n()

/* Sort */
const sortOptions = computed(() => [
  { name: t('agents.labels.created_at'), value: 'createdAt' },
  { name: t('agents.labels.updated_at'), value: 'updatedAt' },

])

const updateSort = (sortingValues: SortingValues) => {
  emits('sortChange', sortingValues)
}

/* Filter */
const agentFilterOpen = ref(false)

const toggleFilterDrawer = () => {
  agentFilterOpen.value = !agentFilterOpen.value
}

const updateFilter = (filter: AgentVersionEvaluationMessagesFilter) => {
  emits('filterApplied', filter)
}

const numberOfFiltersApplied = computed(() => {
  let count = 0

  if (props.filterForm.evaluation !== null && props.filterForm.evaluation !== undefined) {
    count += 1
  }

  if (props.filterForm.agentVersion !== null && props.filterForm.agentVersion !== undefined) {
    count += 1
  }

  return count
})
</script>

<template>
  <div class="agent-evaluations-list-actions-container">
    <p class="agent-evaluations-list-title">
      <LikeDislikeIcon size="38px" />
      {{ t('agents.titles.evaluations') }}
    </p>
    <div class="actions-wrapper">
      <SortSelect
        :initial-sort-by="props.selectedSortBy"
        :initial-sort-direction="props.selectedSortDirection"
        data-testid="bo-agent-evaluation-list-sort"
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
  <AgentsEvaluationFilterDrawer
    v-model="agentFilterOpen"
    :filter="filterForm"
    @filter-applied="updateFilter"
  />
</template>

<style lang="scss" scoped>
.agent-evaluations-list-actions-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding-inline: 1rem;
  margin-bottom: 0.7rem;
  margin-top: 18px;

  & .agent-evaluations-list-title {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-fluid-5);
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
  .agent-evaluations-list-actions-container {
    & .agent-evaluations-list-title {
      color: var(--color-primary-100);
    }
  }
}
</style>
