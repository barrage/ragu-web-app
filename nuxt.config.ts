// https://nuxt.com/docs/api/configuration/nuxt-config
import { version } from './package.json'

export default defineNuxtConfig({

  ssr: false,
  compatibilityDate: '2024-07-18',
  future: {
    compatibilityVersion: 4,
  },
  nitro: {
    experimental: {
      websocket: true,
    },
  },

  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      appVersion: version,
      apiBaseUrl: process.env.API_BASE_URL,
      apiChunkerUrl: process.env.API_CHUCKER_URL,
      wsUrl: process.env.WS_URL,
      oAuthGoogleUrl: process.env.OAUTH_GOOGLE_URL,
      googleOAuthClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      googleAppId: process.env.GOOGLE_APP_ID,
      // WhatsApp
      enableWhatsApp: process.env.ENABLE_WHATSAPP,
      // AAI@Edu
      enableAAIEduLogin: process.env.ENABLE_AAIEDU_LOGIN,
      oAuthAAIEduUrl: process.env.OAUTH_AAIEDU_URL,
      oAuthAAIEduLoginClientId: process.env.OAUTH_AAIEDU_LOGIN_CLIENTID,
    },
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],

    },
  },
  modules: ['@nuxt/eslint', '@vueuse/nuxt', 'nuxt-svgo', '@pinia/nuxt', '@nuxtjs/i18n', '@element-plus/nuxt', '@vueuse/motion/nuxt'],
  plugins: ['~/plugins/error-handler', { src: '~/plugins/websocket.client.ts', mode: 'client' }],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  css: ['~/assets/styles/styles.scss'],
  elementPlus: {
    importStyle: false,
    namespace: 'barrage',
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "~/assets/styles/mixins/_media.scss" as *; ',
        },

      },

    },
  },
  svgo: {
    autoImportPath: false,
    global: false,
    customComponent: 'NuxtIcon',
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  i18n: {
    lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      {
        code: 'hr',
        language: 'hr',
        name: 'Croatian',
        file: 'hr.ts',
      },
      {
        code: 'en',
        language: 'en',
        name: 'English',
        file: 'en.ts',
      },
      {
        code: 'de',
        language: 'de',
        name: 'German',
        file: 'de.ts',
      },
      {
        code: 'es',
        language: 'es',
        name: 'Spanish',
        file: 'es.ts',
      },
      {
        code: 'fr',
        language: 'fr',
        name: 'France',
        file: 'fr.ts',
      },
      {
        code: 'it',
        language: 'it',
        name: 'Italian',
        file: 'it.ts',
      },
      {
        code: 'ja',
        language: 'ja',
        name: 'Japanese',
        file: 'ja.ts',
      },
      {
        code: 'pt',
        language: 'pt',
        name: 'Portuguese',
        file: 'pt.ts',
      },

    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },

  },
})
