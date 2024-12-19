import { defineStore } from 'pinia'
import type { ChunkerConfig, Document, DocumentConfig, DocumentListResponse, ParserConfig } from '~/types/document'

export const useDocumentsStore = defineStore('document', () => {
  // State
  const documentsDataEmpty = ref(false)
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

  async function GET_SingleDocument(id: string): Promise<Document | null> {
    try {
      const data = await $api.document.GetSingleDocument(id)
      selectedDocument.value = data
      return selectedDocument.value
    }
    catch (error) {
      console.error('Failed to fetch single document:', error)
      selectedDocument.value = null
      return null
    }
  }

  const newDocumentUploaded = ref(false)
  const documentDeleted = ref(false)

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

  async function POST_ChunkDocumentPreview(id: string, chunkDocumentBody?: ChunkerConfig): Promise<string | null> {
    try {
      loadingChunkPreview.value = true
      const response = await $api.document.PostChunkDocumentPreview(id, chunkDocumentBody)

      if (response) {
        return chunkPreview.value = response
      }
      else {
        return chunkPreview.value = null
      }
    }
    catch (error) {
      console.error('Error chunking document:', error)
      throw error
    }
    finally {
      loadingChunkPreview.value = false
    }
  }

  /* CONFIG */

  async function PUT_UpdateDocumentConfig(id: string, documentConfig?: DocumentConfig): Promise<string | null> {
    return await $api.document.PutUpdateDocumentConfig(id, documentConfig)
  }

  return {
    documentsDataEmpty,
    documentResponse,
    selectedDocument,
    parserPreview,
    loadingParsePreview,
    chunkPreview,
    loadingChunkPreview,
    newDocumentUploaded,
    documentDeleted,
    GET_AllDocuments,
    GET_SingleDocument,
    DELETE_Document,
    POST_ParseDocumentPreview,
    POST_ChunkDocumentPreview,
    PUT_UpdateDocumentConfig,
  }
})
