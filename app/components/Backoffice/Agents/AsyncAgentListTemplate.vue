<script lang="ts" setup>
import { type LocationQuery, useRoute, useRouter } from 'vue-router'
import GlobalCardListLoader from '../shared/Skeletons/GlobalCardListLoader.vue'
import type { Sort, SortingValues } from '~/types/sort'
import type { Pagination } from '~/types/pagination'
import AccountWarningIcon from '~/assets/icons/svg/account-warning.svg'
import AddAgentIcon from '~/assets/icons/svg/person-add.svg'
import type { AgentListFilterForm } from '~/types/agent'

const { $api } = useNuxtApp()
const route = useRoute()
const router = useRouter()

const pagination = ref<Pagination>({
  currentPage: Number(route.query.page) || 1,
  pageSize: Number(route.query.pageSize) || 10,
  total: 0,
  disabled: false,
})

const sort = ref<Sort>({
  sortOrder: (route.query.dir as 'asc' | 'desc') || 'desc',
  sortBy: (route.query.sortBy as string) || 'active',
})

const filterForm = ref<AgentListFilterForm>({
  status: true,
})

const searchInput = ref<string | null>('')

const { execute: executeGetAgents, error: getAgentsError, status: getAgentsStatus, data: allAgentsData } = await useAsyncData(() =>
  $api.agent.GetAllAgents(pagination.value.currentPage, pagination.value.pageSize, sort.value.sortBy, sort.value.sortOrder, searchInput.value, filterForm.value.status), { lazy: true })

const updateRouteQuery = () => {
  const query: LocationQuery = {
    ...route.query,
    page: pagination.value.currentPage.toString(),
    pageSize: pagination.value.pageSize.toString(),
    sortBy: sort.value.sortBy,
    dir: sort.value.sortOrder,
  }

  if (searchInput.value) {
    query.name = searchInput.value
  }
  else {
    delete query.name
  }

  if (filterForm.value.status !== null) {
    query.active = filterForm.value.status.toString()
  }
  else {
    delete query.active
  }

  router.replace({ query })
}

const syncQueryValues = (newQuery: LocationQuery) => {
  pagination.value.currentPage = Number(newQuery.page) || 1
  pagination.value.pageSize = Number(newQuery.pageSize) || 10
  sort.value.sortOrder = (newQuery.dir as 'asc' | 'desc') || 'desc'
  sort.value.sortBy = (newQuery.sortBy as string) || 'active'
  searchInput.value = newQuery.name ? (newQuery.name as string) : null
  if (newQuery.active === 'true') {
    filterForm.value.status = true
  }
  else if (newQuery.active === 'false') {
    filterForm.value.status = false
  }
  else {
    filterForm.value.status = null
  }
}

const handlePageChange = async (page: number) => {
  pagination.value.currentPage = page
  updateRouteQuery()
  scrollToTop()
  await executeGetAgents()
}

const handleSortChange = async (sortingValues: SortingValues) => {
  sort.value.sortOrder = sortingValues.direction
  sort.value.sortBy = sortingValues.sortProperty.value
  updateRouteQuery()
  await executeGetAgents()
}

const handleFilterChange = async (filter: AgentListFilterForm) => {
  filterForm.value.status = filter.status
  updateRouteQuery()
  scrollToTop()
  await executeGetAgents()
}

const handleSearchChange = async (search: string) => {
  searchInput.value = search
  updateRouteQuery()
  scrollToTop()
  await executeGetAgents()
}

const delayedStatus = ref(getAgentsStatus.value)
const MIN_LOADING_TIME = 600

watch(
  getAgentsStatus,
  (newStatus) => {
    if (newStatus === 'pending') {
      delayedStatus.value = 'pending'
    }
    else {
      setTimeout(() => {
        delayedStatus.value = newStatus
      }, MIN_LOADING_TIME)
    }
  },
  { immediate: true },
)

errorHandler(getAgentsError)

const emptyAgentsData = computed(() => {
  const items = allAgentsData.value?.items
  return !Array.isArray(items) || items.length === 0
})

const agentsData = computed(() => allAgentsData.value?.items)

const shouldSyncQuery = ref(true)

watch(
  () => route.query,
  (newQuery) => {
    if (shouldSyncQuery.value) {
      syncQueryValues(newQuery)
    }
  },
)

watch(
  () => allAgentsData.value?.total,
  (newTotal) => {
    pagination.value.total = newTotal || 0
  },
  { immediate: true },
)

onMounted(async () => {
  shouldSyncQuery.value = true
  syncQueryValues(route.query)
  updateRouteQuery()
})

onBeforeUnmount(() => {
  shouldSyncQuery.value = false
})
</script>

<template>
  <AgentsListActions
    :selected-sort-by="sort.sortBy"
    :selected-sort-direction="sort.sortOrder"
    :filter-form="filterForm"
    :selected-search="searchInput"
    @sort-change="handleSortChange"
    @filter-applied="handleFilterChange"
    @search-change="handleSearchChange"
  />

  <GlobalCardListLoader
    v-if="(delayedStatus === 'pending') || (delayedStatus === 'idle')"
    type="agent"
    :skeleton-count="10"
  />
  <AgentsList
    v-else-if="!emptyAgentsData"
    :agents="agentsData"
    :pagination="pagination"
    @page-change="handlePageChange"
    @agent-activated="(handlePageChange(1))"
    @agent-deactivated="(handlePageChange(1))"
  />
  <EmptyState
    v-else
    :title="$t('agents.empty_state_title_all')"
    :description="$t('agents.empty_state_desc_all')"
  >
    <template #icon>
      <AccountWarningIcon size="44px" />
    </template>
    <template #cta>
      <LlmLink to="/admin/agents/create" type="button">
        <AddAgentIcon size="24px" />  {{ $t('agents.buttons.create') }}
      </LlmLink>
    </template>
  </EmptyState>

  <Pagination
    data-testid="bo-agents-list-pagination"
    :current-page="pagination.currentPage"
    :page-size="pagination.pageSize"
    :total="pagination.total"
    @page-change="handlePageChange"
  />
</template>
