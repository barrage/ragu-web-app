import FetchFactory from '../fetchFactory'
import type { DashboardStatistic, LineChartResponseData } from '~/types/statistic'

export default class StatisticService extends FetchFactory {
  // Endpoint for statistic-related API requests.
  private readonly dashboardEndpoint: string = '/admin/dashboard'
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
   * Fetches single collection for a specific collections by its ID.
   * @returns A promise that resolves to an collection object.
   * @throws Will throw an error if the request fails.
   */
  async GetDashboardCountStats(): Promise<DashboardStatistic> {
    try {
      return await this.$fetch<DashboardStatistic>(`${this.dashboardEndpoint}/counts`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch statistic with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches single collection for a specific collections by its ID.
   * @returns A promise that resolves to an collection object.
   * @throws Will throw an error if the request fails.
   */
  async GetChatHistoryStats(period: string = 'WEEK'): Promise<LineChartResponseData> {
    try {
      return await this.$fetch<LineChartResponseData>(`${this.dashboardEndpoint}/chat/history?period=${period}`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch statistic with code ${error?.statusCode}`,
      })
    }
  }
}
