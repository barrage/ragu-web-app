import { defineStore } from 'pinia'
import type { DashboardStatistic, LineChartResponseData } from '~/types/statistic'

export const useStatisticStore = defineStore('statistic', () => {
  // State

  const dashboardCount = ref<DashboardStatistic | null >()
  const { $api } = useNuxtApp()

  /* API */
  async function GET_DashboardCount(): Promise<DashboardStatistic | null> {
    try {
      const data = await $api.statistic.GetDashboardCountStats()
      dashboardCount.value = data
      return dashboardCount.value
    }
    catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
      dashboardCount.value = null
      return null
    }
  }

  const chatHistoryStats = ref<LineChartResponseData | null>(null)
  async function GET_ChatHistoryStatistic(period?: string): Promise<LineChartResponseData | null > {
    try {
      const data = await $api.statistic.GetChatHistoryStats(period)
      chatHistoryStats.value = data
      return chatHistoryStats.value
    }
    catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
      chatHistoryStats.value = null
      return null
    }
  }

  return {
    dashboardCount,
    GET_DashboardCount,

    chatHistoryStats,
    GET_ChatHistoryStatistic,
  }
})
