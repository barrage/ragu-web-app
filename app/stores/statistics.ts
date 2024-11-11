import { defineStore } from 'pinia'
import type { DashboardStatistic, StatisticArray } from '~/types/statistic'

export const useStatisticStore = defineStore('statistic', () => {
  // State

  const dashboardCount = ref<DashboardStatistic | null >()
  const { $api } = useNuxtApp()

  /* API */

  async function GET_DashboardCount(): Promise<DashboardStatistic | null > {
    const data = await $api.statistic.GetDashboardCountStats()

    if (data) {
      return dashboardCount.value = data
    }
    else {
      return dashboardCount.value = null
    }
  }

  const chatHistoryStats = ref<StatisticArray | null>(null)
  async function GET_ChatHistoryStatistic(period?: string): Promise<StatisticArray | null > {
    const data = await $api.statistic.GetChatHistoryStats(period)

    if (data) {
      return chatHistoryStats.value = data
    }
    else {
      return chatHistoryStats.value = null
    }
  }

  return {
    dashboardCount,
    GET_DashboardCount,

    chatHistoryStats,
    GET_ChatHistoryStatistic,
  }
})
