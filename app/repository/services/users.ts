import FetchFactory from '../fetchFactory'
import type { User, UsersResponse } from '~/types/users.ts'

export default class ChatServise extends FetchFactory {
  // Endpoint for agent-related API requests.
  private readonly endpoint: string = '/users'

  /**
   * Fetches a list of all users.
   * @returns A promise that resolves to an UsersResponse type.
   * @throws Will throw an error if the request fails.
   */
  async GetAllUsers(): Promise<UsersResponse> {
    try {
      return await this.$fetch<UsersResponse>(`${this.endpoint}`)
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch users with code ${error?.statusCode}`,
      })
    }
  }
}
