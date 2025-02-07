export interface User {
  id: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  role: string
  active: boolean
  createdAt: string | Date
  updatedAt: string | Date
  avatar?: string
}

export interface UsersResponse {
  items: User[]
  total: number
}

export interface CreateUserPayload {
  email: string
  fullName: string
  firstName: string
  lastName: string
  role: string
}
export interface EditUserPayload {
  active: boolean
  email: string
  fullName: string
  firstName: string
  lastName: string
  role: string
}

export interface ImportedUser {
  fullName: string
  firstName?: string
  lastName?: string
  email: string
  role: string
  skipped: boolean
}

export interface FailedImportUser {
  line: number | string
  type: 'validation' | 'missing_fields' | string
  message: string[]
}

export interface ImportUsersResult {
  successful: ImportedUser[]
  failed: FailedImportUser[]
}

export interface UsersListFilterForm {
  status?: boolean | undefined
  role?: string | undefined
}

export interface CreateUserOption {
  name: string
  description: string
  id: string
  href: string
  icon: string
}
