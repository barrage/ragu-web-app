import FetchFactory from '../fetchFactory'
import type { Agent, AgentListResponse } from '~/types/agent.ts'

export default class ChatServise extends FetchFactory {
  // Endpoint for agent-related API requests.
  private readonly endpoint: string = '/agents'

  /**
   * Fetches a list of all agents.
   * @returns A promise that resolves to an AgentListResponse type.
   * @throws Will throw an error if the request fails.
   */
  async GetAllAgents(): Promise<AgentListResponse> {
    try {
      return await this.$fetch<AgentListResponse>(`${this.endpoint}`)
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch product with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches single agent for a specific agent by its ID.
   * @param id - The ID of the agent.
   * @returns A promise that resolves to an Agent object.
   * @throws Will throw an error if the request fails.
   */
  async GetSingleAgent(agentId: string): Promise<Agent> {
    try {
      return await this.$fetch<Agent>(`${this.endpoint}/${agentId}`)
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch product with code ${error?.statusCode}`,
      })
    }
  }
}
