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

export interface SnappingChunkerConfig {
  size: number
  overlap: number
}

export interface SnappingChunker {
  snapping: {
    config: SnappingChunkerConfig
    skipForward: string[]
    skipBack: string[]
    delimiter: string
  }
}
export interface SlidingChunkerConfig {
  size: number
  overlap: number
}

export interface SlidingChunker {
  sliding: {
    config: SlidingChunkerConfig
  }
}

export interface SemanticChunkerConfig {
  size: number
  threshold: number
  distanceFn: string
  delimiter: string
  skipForward: string[]
  skipBack: string[]
  embedModel: string
}

export interface SemanticChunker {
  semantic: {
    config: SemanticChunkerConfig
  }
}

export type ChunkerConfig = SlidingChunker | SnappingChunker | SemanticChunker

export interface DocumentConfig {
  parser: ParserConfig | null
  chunker: ChunkerConfig | null
}
