import FetchFactory from '../fetchFactory'
import type { Agent, AgentDetail, AgentListResponse } from '~/types/agent'

export default class AgentService extends FetchFactory {
  // Endpoint for agent-related API requests.
  private readonly endpoint: string = '/agents'

  /**
   * Fetches a list of all agents.
   * @returns A promise that resolves to an AgentListResponse type.
   * @throws Will throw an error if the request fails.
   */
  async GetAllAgents(_payload: object | undefined): Promise<AgentListResponse> {
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

  /**
   * Create an agent from the API
   * @param body The updated data for the agent
   * @returns A promise that resolves to Agent object
   * @throws Will throw an error if request fails
   */
  async CreateAgent(body: AgentDetail): Promise<Agent> {
    try {
      return await this.$fetch(this.endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to create agent with name ${body.name}`,
      })
    }
  }

  /**
   * Updates an agent from the API
   * @param id The ID of the agent to update
   * @param body The updated data for the agent
   * @returns A promise that resolves to Agent object
   * @throws Will throw an error if request fails
   */
  async UpdateAgent(id: number, body: AgentDetail): Promise<Agent> {
    try {
      return await this.$fetch(`${this.endpoint}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to update agent with id ${id}`,
      })
    }
  }

  /**
   * Deletes an agent from the API
   * @param id The ID of the agent to delete
   * @returns Void
   * @throws Will throw an error if request fails
   */
  async DeleteAgent(id: number): Promise<number> {
    try {
      await this.$fetch(`${this.endpoint}/${id}`, {
        method: 'DELETE',
      })
      return 204
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to delete agent with id ${id}`,
      })
    }
  }
}
