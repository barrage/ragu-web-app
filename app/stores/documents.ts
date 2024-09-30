import { defineStore } from 'pinia'
import type { ChunkerConfig, Document, DocumentConfig, DocumentListResponse, ParserConfig } from '~/types/document.ts'

export const useDocumentsStore = defineStore('document', () => {
  // State

  const documentResponse = ref<DocumentListResponse | null >()
  const { $api } = useNuxtApp()

  /* API */

  async function GET_AllDocuments(): Promise<DocumentListResponse | null > {
    const data = await $api.document.GetAllDocuments()

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

  async function POST_UploadDocument(file: File): Promise<DocumentListResponse | null> {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await $api.document.PostUploadDocument(formData)

      if (response) {
        return documentResponse.value = response
      }
      else {
        return documentResponse.value = null
      }
    }
    catch (error) {
      console.error('Error uploading document:', error)
      return null
    }
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

  async function POST_ParseDocumentPreview(id: string, ParserConfig?: ParserConfig): Promise<string | null> {
    try {
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
  }
  /* CHUNKER */
  const chunkPreview = ref<string | null>(null)
  async function POST_ChunkDocumentPreview(id: string, chunkDocumentBody?: ChunkerConfig): Promise<string | null> {
    try {
      const response = await $api.document.PostChunkDocumentPreview(id, chunkDocumentBody)

      if (response) {
        return parserPreview.value = response
      }
      else {
        return parserPreview.value = null
      }
    }
    catch (error) {
      console.error('Error chunking document:', error)
      return null
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
    chunkPreview,
    GET_AllDocuments,
    GET_SingleDocument,
    DELETE_Document,
    POST_UploadDocument,
    POST_ParseDocumentPreview,
    POST_ChunkDocumentPreview,
    PUT_UpdateDocumentConfig,
  }
})
