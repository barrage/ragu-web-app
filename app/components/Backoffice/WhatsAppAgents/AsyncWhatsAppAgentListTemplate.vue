<script lang="ts" setup>
import { type LocationQuery, useRoute, useRouter } from 'vue-router'
import GlobalCardListLoader from '~/components/Backoffice/shared/Skeletons/GlobalCardListLoader.vue'
import type { Sort, SortingValues } from '~/types/sort'
import type { Pagination } from '~/types/pagination'
import AccountWarningIcon from '~/assets/icons/svg/account-warning.svg'
import AddAgentIcon from '~/assets/icons/svg/person-add.svg'

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

const { execute: executeGetAgents, error: getAgentsError, status: getAgentsStatus, data: allAgentsData } = await useAsyncData(() =>
  $api.whatsApp.BoGetAllWhatsAppAgents(pagination.value.currentPage, pagination.value.pageSize, sort.value.sortBy, sort.value.sortOrder), { lazy: true })

const updateRouteQuery = () => {
  const query: LocationQuery = {
    ...route.query,
    page: pagination.value.currentPage.toString(),
    pageSize: pagination.value.pageSize.toString(),
    sortBy: sort.value.sortBy,
    dir: sort.value.sortOrder,
  }
  router.replace({ query })
}

const syncQueryValues = (newQuery: LocationQuery) => {
  pagination.value.currentPage = Number(newQuery.page) || 1
  pagination.value.pageSize = Number(newQuery.pageSize) || 10
  sort.value.sortOrder = (newQuery.dir as 'asc' | 'desc') || 'desc'
  sort.value.sortBy = (newQuery.sortBy as string) || 'active'
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

const delayedStatus = ref(getAgentsStatus.value)
const MIN_LOADING_TIME = 600

watch(
  getAgentsStatus,
  (newStatus) => {
    if (newStatus === 'pending') { delayedStatus.value = 'pending' }
    else { setTimeout(() => delayedStatus.value = newStatus, MIN_LOADING_TIME) }
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
    if (shouldSyncQuery.value) { syncQueryValues(newQuery) }
  },
)

watch(
  () => allAgentsData.value?.total,
  newTotal => pagination.value.total = newTotal || 0,
  { immediate: true },
)

onMounted(async () => {
  shouldSyncQuery.value = true
  syncQueryValues(route.query)
  updateRouteQuery()
})

onBeforeUnmount(() => shouldSyncQuery.value = false)
</script>

<template>
  <WhatsAppAgentsListActions
    :selected-sort-by="sort.sortBy"
    :selected-sort-direction="sort.sortOrder"
    @sort-change="handleSortChange"
  />

  <GlobalCardListLoader
    v-if="(delayedStatus === 'pending') || (delayedStatus === 'idle')"
    type="whatsAppAgent"
    :skeleton-count="10"
  />

  <WhatsAppAgentsList
    v-else-if="!emptyAgentsData"
    :whats-app-agents="agentsData"
    :pagination="pagination"
    @page-change="handlePageChange"
    @refresh-whats-app-agents="(handlePageChange(1))"
  />

  <EmptyState
    v-else
    :title="$t('whatsapp_agents.empty_title_agents')"
    :description="$t('whatsapp_agents.empty_description_agents')"
  >
    <template #icon>
      <AccountWarningIcon size="44px" />
    </template>
    <template #cta>
      <LlmLink to="/admin/whatsapp-agents/create" type="button">
        <AddAgentIcon size="24px" />  {{ $t('whatsapp_agents.buttons.create') }}
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
