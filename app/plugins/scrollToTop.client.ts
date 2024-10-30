import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    setTimeout(() => {
      const mainContent = document.querySelector('.main')
      if (mainContent) {
        mainContent.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 300)
  })
})
