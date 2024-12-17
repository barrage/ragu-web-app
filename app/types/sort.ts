export interface SortOption {
  name: string
  value: string
}

export interface SortingValues {
  direction: 'asc' | 'desc'
  sortProperty: SortOption
}

export interface Sort {
  sortOrder: 'asc' | 'desc'
  sortBy: string
}
