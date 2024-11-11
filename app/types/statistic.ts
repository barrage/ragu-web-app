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

export interface ChatStatistic {
  agents: Provider[]
  total: number
}

export interface UserStatistic {
  active: number
  admin: number
  inactive: number
  total: number
  user: number
}

export interface DashboardStatistic {
  agent: AgentStatistic
  chat: ChatStatistic
  user: UserStatistic
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
