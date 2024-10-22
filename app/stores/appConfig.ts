import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { AppConfig } from '~/types/appConfig'

export const useAppConfigStore = defineStore('appConfig', () => {
  /* Service */
  const { $api } = useNuxtApp()

  // State
  const appConfig = ref<AppConfig | null>(null)

  /* API */
  async function GET_AppConfig(): Promise<AppConfig | null> {
    const data = await $api.appConfig.GetAppConfig()

    if (data) {
      return (appConfig.value = data)
    }
    else {
      return (appConfig.value = null)
    }
  }

  // Computed properties
  const vectorProviders = computed(() => appConfig.value?.vectorProviders || [])

  const embeddingProviders = computed(() => appConfig.value?.embeddingProviders || {})

  const defaultChunkers = computed(() => appConfig.value?.defaultChunkers || [])

  const slidingChunker = computed(() =>
    defaultChunkers.value.find(chunker => 'sliding' in chunker),
  )

  const snappingChunker = computed(() =>
    defaultChunkers.value.find(chunker => 'snapping' in chunker),
  )

  const semanticChunkers = computed(() =>
    defaultChunkers.value.filter(chunker => 'semantic' in chunker),
  )

  const fembedEmbeddingModels = computed(() =>
    embeddingProviders.value?.fembed || {},
  )

  const openaiEmbeddingModels = computed(() =>
    embeddingProviders.value?.openai || {},
  )

  return {
    appConfig,
    GET_AppConfig,
    vectorProviders,
    embeddingProviders,
    defaultChunkers,
    slidingChunker,
    snappingChunker,
    semanticChunkers,
    fembedEmbeddingModels,
    openaiEmbeddingModels,
  }
})
