<script setup>
import { onMounted, ref } from 'vue'
import { useFetch, useRoute } from '#imports'

const route = useRoute()
const chatId = route.params.chatId

const messages = ref([])
const chatTitle = ref('')
const loading = ref(true)
const error = ref(null)

const chat = ref(null)

// Fetch data when the component is mounted
onMounted(async () => {
  try {
    // Fetch messages from the API
    const { data: messagesData, error: fetchMessagesError } = await useFetch(`/api/chats/${chatId}/messages`)

    if (fetchMessagesError.value) {
      error.value = 'Failed to load messages. Please try again later.'
      return
    }

    // Reverse messages to show latest first
    messages.value = messagesData.value.reverse()

    // Fetch chat data to get the title
    const { data: chatsData, error: fetchChatsError } = await useFetch('/api/chats')

    if (fetchChatsError.value) {
      error.value = 'Failed to load chat data. Please try again later.'
      return
    }

    chat.value = chatsData.value.find(c => c.id === chatId)

    if (!chat.value) {
      error.value = 'Chat not found'
      return
    }

    chatTitle.value = chat.value.title
  }
  catch (err) {
    err.value = 'An error occurred while loading messages.'
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="chat-page">
    <div class="chat-messages-container">
      <div class="chat-messages-wrapper">
        <div v-if="loading" class="loading">
          Loading messages...
        </div>
        <div v-else-if="error" class="error">
          {{ error }}
        </div>
        <template v-else>
          <Chat :chat="chat" :messages="messages" />
        </template>
      </div>
    </div>
    <div class="chat-input-section">
      <el-input size="large" label="hrco" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-page {
  display: flex;
  flex-direction: column;

  height: 100%;

  & .chat-messages-container {
    flex: 1 0 calc(90%);
    max-height: 100%;
    overflow-y: auto;
    & .chat-messages-wrapper {
      height: 100%;
      max-width: 48rem;
      margin-inline: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: transparent;
      position: relative;
    }
  }
}
.chat-input-section {
  flex: 1 0 calc(10%);
  height: 84px;
  width: 100%;
  background: transparent;
  display: flex;
  align-items: start;
  justify-content: space-around;
  & .barrage-input {
    width: 100%;
    max-width: 640px;
    height: 52px;
  }
}

.loading,
.error {
  text-align: center;
  margin: 20px 0;
}
</style>
