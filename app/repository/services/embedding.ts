import FetchFactory from '../fetchFactory'
import type { CollectionWithDocuments } from '~/types/embedding'

export default class EmbeddingService extends FetchFactory {
  // Endpoint for embeddings-related API requests.
  private readonly endpoint: string = '/embeddings'
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
   * Updates an collection  with selected documents
   * @param body The updated data for the collection
   * @returns A promise that resolves when the update is successful
   * @throws Will throw an error if the update request fails
   */
  async UpdateCollectionWithDocuments(body: CollectionWithDocuments): Promise<CollectionWithDocuments> {
    try {
      return await this.$fetch(`${this.endpoint}/batch`, {
        method: 'POST',
        body: JSON.stringify(body),
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to embedd documents with code ${error?.statusCode}`,
      })
    }
  }
}
