import { defineStore } from 'pinia'

export const useWhatsAppStore = defineStore('whatsapp', () => {
  /* State */

  const isWhatsAppActive = ref(useRuntimeConfig().public.enableWhatsApp === 'true')
  const editMode = ref<boolean>(false)

  /* Functions */

  function setEditMode(mode: boolean) {
    editMode.value = mode
  }

  return {
    isWhatsAppActive,
    editMode,
    setEditMode,
  }
})
