import { defineStore } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = useDark()
  const toggleDarkMode = useToggle(isDarkMode)
  const selectedPrimaryColor = ref<string>('default')

  const updateHtmlClass = () => {
    if (!process.client || !document?.documentElement) { return }

    const html = document.documentElement
    html.className = html.className.replace(/\btheme-\S+/g, '')
    html.classList.add(`theme-${selectedPrimaryColor.value}`)

    if (isDarkMode.value) {
      html.classList.add('dark')
    }
    else {
      html.classList.remove('dark')
    }
  }
  watch([isDarkMode, selectedPrimaryColor], () => {
    updateHtmlClass()
  }, { immediate: true })

  function setPrimaryColor(color: string) {
    selectedPrimaryColor.value = color
  }

  onMounted(() => {
    updateHtmlClass()
  })

  return {
    isDarkMode,
    selectedPrimaryColor,
    toggleDarkMode,
    setPrimaryColor,
  }
})
