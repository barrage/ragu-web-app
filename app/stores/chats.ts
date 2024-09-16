import { defineStore } from 'pinia'
import type { Chat, Message } from '~/types/chat.ts'

export const useChatStore = defineStore('chat', () => {
  // State
  const chats = ref<Chat[]>([])
  const messages = ref<Message[]>()
  const selectedChat = computed(() => {
    if (!messages.value || messages.value.length === 0) { return null }
    const chatId = messages.value[0]?.chatId
    return chats.value.find(chat => chat.id === chatId) || null
  })
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isWebSocketStreaming = ref(false)

  const hasChats = computed(() => chats.value.length > 0)
  const { $api } = useNuxtApp()

  /* _____Fake_____ */
  const userId = ref('660a7998-2a27-11ee-be56-0242ac120002')

  /* API */

  async function GET_ChatMessages(chatId: string): Promise<Message[]> {
    const data = await $api.chat.GetChatMessages(chatId)

    if (data) {
      return messages.value = data
    }
    else {
      return []
    }
  }

  async function GET_AllChats(userId: string): Promise<Chat[]> {
    const data = await $api.chat.GetAllChats(userId)

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
    userId,
  }
})
