export type OAuthProvider = 'google' | 'microsoft'

export interface OAuthPayload {
  code: string | string[]
  redirect_uri: string
  provider: OAuthProvider
  source: string
  grant_type: string
}

export interface tfa {
  auth2FAEnabled: boolean
  authenticated: boolean
}
export interface AuthResponse {
  success: boolean
  csrf: string
  tfa: tfa
  token?: string

}
export interface User {
  id: string
  email: string
  fullName: string
  firstName: string
  lastName: string
  active: boolean
  role: string
  createdAt: string | Date
  updatedAt: string | Date
}
