import FetchFactory from '../fetchFactory'
import type { Collection, CollectionDetail, CollectionListResponse, CollectionResponse } from '~/types/collection'

export default class CollectionService extends FetchFactory {
  // Endpoint for collections-related API requests.
  private readonly endpoint: string = '/collections'

  /**
   * Fetches a list of collections with pagination.
   * @param page The page number for pagination (optional).
   * @param perPage The number of items per page (optional).
   * @returns A promise that resolves to the collections list response.
   * @throws Will throw an error if the request fails.
   */
  async GetAllCollections(page: number = 1, perPage: number = 20, sortBy?: string, sortDir: 'asc' | 'desc' = 'asc'): Promise<CollectionListResponse> {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        ...(sortBy && { sortBy }),
        sortDir,
      }).toString()

      return await this.$fetch<CollectionListResponse>(`${this.endpoint}?${queryParams}`)
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch collections with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches single collection for a specific collections by its ID.
   * @param id - The ID of the collection.
   * @returns A promise that resolves to an collection object.
   * @throws Will throw an error if the request fails.
   */
  async GetSingleCollection(collectionId: string): Promise<CollectionResponse> {
    try {
      return await this.$fetch<CollectionResponse>(`display${this.endpoint}/${collectionId}`,

      )
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch product with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Deletes a collection from the server by its ID.
   * @param id - The unique identifier of the document to be deleted.
   * @returns A promise that resolves when the collection is successfully deleted.
   * @throws Will throw an error if the deletion fails, providing the appropriate status code and message.
   */
  async DeleteCollection(id: string): Promise<void> {
    try {
      return await this.$fetch(`${this.endpoint}/${id}`, {
        method: 'DELETE',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to upload document with code ${error?.statusCode}`,
      })
    }
  }

  async CreateCollection(body: CollectionDetail): Promise<any> {
    try {
      return await this.$fetch(this.endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to create collection with name ${body.name}`,
      })
    }
  }

  async GetListEmbeddingModels(provider: string): Promise<any> {
    try {
      const url = `/embeddings/${provider}/models`

      return await this.$fetch<any>(url)
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch embedding models with code ${error?.statusCode}`,
      })
    }
  }
}
