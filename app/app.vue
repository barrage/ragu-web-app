<script setup lang="ts">
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  await authStore.GET_CurrentUser()

  const isLoginRoute = route.path === '/login'
  const isAuthGoogleRoute = route.path === '/auth/google'

  if (!authStore.isAuthenticated && !isLoginRoute && !isAuthGoogleRoute) {
    router.push('/login')
  }
})
useSeoMeta({
  title: 'LLMAO - Interact with Custom AI Agents',
  ogTitle: 'LLMAO - Create and Interact with Custom AI Agents',
  description: 'LLMAO allows you to create personalized AI agents from documents and collections, enabling seamless conversations for any task.',
  ogDescription: 'LLMAO is a platform where you can create and interact with AI agents. Build your custom agent with documents and collections to assist you in various tasks, all at your fingertips.',
  ogImage: 'https://example.com/llmao-og-image.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <ElConfigProvider namespace="barrage">
      <LlmOverlayLoader v-if="authStore.iscurrentUserLoading" />
      <NuxtLayout />
    </ElConfigProvider>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.9);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
