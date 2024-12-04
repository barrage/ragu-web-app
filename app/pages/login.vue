<script lang="ts" setup>
import BarrageLogo from '~/assets/icons/svg/barrage-logo.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'

interface Emits {
  (event: 'redirection'): void
}
const emits = defineEmits<Emits>()

definePageMeta({
  layout: 'login-layout',
})
const { t } = useI18n()
useHead({
  title: computed(() => t('login.title')),
})

const showTypingEffect = ref(false)

onMounted(() => showDelayedTypingEffect())

function showDelayedTypingEffect() {
  // Wait for in-animation
  setTimeout(() => showTypingEffect.value = true, 1300)
}
</script>

<template>
  <div class="login-page-container">
    <div class="login-wrapper">
      <div class="login-header">
        <div class="logo-icon-wrapper">
          <BrainIcon size="42px" />
        </div>

        <template v-if="showTypingEffect">
          <h4 class="login-title typing-effect">
            {{ $t('login.title') }}
          </h4>
          <p class="login-description typing-effect">
            {{ $t('login.description') }}
          </p>
        </template>
        <div v-else style="height: calc(70px + 1rem);" />
      </div>
      <LlmOauthLogin @redirection="emits('redirection')" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page-container {
  width: 100%;
  min-height: calc(100% - 72px - 0.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @include viewport-m {
    width: 37%;
  }

  .login-wrapper {
    max-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;

    & .login-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    & .login-title {
      min-height: fit-content;
      color: var(--color-primary-800);
      line-height: normal;
      margin: auto;
    }

    & .login-description {
      color: var(--color-primary-800);
    }
  }
}

.logo-icon-wrapper {
  border: 1px solid var(--color-primary-300);
  background: var(--color-primary-200);
  margin: auto;
  color: var(--color-primary-800);
  padding: 0.5rem;
  border-radius: 15%;
}

.dark {
  & .login-wrapper {
    & .login-title {
      color: var(--color-primary-100);
    }
    & .login-description {
      color: var(--color-primary-100);
    }
  }
  & .logo-icon-wrapper {
    border: 1px solid var(--color-primary-600);
    background: var(--color-primary-700);
    color: var(--color-primary-100);
  }
}
</style>
