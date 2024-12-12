import { defineNuxtPlugin } from '#app'
import { scrollToTop } from '~/utils/scrollToTop'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    setTimeout(() => {
      scrollToTop()
    }, 300)
  })
})
