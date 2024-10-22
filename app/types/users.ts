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
