import { defineStore } from 'pinia'
import type { Agent, AgentDetail, Agents, AllAgentResponse, AllAppAgentsResponse, SingleAgent } from '~/types/agent'
import type { AssignCollectionPayload } from '~/types/collection'

export const useAgentStore = defineStore('agent', () => {
  // CONSTANTS
  const { $api } = useNuxtApp()

  // STATE

  const editMode = ref<boolean>(false)
  const agentsResponse = ref<AllAgentResponse | null >()
  const selectedAgent = ref<SingleAgent | null >()
  const singleAgent = ref<Agent | null | undefined>()

  const agents = computed<Agents[]>(() => {
    return agentsResponse.value?.items || [] // Return agents array or empty array if null
  })

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

  async function POST_CreateAgent(body: AgentDetail): Promise<Agents | null | undefined> {
    return await $api.agent.CreateAgent(body)
  }

  async function PUT_UpdateAgent(id: string, body: Agent): Promise<void> {
    const data = await $api.agent.UpdateAgent(id, body)

    if (data) {
      singleAgent.value = data
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

  async function PUT_ActivateAgent(agentId: string): Promise<void> {
    await $api.agent.PutActiveAgent(agentId)
  }

  async function PUT_DectivateAgent(agentId: string): Promise<void> {
    await $api.agent.PutDeactivateAgent(agentId)
  }

  return {
    agents,
    agentsResponse,
    selectedAgent,
    editMode,
    singleAgent,
    appAgents,
    setEditMode,
    setSelectedAgent,
    GET_AllAgents,
    GET_SingleAgent,
    POST_CreateAgent,
    PUT_UpdateAgent,
    DELETE_DeleteAgent,
    PUT_UpdateAgentCollection,
    GET_AllAppAgents,
    PUT_ActivateAgent,
    PUT_DectivateAgent,

  }
})
