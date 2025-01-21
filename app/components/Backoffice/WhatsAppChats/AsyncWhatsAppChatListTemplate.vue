<script lang="ts" setup>
import { type LocationQuery, useRoute, useRouter } from 'vue-router'
import GlobalCardListLoader from '~/components/Backoffice/shared/Skeletons/GlobalCardListLoader.vue'
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
  $api.whatsApp.BoGetAllChats(
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
    if (newStatus === 'pending') { delayedStatus.value = 'pending' }
    else { setTimeout(() => { delayedStatus.value = newStatus }, MIN_LOADING_TIME) }
  },
  { immediate: true },
)

errorHandler(getChatsError)

const emptyChatData = computed(() => {
  const items = chatsData.value?.items
  return !Array.isArray(items) || items.length === 0
})

const whatsAppChatDataItems = computed(() => chatsData.value?.items)

const shouldSyncQuery = ref(true)

watch(
  () => route.query,
  (newQuery) => { if (shouldSyncQuery.value) { syncQueryValues(newQuery) } },
)

watch(
  () => chatsData.value?.total,
  (newTotal) => { pagination.value.total = newTotal || 0 },
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
  <WhatsAppChatsListAdminActions
    :selected-sort-by="sort.sortBy"
    :selected-sort-direction="sort.sortOrder"
    selected-search=""
    @sort-change="handleSortChange"
  />

  <GlobalCardListLoader
    v-if="(delayedStatus === 'pending') || (delayedStatus === 'idle')"
    type="whatsAppChat"
    :skeleton-count="10"
  />
  <template v-else-if="!emptyChatData">
    <WhatsAppChatsListAdmin
      :whats-app-chats="whatsAppChatDataItems"
      :pagination="pagination"
      @chat-deleted="(handlePageChange(1))"
      @chat-title-edited="(handlePageChange(1))"
    />

    <Pagination
      data-testid="bo-whatsapp-chat-list-pagination"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      :disabled="pagination.disabled"
      @page-change="handlePageChange"
    />
  </template>
  <EmptyState
    v-else
    :title="$t('whatsapp_chat.empty_title_chats')"
    :description="$t('whatsapp_chat.empty_description_chats')"
  >
    <template #icon>
      <ChatWarningIcon size="44px" />
    </template>
  </EmptyState>
</template>
