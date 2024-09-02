// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-18',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
  modules: ['@nuxt/eslint', '@vueuse/nuxt', 'nuxt-svgo', '@pinia/nuxt', '@nuxtjs/i18n', '@element-plus/nuxt'],
  plugins: ['~/plugins/error-handler'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  css: ['~/assets/styles/styles.scss'],
  elementPlus: {
    /**
     * Set the `importStyle` to `false` to disable importing Element Plus styles
     */
    importStyle: false,
    /**
     * Changes the Element Plus namespace/prefix to be `t-ht` instead of the default `el`
     */
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
        iso: 'hr',
        name: 'Croatian',
        file: 'hr.ts',
      },
      {
        code: 'en',
        iso: 'en',
        name: 'English',
        file: 'en.ts',
      },
      {
        code: 'de',
        iso: 'de',
        name: 'German',
        file: 'de.ts',
      },
      {
        code: 'es',
        iso: 'es',
        name: 'Spanish',
        file: 'es.ts',
      },
      {
        code: 'fr',
        iso: 'fr',
        name: 'France',
        file: 'fr.ts',
      },
      {
        code: 'it',
        iso: 'it',
        name: 'Italian',
        file: 'it.ts',
      },
      {
        code: 'ja',
        iso: 'ja',
        name: 'Japanese',
        file: 'ja.ts',
      },
      {
        code: 'pt',
        iso: 'pt',
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
