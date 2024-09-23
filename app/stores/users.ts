import { defineStore } from 'pinia'
import type { User, UsersResponse } from '~/types/users.ts'

export const useUsersStore = defineStore('user', () => {
  // State

  const usersResponse = ref<UsersResponse | null >()
  const { $api } = useNuxtApp()

  /* API */

  async function GET_AllUsers(): Promise<UsersResponse | null > {
    const data = await $api.user.GetAllUsers()

    if (data) {
      return usersResponse.value = data
    }
    else {
      return usersResponse.value = null
    }
  }

  return {
    usersResponse,
    GET_AllUsers,
  }
})
