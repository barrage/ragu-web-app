<script lang="ts" setup>
import UsersListSkeletonLoader from './UsersListSkeletonLoader.vue'
import type { SortingValues } from '~/types/sort'
import type { Pagination } from '~/types/pagination'

const { $api } = useNuxtApp()
const usersStore = useUsersStore()

const pagination = ref<Pagination>({ ...usersStore.usersListPagination })
const sort = ref<SortingValues>({ ...usersStore.usersListSort })

const updateStorePagination = () => {
  usersStore.updatePagination(pagination.value)
}

const updateStoreSorting = () => {
  usersStore.updateSorting(sort.value)
}

const { execute: executeGetUsers, error: getUsersError, status: getUsersStatus, data: allUsersData } = await useAsyncData(() => $api.user.GetAllUsers(pagination.value.currentPage, pagination.value.pageSize, sort.value.sortProperty.value, sort.value?.direction))

const handlePageChange = async (page: number) => {
  pagination.value.currentPage = page
  updateStorePagination()
  scrollToTop()
  await executeGetUsers()
}

const handleSortChange = async (sortingValues: SortingValues) => {
  sort.value.direction = sortingValues.direction
  sort.value.sortProperty = sortingValues.sortProperty
  updateStoreSorting()
  await executeGetUsers()
}

watch(
  () => allUsersData.value?.total,
  (newTotal) => {
    pagination.value.total = newTotal || 0
    updateStorePagination()
  },
  { immediate: true },
)

const delayedStatus = ref(getUsersStatus.value)
const MIN_LOADING_TIME = 500

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
</script>

<template>
  <UsersListActions @sort-change="handleSortChange" />
  <UsersListSkeletonLoader v-if="delayedStatus === 'pending'" :skeleton-count="10" />
  <UsersList
    v-else
    :users="allUsersData?.items"
    @user-deleted="(handlePageChange(1))"
    @user-edited="(handlePageChange(1))"
    @user-activated="(handlePageChange(1))"
    @user-deactivated="(handlePageChange(1))"
  />

  <Pagination
    class="users-list-pagination"
    :current-page="pagination.currentPage"
    :page-size="pagination.pageSize"
    :total="pagination.total"
    @page-change="handlePageChange"
  />
</template>

<style lang="scss" scoped>
.users-list-pagination {
  max-width: fit-content;
}
</style>
