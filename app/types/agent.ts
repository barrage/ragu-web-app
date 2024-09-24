export interface Agent {
  id: number
  name: string
  context: string
  createdAt: string
  updatedAt: string
}

export interface AgentListResponse {
  count: number
  agents: Agent[]
}
export interface AgentDetail {
  name: string
  context: string
}

export interface AgentsWithCount {
  count: number
  agents: Agent[]
}

export interface AgentPayload {
  page?: number
  sortOrder?: 'asc' | 'desc'
}
