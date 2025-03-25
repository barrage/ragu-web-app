export interface Provider {
  name: string
  value: number
}

export interface AgentStatistic {
  active: number
  inactive: number
  providers: Provider[]
  total: number
}
export interface ChatAgentStatistic {
  agentId: string
  agentName: string
  count: number
}

export interface ChatStatistic {
  chats: ChatAgentStatistic[]
  total: number
}

export interface DashboardStatistic {
  agent: AgentStatistic
  chat: ChatStatistic
}

export interface StatisticData {
  name: string
  value: number
}

export interface StatisticItem {
  data: StatisticData[]
  name: string
}

export type StatisticArray = StatisticItem[]

/* NEW */
/* Line chart */
export interface LineChartDataEntry {
  name: string
  value: number
}

export interface LineChartSeriesData {
  name: string
  data: LineChartDataEntry[]
}

export interface LineChartResponseData {
  series: Record<string, { data: Record<string, number> }>
  legend: Record<string, string>
}

/* Pie chart */
export interface PieChartDataEntry {
  name: string
  value: number
}
