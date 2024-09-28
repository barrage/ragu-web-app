export interface Document {
  id: string
  name: string
  path: string
  ext: string
  hash: string
  label: string | null
  tags: string[] | null
  createdAt: string
  updatedAt: string
}

export interface DocumentListResponse {
  total: number
  items: Document[]
}

export interface ParseDocumentBody {
  start: number
  end: number
  range: boolean
  filters: string[]
}
