import { defineStore } from 'pinia'
import type { Agent, AgentDetail, AgentListResponse } from '~/types/agent'

export const useAgentStore = defineStore('agent', () => {
  // CONSTANTS
  const { $api } = useNuxtApp()

  // STATE
  const editMode = ref<boolean>(false)
  const agentsResponse = ref<AgentListResponse | null >()
  const selectedAgent = ref<Agent | null>()
  const agents = computed<Agent[]>(() => {
    return agentsResponse.value?.agents || [] // Return agents array or empty array if null
  })

  const setEditMode = (value: boolean) => {
    editMode.value = value
  }

  // API

  async function GET_AllAgents(payload?: object): Promise<AgentListResponse | null > {
    const data = await $api.agent.GetAllAgents(payload)

    if (data) {
      selectedAgent.value = data.agents[0]
      agentsResponse.value = data
      return data
    }
    else {
      agentsResponse.value = null
      return null
    }
  }

  async function GET_SingleAgent(agentId: string | any): Promise<Agent | null> {
    const data = await $api.agent.GetSingleAgent(agentId)

    if (data) {
      return selectedAgent.value = data
    }
    else {
      return selectedAgent.value = null
    }
  }
  async function CreateAgent(body: AgentDetail): Promise<Agent | null> {
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

  async function UpdateAgent(id: number, body: AgentDetail): Promise<Agent | null> {
    const data = await $api.agent.UpdateAgent(id, body)
    if (data) {
      selectedAgent.value = data
      return data
    }
    else {
      selectedAgent.value = null
      return null
    }
  }

  async function DeleteAgent(id: number): Promise<boolean> {
    try {
      await $api.agent.DeleteAgent(id)
      return true
    }
    catch (error) {
      console.error(`Error deleting agent with ID ${id}:`, error)
      return false
    }
  }

  // COMPUTEDS
  const getMappedAgents = computed<Agent[]>(() => {
    return agentsResponse.value?.agents.map((agent: Agent) => {
      return {
        ...agent,
        context: `${agent.context.split('.')[0]}...`,
        createdAt: formatDate(agent.createdAt).value,
        updatedAt: formatDate(agent.updatedAt).value,
      }
    }) || []
  })

  const setSelectedAgent = (agentId: string) => {
    selectedAgent.value = agentsResponse.value?.agents.find(agent => agent.id === Number.parseInt(agentId)) || null
  }

  const getAgentById = (agentId: string) => {
    return agentsResponse.value?.agents.find(agent => agent.id === Number.parseInt(agentId)) || null
  }

  return {
    agents,
    agentsResponse,
    selectedAgent,
    getMappedAgents,
    editMode,
    setEditMode,
    setSelectedAgent,
    getAgentById,
    GET_AllAgents,
    GET_SingleAgent,
    CreateAgent,
    UpdateAgent,
    DeleteAgent,
  }
})
