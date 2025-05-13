import FetchFactory from '../fetchFactory'
import type { AppConfig } from '~/types/appConfig'

export default class usersService extends FetchFactory {
  // Endpoint for app-config-related API requests.
  private readonly endpoint: string = '/info'
  /**
   * Generates default headers for API requests.
   *
   * @param {Record<string, string>} [additionalHeaders] Optional additional headers to merge with the default headers.
   * @returns {Record<string, string>} The merged headers object, including default headers and any additional ones passed.
   */
  private getDefaultHeaders(
  additionalHeaders: Record<string, string> = {},
  ): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...additionalHeaders,
    }

    if (process.dev) {
      const token = useCookie('access_token')?.value || ''
      headers.Authorization = `Bearer ${token}`
    }

    return headers
  }

  /**
   * Fetches a list of all users.
   * @returns A promise that resolves to an UsersResponse type.
   * @throws Will throw an error if the request fails.
   */
  async GetAppConfig(): Promise<AppConfig> {
    try {
      return await this.$fetch<AppConfig>(`${this.endpoint}`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch users with code ${error?.statusCode}`,
      })
    }
  }
}
