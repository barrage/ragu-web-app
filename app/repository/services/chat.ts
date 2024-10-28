import FetchFactory from '../fetchFactory'
import type { Chat, ChatsResponse, Message } from '~/types/chat.ts'

export default class ChatServise extends FetchFactory {
  // Endpoint for chat-related API requests.
  private readonly chatsEndpoint: string = '/chats'
  private readonly adminChatsEndpoint: string = '/admin/chats'
  private readonly wsEndpoint: string = '/ws'

  /**
   * Fetches a list of all chats for the user from the API.
   * @returns A promise that resolves to an array of Chat objects.
   * @throws Will throw an error if the request fails.
   */
  async GetAllChats(): Promise<ChatsResponse> {
    try {
      return await this.$fetch<ChatsResponse>(`${this.chatsEndpoint}?page=1&perPage=100&sortBy=createdAt`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch chats with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches all messages for a specific chat by its ID.
   * @param id - The ID of the chat for which messages are being fetched.
   * @returns A promise that resolves to an array of Message objects.
   * @throws Will throw an error if the request fails.
   */
  async GetChatMessages(chatId: string): Promise<Message[]> {
    try {
      return await this.$fetch<Message[]>(`${this.chatsEndpoint}/${chatId}/messages`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch chat messages with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches ws token needed for ws connection
   * @returns A promise that resolves to an string.
   * @throws Will throw an error if the request fails.
   */
  async GetWsToken(): Promise<string> {
    try {
      return await this.$fetch<string>(`${this.wsEndpoint}`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch ws token with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches a list of all chats for the Admin from the API.
   * @returns A promise that resolves to an array of Chat objects.
   * @throws Will throw an error if the request fails.
   */
  async GetAllAdminChats(page: number = 1, perPage: number = 10, sortBy: string = 'firstName', sortOrder: 'asc' | 'desc' = 'asc'): Promise<ChatsResponse> {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy,
        sortOrder,
      }).toString()
      return await this.$fetch<ChatsResponse>(`${this.adminChatsEndpoint}?${queryParams}`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch chats with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches a list of all messages for the Admin from the API.
   * @returns A promise that resolves to an array of Chat objects.
   * @throws Will throw an error if the request fails.
   */
  async GetAllChatMessagesAdmin(chatId: string): Promise<Message[]> {
    try {
      /* const queryParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy,
        sortOrder,
      }).toString() */
      return await this.$fetch<Message[]>(`${this.adminChatsEndpoint}/${chatId}/messages`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch chats with code ${error?.statusCode}`,
      })
    }
  }
}
