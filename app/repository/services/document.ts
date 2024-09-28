import FetchFactory from '../fetchFactory'
import type { Document, DocumentListResponse, ParseDocumentBody } from '~/types/document.ts'

export default class DocumentServise extends FetchFactory {
  // Endpoint for documents-related API requests.
  private readonly endpoint: string = '/documents'

  /**
   * Fetches a list of all documents.
   * @returns A promise that resolves to an DocumentListResponse type.
   * @throws Will throw an error if the request fails.
   */
  async GetAllDocuments(): Promise<DocumentListResponse> {
    try {
      return await this.$fetch<DocumentListResponse>(`${this.endpoint}`)
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
   * Uploads a document to the server.
   * @param formData - The FormData object containing the file to upload.
   * @returns A promise that resolves to the uploaded document's response.
   * @throws Will throw an error if the upload fails.
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
   * @param parseDocumentBody - The parseDocumentBody object containig parametares for parser.
   * @returns A promise that resolves to the string response.
   * @throws Will throw an error if the upload fails.
   */
  async PostParseDocument(id: string, parseDocumentBody?: ParseDocumentBody): Promise<string> {
    try {
      return await this.$fetch<string>(`${this.endpoint}/${id}/parse/preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: parseDocumentBody,
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to upload document with code ${error?.statusCode}`,
      })
    }
  }
}
