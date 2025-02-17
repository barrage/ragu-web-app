import FetchFactory from '../fetchFactory'
import type { AgentSettingsResponse } from '~/types/settings'

export default class settingsService extends FetchFactory {
  // Endpoint for app-config-related API requests.
  private readonly endpoint: string = 'admin/settings'

  async GetAdminSettings(): Promise<AgentSettingsResponse> {
    try {
      return await this.$fetch<any>(`${this.endpoint}`, {
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

  async UpdateAdminSettings(updates: any): Promise<any> {
    try {
      return await this.$fetch<any>(`${this.endpoint}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
        credentials: 'include',
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
