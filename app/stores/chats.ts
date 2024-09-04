// stores/chat.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRuntimeConfig } from '#imports' // To access environment variables

interface Chat {
  id: string
  title: string
  createdAt: string
  // Add any other properties for Chat
}

interface Message {
  id: string
  content: string
  createdAt: string
  // Add any other properties for Message
}

export const useChatStore = defineStore('chat', () => {
  // State
  const chats = ref<Chat[]>([])
  const messages = ref<Record<string, Message[]>>({}) // Store messages by chatId
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Get environment variables
  const config = useRuntimeConfig()
  console.log(config)
  const API_BASE_URL = config.public.apiBaseUrl // Use your environment variable here

  // Computed property to check if chats are empty
  const hasChats = computed(() => chats.value.length > 0)

  // Actions

  // Fetch chats for a specific user
  async function fetchChats(userId: string) {
    isLoading.value = true
    error.value = null
    try {
      const response = await $fetch<Chat[]>(`${API_BASE_URL}/chats/${userId}?msgLimit=0`)
      chats.value = response
    }
    catch (err) {
      error.value = 'Failed to fetch chats'
      console.error(err)
    }
    finally {
      isLoading.value = false
    }
  }

  // Fetch messages for a specific chat
  async function fetchMessages(chatId: string) {
    isLoading.value = true
    error.value = null
    try {
      const response = await $fetch<Message[]>(`${API_BASE_URL}/chats/${chatId}/messages?msgLimit=4`)
      messages.value[chatId] = response
    }
    catch (err) {
      error.value = 'Failed to fetch messages'
      console.error(err)
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    chats,
    messages,
    isLoading,
    error,
    hasChats,
    fetchChats,
    fetchMessages,
  }
})
