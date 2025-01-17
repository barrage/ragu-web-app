import { defineStore } from 'pinia'
import type { AllAgentResponse, AllAppAgentsResponse, SingleAgent } from '~/types/agent'

export const useAgentStore = defineStore('agent', () => {
  // CONSTANTS
  const { $api } = useNuxtApp()

  // STATE

  const editMode = ref<boolean>(false)
  const agentsResponse = ref<AllAgentResponse | null >()
  const selectedAgent = ref<SingleAgent | null >()

  const appAgentsResponse = ref<AllAppAgentsResponse | null >()
  const appAgents = computed<SingleAgent[]>(() => {
    return appAgentsResponse.value?.items || [] // Return agents array or empty array if null
  })

  const setEditMode = (value: boolean) => {
    editMode.value = value
  }

  const setSelectedAgent = (agent: SingleAgent | null) => {
    selectedAgent.value = agent
  }

  // API

  async function GET_AllAppAgents(
    page: number = 1,
    perPage: number = 20,
    sortBy: string = 'active',
    sortOrder: 'asc' | 'desc' = 'desc',
  ): Promise<AllAppAgentsResponse | null> {
    try {
      const data = await $api.agent.GetAllAppAgents(page, perPage, sortBy, sortOrder)

      if (data) {
        selectedAgent.value = data.items[0]
        appAgentsResponse.value = data
        return data
      }
      else {
        return null
      }
    }
    catch (error) {
      console.error('Failed to fetch agents:', error)
      agentsResponse.value = null
      return null
    }
  }

  return {
    appAgentsResponse,
    agentsResponse,
    selectedAgent,
    editMode,
    appAgents,
    setEditMode,
    setSelectedAgent,
    GET_AllAppAgents,

  }
})
