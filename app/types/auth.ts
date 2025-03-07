export type OAuthProvider = "google" | "carnet" | "microsoft";

export interface OAuthPayload {
  code: string | string[];
  redirect_uri: string;
  provider: OAuthProvider;
  source: string;
  grant_type: string;
  code_verifier: string | null;
}

export interface tfa {
  auth2FAEnabled: boolean;
  authenticated: boolean;
}
export interface AuthResponse {
  success: boolean;
  csrf: string;
  tfa: tfa;
  token?: string;
}
/**
 * User object obtained from the authorization server.
 */
export interface User {
  id: string;
  email: string;
  fullName: string;
  entitlements: UserEntitlement[];
  avatar?: string;
}
export type UserEntitlement = "user" | "admin";
