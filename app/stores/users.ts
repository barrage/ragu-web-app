import { defineStore } from 'pinia'
import type { CreateUserPayload, EditUserPayload, User, UsersResponse } from '~/types/users.ts'

export const useUsersStore = defineStore('user', () => {
  /* State */
  const usersResponse = ref<UsersResponse | null>()
  const selectedUser = ref<User | null>(null)

  /* API */
  const { $api } = useNuxtApp()

  async function GET_AllUsers(
    page: number = 1,
    perPage: number = 10,
    sortBy: string = 'firstName',
    sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<UsersResponse | null | undefined> {
    const data = await $api.user.GetAllUsers(page, perPage, sortBy, sortOrder)
    if (data) {
      usersResponse.value = data
      return data
    }
    else {
      usersResponse.value = null
      return null
    }
  }

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

  async function PUT_UpdateUser(userId: string, updatedUserPayload: EditUserPayload): Promise<User | null > {
    return await $api.user.PutEditUser(userId, updatedUserPayload)
  }

  async function PUT_ActivateUser(userId: string): Promise<void> {
    await $api.user.PutActivateUser(userId)
  }

  async function PUT_DectivateUser(userId: string): Promise<void> {
    await $api.user.PutDeactivateUser(userId)
  }

  async function DELETE_User(userId: string): Promise<void> {
    await $api.user.DeleteUser(userId)
  }

  return {
    usersResponse,
    selectedUser,
    GET_AllUsers,
    GET_SingleUser,
    POST_CreateUser,
    PUT_UpdateUser,
    PUT_ActivateUser,
    PUT_DectivateUser,
    DELETE_User,
  }
})
