<script lang="ts" setup>
// IMPORTS
import { type LocationQuery, useRoute, useRouter } from 'vue-router'
import AddCollectionIcon from '~/assets/icons/svg/folder-add.svg'
import EmptyCollectionIcon from '~/assets/icons/svg/collection-question-mark.svg'
import type { Sort, SortingValues } from '~/types/sort'
import type { Pagination } from '~/types/pagination'

const { t } = useI18n()

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()

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
const { execute: executeGetCollections, error: getCollectionError, status: getCollectionsStatus, data: allCollectionsData } = await useAsyncData(() => $api.collection.GetAllCollections(pagination.value.currentPage, pagination.value.pageSize, sort.value.sortBy, sort.value.sortOrder), { lazy: true })
errorHandler(getCollectionError)

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
  sort.value.sortOrder = (newQuery.dir as 'asc' | 'desc') || 'desc'
  sort.value.sortBy = (newQuery.sortBy as string) || 'created_at'
}

const handlePageChange = async (page: number) => {
  pagination.value.currentPage = page
  updateRouteQuery()
  scrollToTop()
  await executeGetCollections()
}

const handleSortChange = async (sortingValues: SortingValues) => {
  sort.value.sortOrder = sortingValues.direction
  sort.value.sortBy = sortingValues.sortProperty.value
  updateRouteQuery()
  await executeGetCollections()
}

const delayedStatus = ref(getCollectionsStatus.value)
const MIN_LOADING_TIME = 600

watch(
  getCollectionsStatus,
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

const emptyCollectionsData = computed(() => {
  const items = allCollectionsData.value?.items
  return !Array.isArray(items) || items.length === 0
})

const collectionsData = computed(() => allCollectionsData.value?.items)

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
  () => allCollectionsData.value?.total,
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
  <CollectionListActions
    :selected-sort-by="sort.sortBy"
    :selected-sort-direction="sort.sortOrder"
    @sort-change="handleSortChange"
  />
  <GlobalCardListLoader
    v-if="(delayedStatus === 'pending') || (delayedStatus === 'idle')"
    type="collection"
    :skeleton-count="10"
  />
  <template v-else-if="!emptyCollectionsData">
    <CollectionList
      data-testid="bo-collections-list"
      :collections="collectionsData"
      :pagination="pagination"
      @page-change="handlePageChange"
      @collection-deleted="(handlePageChange(1))"
    />

    <Pagination
      data-testid="bo-collections-list-pagination"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      @page-change="handlePageChange"
    />
  </template>

  <EmptyState
    v-else
    :title="t('collections.empty_state.title_all')"
    :description="t('collections.empty_state.description_all')"
    :cta-text="t('collections.assign_collection.title')"
  >
    <template #icon>
      <EmptyCollectionIcon size="44px" />
    </template>
    <template #cta>
      <LlmLink to="/admin/collections/create" type="button">
        <AddCollectionIcon /> {{ t('collections.titles.create') }}
      </LlmLink>
    </template>
  </EmptyState>
</template>
