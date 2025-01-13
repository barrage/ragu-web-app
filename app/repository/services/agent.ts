import FetchFactory from '../fetchFactory'
import type { AssignCollectionPayload } from '~/types/collection'
import type { Agent, AgentDetail, Agents, AllAgentResponse, AllAppAgentsResponse } from '~/types/agent'

export default class AgentService extends FetchFactory {
  // Endpoint for agent-related API requests.
  private readonly adminEndpoint: string = 'admin/agents'
  private readonly endUserendpoint: string = '/agents'

  /**
   * Fetches a list of agents with optional filtering, sorting, searching and pagination.
   *
   * @param {number} [page=1] - The current page of the results. Defaults to the first page.
   * @param {number} [perPage=10] - The number of agents to retrieve per page. Defaults to 10.
   * @param {string} [sortBy='status'] - The field by which to sort the results. Defaults to 'status'.
   * @param {'asc' | 'desc'} [sortOrder='asc'] - The order in which to sort the results: 'asc' for ascending, 'desc' for descending. Defaults to 'asc'.
   * @param {string | null} [name] - String used as search parametar for searching agents by name.
   * @param {boolean | null} [active=true] - Whether to include deactivated agents in the results. Defaults to true.
   *

   *
   * @throws {Error} - Throws an error if the request fails, including a status code and error message.
   */

  async GetAllAgents(
    page: number = 1,
    perPage: number = 10,
    sortBy: string = 'active',
    sortOrder: 'asc' | 'desc' = 'desc',
    name: string | null,
    active: boolean | undefined,
  ): Promise<AllAgentResponse> {
    try {
      const queryParams: Record<string, string> = {
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy,
        sortOrder,
      }

      if (name) {
        queryParams.name = name
      }

      if (active !== undefined && active !== null) {
        queryParams.active = active.toString()
      }

      const queryString = new URLSearchParams(queryParams).toString()

      return await this.$fetch<AllAgentResponse>(`${this.adminEndpoint}?${queryString}`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch agents with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches a list of agents with optional filtering, sorting, and pagination.
   *
   * @param {number} [page=1] - The current page of the results. Defaults to the first page.
   * @param {number} [perPage=10] - The number of agents to retrieve per page. Defaults to 10.
   * @param {string} [sortBy='status'] - The field by which to sort the results. Defaults to 'status'.
   * @param {'asc' | 'desc'} [sortOrder='asc'] - The order in which to sort the results: 'asc' for ascending, 'desc' for descending. Defaults to 'asc'.
   * @param {boolean} [showDeactivated=true] - Whether to include deactivated agents in the results. Defaults to true.
   *
   * @returns {Promise<AllAppAgentsResponse>} - A promise that resolves to the list of agents.
   *
   * @throws {Error} - Throws an error if the request fails, including a status code and error message.
   */

  async GetAllAppAgents(
    page: number = 1,
    perPage: number = 10,
    sortBy: string = 'active',
    sortOrder: 'asc' | 'desc' = 'desc',

  ): Promise<AllAppAgentsResponse> {
    try {
      // Build query parameters using function arguments
      const queryParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy,
        sortOrder,
      }).toString()

      // Make the API request with the constructed URL
      return await this.$fetch<AllAppAgentsResponse>(`${this.endUserendpoint}?${queryParams}`, {
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
      return await this.$fetch<Agent>(`${this.adminEndpoint}/${agentId}`, {
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
  async CreateAgent(body: AgentDetail): Promise<Agents> {
    try {
      return await this.$fetch(this.adminEndpoint, {
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
  async UpdateAgent(id: string, body: Agent): Promise<Agent> {
    try {
      return await this.$fetch(`${this.adminEndpoint}/${id}`, {
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
      await this.$fetch(`${this.adminEndpoint}/${id}`, {
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

  /**
   * Updates an agent from the API
   * @param id The ID of the agent to update
   * @param body The updated data for the agent
   * @returns A promise that resolves to Agent object
   * @throws Will throw an error if request fails
   */

  async UpdateAgentCollection(id: string, body: AssignCollectionPayload): Promise<any> {
    const plainPayload = toRaw(body)
    try {
      await this.$fetch(`${this.adminEndpoint}/${id}/collections`, {
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

  /**
   *  Deletes a collection from all agents.
   * @param collection
   * @param provider
   * @returns  A promise that resolves when the agents collection is successfully deleted.
   * @throws Will throw an error if the request fails.
   */
  async DeleteCollectionFromAllAgents(collection: string, provider: string): Promise<void> {
    try {
      const queryParams = new URLSearchParams({
        collection,
        provider,
      }).toString()

      return await this.$fetch(`${this.adminEndpoint}/collections?${queryParams}`, {
        method: 'DELETE',
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to delete collection ${collection} from all agents`,
      })
    }
  }

  /**
   * Activates a user by unique ID.
   * @param agentId - The ID of the agent to activate.
   * @returns A promise that resolves when the agent is successfully activated.
   * @throws Will throw an error if the request fails.
   */
  async PutActiveAgent(agentId: string): Promise<void> {
    try {
      await this.$fetch<void>(`${this.adminEndpoint}/${agentId}`, {
        method: 'PUT',
        credentials: 'include',
        body: {
          active: true,
        },
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to activate agent with ID: ${agentId}`,
      })
    }
  }

  /**
   * Deactivates a user by unique ID.
   * @param agentId - The ID of the agent to deactivate.
   * @returns A promise that resolves when the agent is successfully deactivated.
   * @throws Will throw an error if the request fails.
   */
  async PutDeactivateAgent(agentId: string): Promise<void> {
    try {
      await this.$fetch<void>(`${this.adminEndpoint}/${agentId}`, {
        method: 'PUT',
        credentials: 'include',
        body: {
          active: false,
        },
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to deactivate user with ID: ${agentId}`,
      })
    }
  }
}
