import FetchFactory from '../fetchFactory'
import type { CreateUserPayload, User, UsersResponse } from '~/types/users.ts'

export default class usersService extends FetchFactory {
  // Endpoint for agent-related API requests.
  private readonly endpoint: string = 'admin/users'

  /**
   * Fetches a paginated and sorted list of users.
   * @param page - The page number to fetch.
   * @param perPage - The number of users per page.
   * @param sortBy - The field to sort by (e.g., 'firstName').
   * @param sortOrder - The order of sorting ('asc' or 'desc').
   * @returns A promise that resolves to an UsersResponse type.
   * @throws Will throw an error if the request fails.
   */
  async GetAllUsers(
  page: number = 1,
  perPage: number = 10,
  sortBy: string = 'firstName',
  sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<UsersResponse> {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy,
        sortOrder,
      }).toString()

      return await this.$fetch<UsersResponse>(`${this.endpoint}?${queryParams}`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch users with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches a single user by unique ID.
   * @returns A promise that resolves to an User type.
   * @throws Will throw an error if the request fails.
   */
  async GetSingleUser(userId: string): Promise<User> {
    try {
      return await this.$fetch<User>(`${this.endpoint}/${userId}`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch user with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Creates a new user.
   * @param user - The user data containing email, fullName, firstName, lastName, and role.
   * @returns A promise that resolves to the created User type.
   * @throws Will throw an error if the request fails.
   */
  async PostCreateUser(user: CreateUserPayload): Promise<User> {
    try {
      return await this.$fetch<User>(`${this.endpoint}`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to create user with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Deletes a user by unique ID.
   * @param userId - The ID of the user to delete.
   * @returns A promise that resolves when the user is successfully deleted.
   * @throws Will throw an error if the request fails.
   */
  async DeleteUser(userId: string): Promise<void> {
    try {
      await this.$fetch<void>(`${this.endpoint}/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to delete user with ID: ${userId}`,
      })
    }
  }
}
