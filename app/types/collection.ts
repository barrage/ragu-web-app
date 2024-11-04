export interface CollectionResponse {
  collection: Collection
  totalDocuments: number
  documents: Document[]
}

export interface Collection {
  id: string
  name: string
  model: string
  embedder: string
  provider: string
  createdAt: Date
  updatedAt: Date
}

export interface Document {
  id: string
  name: string
}

export interface CollectionListResponse {
  total: number
  items: Collection[]
}

export interface CollectionDetail {
  name: string
  model: string
  vectorProvider: string
  embeddingProvider: string
}
