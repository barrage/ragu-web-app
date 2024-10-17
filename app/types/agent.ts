import type { Collection } from '~/types/collection'

export interface Agent {
  active: boolean
  context: string
  createdAt: string
  description: string
  embeddingModel: string
  embeddingProvider: string
  id: string
  language: string
  llmProvider: string
  model: string
  name: string
  temperature: number
  updatedAt: string
  vectorProvider: string
}

export interface AgentListResponse {
  items: Agent[]
  total: number
}
export interface AgentDetail {
  name: string
  context: string
  description: string
  llmProvider: string
  model: string
  language: string
  temperature: number
  vectorProvider: string
  embeddingProvider: string
  embeddingModel: string
  active: boolean
}

export interface AgentsWithCount {
  count: number
  agents: Agent[]
}

export interface AgentPayload {
  page?: number
  sortOrder?: 'asc' | 'desc'
}

export interface Instructions {
  titleInstruction: string
  languageInstruction: string
  summaryInstruction: string
}

export interface SelectedAgent {
  agent: Agent
  instructions: Instructions
  collections: Collection[]
}
