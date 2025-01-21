import FetchFactory from '../fetchFactory'
import type { CreateUserPayload, EditUserPayload, User, UsersResponse } from '~/types/users.ts'

export default class usersService extends FetchFactory {
  // Endpoint for agent-related API requests.
  private readonly endpoint: string = 'admin/users'
  private readonly endUserendpoint: string = '/users'

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
        withAvatar: 'true',
      })

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
      const queryParams = new URLSearchParams({
        withAvatar: 'true',
      })

      return await this.$fetch<User>(`${this.endpoint}/${userId}?${queryParams}`, {
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
   * Updates existing user.
   * @param user - The updated user data containing email, fullName, firstName, lastName, and role.
   * @returns A promise that resolves to the user type.
   * @throws Will throw an error if the request fails.
   */
  async PutEditUser(userId: string, user: EditUserPayload): Promise<User> {
    try {
      return await this.$fetch<User>(`${this.endpoint}/${userId}`, {
        method: 'PUT',
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
        statusMessage: error?.message || `Failed to update user with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Activates a user by unique ID.
   * @param userId - The ID of the user to activate.
   * @returns A promise that resolves when the user is successfully activated.
   * @throws Will throw an error if the request fails.
   */
  async PutActivateUser(userId: string): Promise<void> {
    try {
      await this.$fetch<void>(`${this.endpoint}/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        body: {
          active: true,
        },
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to delete user with ID: ${userId}`,
      })
    }
  }

  /**
   * Deactivates a user by unique ID.
   * @param userId - The ID of the user to deactivate.
   * @returns A promise that resolves when the user is successfully deactivated.
   * @throws Will throw an error if the request fails.
   */
  async PutDeactivateUser(userId: string): Promise<void> {
    try {
      await this.$fetch<void>(`${this.endpoint}/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        body: {
          active: false,
        },
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to deactivate user with ID: ${userId}`,
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

  /**
   * Imports users from a CSV file.
   * @param file
   * @returns
   *  @throws Will throw an error if the request fails.
   */

  async ImportUsersFromCsv(file: File | Blob): Promise<void> {
    try {
      return await this.$fetch<void>(`${this.endpoint}/import-csv`, {
        method: 'POST',
        body: file,
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to import users with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Uploads a profile picture for the current user.
   * @param formData - The FormData object containing the profile picture file.
   * @returns A promise that resolves when the profile picture is successfully uploaded.
   * @throws Will throw an error if the request fails.
   */

  async PostUploadProfilePicture(file: File | Blob): Promise<void> {
    try {
      return await this.$fetch<void>(`${this.endUserendpoint}/avatars`, {
        method: 'POST',
        body: file,
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to upload profile picture with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Uploads a profile picture for the current user.
   * @param formData - The FormData object containing the profile picture file.
   * @returns A promise that resolves when the profile picture is successfully uploaded.
   * @throws Will throw an error if the request fails.
   */

  async PostAdminUploadProfilePicture(userId: string, file: File | Blob): Promise<void> {
    try {
      return await this.$fetch<void>(`${this.endpoint}/${userId}/avatars`, {
        method: 'POST',
        body: file,
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to upload profile picture with code ${error?.statusCode}`,
      })
    }
  }

  async DeleteAdminProfilePicture(userId: string): Promise<void> {
    try {
      return await this.$fetch<void>(`${this.endpoint}/${userId}/avatars`, {
        method: 'DELETE',
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to delete profile picture with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Deletes the profile picture for the current user.
   * @returns A promise that resolves when the profile picture is successfully deleted.
   * @throws Will throw an error if the request fails.
   */

  async DeleteProfilePicture(): Promise<void> {
    try {
      return await this.$fetch<void>(`${this.endUserendpoint}/avatars`, {
        method: 'DELETE',
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to delete profile picture with code ${error?.statusCode}`,
      })
    }
  }
}
