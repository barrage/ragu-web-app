<script lang="ts" setup>
import { type LocationQuery, useRoute, useRouter } from 'vue-router'
import GlobalCardListLoader from '../../shared/Skeletons/GlobalCardListLoader.vue'
import type { Sort, SortingValues } from '~/types/sort'
import type { Pagination } from '~/types/pagination'
import DocumentErrorIcon from '~/assets/icons/svg/document-error.svg'

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
  sortBy: (route.query.sortBy as string) || 'name',
})

const {
  execute: executeGetDocuments,
  error: getDocumentsError,
  status: getDocumentsStatus,
  data: documentsData,
} = await useAsyncData(() =>
  $api.document.GetAllDocuments(
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
  sort.value.sortBy = (newQuery.sortBy as string) || 'name'
}

const handlePageChange = async (page: number) => {
  pagination.value.currentPage = page
  updateRouteQuery()
  scrollToTop()
  await executeGetDocuments()
}

const handleSortChange = async (sortingValues: SortingValues) => {
  sort.value.sortOrder = sortingValues.direction
  sort.value.sortBy = sortingValues.sortProperty.value
  updateRouteQuery()
  await executeGetDocuments()
}

const delayedStatus = ref(getDocumentsStatus.value)
const MIN_LOADING_TIME = 600

watch(
  getDocumentsStatus,
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

errorHandler(getDocumentsError)

const emptyDocumentsData = computed(() => {
  const items = documentsData.value?.items
  return !Array.isArray(items) || items.length === 0
})

const documentDataItems = computed(() => documentsData.value?.items || null)

const shouldSyncQuery = ref(true)

watch(
  () => route.query,
  (newQuery) => {
    if (shouldSyncQuery.value) {
      syncQueryValues(newQuery)
    }
  },
)
const documentStore = useDocumentsStore()
watch(
  () => documentsData.value?.total,
  (newTotal) => {
    pagination.value.total = newTotal || 0
    if (newTotal === 0) {
      documentStore.documentsDataEmpty = true
    }
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

watch(
  () => documentStore.newDocumentUploaded,
  (newValue) => {
    if (newValue) {
      executeGetDocuments()
      documentStore.newDocumentUploaded = false
    }
  },
)
</script>

<template>
  <DocumentsListActions
    :selected-sort-by="sort.sortBy"
    :selected-sort-direction="sort.sortOrder"
    @sort-change="handleSortChange"
  />

  <GlobalCardListLoader
    v-if="(delayedStatus === 'pending') || (delayedStatus === 'idle')"
    type="document"
    :skeleton-count="10"
  />
  <DocumentList
    v-else-if="!emptyDocumentsData"
    :documents="documentDataItems"
    :pagination="pagination"
    @page-change="handlePageChange"
    @document-deleted="(handlePageChange(1))"
  />
  <EmptyState
    v-else
    :title="$t('documents.empty_state_title')"
    :description="$t('documents.empty_state_desc')"
  >
    <template #icon>
      <DocumentErrorIcon size="44px" />
    </template>
  </EmptyState>

  <Pagination
    data-testid="bo-documents-list-pagination"
    :current-page="pagination.currentPage"
    :page-size="pagination.pageSize"
    :total="pagination.total"
    :disabled="pagination.disabled"
    @page-change="handlePageChange"
  />
</template>
