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
</script>

<template>
  <div>
    <ElConfigProvider namespace="barrage">
      <NuxtLayout />
      <LlmOverlayLoader v-if="authStore.iscurrentUserLoading" />
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
