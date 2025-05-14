export interface Document {
  id: string
  name: string
  path: string
  ext: string
  hash: string
  src: string
  label: string | null
  tags: string[] | null
  createdAt: string
  updatedAt: string
  chunkConfig: ChunkerConfig | null
  parseConfig: ParserConfig | null
}

export interface StringParserMode {
  start: number
  end: number
  range: boolean
  filters: string[]
}

export interface ParserPreviewResponse {
  text: {
    string: string
  }
  images: string[]
  totalTokens: TokenCount
}

export interface DocumentListResponse {
  documents: Document[]
  errors: any
  items?: Document[]
  total?: number
}

export interface ParserConfig {
  mode: {
    string: StringParserMode
  }
  includeImages: boolean
}

export interface TokenCount {
  cl100k: number
  o200k: number
}

export interface ChunkItem {
  chunk: string
  tokenCount: TokenCount
}

export interface ChunkerResponse {
  chunks: ChunkItem[]
  images: string[]
  totalTokensPre: TokenCount
  totalTokensPost: TokenCount
}

export interface SnappingChunker {
  snapping: {
    size: number
    overlap: number
    delimiter: string
    skipF: string[]
    skipB: string[]
  }
}
export interface SlidingChunkerConfig {
  size: number
  overlap: number
}

export interface SlidingChunker {
  sliding: SlidingChunkerConfig

}

export interface SemanticChunkerConfig {
  size: number
  threshold: number
  distanceFn: string
  delimiter: string
  skipF: string[]
  skipB: string[]
  embeddingModel: string
  embeddingProvider: string
}

export interface SemanticChunker {
  semantic: SemanticChunkerConfig

}

export type ChunkerConfig = SlidingChunker | SnappingChunker | SemanticChunker

export interface DocumentConfig {
  parser: ParserConfig | null
  chunker: ChunkerConfig | null
}

export interface GoogleDriveImportResponse {
  failed: Failed[]
  skipped: Success[]
  success: Success[]
}

export interface Failed {
  error: string
  fileId: string
  fileName: string
}

export interface Success {
  createdAt: Date | string
  ext: string
  hash: string
  id: string
  label: string
  name: string
  path: string
  src: string
  tags: string[]
  updatedAt: Date | string
}
export interface DocumentListFilterForm {
  ready?: boolean | undefined
}
