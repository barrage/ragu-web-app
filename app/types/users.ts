export interface User {
  id: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  role: string
  active: boolean
  createdAt: string | number | Date
  updatedAt: string | number | Date
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
