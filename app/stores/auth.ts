import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useNuxtApp } from '#app'
import type { OAuthPayload, OAuthProvider, User } from '~/types/auth'

export const useAuthStore = defineStore('auth', () => {
  // TYPES
  type UserRole = 'user' | 'admin'

  // CONSTANTS
  const { $api } = useNuxtApp()

  // STATE
  const user = ref<User | null>(null)
  const selectedRole = ref<UserRole | null>(null)
  const isAuthenticated = ref<boolean>(false)
  const iscurrentUserLoading = ref<boolean>(true)

  // ACTIONS

  /**
   * Fetch the current user's information.
   */
  async function GET_CurrentUser() {
    iscurrentUserLoading.value = true
    try {
      const currentUser = await $api.auth.GetCurrentUser()

      user.value = currentUser
      selectedRole.value = currentUser.role as UserRole
      isAuthenticated.value = true
    }
    catch (error) {
      console.error('Failed fetch current user', error)
      isAuthenticated.value = false
    }
    finally {
      iscurrentUserLoading.value = false
    }
  }

  /**
   * Login user using OAuth provider (Google, Microsoft, etc.).
   * @param code - The authorization code returned from OAuth provider.
   * @param provider - The OAuth provider (e.g., 'google', 'microsoft').
   * @param source - The source of the login request (e.g., 'web', 'ios').
   */
  async function POST_Login(code: string, provider: OAuthProvider, source: string) {
    const payload: OAuthPayload = {
      code,
      redirect_uri: `${window.location.origin}/auth/${provider}`,
      provider,
      source,
      grant_type: 'authorization_code',
    }

    await $api.auth.Login(payload)
    await GET_CurrentUser()
  }

  /**
   * Logout the current user.
   */
  async function POST_Logout() {
    await $api.auth.Logout()
    user.value = null
  }

  return {
    user,
    selectedRole,
    isAuthenticated,
    iscurrentUserLoading,
    POST_Login,
    POST_Logout,
    GET_CurrentUser,
  }
})
