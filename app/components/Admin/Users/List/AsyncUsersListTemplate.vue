<script lang="ts" setup>
import UsersListSkeletonLoader from './UsersListSkeletonLoader.vue'
import type { SortingValues } from '~/types/sort'
import type { Pagination } from '~/types/pagination'

const { $api } = useNuxtApp()

const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  disabled: false,
})

const sort = ref<SortingValues>({
  direction: 'desc',
  sortProperty: { name: '', value: '' },
})

const { execute: executeGetUsers, error: getUsersError, status: getUsersStatus, data: allUsersData } = await useAsyncData(() => $api.user.GetAllUsers(pagination.value.currentPage, pagination.value.pageSize, sort.value.sortProperty.value, sort.value?.direction))

const handlePageChange = async (page: number) => {
  pagination.value.currentPage = page
  await executeGetUsers()
}

const handleSortChange = async (sortingValues: SortingValues) => {
  sort.value.direction = sortingValues.direction
  sort.value.sortProperty = sortingValues.sortProperty
  await executeGetUsers()
}

watch(
  () => allUsersData.value?.total,
  (newTotal) => {
    pagination.value.total = newTotal || 0
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
    :current-page="pagination.currentPage"
    :page-size="pagination.pageSize"
    :total="pagination.total"
    @page-change="handlePageChange"
  />
</template>
