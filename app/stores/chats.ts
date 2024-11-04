import { defineStore } from 'pinia'
import type { AdminChatDetails, Chat, ChatsResponse, Message } from '~/types/chat.ts'

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

  /**
   * Fetches a paginated and sorted list of chats.
   * @param page - The page number to fetch.
   * @param perPage - The number of chats per page.
   * @param sortBy - The field to sort by (e.g., 'title').
   * @param sortOrder - The order of sorting ('asc' or 'desc').
   * @returns A promise that resolves to an ChatsResponse type or null.
   */
  const adminAllChatsResponse = ref<ChatsResponse | null>(null)
  const adminAllChatsData = ref<Chat[]>([])
  async function GET_AllAdminChats(
    page: number = 1,
    perPage: number = 10,
    sortBy: string = 'firstName',
    sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<ChatsResponse | null> {
    const data = await $api.chat.GetAllAdminChats(page, perPage, sortBy, sortOrder)

    if (data) {
      adminAllChatsData.value = data.items
      return adminAllChatsResponse.value = data
    }
    else {
      return adminAllChatsResponse.value = null
    }
  }

  /**
   * Fetches a paginated and sorted list of chats.
   * @param page - The page number to fetch.
   * @param perPage - The number of chats per page.
   * @param sortBy - The field to sort by (e.g., 'title').
   * @param sortOrder - The order of sorting ('asc' or 'desc').
   * @returns A promise that resolves to an ChatsResponse type or null.
   */
  const adminChatMessagesResponse = ref<Message[] | null>(null)
  const adminChatMessagesData = ref<Message[]>([])
  async function GET_AllChatMessagesAdmin(

    chatId: string,
  ): Promise<Message[] | null> {
    const data = await $api.chat.GetAllChatMessagesAdmin(chatId)

    if (data) {
      adminChatMessagesData.value = data
      return adminChatMessagesResponse.value = data
    }
    else {
      return adminChatMessagesResponse.value = null
    }
  }

  const selectedChatAdmin = ref<AdminChatDetails | null>(null)
  async function GET_SingleChatAdmin(chatId: string): Promise<AdminChatDetails | null> {
    const data = await $api.chat.GetAdminSingleChat(chatId)

    if (data) {
      return selectedChatAdmin.value = data
    }
    else {
      return null
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

  async function DELETE_Chat(chatId: string): Promise<void> {
    await $api.chat.DeleteChat(chatId)
  }

  async function DELETE_ChatBackoffice(chatId: string): Promise<void> {
    await $api.chat.DeleteChatBackoffice(chatId)
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
    GET_AllAdminChats,
    adminAllChatsData,
    adminAllChatsResponse,
    GET_AllChatMessagesAdmin,
    adminChatMessagesData,
    selectedChatAdmin,
    GET_SingleChatAdmin,
    DELETE_Chat,
    DELETE_ChatBackoffice,
  }
})
