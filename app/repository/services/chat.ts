import FetchFactory from '../fetchFactory'
import type { AdminChatDetails, AdminChatsResponse, ChatsResponse, EndUserChatDetails, Message } from '~/types/chat.ts'

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
      return await this.$fetch<ChatsResponse>(`${this.chatsEndpoint}?page=1&perPage=100&sortBy=createdAt&sortOrder=desc`, {
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
   * Fetches chat data for a specific chat by its ID.
   * @param id - The ID of the chat for which data are being fetched.
   * @returns A promise that resolves to an Chat object.
   * @throws Will throw an error if the request fails.
   */
  async GetEndUserChat(chatId: string): Promise<EndUserChatDetails | null> {
    try {
      const queryParams = new URLSearchParams({
        withAvatar: 'true',
      })

      return await this.$fetch<EndUserChatDetails>(`${this.chatsEndpoint}/${chatId}?${queryParams}`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch chat with code ${error?.statusCode}`,
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
  async GetAllAdminChats(page: number = 1, perPage: number = 10, sortBy: string = 'firstName', sortOrder: 'asc' | 'desc' = 'asc', userId?: string, agentId?: string, title?: string | null): Promise<AdminChatsResponse> {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy,
        sortOrder,
        ...(userId ? { userId } : {}),
        ...(agentId ? { agentId } : {}),
        ...(title ? { title } : {}),
      }).toString()
      return await this.$fetch<AdminChatsResponse>(`${this.adminChatsEndpoint}?${queryParams}`, {
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
   * Fetches a single chat for the Admin from the API.
   * @returns A promise that resolves to an Chat object.
   * @throws Will throw an error if the request fails.
   */
  async GetAdminSingleChat(chatId: string): Promise<AdminChatDetails> {
    try {
      const queryParams = new URLSearchParams({
        withAvatar: 'true',
      })

      return await this.$fetch<AdminChatDetails>(`${this.adminChatsEndpoint}/${chatId}?${queryParams}`, {
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

  /**
   * END USER APP
   * Deletes a chat by unique ID.
   * @param chatId - The ID of the chat to delete.
   * @returns A promise that resolves when the chat is successfully deleted.
   * @throws Will throw an error if the request fails.
   */
  async DeleteChat(chatId: string): Promise<void> {
    try {
      await this.$fetch<void>(`${this.chatsEndpoint}/${chatId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to delete user with ID: ${chatId}`,
      })
    }
  }

  /**
   * Backoffice APP
   * Deletes a chat by unique ID.
   * @param chatId - The ID of the chat to delete.
   * @returns A promise that resolves when the chat is successfully deleted.
   * @throws Will throw an error if the request fails.
   */
  async DeleteChatBackoffice(chatId: string): Promise<void> {
    try {
      await this.$fetch<void>(`${this.adminChatsEndpoint}/${chatId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to delete user with ID: ${chatId}`,
      })
    }
  }

  /**
   * Updates chat title by unique chat ID.
   * @param chatId - The ID of the chat to update title.
   * @param newChatTitle - New chat title string.
   * @returns A promise that resolves when the chat title is successfully updated.
   * @throws Will throw an error if the request fails.
   */
  async PutUpdateChatTitleBackoffice(chatId: string, newChatTitle: string): Promise<void> {
    try {
      await this.$fetch<void>(`${this.adminChatsEndpoint}/${chatId}`, {
        method: 'PUT',
        credentials: 'include',
        body: {
          title: newChatTitle,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to update chat title with ID: ${chatId}`,
      })
    }
  }

  /**
   * Updates chat title by unique chat ID.
   * @param chatId - The ID of the chat to update title.
   * @param newChatTitle - New chat title string.
   * @returns A promise that resolves when the chat title is successfully updated.
   * @throws Will throw an error if the request fails.
   */
  async PutUpdateChatTitle(chatId: string, newChatTitle: string): Promise<void> {
    try {
      await this.$fetch<void>(`${this.chatsEndpoint}/${chatId}`, {
        method: 'PUT',
        credentials: 'include',
        body: {
          title: newChatTitle,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to update chat title with ID: ${chatId}`,
      })
    }
  }

  /**
   * Evaluates a chat message by unique chat and message IDs.
   * Sends a PATCH request to update the evaluation status of a specific message.
   *
   * @param {string} chatId - The ID of the chat containing the message to evaluate.
   * @param {string} messageId - The ID of the message to evaluate.
   * @param {boolean} evaluation - The evaluation status to set (e.g., true for positive, false for negative).
   * @returns {Promise<void>} A promise that resolves when the message evaluation is successfully updated.
   * @throws Will throw an error if the request fails, including the status code and error message if available.
   */
  async PatchEvaluateChatMessage(chatId: string, messageId: string, evaluation: boolean): Promise<void> {
    try {
      await this.$fetch<void>(`${this.chatsEndpoint}/${chatId}/messages/${messageId}`, {
        method: 'PATCH',
        credentials: 'include',
        body: {
          evaluation,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to evaluate chat message with ID: ${messageId}`,
      })
    }
  }
}
