export type OAuthProvider = 'google' | 'microsoft'

export interface OAuthPayload {
  code: string | string[]
  provider: OAuthProvider
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
  name: string
  email: string
  token: string

}
