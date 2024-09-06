<script lang="ts" setup>
import { useFetch, useRoute } from '#imports'

const chatStore = useChatStore()
const route = useRoute()
const chatId = route.params.chatId

const chatTitle = ref('')
const loading = ref(true)
const error = ref<string | null>(null)

const chat = ref(null)

const fetchMessages = async () => {
  chatStore.messages = null
  chatStore.selectedChat = null
  try {
    const { data: messagesData, error: fetchMessagesError } = await useFetch(`/api/chats/${chatId}/messages`)

    if (fetchMessagesError.value) {
      error.value = 'Failed to load messages. Please try again later.'
      return
    }

    chatStore.messages = messagesData?.value?.reverse()

    const { data: chatsData, error: fetchChatsError } = await useFetch('/api/chats')

    if (fetchChatsError.value) {
      error.value = 'Failed to load chat data. Please try again later.'
      return
    }

    chatStore.selectedChat = chatsData?.value.find(c => c.id === chatId)

    if (!chat.value) {
      error.value = 'Chat not found'
      return
    }

    chatTitle.value = useChatStore()?.selectedChat?.title || 'New chat'
  }
  catch (err) {
    err.value = 'An error occurred while loading messages.'
  }
  finally {
    loading.value = false
    await nextTick()
  }
}

fetchMessages()
</script>

<template>
  <ChatPage>
    <template #default>
      <ChatViewWrapper />
    </template>
  </ChatPage>
</template>
