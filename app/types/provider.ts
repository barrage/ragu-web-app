import type { PaginatedResponse } from './common'

export interface ListProviders {
  auth: string[]
  llm: string[]
  vector: string[]
  embedding: string[]
}

export type LLmList = string

// TOKEN

export type TokenUsageListResponse = PaginatedResponse<TokenUsage>

export interface TokenUsage {
  id: number
  userId: string
  agentId: string
  agentConfigurationId: string
  origin: Origin
  amount: Amount
  usageType: UsageType
  model: Model
  provider: Provider
  createdAt: Date
}

export interface Amount {
  prompt: number
  completion: number
  total: number
}

export enum Model {
  GPT4O = 'gpt-4o',
  GPT4Turbo = 'gpt-4-turbo',
}

export interface Origin {
  type: Type
  id: string
}

export enum Type {
  WorkflowChat = 'workflow.chat',
}

export enum Provider {
  Openai = 'openai',
}

export enum UsageType {
  Completion = 'COMPLETION',
  CompletionTitle = 'COMPLETION_TITLE',
}
