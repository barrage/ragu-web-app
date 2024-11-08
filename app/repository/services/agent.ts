import FetchFactory from '../fetchFactory'
import type { AssignCollectionPayload } from '~/types/collection'
import type { Agent, AgentDetail, AllAgentResponse, SingleAgent } from '~/types/agent'

export default class AgentService extends FetchFactory {
  // Endpoint for agent-related API requests.
  private readonly endpoint: string = 'admin/agents'

  /**
   * Fetches a list of agents with optional filtering, sorting, and pagination.
   *
   * @param {number} [page=1] - The current page of the results. Defaults to the first page.
   * @param {number} [perPage=10] - The number of agents to retrieve per page. Defaults to 10.
   * @param {string} [sortBy='status'] - The field by which to sort the results. Defaults to 'status'.
   * @param {'asc' | 'desc'} [sortOrder='asc'] - The order in which to sort the results: 'asc' for ascending, 'desc' for descending. Defaults to 'asc'.
   * @param {boolean} [showDeactivated=true] - Whether to include deactivated agents in the results. Defaults to true.
   *
   * @returns {Promise<AgentListResponse>} - A promise that resolves to the list of agents.
   *
   * @throws {Error} - Throws an error if the request fails, including a status code and error message.
   */

  async GetAllAgents(
    page: number = 1,
    perPage: number = 10,
    sortBy: string = 'active',
    sortOrder: 'asc' | 'desc' = 'desc',
    showDeactivated: boolean = true,
  ): Promise<AllAgentResponse> {
    try {
      // Build query parameters using function arguments
      const queryParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy,
        sortOrder,
        showDeactivated: showDeactivated.toString(),
      }).toString()

      // Make the API request with the constructed URL
      return await this.$fetch<AllAgentResponse>(`${this.endpoint}?${queryParams}`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      // Handle errors and throw custom error message
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch agents with code ${error?.statusCode}`,
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
      return await this.$fetch<Agent>(`${this.endpoint}/${agentId}`, {
        credentials: 'include',
      })
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
  async CreateAgent(body: AgentDetail): Promise<SingleAgent> {
    try {
      return await this.$fetch(this.endpoint, {
        credentials: 'include',
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
  async UpdateAgent(id: string, body: AgentDetail): Promise<SingleAgent> {
    try {
      return await this.$fetch(`${this.endpoint}/${id}`, {
        credentials: 'include',
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
        credentials: 'include',
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

  async UpdateAgentCollection(id: string, body: AssignCollectionPayload): Promise<any> {
    const plainPayload = toRaw(body)
    try {
      await this.$fetch(`${this.endpoint}/${id}/collections`, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(plainPayload),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to update collection to agent with id ${id}`,
      })
    }
  }
}
