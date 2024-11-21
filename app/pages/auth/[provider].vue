<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import type { OAuthProvider } from '~/types/auth'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()

onMounted(async () => {
  const code = router.currentRoute.value.query.code as string
  const provider = router.currentRoute.value.params.provider as OAuthProvider
  const source = 'web'

  if (code && provider) {
    try {
      await authStore.POST_Login(code, provider, source)

      if (authStore.isAuthenticated) {
        await router.push('/')
      }
    }
    catch (error) {
      console.error('OAuth login failed:', error)
      ElNotification({
        title: t('login.notifications.error_title'),
        message: t('login.notifications.error_description'),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
      await router.push('/login')
    }
  }
})
</script>

<template>
  <LlmOverlayLoader />
</template>
