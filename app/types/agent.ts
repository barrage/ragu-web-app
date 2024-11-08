import type { Collection } from '~/types/collection'

export type EmbeddingProvider = 'azure' | 'openai' | 'ollama'

export interface SingleAgent {
  active: boolean
  context: string
  createdAt: string
  description: string | undefined
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

export interface AgentCollection {
  id: string
  agentId: string
  instruction: string
  collection: string
  amount: number
  createdAt: Date | string
  updatedAt: Date | string
}

export interface Agent {
  agent?: SingleAgent
  instructions?: Instructions
  collections?: AgentCollection[]
}

export interface AgentListResponse {
  items: Agent[]
  total: number
}
export interface AllAgentResponse {
  items: SingleAgent[]
  total: number
}
export interface AgentDetail {

  active: boolean
  context: string
  description: string
  embeddingModel: string
  embeddingProvider: string
  instructions?: Instructions
  language: string
  llmProvider: string
  model: string
  name: string
  temperature: number
  vectorProvider: string
}

export interface Instructions {
  languageInstruction: string
  summaryInstruction: string
  titleInstruction: string
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
