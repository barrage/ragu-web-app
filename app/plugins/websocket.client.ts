import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin({
  name: 'ragu-ws',
  hooks: {
    'app:beforeMount': async function () {
      const nuxtApp = useNuxtApp()

      const { user } = storeToRefs(useAuthStore())
      const websocket: RaguWebSocket = new RaguWebSocket(user)

      nuxtApp.provide('ws', websocket)
    },
  },
})
