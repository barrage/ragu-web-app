<script lang="ts" setup>
const chatStore = useChatStore()
const route = useRoute()
const router = useRouter()
const chatId = Array.isArray(route.params.chatId) ? route.params.chatId[0] : route.params.chatId

if (chatId) {
  chatStore.GET_ChatMessages(chatId)
}
else {
  router.push('/')
}
</script>

<template>
  <ChatPage>
    <template #default>
      <ChatViewWrapper />
    </template>
  </ChatPage>
</template>
