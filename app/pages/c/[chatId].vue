<script lang="ts" setup>
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (!route?.params?.chatId) {
    router.push('/')
  }
})
</script>

<template>
  <ChatPage>
    <template #default>
      <ChatViewWrapper />
    </template>
  </ChatPage>
</template>
