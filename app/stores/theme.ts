import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = useDark()
  const toggleDarkMode = useToggle(isDarkMode)

  const selectedPrimaryColorCookie = useCookie<string | null>('colorCookie')
  const selectedPrimaryColor = ref<string | null>(selectedPrimaryColorCookie.value)
  const darkThemeCookie = useCookie<boolean | null>('darkTheme')

  if (darkThemeCookie.value === null) {
    darkThemeCookie.value = isDarkMode.value
  }

  const updateHtmlClass = () => {
    if (!import.meta.client || !document?.documentElement) {
      return
    }

    const html = document.documentElement
    html.className = html.className.replace(/\btheme-\S+/g, '')
    html.classList.add(`theme-${selectedPrimaryColor.value}`)

    selectedPrimaryColorCookie.value = selectedPrimaryColor.value
    // Store the selected primary color in the cookie
  }

  watch([isDarkMode, selectedPrimaryColor, darkThemeCookie], () => {
    updateHtmlClass()
  }, { immediate: true })

  if (import.meta.client) {
    watch(isDarkMode, (newValue) => {
      darkThemeCookie.value = newValue
    })
  }

  if (import.meta.server) {
    useHead({
      htmlAttrs: {
        class: darkThemeCookie.value ? 'dark' : '',
      },
    })
  }

  return {
    isDarkMode,
    selectedPrimaryColor,
    toggleDarkMode,

  }
})
