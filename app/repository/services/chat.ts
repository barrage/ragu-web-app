import FetchFactory from '../fetchFactory'
import type { Chat, Message } from '~/types/chat.ts'

export default class ChatServise extends FetchFactory {
  // Endpoint for product-related API requests.
  private readonly endpoint: string = '/chats'
  private readonly userId: string = '660a7998-2a27-11ee-be56-0242ac120002'

  /**
   * Fetches a list of all products from the API.
   * @returns A promise that resolves to an array of Product objects.
   * @throws Will throw an error if the request fails.
   */
  async GetAllChats(): Promise<Chat[]> {
    try {
      return await this.$fetch<Chat[]>(`${this.endpoint}/${this.userId}`)
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to fetch chats:', error.message)
        throw new Error(`Failed to fetch chats: ${error.message}`)
      }
      else {
        console.error('An unknown error occurred')
        throw new Error('An unknown error occurred while fetching chats')
      }
    }
  }

  /**
   * Fetches a single product by its ID from the API.
   * @param id - The ID of the product to fetch.
   * @returns A promise that resolves to a Product object.
   * @throws Will throw an error if the request fails.
   */
  async GetChatMessages(id: string): Promise<Message[]> {
    try {
      return await this.$fetch<Message[]>(`${this.endpoint}/${id}/messages`)
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to fetch messages:', error.message)
        throw new Error(`Failed to fetch messages: ${error.message}`)
      }
      else {
        console.error('An unknown error occurred')
        throw new Error('An unknown error occurred while fetching messages')
      }
    }
  }
}
