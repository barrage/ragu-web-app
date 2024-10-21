import { defineStore } from 'pinia'
import type { Agent, AgentDetail, AgentListResponse, SelectedAgent } from '~/types/agent'

export const useAgentStore = defineStore('agent', () => {
  // CONSTANTS
  const { $api } = useNuxtApp()

  // STATE

  const editMode = ref<boolean>(false)
  const agentsResponse = ref<AgentListResponse | null >()
  const selectedAgent = ref<Agent | null | undefined>()
  const singleAgent = ref<Agent | null | undefined>()

  const agents = computed<Agent[]>(() => {
    return agentsResponse.value?.items || [] // Return agents array or empty array if null
  })

  const setEditMode = (value: boolean) => {
    editMode.value = value
  }

  const setSelectedAgent = (agentId: string) => {
    selectedAgent.value = agentsResponse.value?.items.find(agent => agent.id === agentId) || null
  }

  // API
  async function GET_AllAgents(
    page: number = 1,
    perPage: number = 10,
    sortBy: string = 'active',
    sortOrder: 'asc' | 'desc' = 'desc',
    showDeactivated: boolean = true,
  ): Promise<AgentListResponse | null> {
    try {
      const data = await $api.agent.GetAllAgents(page, perPage, sortBy, sortOrder, showDeactivated)

      if (data) {
        selectedAgent.value = data.items[0]
        agentsResponse.value = data
        return data
      }
      else {
        agentsResponse.value = null
        return null
      }
    }
    catch (error) {
      console.error('Failed to fetch agents:', error)
      agentsResponse.value = null
      return null
    }
  }

  async function GET_SingleAgent(agentId: string | null | undefined): Promise<SelectedAgent | null> {
    if (agentId) {
      const data = await $api.agent.GetSingleAgent(agentId)

      if (data) {
        singleAgent.value = data.agent
        return data
      }
    }

    singleAgent.value = null
    return null
  }

  async function POST_CreateAgent(body: AgentDetail): Promise<Agent | null> {
    const data = await $api.agent.CreateAgent(body)
    if (data) {
      selectedAgent.value = data
      return data
    }
    else {
      selectedAgent.value = null
      return null
    }
  }

  async function PUT_UpdateAgent(id: string, body: AgentDetail): Promise<Agent | null> {
    const data = await $api.agent.UpdateAgent(id, body)
    if (data) {
      singleAgent.value = data
      return data
    }
    else {
      singleAgent.value = null
      return null
    }
  }

  async function DELETE_DeleteAgent(id: number): Promise<void> {
    await $api.agent.DeleteAgent(id)
  }

  // COMPUTEDS
  const getMappedAgents = computed<Agent[]>(() => {
    return agentsResponse.value?.items.map((agent: Agent) => {
      return {
        ...agent,
        context: `${agent.context.split(' ').slice(0, 5).join(' ')}...`,
        createdAt: formatDate(agent.createdAt),
        updatedAt: formatDate(agent.updatedAt),
      }
    }) || []
  })

  return {
    agents,
    agentsResponse,
    selectedAgent,
    getMappedAgents,
    editMode,
    singleAgent,
    setEditMode,
    setSelectedAgent,
    GET_AllAgents,
    GET_SingleAgent,
    POST_CreateAgent,
    PUT_UpdateAgent,
    DELETE_DeleteAgent,

  }
})
