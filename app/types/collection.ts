export interface CollectionResponse {
  collection: Collection
  totalDocuments: number
  documents: Document[]
}

export interface Collection {
  id: string
  name: string
  collection?: string
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

export interface AssignCollectionPayload {
  add?: AddCollection[]
  remove?: RemoveCollection[]
}

export interface AddCollection {
  name: string
  amount: number
  instruction: string
  provider: string
}

export interface RemoveCollection {
  name: string
  provider: string
}

export interface SearchDocumentsRequest {
  collectionId: string
  limit: number
  query: string
}

export interface Search {
  column: string
  q: string
}
