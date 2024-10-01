export interface Collection {
  id: string
  name: string
  model: string
  embedder: string
  provider: string
  createdAt: string
  updatedAt: string
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


