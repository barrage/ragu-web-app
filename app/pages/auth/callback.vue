<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
  layout: 'auth-layout',
})

const authStore = useAuthStore()
const config = useRuntimeConfig()

const route = useRoute()
const router = useRouter()

const code = route.query.code as string
const state = route.query.state as string

const pkceCodeVerifier = sessionStorage.getItem(config.public.keys.pkceVerifier)
const stateVerifier = sessionStorage.getItem(config.public.keys.stateVerifier)

sessionStorage.removeItem(config.public.keys.pkceVerifier)
sessionStorage.removeItem(config.public.keys.stateVerifier)

// Debug / sanity checks
if (!code) { console.error('No authorization code found in URL.') }
if (!pkceCodeVerifier) { console.error('PKCE verifier missing.') }
if (!stateVerifier) { console.error('State verifier missing.') }
if (stateVerifier !== state) { console.error('State mismatch.') }

if (code && pkceCodeVerifier && stateVerifier === state) {
  const body = JSON.stringify({
    // State verification is done here and when obtaining the token.
    state,
    // Has to be passed in full, including the query parameters due to the
    // way the underlying library validates the URL.
    // The code is included in the URL.
    currentUri: window.location.href,
    pkceCodeVerifier,
  })

  try {
    await fetch(`/api/oauth/token`, {
      method: 'POST',
      body,
      credentials: 'include', // Ensures cookies are sent/received
    })

    await authStore.GET_CurrentUser()

    router.replace('/')
  }
  catch (e) {
    console.error(e)
    router.replace('/login')
  }
}
else {
  router.replace('/login')
}
</script>

<template>
  <LlmOverlayLoader />
</template>
