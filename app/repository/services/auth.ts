import { createError } from 'h3'
import FetchFactory from '../fetchFactory'
import type { User } from '~/types/auth'

export default class AuthService extends FetchFactory {
  /**
   * Logs out the current authenticated user.
   * @returns A promise that resolves to a success message upon successful logout.
   * @throws Will throw an error if the request fails.
   */
  async Logout(): Promise<void> {
    try {
      await fetch('/api/oauth/logout', {
        credentials: 'include',
        method: 'GET',
      })
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
  async GetCurrentUser(): Promise<{ user: User, expiresAt: number }> {
    try {
      const response = await fetch('/api/oauth/user', {
        credentials: 'include',
        method: 'GET',
      })

      if (response.status !== 200) {
        throw createError({
          statusCode: response.status,
          statusMessage: 'Failed to fetch current user',
        })
      }

      const { user, expiresAt } = await response.json()

      return {
        user: {
          id: user.sub,
          fullName: user.name,
          email: user.email,
          avatar: user.avatar,
          entitlements: user.entitlements,
        },
        expiresAt,
      }
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || 'Failed to fetch current user',
      })
    }
  }

  Refresh = async (): Promise<void> => {
    try {
      const response = await fetch('/api/oauth/refresh', {
        credentials: 'include',
        method: 'GET',
      })

      if (response.status !== 200) {
        throw createError({
          statusCode: response.status,
          statusMessage: 'Failed to refresh token',
        })
      }

      response.json().then(({ expiresIn }) => {
        const timeout
          = expiresIn > 30 ? (expiresIn - 30) * 1000 : expiresIn * 1000
        console.log(`refreshing in: ${timeout / 1000}s`)
        setTimeout(this.Refresh, timeout)
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || 'Failed to refresh token',
      })
    }
  }
}
