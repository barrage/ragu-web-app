import { defineStore } from 'pinia'
import type {
  AdminChatDetails,
  AdminChatsResponse,
  Chat,
  EndUserChatDetails,
  Message,
  MessageGroupResponse,

} from '~/types/chat.ts'

export const useChatStore = defineStore('chat', () => {
  // State

  /**
   * Holds a list of all of the user's chats for display purposes.
   */
  const chats = ref<Chat[]>([])

  /**
   * Contains messages for display on the current component.
   *
   * There are 2 possible states for this:
   *
   * 1. Initially empty: means we are on the index page.
   * 2. Existing messages: means we are either moving from the index,
   *                       or are on a chat page.
   */
  const messages = ref<Message[]>([])

  /**
   * Holds the currently selected chat for display purposes.
   *
   * This will only be non-null when we have loaded an existing chat,
   * or when we are redirected to a new one after the initial
   * message pair is processed.
   */

  const chatMessagesResponse = ref<MessageGroupResponse | null>(null)
  const selectedChat = ref<EndUserChatDetails | null>(null)
  const isWebSocketStreaming = ref(false)

  const { $api } = useNuxtApp()

  /* API */

  async function GET_ChatMessages(chatId: string): Promise<Message[]> {
    const data = await $api.chat.GetChatMessages(chatId)

    if (data) {
      chatMessagesResponse.value = {
        total: data.total,
        items: data.items,
      }

      return (messages.value = data.items
        .flatMap(group =>
          group.messages.toSorted((a, b) => a.order - b.order),
        ))
    }

    else {
      return []
    }
  }

  /**
   * Fetch and set the @{@link selectedChat} to the chat with the given ID.
   * @param chatId
   */
  async function GET_Chat(chatId: string): Promise<EndUserChatDetails | null> {
    try {
      const data = await $api.chat.GetEndUserChat(chatId)
      if (data) {
        return (selectedChat.value = data)
      }
      else {
        selectedChat.value = null
        return null
      }
    }
    catch (error) {
      console.error('Failed to fetch chat:', error)
      selectedChat.value = null
      return null
    }
  }

  async function GET_AllChats(): Promise<void> {
    const data = await $api.chat.GetAllChats()

    if (data) {
      chats.value = data.items
    }
  }

  /**
   * Fetches a paginated and sorted list of chats.
   * @param page - The page number to fetch.
   * @param perPage - The number of chats per page.
   * @param sortBy - The field to sort by (e.g., 'title').
   * @param sortOrder - The order of sorting ('asc' or 'desc').
   *  @param userId - Optional parametar for specific user chats.
   * @returns A promise that resolves to an ChatsResponse type or null.
   */
  const adminAllChatsResponse = ref<AdminChatsResponse | null>(null)
  const adminAllChatsData = ref<AdminChatDetails[]>([])
  async function GET_AllAdminChats(
    page: number = 1,
    perPage: number = 10,
    sortBy: string = 'firstName',
    sortOrder: 'asc' | 'desc' = 'desc',
    userId?: string,
  ): Promise<AdminChatsResponse | null> {
    try {
      const data = await $api.chat.GetAllAdminChats(
        page,
        perPage,
        sortBy,
        sortOrder,
        userId,
      )

      if (data) {
        adminAllChatsData.value = data.items
        adminAllChatsResponse.value = data
        return data
      }
      else {
        adminAllChatsData.value = []
        adminAllChatsResponse.value = null
        return null
      }
    }
    catch (error) {
      console.error('Error fetching admin chats:', error)
      adminAllChatsData.value = []
      adminAllChatsResponse.value = null
      throw error
    }
  }

  const selectedBoChatDetails = ref<AdminChatDetails | null>(null)

  const setSelectedBoChatDetails = (chat: AdminChatDetails | null) => {
    return (selectedBoChatDetails.value = chat)
  }

  const getChatById = (chatId: string) => {
    return chats.value?.find(chat => chat.id === chatId) || null
  }

  async function DELETE_Chat(chatId: string): Promise<void> {
    await $api.chat.DeleteChat(chatId)
  }

  async function DELETE_ChatBackoffice(chatId: string): Promise<void> {
    await $api.chat.DeleteChatBackoffice(chatId)
  }
  async function PUT_UpdateChatTitle(
    chatid: string,
    newChatTitle: string,
  ): Promise<void> {
    await $api.chat.PutUpdateChatTitle(chatid, newChatTitle)
  }
  async function PUT_UpdateChatTitleBackoffice(
    chatid: string,
    newChatTitle: string,
  ): Promise<void> {
    await $api.chat.PutUpdateChatTitleBackoffice(chatid, newChatTitle)
  }

  return {
    chats,
    messages,
    selectedChat,
    isWebSocketStreaming,
    chatMessagesResponse,
    GET_ChatMessages,
    GET_AllChats,
    getChatById,
    GET_AllAdminChats,
    adminAllChatsData,
    adminAllChatsResponse,
    selectedBoChatDetails,
    setSelectedBoChatDetails,
    DELETE_Chat,
    DELETE_ChatBackoffice,
    PUT_UpdateChatTitle,
    PUT_UpdateChatTitleBackoffice,
    GET_Chat,
  }
})
