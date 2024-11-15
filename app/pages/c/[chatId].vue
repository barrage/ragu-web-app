<script lang="ts" setup>
const chatStore = useChatStore()
const route = useRoute()
const router = useRouter()

/* Chat messages */
const { error: messagesError, execute: getChatMessages, status: loadingMessages } = await useAsyncData(() =>
  chatStore.GET_ChatMessages(route.params.chatId!.toString()), { immediate: false })
errorHandler(messagesError)

/* Chat data */
const { error: chatError, execute: getChat, status: loadingChat } = await useAsyncData(() =>
  chatStore.GET_Chat(route.params.chatId!.toString()), { immediate: false })

errorHandler(chatError)

onMounted(async () => {
  if (route?.params?.chatId) {
    await getChatMessages()
    await getChat()
  }
  else {
    router.push('/')
  }
})

onBeforeUnmount(() => {
  chatStore.messages = undefined
  chatStore.selectedChat = null
})

const showLoadingState = computed(() =>
  (loadingChat.value === 'pending' || loadingMessages.value === 'pending') && (!chatStore.messages || chatStore.messages.length === 0),
)
</script>

<template>
  <ChatPage>
    <template #default>
      <template v-if="showLoadingState">
        <div class="chat-loading-container">
          <MeetUpLoader />
        </div>
      </template>
      <template v-else>
        <ChatViewWrapper />
      </template>
    </template>
  </ChatPage>
</template>

<style lang="scss" scoped>
.chat-loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
