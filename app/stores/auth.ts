// stores/auth.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface User {
  id: string
  name: string
  email: string
  token: string
  // Add any other user-related properties here
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null) // Stores authenticated user info
  const fakeUserId = ref('660a7998-2a27-11ee-be56-0242ac120002')
  const isAuthenticated = computed(() => !!user.value) // Checks if the user is authenticated
  const error = ref<string | null>(null) // Stores error messages

  // Actions

  return {
    user,
    isAuthenticated,
    fakeUserId,
    error,

  }
})
