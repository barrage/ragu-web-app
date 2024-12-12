import type { AgentCollection } from './agent'
import type { User } from '~/types/users.js'

export interface WhatsAppNumber {
  id: string
  userId: string
  phoneNumber: string
  createdAt: string | Date
  updatedAt: string | Date
}

export interface WhatsAppAgent {
  id: string
  name: string
  description: string
  context: string
  llmProvider: string
  model: string
  temperature: number
  vectorProvider: string
  language: string
  active: boolean
  embeddingProvider: string
  embeddingModel: string
  agentInstructions: {
    promptInstruction: string | null
    languageInstruction: string | null
    summaryInstruction: string | null
  }
  createdAt: string | Date
  updatedAt: string | Date
}

export interface AllWhatsAppAgentsResponse {
  items: WhatsAppAgent[]
  total: number
}

export interface SingleWhatsAppAgentResponse {
  agent: WhatsAppAgent
  collections: AgentCollection[]
}

export interface PostWhatsAppAgentBody {
  name: string
  description: string
  language: string
  active: boolean
  configuration: {
    context: string
    llmProvider: string
    model: string
    temperature: number
    instructions: {
      languageInstruction: string | null
      summaryInstruction: string | null
      promptInstruction: string | null
    }
  }
}

export interface BoUpdateAgentRequest {
  active?: boolean
  description: string
  name: string
  language: string
  configuration: {
    context: string
    llmProvider: string
    model: string
    temperature: number
    instructions: {
      languageInstruction: string
      summaryInstruction: string
      promptInstruction: string
    }
  }
}

export interface WhatsAppChat {
  id: string
  userId: string
  createdAt: string | Date
  updatedAt: string | Date
}

export interface WhatsAppMessage {
  id: string
  sender: string
  senderType: string
  content: string
  chatId: string
  responseTo: string
  createdAt: string | Date
  updatedAt: string | Date
}

export interface BoChatsResponse {
  total: number
  items: [{
    chat: WhatsAppChat
    fullname: string
  }]
}

export interface BoChatResponse {
  chat: WhatsAppChat
  user: User
  messages: WhatsAppMessage[]
}

export interface UserChatResponse {
  chat: WhatsAppChat
  user: User
  messages: WhatsAppMessage[]
}
