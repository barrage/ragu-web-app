<script lang="ts" setup>
import type { OAuthProvider } from '~/types/auth'
import GoogleLogo from '~/assets/icons/svg/google.svg'
import MicrosoftLogo from '~/assets/icons/svg/microsoft.svg'

const scopes = {
  // specific permissions
  google: [
    'admin.directory.user',
    'admin.directory.user.readonly',
    'admin.directory.orgunit',
    'admin.directory.orgunit.readonly',
    'cloud-platform&openid.realm',
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
    client_id: import.meta.env?.VITE_OAUTH_GOOGLE_LOGIN_CLIENTID as string,
    workspace_client_id: import.meta.env
      ?.VITE_OAUTH_GOOGLE_WORKSPACE_CLIENTID as string,
    additionalParams: '&access_type=offline&include_granted_scopes=true',
    scopes: scopes.google
      .map(scope => encodeURI(`https://www.googleapis.com/auth/${scope}`))
      .join(' '),
  },
  microsoft: {
    authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    client_id: import.meta.env?.VITE_OAUTH_MICROSOFT_LOGIN_CLIENTID as string,
    workspace_client_id: import.meta.env
      ?.VITE_OAUTH_MICROSOFT_WORKSPACE_CLIENTID as string,
    additionalParams: '&response_mode=query',
    scopes: scopes.microsoft.join(' '),
  },
}

function socialSignIn(provider: OAuthProvider) {
  let redirectUrl = ''
  const protocol = window.location.protocol
  const hostname = window.location.hostname
  const port = window.location.port ? `:${window.location.port}` : ''
  const URI = `${protocol}//${hostname}${port}/auth/oauth/${provider}`

  if (provider === 'google') {
    redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${oAuthConfig.google?.client_id}&scope=email profile&redirect_uri=${URI}&response_type=code&access_type=offline&include_granted_scopes=true`
  }
  else if (provider === 'microsoft') {
    redirectUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${oAuthConfig.microsoft?.client_id}&scope=openid offline_access email profile User.Read&response_type=code&response_mode=query&redirect_uri=${URI}&include_granted_scopes=true`
  }
  if (redirectUrl) { window.location.href = redirectUrl }
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
    <div class="social" @click="socialSignIn('microsoft')">
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
