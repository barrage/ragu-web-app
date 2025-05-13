import FetchFactory from '../fetchFactory'
import type { AgentSettingsResponse } from '~/types/settings'

export default class settingsService extends FetchFactory {
  // Endpoint for app-config-related API requests.
  private readonly endpoint: string = 'admin/settings'
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

  async GetAdminSettings(): Promise<AgentSettingsResponse> {
    try {
      return await this.$fetch<any>(`${this.endpoint}`, {
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

  async UpdateAdminSettings(updates: any): Promise<any> {
    try {
      return await this.$fetch<any>(`${this.endpoint}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to update settings with code ${error?.statusCode}`,
      })
    }
  }
}
