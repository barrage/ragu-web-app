import { defineNuxtPlugin } from '#app'
import AuthService from '~/repository/services/auth'
import ChatService from '~/repository/services/chat'
import AgentService from '~/repository/services/agent'
import UsersService from '~/repository/services/users'

/**
 * Nuxt Plugin for initializing and configuring services and stores.
 * This plugin is executed during the startup of the Nuxt application,
 * ensuring that necessary services are created and linked with corresponding stores.
 */
export default defineNuxtPlugin(() => {
  // Retrieve the runtime configuration of the Nuxt application.
  // The `config.public.apiBaseUrl` contains the base URL for API requests,
  // which is defined in the Nuxt configuration (e.g., `nuxt.config.js`).
  const config = useRuntimeConfig()

  // Create a custom $fetch instance with the base API URL.
  // This instance will be used for making HTTP requests to the backend.
  // The base URL is automatically prefixed to all endpoints in future services.
  const baseApiFetcher = $fetch.create({
    baseURL: config.public.apiBaseUrl,
  })

  // Instantiate the ProductService class with the custom $fetch instance.
  // ProductService is responsible for interacting with the product-related API endpoints,
  // including fetching all products, fetching a single product by ID, etc.
  const chatService = new ChatService(baseApiFetcher)
  const agentService = new AgentService(baseApiFetcher)
  const usersService = new UsersService(baseApiFetcher)
  const authService = new AuthService(baseApiFetcher)
  // Note: Additional services  can be initialized and configured here as needed.
  // This is the central place to set up other dependencies or state management layers in the application.

  return {
    provide: {
      api: {
        agent: agentService,
        chat: chatService,
        auth: authService,
        user: usersService,
      },
    },
  }
})
