import { defineStore } from 'pinia'
import type { Chat, ChatsResponse, Message } from '~/types/chat.ts'

export const useChatStore = defineStore('chat', () => {
  // State
  const chats = ref<Chat[]>([])
  const chatsResponse = ref<ChatsResponse | null>(null)
  const messages = ref<Message[]>()
  const selectedChat = computed(() => {
    if (!messages.value || messages.value.length === 0) { return null }
    const chatId = messages.value[0]?.chatId
    return chats.value.find(chat => chat.id === chatId) || null
  })
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isWebSocketStreaming = ref(false)
  const route = useRoute()
  const currentChatId = computed(() => {
    const chatId = route.params.chatId
    return Array.isArray(chatId) ? chatId[0] : chatId || null
  })
  const hasChats = computed(() => chats.value.length > 0)
  const { $api } = useNuxtApp()

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

  async function GET_AllChats(): Promise<ChatsResponse | null> {
    const data = await $api.chat.GetAllChats()

    if (data) {
      chats.value = data.items
      return chatsResponse.value = data
    }
    else {
      return chatsResponse.value = null
    }
  }

  const wsToken = ref<string | null>(null)

  async function GET_WsToken(): Promise<string | null> {
    const token = await $api.chat.GetWsToken()

    if (token) {
      return wsToken.value = token
    }
    else {
      return wsToken.value = null
    }
  }

  const getChatById = (chatId: string) => {
    return chats.value?.find(chat => chat.id === (chatId)) || null
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
    getChatById,
    wsToken,
    currentChatId,
    GET_WsToken,
  }
})
