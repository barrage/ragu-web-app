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

export interface DocumentListResponse {
  total: number
  items: Document[]
}

export interface ParserConfig {
  start: number
  end: number
  range: boolean
  filters: string[]
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
