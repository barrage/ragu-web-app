import { defineNuxtPlugin } from '#app'
import AuthService from '~/repository/services/auth'
import ChatService from '~/repository/services/chat'
import AgentService from '~/repository/services/agent'
import DocumentService from '~/repository/services/document'
import AppConfigService from '~/repository/services/appConfig'
import CollectionService from '~/repository/services/collection'
import ProviderService from '~/repository/services/provider'
import EmbeddingService from '~/repository/services/embedding'
import StatisticService from '~/repository/services/statistic'
import WhatsAppService from '~/repository/services/whatsapp.js'
import SettingsService from '~/repository/services/settings'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const baseApiFetcher = $fetch.create({
    baseURL: config.public.apiBaseUrl,
  })
  const baseApiChucker = $fetch.create({
    baseURL: config.public.apiChunkerUrl,
  })

  const chatService = new ChatService(baseApiFetcher)
  const agentService = new AgentService(baseApiFetcher)
  const authService = new AuthService(baseApiFetcher)
  const documentService = new DocumentService(baseApiChucker)
  const appConfigService = new AppConfigService(baseApiChucker)
  const collectionService = new CollectionService(baseApiChucker)
  const providerService = new ProviderService(baseApiFetcher)
  const embeddingService = new EmbeddingService(baseApiChucker)
  const statisticService = new StatisticService(baseApiFetcher)
  const whatsAppService = new WhatsAppService(baseApiFetcher)
  const settingsService = new SettingsService(baseApiFetcher)

  return {
    provide: {
      api: {
        agent: agentService,
        chat: chatService,
        auth: authService,
        document: documentService,
        appConfig: appConfigService,
        collection: collectionService,
        provider: providerService,
        embedding: embeddingService,
        statistic: statisticService,
        whatsApp: whatsAppService,
        settings: settingsService,
      },
    },
  }
})
