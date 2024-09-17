import FetchFactory from '../fetchFactory'
import type { Chat, Message } from '~/types/chat.ts'

export default class ChatServise extends FetchFactory {
  // Endpoint for product-related API requests.
  private readonly endpoint: string = '/chats'
  private readonly userId: string = '660a7998-2a27-11ee-be56-0242ac120002'

  /**
   * Fetches a list of all chats for the user from the API.
   * @returns A promise that resolves to an array of Chat objects.
   * @throws Will throw an error if the request fails.
   */
  async GetAllChats(userId: string): Promise<Chat[]> {
    try {
      return await this.$fetch<Chat[]>(`${this.endpoint}/${userId}`)
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
      return await this.$fetch<Message[]>(`${this.endpoint}/${chatId}/messages`)
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch chat messages with code ${error?.statusCode}`,
      })
    }
  }
}
