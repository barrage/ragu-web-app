import type { ChunkerConfig } from '~/types/document.ts'

export interface EmbeddingProvider {
  [key: string]: {
    [modelName: string]: number
  }
};

export interface AppConfig {
  vectorProviders: string[]
  embeddingProviders: EmbeddingProvider
  defaultChunkers: (ChunkerConfig)[]
  supportedDocumentTypes: string[]
  documentProviders: string[]
}
