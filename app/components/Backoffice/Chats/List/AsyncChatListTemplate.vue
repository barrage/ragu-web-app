<script lang="ts" setup>
import type { LocationQuery } from 'vue-router'
import type { Sort, SortingValues } from '~/types/sort'
import type { ChatListFilterForm } from '~/types/chat'
import type { Pagination } from '~/types/pagination'
import ChatWarningIcon from '~/assets/icons/svg/chat-warning.svg'

const { $api } = useNuxtApp()
const route = useRoute()
const router = useRouter()

const MIN_LOADING_TIME = 600

/* Sort */
const sort = ref<Sort>({
  sortOrder: (route.query.dir as 'asc' | 'desc') || 'desc',
  sortBy: (route.query.sortBy as string) || 'createdAt',
})

/* Pagination */
const pagination = ref<Pagination>({
  currentPage: Number(route.query.page) || 1,
  pageSize: Number(route.query.pageSize) || 10,
  total: 0,
  disabled: false,
})

/* Filter */
const filterForm = ref<ChatListFilterForm>({
  userId: undefined,
  agentId: undefined,
})

/* Search */
const searchInput = ref<string | null>(route.query.title ? String(route.query.title) : null)

/* Sync Query */
const shouldSyncQuery = ref(true)

const syncQueryValues = (newQuery: LocationQuery) => {
  pagination.value.currentPage = Number(newQuery.page) || 1
  pagination.value.pageSize = Number(newQuery.pageSize) || 10
  sort.value.sortOrder = (newQuery.dir as 'asc' | 'desc') || 'desc'
  sort.value.sortBy = (newQuery.sortBy as string) || 'createdAt'
  searchInput.value = newQuery.title ? (newQuery.title as string) : null
  filterForm.value.agentId = newQuery.agentId ? (newQuery.agentId as string) : undefined
  filterForm.value.userId = newQuery.userId ? (newQuery.userId as string) : undefined
}

const updateRouteQuery = () => {
  const query: LocationQuery = {
    ...route.query,
    page: pagination.value.currentPage.toString(),
    pageSize: pagination.value.pageSize.toString(),
    sortBy: sort.value.sortBy,
    dir: sort.value.sortOrder,
    ...(searchInput.value ? { title: searchInput.value } : {}),
  }

  if (filterForm.value.userId) {
    query.userId = filterForm.value.userId.toString()
  }
  else {
    delete query.userId
  }

  if (filterForm.value.agentId) {
    query.agentId = filterForm.value.agentId.toString()
  }
  else {
    delete query.agentId
  }

  router.replace({ query })
}

/* API Call */
const {
  execute: executeGetChats,
  error: getChatsError,
  status: getChatsStatus,
  data: chatsData,
} = await useAsyncData(() =>
  $api.chat.GetAllAdminChats(
    pagination.value.currentPage,
    pagination.value.pageSize,
    sort.value.sortBy,
    sort.value.sortOrder,
    filterForm.value.userId,
    filterForm.value.agentId,
    searchInput.value,
  ), { lazy: true })

/* Computed */
const delayedStatus = ref(getChatsStatus.value)

const emptyChatData = computed(() => {
  const items = chatsData.value?.items
  return !Array.isArray(items) || items.length === 0
})

const chatDataItems = computed(() => chatsData.value?.items)

/* Watchers */
watch(
  getChatsStatus,
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

watch(
  () => route.query,
  (newQuery) => {
    if (shouldSyncQuery.value) {
      syncQueryValues(newQuery)
    }
  },
)

watch(
  () => chatsData.value?.total,
  (newTotal) => {
    pagination.value.total = newTotal || 0
  },
  { immediate: true },
)

/* Handlers */
const handleSortChange = async (sortingValues: SortingValues) => {
  sort.value.sortOrder = sortingValues.direction
  sort.value.sortBy = sortingValues.sortProperty.value
  updateRouteQuery()
  await executeGetChats()
}

const handleFilterChange = async (filter: ChatListFilterForm) => {
  filterForm.value.userId = filter.userId
  filterForm.value.agentId = filter.agentId
  updateRouteQuery()
  scrollToTop()
  await executeGetChats()
}

const handleSearchChange = async (search: string) => {
  searchInput.value = search
  updateRouteQuery()
  scrollToTop()
  await executeGetChats()
}

const handlePageChange = async (page: number) => {
  pagination.value.currentPage = page
  updateRouteQuery()
  scrollToTop()
  await executeGetChats()
}

/* Lifecycle Hooks */
onMounted(async () => {
  shouldSyncQuery.value = true
  syncQueryValues(route.query)
  updateRouteQuery()
})

onBeforeUnmount(() => {
  shouldSyncQuery.value = false
})

/* Error Handler */
errorHandler(getChatsError)
</script>

<template>
  <ChatsListAdminActions
    :selected-sort-by="sort.sortBy"
    :selected-sort-direction="sort.sortOrder"
    :filter-form="filterForm"
    :selected-search="searchInput"
    @sort-change="handleSortChange"
    @search-change="handleSearchChange"
    @filter-applied="handleFilterChange"
  />

  <GlobalCardListLoader
    v-if="(delayedStatus === 'pending') || (delayedStatus === 'idle')"
    type="chat"
    :skeleton-count="10"
  />
  <template v-else-if="!emptyChatData">
    <ChatsListAdmin
      :chats="chatDataItems"
      :pagination="pagination"
      @chat-deleted="(handlePageChange(1))"
      @chat-title-edited="(handlePageChange(1))"
    />
    <Pagination
      data-testid="bo-chat-list-pagination"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      :disabled="pagination.disabled"
      @page-change="handlePageChange"
    />
  </template>

  <EmptyState
    v-else
    :title="$t('chat.admin.chat_card.empty_state_title')"
    :description="$t('chat.admin.chat_card.empty_state_desc')"
  >
    <template #icon>
      <ChatWarningIcon size="44px" />
    </template>
  </EmptyState>
</template>
