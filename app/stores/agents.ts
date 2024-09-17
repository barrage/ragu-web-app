import { defineStore } from 'pinia'
import type { Agent, AgentListResponse } from '~/types/agent.ts'

export const useAgentStore = defineStore('agent', () => {
  // State

  const agentsResponse = ref<AgentListResponse | null >()
  const selectedAgent = ref<Agent | null>()
  const { $api } = useNuxtApp()

  const agents = computed<Agent[]>(() => {
    return agentsResponse.value?.agents || [] // Return agents array or empty array if null
  })
  /* API */

  async function GET_AllAgents(): Promise<AgentListResponse | null > {
    const data = await $api.agent.GetAllAgents()

    if (data) {
      selectedAgent.value = data.agents[0]
      return agentsResponse.value = data
    }
    else {
      return agentsResponse.value = null
    }
  }

  async function GET_SingleAgent(agentId: string): Promise<Agent | null> {
    const data = await $api.agent.GetSingleAgent(agentId)

    if (data) {
      return selectedAgent.value = data
    }
    else {
      return selectedAgent.value = null
    }
  }

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
    setSelectedAgent,
    getAgentById,
    GET_AllAgents,
    GET_SingleAgent,
  }
})
