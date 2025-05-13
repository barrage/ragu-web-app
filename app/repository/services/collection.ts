import FetchFactory from '../fetchFactory'
import type { CollectionDetail, CollectionListResponse, CollectionResponse, Search, SearchDocumentsRequest } from '~/types/collection'

export default class CollectionService extends FetchFactory {
  // Endpoint for collections-related API requests.
  private readonly endpoint: string = '/collections'
  private readonly searchEndpoint: string = '/search'

  /**
   * Generates default headers for API requests.
   *
   * @param {Record<string, string>} [additionalHeaders] Optional additional headers to merge with the default headers.
   * @returns {Record<string, string>} The merged headers object, including default headers and any additional ones passed.
   */
  private getDefaultHeaders(
    additionalHeaders: Record<string, string> = {},
  ): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...additionalHeaders,
    }

    if (process.dev) {
      const token = useCookie('access_token')?.value || ''
      headers.Authorization = `Bearer ${token}`
    }

    return headers
  }

  /**
   * Fetches a list of collections with pagination.
   * @param page The page number for pagination (optional).
   * @param perPage The number of items per page (optional).
   * @returns A promise that resolves to the collections list response.
   * @throws Will throw an error if the request fails.
   */
  async GetAllCollections(
    page: number = 1,
    perPage: number = 20,
    sortBy: string = 'active',
    sortDir: 'asc' | 'desc' = 'asc',
    search?: Search,
  ): Promise<CollectionListResponse> {
    try {
      const queryParams: Record<string, string> = {
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy,
        sortDir,
      }

      if (search?.q) {
        queryParams.q = search.q
        queryParams.column = search.column || 'name'
      }

      const queryString = new URLSearchParams(queryParams).toString()

      return await this.$fetch<CollectionListResponse>(`${this.endpoint}?${queryString}`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
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
      return await this.$fetch<CollectionResponse>(`display${this.endpoint}/${collectionId}`, {
        credentials: 'include',
      })
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
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to upload document with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Creates a new collection with the provided details.
   * @param body - The details of the collection to be created.
   * @returns A promise that resolves to the created collection data.
   * @throws Will throw an error if the creation fails, providing the appropriate status code and message.
   */

  async CreateCollection(body: CollectionDetail): Promise<any> {
    try {
      return await this.$fetch(this.endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to create collection with name ${body.name}`,
      })
    }
  }

  /**
   * Fetches a list of available embedding models for a specific provider.
   * @param provider - The name of the embedding provider.
   * @returns A promise that resolves to the list of embedding models.
   * @throws Will throw an error if the request fails, providing the appropriate status code and message.
   */

  async GetListEmbeddingModels(provider: string): Promise<any> {
    try {
      const url = `/embeddings/${provider}/models`

      return await this.$fetch<any>(url, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch embedding models with code ${error?.statusCode}`,
      })
    }
  }

  async SearchDocumentsChunks(body: SearchDocumentsRequest): Promise<any> {
    try {
      return await this.$fetch(`${this.searchEndpoint}`, {
        method: 'POST',
        body: JSON.stringify(body),
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to search documents with code ${error?.statusCode}`,
      })
    }
  }
}
