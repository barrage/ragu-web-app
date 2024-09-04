import FetchFactory from '../fetchFactory'
import type { Product } from '@/types/products'

export default class ProductService extends FetchFactory {
  // Endpoint for product-related API requests.
  private readonly endpoint: string = '/chats'

  /**
   * Fetches a list of all products from the API.
   * @returns A promise that resolves to an array of Product objects.
   * @throws Will throw an error if the request fails.
   */
  async GetAllChats(): Promise<Product[]> {
    try {
      return await this.$fetch<Product[]>(this.endpoint)
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
  async GetChatMessages(id: string): Promise<Product> {
    try {
      return await this.$fetch<Product>(`${this.endpoint}/${id}`)
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
