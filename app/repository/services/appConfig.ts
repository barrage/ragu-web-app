import FetchFactory from '../fetchFactory'
import type { AppConfig } from '~/types/appConfig'

export default class usersService extends FetchFactory {
  // Endpoint for app-config-related API requests.
  private readonly endpoint: string = '/info'

  /**
   * Fetches a list of all users.
   * @returns A promise that resolves to an UsersResponse type.
   * @throws Will throw an error if the request fails.
   */
  async GetAppConfig(): Promise<AppConfig> {
    try {
      return await this.$fetch<AppConfig>(`${this.endpoint}`)
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch users with code ${error?.statusCode}`,
      })
    }
  }
}
