<script lang="ts" setup>
import type { OAuthProvider } from '~/types/auth'
import GoogleLogo from '~/assets/icons/svg/google.svg'
import AaiEduLogo from '~/assets/icons/svg/aai-edu.svg'

interface Emits {
  (event: 'redirection'): void
}
interface AuthProviderConfig {
  name: OAuthProvider
  show: boolean
  logo: string | Component
  text: string
  authUrl: string
  client_id: string
  additionalParams: string | null
  scopes: string
}
type AuthConfig = Record<string, AuthProviderConfig>
type AuthScope = Record<string, string[]>

const emits = defineEmits<Emits>()

// CONSTANTS
const runtimeConfig = useRuntimeConfig()
const enableCarnetLogin = ref(runtimeConfig.public.enableAAIEduLogin === 'true')
const btnLoading = ref(false)

const scopes: AuthScope = {
  google: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'openid',
  ],
  carnet: [
    'openid',
    'email',
  ],
}

const oAuthConfig: AuthConfig = {
  google: {
    name: 'google',
    show: true,
    logo: GoogleLogo,
    text: 'Google',
    authUrl: runtimeConfig.public.oAuthGoogleUrl,
    client_id: runtimeConfig.public.googleOAuthClientId as string,
    additionalParams: '&access_type=offline&include_granted_scopes=true',
    scopes: scopes.google?.join(' ') as string,
  },
  carnet: {
    name: 'carnet',
    show: enableCarnetLogin.value,
    logo: AaiEduLogo,
    text: 'AAI@Edu',
    authUrl: runtimeConfig.public.oAuthAAIEduUrl,
    client_id: runtimeConfig.public.oAuthAAIEduLoginClientId as string,
    additionalParams: '&access_type=offline&include_granted_scopes=true',
    scopes: scopes.carnet?.join(' ') as string,
  },
}

async function generateCodeVerifier(): Promise<string> {
  const array = new Uint8Array(32)
  window.crypto.getRandomValues(array)

  const base64String = String.fromCharCode.apply(null, array as any)

  let base64 = btoa(base64String)

  base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

  return base64
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

async function socialSignIn(provider: OAuthProvider) {
  btnLoading.value = true
  const codeVerifier = await generateCodeVerifier()
  const codeChallenge = await generateCodeChallenge(codeVerifier)

  sessionStorage.setItem('pkce_code_verifier', codeVerifier)

  let redirectUrl = ''
  const protocol = window.location.protocol
  const hostname = window.location.hostname
  const port = window.location.port ? `:${window.location.port}` : ''
  const URI = `${protocol}//${hostname}${port}/auth/${provider}`

  if (provider === 'google') {
    redirectUrl = `${oAuthConfig.google?.authUrl}?client_id=${oAuthConfig.google?.client_id}&scope=${encodeURIComponent(
      oAuthConfig.google?.scopes ?? '',
    )}&redirect_uri=${encodeURIComponent(URI)}&response_type=code&code_challenge_method=S256&code_challenge=${codeChallenge}${oAuthConfig.google?.additionalParams}`
  }
  else if (provider === 'carnet' && enableCarnetLogin.value) {
    redirectUrl = `${oAuthConfig.carnet?.authUrl}?client_id=${oAuthConfig.carnet?.client_id}&scope=${encodeURIComponent(
      oAuthConfig.carnet?.scopes ?? '',
    )}&redirect_uri=${encodeURIComponent(URI)}&response_type=code&code_challenge_method=S256&code_challenge=${codeChallenge}${oAuthConfig.carnet?.additionalParams}`
  }

  if (redirectUrl) {
    emits('redirection')
    // Wait for out-animation
    setTimeout(() => window.location.href = redirectUrl, 1000)
  }
  else { btnLoading.value = false }
}
</script>

<template>
  <div class="social-container">
    <template
      v-for="option in oAuthConfig"
      :key="option.name"
    >
      <ElButton
        v-if="option.show"
        type="primary"
        class="social"
        :loading="btnLoading"
        @click="socialSignIn(option.name)"
        @keyup.enter="socialSignIn(option.name)"
      >
        <component
          :is="option.logo"
          size="24px"
          name="google"
          original
        />
        <p class="semi-bold">
          {{ `${$t('login.continueWith')} ${option.text}` }}
        </p>
      </ElButton>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.social-container {
  margin-block: 1.75rem;

  min-width: max-content;
  & .social {
    height: 58px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 12px 20px;
    border: 1px solid var(--color-primary-300);
    width: 100%;

    border-radius: 8px;
    transition: 0.3s;
    &:not(:last-child) {
      margin-bottom: 1.25rem;
    }
    & p {
      margin-left: 10px;
      color: var(--color-primary-900);
    }
    &.social--disabled {
      cursor: not-allowed;
      opacity: 0.8;
    }
  }

  .microsoft {
    opacity: 0.7;
    pointer-events: none;

    & p {
      text-decoration: line-through;
    }
  }
}

.dark {
  & .social {
    border: 1px solid var(--color-primary-600);
    color: var(--color-primary-0);
    & p {
      color: var(--color-primary-0);
    }
  }
}
</style>
