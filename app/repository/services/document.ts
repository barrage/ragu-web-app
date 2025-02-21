import FetchFactory from '../fetchFactory'
import type { Search } from '~/types/collection'
import type { ChunkerConfig, Document, DocumentConfig, DocumentListResponse, GoogleDriveImportResponse, ParserConfig } from '~/types/document.ts'

export default class DocumentServise extends FetchFactory {
  [x: string]: any
  // Endpoint for documents-related API requests.
  private readonly endpoint: string = '/documents'
  private readonly googleEndpoint: string = '/external/google'

  /**
   * Fetches a paginated and sorted list of documents.
   * @param page - The page number to fetch.
   * @param perPage - The number of users per page.
   * @param sortBy - The field to sort by (e.g., 'createdAt').
   * @param sortOrder - The order of sorting ('asc' or 'desc').
   * @returns A promise that resolves to an DocumentListResponse type.
   * @throws Will throw an error if the request fails.
   */
  async GetAllDocuments(page: number = 1, perPage: number = 10, sortBy: string = 'name', sortDir: 'asc' | 'desc' = 'asc', ready?: boolean | undefined, search?: Search): Promise<DocumentListResponse> {
    try {
      const queryParams: Record<string, string> = {
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy,
        sortDir,
      }

      if (search?.q) {
        queryParams.q = search.q
        queryParams.column = search.column || 'name' // Default to 'name' if not provided
      }

      if (ready !== undefined && ready !== null) {
        queryParams.ready = ready.toString()
      }

      const queryString = new URLSearchParams(queryParams).toString()

      return await this.$fetch<DocumentListResponse>(`${this.endpoint}?${queryString}`)
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch collections with code ${error?.statusCode}`,
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
  async PostChunkDocumentPreview(id: string, chunkDocumentBody?: ChunkerConfig): Promise<string> {
    try {
      return await this.$fetch<string>(`${this.endpoint}/${id}/chunk/preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { chunker: chunkDocumentBody },
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

  /**
   * Import Google Drive file.
   * @param payload - The payload object containing the file ID and name.
   * @returns A promise that resolves to the Document type.
   * @throws Will throw an error if the upload fails.
   */
  async ImportGoogleDriveFile(payload: { files: string[], force?: boolean }, accessToken: string): Promise<GoogleDriveImportResponse> {
    try {
      return await this.$fetch(`${this.googleEndpoint}/documents/import`, {
        method: 'POST',
        query: {
          force: payload.force,
        },
        body: {
          files: payload.files,
        },
        headers: {
          'X-Google-Drive-Access-Token': accessToken,
        },
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to import Google Drive files with code ${error?.statusCode}`,
      })
    }
  }
}
