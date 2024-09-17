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
