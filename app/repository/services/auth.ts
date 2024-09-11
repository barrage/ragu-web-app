import FetchFactory from '../fetchFactory'
import type { AuthResponse, OAuthPayload } from '~/types/auth'

export default class AuthService extends FetchFactory {
  // Endpoint for product-related API requests.
  private readonly endpoint: string = '/auth'
  /**
   * Logs in a user using OAuth authentication.
   * @param payload - The payload containing the OAuth provider and authorization code.
   * @returns A promise that resolves to an AuthResponse object containing authentication details.
   * @throws Will throw an error if the request fails.
   */
  async loginOAuth(payload: OAuthPayload): Promise<AuthResponse> {
    try {
      return await this.$fetch<AuthResponse>(
        `${this.endpoint}/${payload.provider}/oauth?code=${payload.code}`,
        {
          method: 'POST',
          headers: {
            'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        },
      )
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch product with code ${error?.statusCode}`,
      })
    }
  }
}
