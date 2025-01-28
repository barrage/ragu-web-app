import type { SingleAgent } from '~/types/agent.ts'
import type { User } from '~/types/users'
import type { MonthName } from '~/components/EndUser/Chat/ChatListTimeLabel.vue'

export interface Message {
  id: string
  sender: string
  senderType: 'user' | 'assistant'
  content: string
  chatId: string
  responseTo: string | null
  evaluation: boolean | null
  createdAt: string
  updatedAt: string
}

export interface ChatConfig {
  id: string
  chatId: string
  model: string
  streaming: boolean
  temperature: number
  language: string
  createdAt: string
  updatedAt: string
}

export interface Chat {
  id: string
  userId: string
  agentId: number
  title: string
  createdAt: string
  updatedAt: string
  messages: Message[]
  config: ChatConfig
}

export interface GroupedChats {
  today: Chat[]
  yesterday: Chat[]
  last7days: Chat[]
  last30days: Chat[]
  monthsThisYear: Partial<Record<MonthName, Chat[]>>
  lastYear: Chat[]
  older: Chat[]
}
export interface ChatsResponse {
  items: Chat[]
  total: number
}

export interface AdminChatsResponse {
  items: AdminChatDetails[]
  total: number
}

export interface AdminChatDetails {
  agent: SingleAgent
  chat: Chat
  user: User
}

export interface EndUserChatDetails {
  agent: SingleAgent
  chat: Chat
}

export interface EditChatTitlePayload {
  title: string
}

export interface ChatListFilterForm {
  userId: undefined | string
  agentId: undefined | string
}
