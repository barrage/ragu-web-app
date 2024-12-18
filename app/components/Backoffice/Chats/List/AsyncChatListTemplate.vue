<script lang="ts" setup>
import { type LocationQuery, useRoute, useRouter } from 'vue-router'
import GlobalCardListLoader from '../../shared/Skeletons/GlobalCardListLoader.vue'
import type { Sort, SortingValues } from '~/types/sort'
import type { Pagination } from '~/types/pagination'
import ChatWarningIcon from '~/assets/icons/svg/chat-warning.svg'

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
  sortBy: (route.query.sortBy as string) || 'createdAt',
})

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
  await executeGetChats()
}

const handleSortChange = async (sortingValues: SortingValues) => {
  sort.value.sortOrder = sortingValues.direction
  sort.value.sortBy = sortingValues.sortProperty.value
  updateRouteQuery()
  await executeGetChats()
}

const delayedStatus = ref(getChatsStatus.value)
const MIN_LOADING_TIME = 600

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

errorHandler(getChatsError)

const emptyChatData = computed(() => {
  const items = chatsData.value?.items
  return !Array.isArray(items) || items.length === 0
})

const chatDataItems = computed(() => chatsData.value?.items)

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
  () => chatsData.value?.total,
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
  <ChatsListAdminActions
    :selected-sort-by="sort.sortBy"
    :selected-sort-direction="sort.sortOrder"
    @sort-change="handleSortChange"
  />

  <GlobalCardListLoader
    v-if="(delayedStatus === 'pending') || (delayedStatus === 'idle')"
    type="chat"
    :skeleton-count="10"
  />

  <ChatsListAdmin
    v-else-if="!emptyChatData"
    :chats="chatDataItems"
    :pagination="pagination"
    @page-change="handlePageChange"
    @chat-deleted="(handlePageChange(1))"
    @chat-title-edited="(handlePageChange(1))"
  />
  <EmptyState
    v-else
    :title="$t('chat.admin.chat_card.empty_state_title')"
    :description="$t('chat.admin.chat_card.empty_state_desc')"
  >
    <template #icon>
      <ChatWarningIcon size="44px" />
    </template>
  </EmptyState>
  <Pagination
    data-testid="backoffice-chat-list-pagination"
    :current-page="pagination.currentPage"
    :page-size="pagination.pageSize"
    :total="pagination.total"
    :disabled="pagination.disabled"
    @page-change="handlePageChange"
  />
</template>
