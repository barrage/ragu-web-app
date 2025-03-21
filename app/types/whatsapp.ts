import type { PaginatedResponse } from './common'
import type { User } from '~/types/users.js'

export interface WhatsAppNumber {
  id: string
  userId: string
  phoneNumber: string
  createdAt: string | Date
  updatedAt: string | Date
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

export interface WhatsAppChatWithFullName {
  chat: WhatsAppChat
  fullName: string
}

export type BoChatsResponse = PaginatedResponse<WhatsAppChatWithFullName>

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
