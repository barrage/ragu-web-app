import FetchFactory from '../fetchFactory'
import type { ChunkerConfig, Document, DocumentConfig, DocumentListResponse, ParserConfig } from '~/types/document.ts'

export default class DocumentServise extends FetchFactory {
  // Endpoint for documents-related API requests.
  private readonly endpoint: string = '/documents'

  /**
   * Fetches a paginated and sorted list of documents.
   * @param page - The page number to fetch.
   * @param perPage - The number of users per page.
   * @param sortBy - The field to sort by (e.g., 'createdAt').
   * @param sortOrder - The order of sorting ('asc' or 'desc').
   * @returns A promise that resolves to an DocumentListResponse type.
   * @throws Will throw an error if the request fails.
   */
  async GetAllDocuments(page: number = 1, perPage: number = 10, sortBy: string = 'createdAt', sortOrder: 'asc' | 'desc' = 'asc'): Promise<DocumentListResponse> {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy,
        sortOrder,
      }).toString()
      return await this.$fetch<DocumentListResponse>(`${this.endpoint}?${queryParams}`)
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch documents with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches a list of all documents.
   * @returns A promise that resolves to an Document type.
   * @throws Will throw an error if the request fails.
   */
  async GetSingleDocument(id: string): Promise<Document> {
    try {
      return await this.$fetch<Document>(`${this.endpoint}/${id}`)
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch document with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Syncs a list of all documents.
   * @throws Will throw an error if the request fails.
   */
  async GetSyncFs() {
    try {
      return await this.$fetch(`${this.endpoint}/sync/fs`)
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to sync documents with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Uploads a document to the server.
   * @param formData - The FormData object containing the file to upload.
   * @returns A promise that resolves to the uploaded document's response.
   * @throws Will throw an error if the upload fails.
   */
  async PostUploadDocument(formData: FormData): Promise<DocumentListResponse> {
    try {
      return await this.$fetch<DocumentListResponse>(`${this.endpoint}`, {
        method: 'POST',
        body: formData,
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
   * Deletes a document from the server by its ID.
   * @param id - The unique identifier of the document to be deleted.
   * @returns A promise that resolves when the document is successfully deleted.
   * @throws Will throw an error if the deletion fails, providing the appropriate status code and message.
   */
  async DeleteDocument(id: string): Promise<void> {
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

  /**
   * Parses a document.
   * @param id - The id of the document.
   * @param ParserConfig - The ParserConfig object containig parametares for parser.
   * @returns A promise that resolves to the string response.
   * @throws Will throw an error if the upload fails.
   */
  async PostParseDocumentPreview(id: string, ParserConfig?: ParserConfig): Promise<string> {
    try {
      return await this.$fetch<string>(`${this.endpoint}/${id}/parse/preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: ParserConfig,
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to parse document with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Chunk a document.
   * @param id - The id of the document.
   * @param ChunkerConfig - The ChunkerConfig object containig parametares for chunker.
   * @param embedder - The name of the document embedder.
   * @returns A promise that resolves to the string response.
   * @throws Will throw an error if the upload fails.
   */
  async PostChunkDocumentPreview(id: string, chunkDocumentBody?: ChunkerConfig, embedder?: string): Promise<string> {
    try {
      return await this.$fetch<string>(`${this.endpoint}/${id}/chunk/preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { chunker: chunkDocumentBody, embedder },
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to chunk document with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Update document config.
   * @param id - The id of the document.
   * @param documentConfig - The documentConfig object containig parametares for parser and chunker.
   * @returns A promise that resolves to the string response.
   * @throws Will throw an error if the upload fails.
   */
  async PutUpdateDocumentConfig(id: string, documentConfig?: DocumentConfig): Promise<string> {
    try {
      return await this.$fetch<string>(`${this.endpoint}/${id}/config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: documentConfig,
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to chunk document with code ${error?.statusCode}`,
      })
    }
  }
}
