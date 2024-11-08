import { defineStore } from 'pinia'
import type { Agent, AgentDetail, AgentListResponse, AllAgentResponse, SingleAgent } from '~/types/agent'
import type { AssignCollectionPayload } from '~/types/collection'

export const useAgentStore = defineStore('agent', () => {
  // CONSTANTS
  const { $api } = useNuxtApp()

  // STATE

  const editMode = ref<boolean>(false)
  const agentsResponse = ref<AllAgentResponse | null >()
  const selectedAgent = ref<SingleAgent | AllAgentResponse | null | undefined>()
  const singleAgent = ref<Agent | null | undefined>()

  const agents = computed<SingleAgent[]>(() => {
    return agentsResponse.value?.items || [] // Return agents array or empty array if null
  })

  const setEditMode = (value: boolean) => {
    editMode.value = value
  }

  const setSelectedAgent = (agentId: string | undefined) => {
    selectedAgent.value = agentsResponse.value?.items.find((agent: SingleAgent) => agent.id === agentId) || null
  }

  // API
  async function GET_AllAgents(
    page: number = 1,
    perPage: number = 10,
    sortBy: string = 'active',
    sortOrder: 'asc' | 'desc' = 'desc',
    showDeactivated: boolean = true,
  ): Promise<AllAgentResponse | null> {
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

  async function GET_SingleAgent(agentId: string | null | undefined): Promise<Agent | null> {
    if (agentId) {
      const data = await $api.agent.GetSingleAgent(agentId)

      if (data) {
        singleAgent.value = data
        return data
      }
    }

    singleAgent.value = null
    return null
  }

  async function POST_CreateAgent(body: AgentDetail): Promise<SingleAgent | null | undefined> {
    const data = await $api.agent.CreateAgent(body)
    if (data) {
      selectedAgent.value = data
    }
    else {
      selectedAgent.value = null
      return null
    }
  }

  async function PUT_UpdateAgent(id: string, body: AgentDetail): Promise<void> {
    const data = await $api.agent.UpdateAgent(id, body)

    if (data) {
      singleAgent.value = {
        ...singleAgent.value,
        agent: data,
      }
    }
    else {
      singleAgent.value = null
    }
  }

  async function DELETE_DeleteAgent(id: number): Promise<void> {
    await $api.agent.DeleteAgent(id)
  }

  async function PUT_UpdateAgentCollection(id: string, body: AssignCollectionPayload): Promise<any | null> {
    await $api.agent.UpdateAgentCollection(id, body)
  }

  // COMPUTEDS
  const getMappedAgents = computed<SingleAgent[]>(() => {
    return agentsResponse.value?.items.map((agent: SingleAgent) => {
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
    PUT_UpdateAgentCollection,

  }
})
