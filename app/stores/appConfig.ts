import { defineStore } from 'pinia'
import type { AppConfig } from '~/types/appConfig'

export const useAppConfigStore = defineStore('appConfig', () => {
  // State

  const appConfig = ref< AppConfig | null >()
  const { $api } = useNuxtApp()

  /* API */

  async function GET_AppConfig(): Promise<AppConfig | null > {
    const data = await $api.appConfig.GetAppConfig()

    if (data) {
      return appConfig.value = data
    }
    else {
      return appConfig.value = null
    }
  }

  return {
    appConfig,
    GET_AppConfig,
  }
})
