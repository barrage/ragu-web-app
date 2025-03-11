export type EmbeddingProvider = 'azure' | 'openai' | 'ollama'

export interface Agent {
  agent?: Partial<SingleAgent>
  configuration?: Partial <Configuration>
  collections?: Array<AgentCollection>
  whatsapp?: boolean
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

export interface EvaluationCounts {
  positive: number
  negative: number
  total: number
}

export interface AgentVersion {
  configuration: Configuration
  evaluationCounts: EvaluationCounts
}

export interface AgentVersions {
  items: Configuration[]
  total: number
}

export interface AllAgentResponse {
  items: Agents[]
  total: number
}

export interface AllAppAgentsResponse {
  items: SingleAgent[]
  total: number
}

export interface AgentVersionEvaluationMessages {
  items: EvaluationMessage[]
  total: number
}

export interface EvaluationMessage {
  chatId: string
  content: string
  createdAt: Date | string
  evaluation: boolean | null
  feedback: string
  id: string
  responseTo: null
  sender: string
  senderType: string
  updatedAt: Date | string
}
export interface Agents {
  agent: SingleAgent
  configuration: Configuration | null
  whatsapp?: boolean
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
  avatar?: string

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
  presencePenalty: number
  maxCompletionTokens: number
}

export interface Instructions {
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
  presencePenalty: number
  maxCompletionTokens: number
}

export interface AgentPayload {
  page?: number
  sortOrder?: 'asc' | 'desc'
}

export interface Instructions {
  titleInstruction: string
  errorMessage: string
}

export interface AgentListFilterForm {
  status: boolean | undefined
}

export interface AgentVersionEvaluationMessagesFilter {
  evaluation: boolean | undefined
  agentVersion: string
}

export interface EditAgentPayload {
  active: boolean
  description: string
  language: string
  name: string
  configuration: AgentConfiguration
}

export interface AssignAgentsToolsPayload {
  add: string[]
  remove: string[]
}

export interface AgentTools {
  id: string
  agentId: string
  toolName: string
  function: Function
}

export type AgentToolsResponse = AgentTools[]

export interface Function {
  name: string
  description: string
  parameters: Parameters
  strict: boolean
}

export interface AgentTool {
  type: string
  function: Function
}

export type AgentToolList = AgentTool[]

export interface Parameters {
  type: string
  properties: Properties
  required: string[]
  additionalProperties: boolean
}

export interface Properties {
  agent_id: AgentID
}

export interface AgentID {
  type: string
  description: string
  enum: null
}
