<script lang="ts" setup>
import { type LocationQuery, useRoute, useRouter } from 'vue-router'
import type { Sort, SortingValues } from '~/types/sort'
import type { Pagination } from '~/types/pagination'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import type { UsersListFilterForm } from '~/types/users'

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

const filterForm = ref<UsersListFilterForm>({
  status: route.query.active === 'true'
    ? true
    : route.query.active === 'false'
      ? false
      : undefined,
  role: route.query.role ? String(route.query.role) : undefined,
})

const searchInput = ref<string | null>(route.query.name ? String(route.query.name) : null)
const withAvatar = ref<boolean | undefined>(true)

const { execute: executeGetUsers, error: getUsersError, status: getUsersStatus, data: allUsersData } = await useAsyncData(() =>
  $api.user.GetAllUsers(pagination.value.currentPage, pagination.value.pageSize, sort.value.sortBy, sort.value.sortOrder, searchInput.value, filterForm.value.status, filterForm.value.role, withAvatar.value), { lazy: true })

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

  if (filterForm.value.status !== undefined) {
    query.active = filterForm.value.status.toString()
  }
  else {
    delete query.active
  }

  if (filterForm.value.role !== undefined) {
    query.role = filterForm.value.role
  }
  else {
    delete query.role
  }

  router.replace({ query })
}

const syncQueryValues = (newQuery: LocationQuery) => {
  pagination.value.currentPage = Number(newQuery.page) || 1
  pagination.value.pageSize = Number(newQuery.pageSize) || 10
  sort.value.sortOrder = (newQuery.dir as 'asc' | 'desc') || 'asc'
  sort.value.sortBy = (newQuery.sortBy as string) || 'createdAt'
  searchInput.value = newQuery.name ? (newQuery.name as string) : null
  filterForm.value.status = newQuery.active === 'true'
    ? true
    : newQuery.active === 'false'
      ? false
      : undefined
  filterForm.value.role = newQuery.role ? String(newQuery.role) : undefined
}

const handlePageChange = async (page: number) => {
  pagination.value.currentPage = page
  updateRouteQuery()
  scrollToTop()
  await executeGetUsers()
}

const handleSortChange = async (sortingValues: SortingValues) => {
  sort.value.sortOrder = sortingValues.direction
  sort.value.sortBy = sortingValues.sortProperty.value
  updateRouteQuery()
  await executeGetUsers()
}

const handleFilterChange = async (filter: UsersListFilterForm) => {
  filterForm.value.status = filter.status
  filterForm.value.role = filter.role
  updateRouteQuery()
  scrollToTop()
  await executeGetUsers()
}

const handleSearchChange = async (search: string) => {
  searchInput.value = search
  updateRouteQuery()
  scrollToTop()
  await executeGetUsers()
}

const delayedStatus = ref(getUsersStatus.value)
const MIN_LOADING_TIME = 600

watch(
  getUsersStatus,
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

errorHandler(getUsersError)

const emptyUsersData = computed(() => {
  const items = allUsersData.value?.items
  return !Array.isArray(items) || items.length === 0
})

const usersData = computed(() => allUsersData.value?.items)

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
  () => allUsersData.value?.total,
  (newTotal) => {
    pagination.value.total = newTotal || 0
  },
  { immediate: true },
)
errorHandler(getUsersError)

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
  <UsersListActions
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
    type="user"
    :skeleton-count="10"
  />
  <template v-else-if="!emptyUsersData">
    <UsersList
      :users="usersData"
      @user-deleted="(handlePageChange(1))"
      @user-edited="(handlePageChange(1))"
      @user-activated="(handlePageChange(1))"
      @user-deactivated="(handlePageChange(1))"
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
    :title="$t('users.empty_state.title')"
    :description="$t('users.empty_state.description')"
  >
    <template #icon>
      <PersonInfoIcon size="44px" />
    </template>
  </EmptyState>
</template>
