import { defineStore } from 'pinia'
import type { CreateUserPayload, User, UsersResponse } from '~/types/users.ts'

export const useUsersStore = defineStore('user', () => {
  // State

  const usersResponse = ref<UsersResponse | null >()
  const { $api } = useNuxtApp()

  /* API */

  /**
   * Fetches a paginated and sorted list of users.
   * @param page - The page number to fetch.
   * @param perPage - The number of users per page.
   * @param sortBy - The field to sort by (e.g., 'firstName').
   * @param sortOrder - The order of sorting ('asc' or 'desc').
   * @returns A promise that resolves to an UsersResponse type or null.
   */
  async function GET_AllUsers(
    page: number = 1,
    perPage: number = 10,
    sortBy: string = 'firstName',
    sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<UsersResponse | null | undefined> {
    // Call the service method with pagination and sorting parameters
    const data = await $api.user.GetAllUsers(page, perPage, sortBy, sortOrder)

    // Store the fetched data in `usersResponse` and return it
    if (data) {
      usersResponse.value = data
      return data
    }
    else {
      usersResponse.value = null
      return null
    }
  }

  /* SINGLE USER */
  const selectedUser = ref<User | null>(null)

  async function GET_SingleUser(userId: string): Promise<User | null > {
    const data = await $api.user.GetSingleUser(userId)

    if (data) {
      return selectedUser.value = data
    }
    else {
      return selectedUser.value = null
    }
  }

  async function POST_CreateUser(newUserPayload: CreateUserPayload): Promise<User | null > {
    return await $api.user.PostCreateUser(newUserPayload)
  }

  async function DELETE_User(userId: string): Promise<void> {
    await $api.user.DeleteUser(userId)
  }

  return {
    usersResponse,
    GET_AllUsers,

    selectedUser,
    GET_SingleUser,

    POST_CreateUser,

    DELETE_User,
  }
})
