import { defineStore } from 'pinia'
import type { Document, DocumentListResponse, ParseDocumentBody } from '~/types/document.ts'

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

  const parserPreview = ref<string | null>()

  async function POST_ParseDocument(id: string, parseDocumentBody?: ParseDocumentBody): Promise<string | null> {
    try {
      const response = await $api.document.PostParseDocument(id, parseDocumentBody)

      if (response) {
        return parserPreview.value = response
      }
      else {
        return parserPreview.value = null
      }
    }
    catch (error) {
      console.error('Error uploading document:', error)
      return null
    }
  }

  return {
    documentResponse,
    selectedDocument,
    GET_AllDocuments,
    GET_SingleDocument,
    POST_UploadDocument,
    DELETE_Document,
    POST_ParseDocument,
  }
})
