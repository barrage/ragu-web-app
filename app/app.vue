<script setup lang="ts">
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const localHead = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})

useHead(() => ({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? t('seo.titleTemplate', { title: titleChunk })
      : t('seo.defaultTitle')
  },
  htmlAttrs: {
    lang: localHead.value.htmlAttrs!.lang,
  },
  link: localHead.value.link,
  meta: localHead.value.meta,
}))

useSeoMeta({
  ogTitle: computed(() => t('seo.ogTitle')),
  description: computed(() => t('seo.description')),
  ogDescription: computed(() => t('seo.ogDescription')),
  ogImage: 'https://example.com/llmao-og-image.png',
  twitterCard: 'summary_large_image',
})

onMounted(async () => {
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
