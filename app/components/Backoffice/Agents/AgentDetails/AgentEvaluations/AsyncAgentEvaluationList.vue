<script lang="ts" setup>
import { type LocationQuery, useRoute, useRouter } from 'vue-router'
import type { Sort, SortingValues } from '~/types/sort'
import type { Pagination } from '~/types/pagination'
import type { Agent, AgentCollection, AgentVersionEvaluationMessagesFilter, Configuration } from '~/types/agent'

const props = defineProps<{
  configurationAgentId: string
  agentId: string
  agent?: Agent
  agentCollections?: AgentCollection[]
}>()
defineEmits<{
  (event: 'refreshAgent'): void
  (event: 'rollbackAgentVersion', agent: Configuration): void
}>()

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
  sortOrder: (route.query.dir as 'asc' | 'desc') || 'asc',
  sortBy: (route.query.sortBy as string) || 'createdAt',
})

const filterForm = ref<AgentVersionEvaluationMessagesFilter>({
  evaluation: undefined,
  agentVersion: '',
})

const {
  execute: executeGetAgentVersionEvaluationMessages,
  error: getAgentVersionEvaluationMessagesError,
  status: getAgentVersionEvaluationMessagesStatus,
  data: agentVersionEvaluationsData,
} = await useAsyncData(() => $api.agent.GetAgentVersionEvaluationMessages(
  props.agentId,
  props.configurationAgentId,
  pagination.value.currentPage,
  pagination.value.pageSize,
  sort.value.sortBy,
  sort.value.sortOrder,
  filterForm.value?.evaluation,
), { lazy: true })

const updateRouteQuery = () => {
  router.replace({
    query: {
      ...route.query,
      page: pagination.value.currentPage.toString(),
      pageSize: pagination.value.pageSize.toString(),
      sortBy: sort.value.sortBy,
      dir: sort.value.sortOrder,
    },
  })
}

const syncQueryValues = (newQuery: LocationQuery) => {
  pagination.value.currentPage = Number(newQuery.page) || 1
  pagination.value.pageSize = Number(newQuery.pageSize) || 10
  sort.value.sortOrder = (newQuery.dir as 'asc' | 'desc') || 'asc'
  sort.value.sortBy = (newQuery.sortBy as string) || 'createdAt'
}

const handlePageChange = async (page: number) => {
  pagination.value.currentPage = page
  updateRouteQuery()
  scrollToTop()
  await executeGetAgentVersionEvaluationMessages()
}

const handleSortChange = async (sortingValues: SortingValues) => {
  sort.value.sortOrder = sortingValues.direction
  sort.value.sortBy = sortingValues.sortProperty.value
  updateRouteQuery()
  await executeGetAgentVersionEvaluationMessages()
}

const delayedStatus = ref(getAgentVersionEvaluationMessagesStatus.value)
const MIN_LOADING_TIME = 600

watch(
  getAgentVersionEvaluationMessagesStatus,
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

errorHandler(getAgentVersionEvaluationMessagesError)

const emptyAgentVersionEvaluationData = computed(() => {
  const items = agentVersionEvaluationsData.value?.items
  return !Array.isArray(items) || items.length === 0
})

const evaluationMessagesData = computed(() => agentVersionEvaluationsData.value?.items)

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
  () => agentVersionEvaluationsData.value?.total,
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

const handleFilterChange = async (filter: any) => {
  filterForm.value.evaluation = filter.evaluation
  filterForm.value.agentVersion = filter.agentVersion
  updateRouteQuery()
  scrollToTop()
  await executeGetAgentVersionEvaluationMessages()
}

const { error: getAgentVersionsError, data: agentVersionsData } = await useAsyncData(() => $api.agent.GetAgentVersions(props.agentId), { lazy: true })

errorHandler(getAgentVersionsError)

watch(
  () => agentVersionsData.value?.items,
  () => {
    useAgentStore().setBackofficeSelectedAgentDetailsVersions(agentVersionsData.value?.items)
  },
  { immediate: true },
)
</script>

<template>
  <AgentEvaluationListActions
    :selected-sort-by="sort.sortBy"
    :selected-sort-direction="sort.sortOrder"
    :filter-form="filterForm"
    @sort-change="handleSortChange"
    @filter-applied="handleFilterChange"
  />

  <GlobalCardListLoader
    v-if="(delayedStatus === 'pending') || (delayedStatus === 'idle')"
    type="user"
    :skeleton-count="10"
  />
  <template v-else-if="!emptyAgentVersionEvaluationData">
    <AgentEvaluationsList
      :evaluation-messages="evaluationMessagesData"
    />
    <Pagination
      data-testid="bo-users-list-pagination"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      @page-change="handlePageChange"
    />
  </template>

  <EmptyState
    v-else
  />
</template>
