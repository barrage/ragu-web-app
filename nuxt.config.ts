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
      apiAutentikUrl: process.env.API_AUTENTIK_URL,
      wsUrl: process.env.WS_URL,
      // WhatsApp
      enableWhatsApp: process.env.ENABLE_WHATSAPP,
      // OAuth - public
      oauthClientId: process.env.OAUTH_CLIENT_ID,
      oauthEndpoint: process.env.OAUTH_ENDPOINT,
      // Storage keys
      keys: {
        pkceVerifier: 'PKCE_VERIFIER',
        stateVerifier: 'STATE_VERIFIER',
      },
      googleDrive: {
        appId: process.env.GOOGLE_DRIVE_APP_ID,
        clientId: process.env.GOOGLE_DRIVE_CLIENT_ID,
      },
      /**
       * Link to the user management service, used in the backoffice.
       */
      userManagementEndpoint: process.env.USER_MANAGEMENT_ENDPOINT,
      /**
       * Link to a user's page on the authorization server, used in the backoffice.
       */
      userEndpointBase: process.env.USER_ENDPOINT_BASE,
    },
    server: {
      // OAuth - server only
      oauthClientSecret: process.env.OAUTH_CLIENT_SECRET,

      // Domain to set for the access_token cookie
      accessCookieDomain: process.env.ACCESS_COOKIE_DOMAIN,

      // Domain to set for the refresh_token cookie
      refreshCookieDomain: process.env.REFRESH_COOKIE_DOMAIN,

      // Max age of the refresh_token cookie.
      refreshTokenDurationSeconds: process.env.REFRESH_TOKEN_DURATION_SECONDS,
    },
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'nuxt-svgo',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@element-plus/nuxt',
    '@vueuse/motion/nuxt',
  ],
  plugins: [
    '~/plugins/error-handler',
    { src: '~/plugins/websocket.client.ts', mode: 'client' },
  ],
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
