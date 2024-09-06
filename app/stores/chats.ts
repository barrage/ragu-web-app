import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRuntimeConfig } from '#imports'
import type { Chat, Message } from '~/types/chat.ts'

export const useChatStore = defineStore('chat', () => {
  // State
  const chats = ref<Chat[]>([])
  const messages = ref< Message[] | any>()
  const selectedChat = ref<Chat | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const config = useRuntimeConfig()

  const API_BASE_URL = config.public.apiBaseUrl

  const hasChats = computed(() => chats.value.length > 0)

  // Actions

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
    selectedChat,
    fetchChats,
    fetchMessages,
  }
})
