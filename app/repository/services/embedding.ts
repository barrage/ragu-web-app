import FetchFactory from '../fetchFactory'
import type { CollectionWithDocuments } from '~/types/embedding'

export default class EmbeddingService extends FetchFactory {
  // Endpoint for embeddings-related API requests.
  private readonly endpoint: string = '/embeddings'

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
