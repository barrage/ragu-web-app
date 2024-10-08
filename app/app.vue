<script setup lang="ts">
const authStore = useAuthStore()
const router = useRouter()

onBeforeMount(async () => {
  if (import.meta.client) {
    await authStore.GET_CurrentUser()

    if (!authStore.isAuthenticated) {
      router.push('/login')
    }
  }
})
</script>

<template>
  <div>
    <ElConfigProvider namespace="barrage">
      <NuxtLayout />
      <LlmOverlayLoader v-show="authStore.iscurrentUserLoading" />
    </ElConfigProvider>
  </div>
</template>
