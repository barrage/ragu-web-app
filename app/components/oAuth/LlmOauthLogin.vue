<script lang="ts" setup>
import type { OAuthProvider } from '~/types/auth'
import GoogleLogo from '~/assets/icons/svg/google.svg'
import MicrosoftLogo from '~/assets/icons/svg/microsoft.svg'

// CONSTANTS
const runtimeConfig = useRuntimeConfig()

const scopes = {
  google: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'openid',
  ],
  microsoft: [
    'openid',
    'email',
    'offline_access',
    'profile',
    'Group.Read.All',
    'User.ReadBasic.All',
    'User.Read',
    'User.Read.All',
    'User.ReadWrite',
  ],
}

const oAuthConfig = {
  google: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    client_id: runtimeConfig.public.oAuthGoogleId as string,
    additionalParams: '&access_type=offline&include_granted_scopes=true',
    scopes: scopes.google.join(' '),
  },
  microsoft: {
    authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    client_id: import.meta.env?.OAUTH_MICROSOFT_LOGIN_CLIENTID as string,
    additionalParams: '&response_mode=query',
    scopes: scopes.microsoft.join(' '),
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
  const codeVerifier = await generateCodeVerifier()
  const codeChallenge = await generateCodeChallenge(codeVerifier)

  sessionStorage.setItem('pkce_code_verifier', codeVerifier)

  let redirectUrl = ''
  const protocol = window.location.protocol
  const hostname = window.location.hostname
  const port = window.location.port ? `:${window.location.port}` : ''
  const URI = `${protocol}//${hostname}${port}/auth/${provider}`

  if (provider === 'google') {
    redirectUrl = `${oAuthConfig.google.authUrl}?client_id=${oAuthConfig.google.client_id}&scope=${encodeURIComponent(
      oAuthConfig.google.scopes,
    )}&redirect_uri=${encodeURIComponent(URI)}&response_type=code&code_challenge_method=S256&code_challenge=${codeChallenge}${oAuthConfig.google.additionalParams}`
  }
  else if (provider === 'microsoft') {
    redirectUrl = `${oAuthConfig.microsoft.authUrl}?client_id=${oAuthConfig.microsoft.client_id}&scope=${encodeURIComponent(
      oAuthConfig.microsoft.scopes,
    )}&redirect_uri=${encodeURIComponent(URI)}&response_type=code&code_challenge_method=S256&code_challenge=${codeChallenge}${oAuthConfig.microsoft.additionalParams}`
  }

  if (redirectUrl) {
    window.location.href = redirectUrl
  }
}
</script>

<template>
  <div class="social-container">
    <div class="social" @click="socialSignIn('google')">
      <GoogleLogo name="google" original />
      <p class="semi-bold">
        {{ $t('login.continueWith') }} Google
      </p>
    </div>
    <div class="social microsoft" @click="socialSignIn('microsoft')">
      <MicrosoftLogo name="microsoft" original />
      <p class="semi-bold">
        {{ $t('login.continueWith') }} Microsoft
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.social-container {
  margin-block: 1.75rem;

  min-width: max-content;
  & .social {
    cursor: pointer;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 12px 20px;
    background-color: var(--color-primary-200);
    border: 1px solid var(--color-primary-300);

    border-radius: 8px;
    transition: 0.3s;
    &:not(:last-child) {
      margin-bottom: 1.25rem;
    }
    &:hover {
      background-color: var(--color-primary-300);
    }
    & p {
      margin-left: 20px;
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
    background: var(--color-primary-700);
    border: 1px solid var(--color-primary-600);
    color: var(--color-primary-0);
    &:hover {
      background-color: var(--color-primary-600);
    }
    & p {
      color: var(--color-primary-0);
    }
  }
}
</style>
