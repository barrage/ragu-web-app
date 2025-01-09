import { defineStore } from 'pinia'

export const useWhatsAppStore = defineStore('whatsapp', () => {
  /* State */

  const isWhatsAppActive = ref(useRuntimeConfig().public.enableWhatsApp === 'true')
  const editMode = ref<boolean>(false)
  const reloadBOWhatsAppNumbers = ref<boolean>(false)

  /* Functions */

  function setEditMode(mode: boolean) {
    editMode.value = mode
  }

  function triggerReloadBOWhatsAppNumbers() {
    reloadBOWhatsAppNumbers.value = true
  }

  function resetReloadBOWhatsAppNumbers() {
    reloadBOWhatsAppNumbers.value = false
  }

  return {
    isWhatsAppActive,
    editMode,
    reloadBOWhatsAppNumbers,
    setEditMode,
    triggerReloadBOWhatsAppNumbers,
    resetReloadBOWhatsAppNumbers,
  }
})
