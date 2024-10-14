import { defineStore } from 'pinia'
import type { ListProviders } from '~/types/provider'

export const useProviderStore = defineStore('provider', () => {
  // State
  const listProviders = ref< ListProviders | null >()
  const availableLlmList = ref< string | null >()
  const { $api } = useNuxtApp()

  /* API */

  async function GET_List_Providers(): Promise<ListProviders | null > {
    const data = await $api.provider.GetListProviders()

    if (data) {
      return listProviders.value = data
    }
    else {
      return listProviders.value = null
    }
  }

  async function GET_AvailableListLlms(id: string): Promise<string | null> {
    const data = await $api.provider.GetListAvailableLLms(id)

    if (data) {
      return availableLlmList.value = data
    }
    else {
      return availableLlmList.value = null
    }
  }

  return {
    listProviders,
    availableLlmList,
    GET_List_Providers,
    GET_AvailableListLlms,

  }
})
