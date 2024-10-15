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
      <LlmOverlayLoader v-show="authStore.iscurrentUserLoading " />
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
