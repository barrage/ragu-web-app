import FetchFactory from '../fetchFactory'
import type { DashboardStatistic, LineChartResponseData } from '~/types/statistic'

export default class StatisticService extends FetchFactory {
  // Endpoint for statistic-related API requests.
  private readonly dashboardEndpoint: string = '/admin/dashboard'

  /**
   * Fetches single collection for a specific collections by its ID.
   * @returns A promise that resolves to an collection object.
   * @throws Will throw an error if the request fails.
   */
  async GetDashboardCountStats(): Promise<DashboardStatistic> {
    try {
      return await this.$fetch<DashboardStatistic>(`${this.dashboardEndpoint}/counts`, {
        credentials: 'include',
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
