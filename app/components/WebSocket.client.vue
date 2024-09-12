<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useNuxtApp } from '#app'

const { $ws } = useNuxtApp()

const message = ref('')
const receivedMessages = ref<string[]>([])
const chatStore = useChatStore()

const sendMessage = () => {
  chatStore.messages?.push({
    id: '',
    sender: '1',
    senderType: 'user',
    content: message.value,
    chatId: '',
    responseTo: '',
    evaluation: null,
    createdAt: '',
    updatedAt: '',
  })
  chatStore.messages?.push({
    id: '',
    sender: '1',
    senderType: 'assistant',
    content: '',
    chatId: '',
    responseTo: '',
    evaluation: null,
    createdAt: '',
    updatedAt: '',
  })

  const payload = {
    userId: '660a7998-2a27-11ee-be56-0242ac120002', // Replace with actual user ID
    type: 'chat',
    payload: message.value.trim(),
  }

  if ($ws) {
    $ws.send(JSON.stringify(payload))
    message.value = ''
  }
}

onMounted(() => {
  // Ensure WebSocket is connected
  if ($ws) {
    $ws.onmessage = (event) => {
      console.log('WebSocket response:', event)
      receivedMessages.value.push(event.data)
      console.log(event.data)
      chatStore.messages[chatStore.messages.length - 1].content = chatStore.messages[chatStore.messages.length - 1].content + event.data
    }

    $ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }
})

onUnmounted(() => {
  if ($ws) {
    console.log('unomuted')
    $ws.close()
  }
})
</script>

<template>
  <div>
    <div>
      <input v-model="message" placeholder="Type your message here...">
      <button @click="sendMessage">
        Send
      </button>
    </div>
    <!--  <div v-if="receivedMessages.length">
      <h3>Received Messages:</h3>
      <ul>
        <li v-for="(msg, index) in receivedMessages" :key="index">
          {{ msg }}
        </li>
      </ul>
    </div> -->
  </div>
</template>
