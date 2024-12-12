export type EmbeddingProvider = 'azure' | 'openai' | 'ollama'

export interface Agent {
  agent?: Partial<SingleAgent>
  configuration?: Partial <Configuration>
  collections?: Array<AgentCollection>
}

export interface AgentCollection {
  id: string
  agentId: string
  instruction: string
  collection: string
  amount: number | null
  embeddingProvider: string
  embeddingModel: string
  vectorProvider: string
  createdAt: Date | string
  updatedAt: Date | string
}

export interface AllAgentResponse {
  items: Agents[]
  total: number
}

export interface AllAppAgentsResponse {
  items: SingleAgent[]
  total: number
}

export interface Agents {
  agent: SingleAgent
  configuration: Configuration
}
export interface SingleAgent {
  active: boolean
  activeConfigurationId: string
  createdAt: Date | string
  description: string
  id: string
  language: string
  name: string
  updatedAt: Date | string
  vectorProvider?: string
  embeddingProvider?: EmbeddingProvider
  embeddingModel?: string

}

export interface Configuration {
  agentId: string
  agentInstructions: Instructions
  context: string
  createdAt: Date
  id: string
  llmProvider: string
  model: string
  temperature: number
  updatedAt: Date
  version: number
}

export interface Instructions {
  languageInstruction: string
  summaryInstruction: string
  titleInstruction: string
}

export interface AgentDetail {
  active: boolean
  configuration: AgentConfiguration
  description: string
  language: string
  name: string

}

export interface AgentConfiguration {
  context: string
  instructions: Instructions
  llmProvider: string
  model: string
  temperature: number
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
