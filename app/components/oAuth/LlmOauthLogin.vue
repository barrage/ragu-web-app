<script lang="ts" setup>
import * as client from 'openid-client'

// TODO
import BarrageLogo from '~/assets/icons/svg/barrage-logo.svg'

const emits = defineEmits<Emits>()

const config = useRuntimeConfig()

let oidcConfig: client.Configuration

client.discovery(
  new URL(config.public.oauthEndpoint),
  config.public.oauthClientId,
).then((config) => {
  oidcConfig = config
}).catch((error) => {
  console.error('Failed to discover OIDC configuration:', error)
})

interface Emits {
  (event: 'redirection'): void
}

// CONSTANTS
const btnLoading = ref(false)

async function startOAuthFlow() {
  btnLoading.value = true

  const redirectUri = `${window.location.origin}/auth/callback`
  const scope = 'openid profile email entitlements offline_access avatar goauthentik.io/api'

  const codeVerifier = client.randomPKCECodeVerifier()
  const codeChallenge
      = await client.calculatePKCECodeChallenge(codeVerifier)

  const state = client.randomState()

  sessionStorage.setItem(config.public.keys.pkceVerifier, codeVerifier)
  sessionStorage.setItem(config.public.keys.stateVerifier, state)

  const parameters: Record<string, string> = {
    redirect_uri: redirectUri,
    scope,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  }

  const redirectTo: URL = client.buildAuthorizationUrl(oidcConfig, parameters)

  emits('redirection')
  // Wait for out-animation
  setTimeout(() => window.location.href = redirectTo.toString(), 1000)
}
</script>

<template>
  <div class="social-container">
    <ElButton
      type="primary"
      class="social"
      :loading="btnLoading"
      :disabled="!oidcConfig"
      @click="startOAuthFlow"
      @keyup.enter="startOAuthFlow"
    >
      <BarrageLogo size="54px" />
      <p class="semi-bold">
        {{ $t('login.title') }}
      </p>
    </ElButton>
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

    & :deep(span) {
      gap: 0 70px;
    }

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
