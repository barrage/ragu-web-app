<script lang="ts" setup>
const chatStore = useChatStore()
const route = useRoute()
const router = useRouter()

if (route?.params?.chatId) {
  chatStore.GET_ChatMessages(route.params.chatId.toString())
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
