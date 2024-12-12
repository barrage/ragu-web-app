import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Pagination } from '~/types/pagination'
import type { SortingValues } from '~/types/sort'

export const useUsersStore = defineStore('users', () => {
  /* State */
  const usersListPagination = ref<Pagination>({
    currentPage: 1,
    pageSize: 10,
    total: 0,
    disabled: false,
  })

  const usersListSort = ref<SortingValues>({
    direction: 'desc',
    sortProperty: { name: '', value: '' },
  })

  /* Actions */
  const updatePagination = (newPagination: Partial<Pagination>) => {
    usersListPagination.value = { ...usersListPagination.value, ...newPagination }
  }

  const updateSorting = (newSorting: SortingValues) => {
    usersListSort.value = { ...newSorting }
  }

  return {
    usersListPagination,
    usersListSort,
    updatePagination,
    updateSorting,
  }
})
