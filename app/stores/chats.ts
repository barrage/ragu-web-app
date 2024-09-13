import { defineStore } from 'pinia'
import type { Chat, Message } from '~/types/chat.ts'

export const useChatStore = defineStore('chat', () => {
  // State
  const chats = ref<Chat[]>([])
  const messages = ref<Message[]>()
  const selectedChat = ref<Chat | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isWebSocketStreaming = ref(false)

  const hasChats = computed(() => chats.value.length > 0)
  const { $api } = useNuxtApp()

  /* API */

  async function GET_ChatMessages(chatId: string, userId?: string): Promise<Message[]> {
    const data = await $api.chat.GetChatMessages(chatId)

    if (data) {
      return messages.value = data
    }
    else {
      return []
    }
  }

  async function GET_AllChats(userId?: string): Promise<Chat[]> {
    const data = await $api.chat.GetAllChats()

    if (data) {
      return chats.value = data
    }
    else {
      return []
    }
  }

  return {
    chats,
    messages,
    isLoading,
    error,
    hasChats,
    selectedChat,
    isWebSocketStreaming,
    GET_ChatMessages,
    GET_AllChats,
  }
})
