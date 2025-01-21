import { createError } from 'h3'
import FetchFactory from '../fetchFactory'
import type { AuthResponse, OAuthPayload, User } from '~/types/auth'

export default class AuthService extends FetchFactory {
  // Endpoint for auth-related API requests.
  private readonly endpoint: string = '/auth'
  private readonly userEndpoint: string = '/users'

  /**
   * Logs in a user using email and password authentication.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns A promise that resolves to an AuthResponse object containing authentication details.
   * @throws Will throw an error if the request fails.
   */
  async Login(payload: OAuthPayload) {
    try {
      const response = await this.$fetch<AuthResponse>(
        `${this.endpoint}/login`,
        {
          credentials: 'include',
          method: 'POST',
          body: new URLSearchParams({
            code: payload.code,
            redirect_uri: payload.redirect_uri,
            provider: payload.provider,
            source: payload.source,
            grant_type: payload.grant_type,
            code_verifier: payload.code_verifier,
          }),
        },
      )
      // Set authProvider cookie
      const authProvider = useCookie<string | null>('authProvider')
      authProvider.value = payload.provider

      return response
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || 'Failed to login with Google OAuth',
      })
    }
  }

  /**
   * Logs out the current authenticated user.
   * @returns A promise that resolves to a success message upon successful logout.
   * @throws Will throw an error if the request fails.
   */
  async Logout(): Promise<void> {
    try {
      await this.$fetch<void>(
        `${this.endpoint}/logout`,
        {
          credentials: 'include',
          method: 'POST',

        },
      )
      // Load & remove authProvider cookie
      const authProvider = useCookie<string | null>('authProvider')
      if (authProvider.value === 'carnet') {
        // Close AAI Edu logout page after 500 milliseconds
        const newWindow = window.open(`https://fed-lab.aaiedu.hr/sso/module.php/oidc/logout.php`, '_blank')
        setTimeout(() => {
          if (newWindow) { newWindow.close() }
          else { console.error('Unable to open new window.') }
        }, 500)
      }
      authProvider.value = null
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || 'Failed to logout',
      })
    }
  }

  /**
   * Fetches the current authenticated user's information.
   * @returns A promise that resolves to a User object containing the user's details.
   * @throws Will throw an error if the request fails.
   */
  async GetCurrentUser(): Promise<User> {
    try {
      const queryParams = new URLSearchParams({
        withAvatar: 'true',
      })

      return await this.$fetch<User>(
        `${this.userEndpoint}/current?${queryParams}`,
        {
          credentials: 'include',
          method: 'GET',
        },
      )
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || 'Failed to fetch current user',
      })
    }
  }
}
