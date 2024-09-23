export interface User {
  id: string
  name: string
  phone: string
  createdAt: string
  updatedAt: string
}

export type UsersResponse = User[]
