import { defineStore } from 'pinia'
import type { Collection, CollectionDetail, CollectionListResponse } from '~/types/collection'

export const useCollectionsStore = defineStore('collection', () => {
  // State

  const { $api } = useNuxtApp()

  // Constants

  const collectionResponse = ref<CollectionListResponse | null >()
  const singleCollection = ref<Collection | null>()
  const collections = computed<Collection[]>(() => {
    return collectionResponse.value?.items || []
  })
  const newCollection = ref()
  const listEmbeddingsModels = ref<Record<string, number>>({})

  /* API */

  async function GET_AllCollections(page: number = 1, perPage: number = 20): Promise<CollectionListResponse | null> {
    const data = await $api.collection.GetAllCollections(page, perPage)

    if (data) {
      return collectionResponse.value = data
    }
    else {
      return collectionResponse.value = null
    }
  }

  async function GET_SingleCollection(collectionId: string): Promise<Collection | null | undefined> {
    const data = await $api.collection.GetSingleCollection(collectionId)

    if (data) {
      singleCollection.value = data
      return data
    }

    else {
      singleCollection.value = null
    }
  }

  async function DELETE_Collection(id: string): Promise<void> {
    await $api.collection.DeleteCollection(id)
  }

  async function POST_CreateCollection(body: CollectionDetail): Promise<CollectionDetail | null> {
    const data = $api.collection.CreateCollection(body)

    if (data) {
      return newCollection.value = data
    }
    else {
      return newCollection.value = null
    }
  }

  async function GET_ListEmbeddingModels(provider: string): Promise<any | null > {
    const data = await $api.collection.GetListEmbeddingModels(provider)

    if (data) {
      return listEmbeddingsModels.value = data
    }
    else {
      return listEmbeddingsModels.value = {}
    }
  }

  return {
    collectionResponse,
    singleCollection,
    collections,
    newCollection,
    listEmbeddingsModels,
    GET_AllCollections,
    GET_SingleCollection,
    DELETE_Collection,
    POST_CreateCollection,
    GET_ListEmbeddingModels,
  }
})
