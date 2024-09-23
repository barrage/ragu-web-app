// stores/auth.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getDomain } from '@/utils/domainUtils'
import { useNuxtApp } from '#app'
import type { AuthResponse, OAuthPayload, OAuthProvider, User } from '~/types/auth'

export const useAuthStore = defineStore('auth', () => {
  // CONSTANTS
  const { $api } = useNuxtApp()
  const router = useRouter()

  // STATE
  const user = ref<User | null>(null) // Stores authenticated user info
  const fakeUserId = ref('660a7998-2a27-11ee-be56-0242ac120002')
  const isAuthenticated = computed(() => !!user.value) // Checks if the user is authenticated
  const selectedRole = ref<'user' | 'admin'>('user')
  const error = ref<string | null>(null) // Stores error messages

  // ACTIONS
  async function loginWithOAuth(payload: OAuthPayload): Promise<AuthResponse> {
    const data = await $api.auth.loginOAuth(payload)

    // Use useCookie composable to set cookies
    if (data?.csrf) {
      const csrfCookie = useCookie('X-CSRF-TOKEN', {
        path: '/',
        secure: true,
      })
      csrfCookie.value = data.csrf

      const sessionCookie = useCookie('app-session', {
        domain: getDomain(),
        path: '/',
        secure: true,
      })
      sessionCookie.value = 'true'

      // Navigate to dashboard
      router.push('/')
    }
    if (data?.token) {
      router.push(`/verify-token?token=${data.token}&requiresTos=true`)
    }

    return data
  }

  async function handleOAuthLogin() {
    const code = router.currentRoute.value.query.code
    const provider: OAuthProvider | '' = ['google', 'microsoft'].includes(
      router.currentRoute.value.params.provider as OAuthProvider,
    )
      ? (router.currentRoute.value.params.provider as OAuthProvider)
      : ''

    if (provider) {
      await loginWithOAuth({ code, provider })
      return 'success'
    }
    else {
      router.push('/login')
      return 'redirect'
    }
  }
  return {
    user,
    isAuthenticated,
    fakeUserId,
    error,
    selectedRole,
    loginWithOAuth,
    handleOAuthLogin,

  }
})
