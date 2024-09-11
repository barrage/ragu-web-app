import FetchFactory from '../fetchFactory'
import type { Product } from '@/types/products'

export default class ProductService extends FetchFactory {
  // Endpoint for product-related API requests.
  private readonly endpoint: string = '/products'

  /**
   * Fetches a list of all products from the API.
   * @returns A promise that resolves to an array of Product objects.
   * @throws Will throw an error if the request fails.
   */
  async fetchAllProducts(): Promise<Product[]> {
    try {
      return await this.$fetch<Product[]>(this.endpoint)
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch product with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches a single product by its ID from the API.
   * @param id - The ID of the product to fetch.
   * @returns A promise that resolves to a Product object.
   * @throws Will throw an error if the request fails.
   */
  async fetchProduct(id: string): Promise<Product> {
    try {
      return await this.$fetch<Product>(`${this.endpoint}/${id}`)
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch product with code ${error?.statusCode}`,
      })
    }
  }
}
