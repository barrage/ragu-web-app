import { defineStore } from 'pinia'
import type { ChunkerConfig, Document, DocumentConfig, DocumentListResponse, ParserConfig } from '~/types/document'

export const useDocumentsStore = defineStore('document', () => {
  // State

  const documentResponse = ref<DocumentListResponse | null >()
  const { $api } = useNuxtApp()

  /* API */

  async function GET_AllDocuments(page: number = 1, perPage: number = 10, sortBy?: string, sortOrder: 'asc' | 'desc' = 'asc', ready?: boolean): Promise<DocumentListResponse | null > {
    const data = await $api.document.GetAllDocuments(page, perPage, sortBy, sortOrder, ready)

    if (data) {
      return documentResponse.value = data
    }
    else {
      return documentResponse.value = null
    }
  }

  const selectedDocument = ref<Document | null>(null)

  async function GET_SingleDocument(id: string): Promise<Document | null > {
    const data = await $api.document.GetSingleDocument(id)

    if (data) {
      return selectedDocument.value = data
    }
    else {
      return selectedDocument.value = null
    }
  }

  async function GET_SyncFs() {
    await $api.document.GetSyncFs()
  }

  async function POST_UploadDocument(file: File): Promise<DocumentListResponse | null> {
    const formData = new FormData()
    formData.append('file', file)
    return await $api.document.PostUploadDocument(formData)
  }

  async function DELETE_Document(id: string): Promise<void> {
    try {
      await $api.document.DeleteDocument(id)
    }
    catch (error: any) {
      console.error(`Error deleting document with ID ${id}:`, error)
    }
  }
  /* PARSER */
  const parserPreview = ref<string | null>(null)
  const loadingParsePreview = ref<boolean>(false)
  async function POST_ParseDocumentPreview(id: string, ParserConfig?: ParserConfig): Promise<string | null> {
    try {
      loadingParsePreview.value = true
      const response = await $api.document.PostParseDocumentPreview(id, ParserConfig)

      if (response) {
        return parserPreview.value = response
      }
      else {
        return parserPreview.value = null
      }
    }
    catch (error) {
      console.error('Error parsing document:', error)
      return null
    }
    finally {
      loadingParsePreview.value = false
    }
  }
  /* CHUNKER */
  const chunkPreview = ref<string | null>(null)
  const loadingChunkPreview = ref<boolean>(false)

  async function POST_ChunkDocumentPreview(id: string, chunkDocumentBody?: ChunkerConfig, embedder?: string): Promise<string | null> {
    try {
      loadingChunkPreview.value = true
      const response = await $api.document.PostChunkDocumentPreview(id, chunkDocumentBody, embedder)

      if (response) {
        return chunkPreview.value = response
      }
      else {
        return chunkPreview.value = null
      }
    }
    catch (error) {
      console.error('Error chunking document:', error)
      return null
    }
    finally {
      loadingChunkPreview.value = false
    }
  }

  /* CONFIG */

  const configUpdate = ref()
  async function PUT_UpdateDocumentConfig(id: string, documentConfig?: DocumentConfig): Promise<string | null> {
    try {
      const response = await $api.document.PutUpdateDocumentConfig(id, documentConfig)

      if (response) {
        return configUpdate.value = response
      }
      else {
        return configUpdate.value = null
      }
    }
    catch (error) {
      console.error('Error chunking document:', error)
      return null
    }
  }

  return {
    documentResponse,
    selectedDocument,
    parserPreview,
    loadingParsePreview,
    chunkPreview,
    loadingChunkPreview,
    GET_AllDocuments,
    GET_SingleDocument,
    GET_SyncFs,
    DELETE_Document,
    POST_UploadDocument,
    POST_ParseDocumentPreview,
    POST_ChunkDocumentPreview,
    PUT_UpdateDocumentConfig,
  }
})
