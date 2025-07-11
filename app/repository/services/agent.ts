import FetchFactory from '../fetchFactory'
import type { AssignCollectionPayload } from '~/types/collection'
import type { Agent, AgentDetail, AgentToolList, AgentToolsResponse, AgentVersion, AgentVersionEvaluationMessages, AgentVersions, Agents, AllAgentResponse, AllAppAgentsResponse, AssignAgentsToolsPayload } from '~/types/agent'

export default class AgentService extends FetchFactory {
  // Endpoint for agent-related API requests.
  private readonly adminAgentsEndpoint: string = 'admin/agents'
  private readonly endUserAgentsEndpoint: string = '/agents'

  /**
   * Generates default headers for API requests.
   *
   * @param {Record<string, string>} [additionalHeaders] Optional additional headers to merge with the default headers.
   * @returns {Record<string, string>} The merged headers object, including default headers and any additional ones passed.
   */
  private getDefaultHeaders(
      additionalHeaders: Record<string, string> = {},
  ): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...additionalHeaders,
    }

    if (process.dev) {
      const token = useCookie('access_token')?.value || ''
      headers.Authorization = `Bearer ${token}`
    }

    return headers
  }

  /**
   *
   * Fetches a list of agents with optional filtering, sorting, searching and pagination.
   *
   * @param {number} [page] - The current page of the results. Defaults to the first page.
   * @param {number} [perPage] - The number of agents to retrieve per page. Defaults to 10.
   * @param {string} [sortBy] - The field by which to sort the results. Defaults to 'status'.
   * @param {'asc' | 'desc'} [sortOrder] - The order in which to sort the results: 'asc' for ascending, 'desc' for descending. Defaults to 'asc'.
   * @param {string | null} [name] - String used as search parametar for searching agents by name.
   * @param {boolean | null} [active] - Whether to include deactivated agents in the results. Defaults to true.
   *
   *
   * @throws {Error} - Throws an error if the request fails, including a status code and error message.
   */
  async GetAllAgents(
    page: number = 1,
    perPage: number = 10,
    sortBy: string = 'active',
    sortOrder: 'asc' | 'desc' = 'desc',
    name?: string | null,
    active?: boolean | undefined,
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

      return await this.$fetch<AllAgentResponse>(`${this.adminAgentsEndpoint}?${queryString}`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
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
   *
   * Fetches a list of agents with optional filtering, sorting, and pagination.
   *
   * @param {number} [page] - The current page of the results. Defaults to the first page.
   * @param {number} [perPage] - The number of agents to retrieve per page. Defaults to 10.
   * @param {string} [sortBy] - The field by which to sort the results. Defaults to 'status'.
   * @param {'asc' | 'desc'} [sortOrder] - The order in which to sort the results: 'asc' for ascending, 'desc' for descending. Defaults to 'asc'.
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
      const queryParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy,
        sortOrder,
      })

      return await this.$fetch<AllAppAgentsResponse>(`${this.endUserAgentsEndpoint}?${queryParams}`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
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
   *
   * Fetches single agent for a specific agent by its ID.
   * @param id - The ID of the agent.
   * @returns A promise that resolves to an Agent object.
   * @throws Will throw an error if the request fails.
   */
  async GetSingleAgent(agentId: string): Promise<Agent> {
    try {
      return await this.$fetch<Agent>(`${this.adminAgentsEndpoint}/${agentId}`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
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
      return await this.$fetch<Agents>(this.adminAgentsEndpoint, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
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
   * Delete agent from the API
   * @param id The ID of the agent to delete
   * @returns Void
   * @throws Will throw an error if request fails
   */
  async DeleteAgent(id: string): Promise<void> {
    try {
      await this.$fetch(`${this.adminAgentsEndpoint}/${id}`, {
        credentials: 'include',
        method: 'DELETE',
        headers: this.getDefaultHeaders(),
      })
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
  async UpdateAgent(id: string, body: Agent): Promise<Agent> {
    try {
      return await this.$fetch<Agent>(`${this.adminAgentsEndpoint}/${id}`, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(body),
        headers: this.getDefaultHeaders(),
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
   * Updates an agent from the API
   * @param id The ID of the agent to update
   * @param body The updated data for the agent
   * @returns A promise that resolves to Agent object
   * @throws Will throw an error if request fails
   */

  async UpdateAgentCollection(id: string, body: AssignCollectionPayload): Promise<any> {
    const plainPayload = toRaw(body)
    try {
      await this.$fetch(`${this.adminAgentsEndpoint}/${id}/collections`, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(plainPayload),
        headers: this.getDefaultHeaders(),
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

      return await this.$fetch<void>(`${this.adminAgentsEndpoint}/collections?${queryParams}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this.getDefaultHeaders(),
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
      await this.$fetch<void>(`${this.adminAgentsEndpoint}/${agentId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: this.getDefaultHeaders(),
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
      await this.$fetch<void>(`${this.adminAgentsEndpoint}/${agentId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: this.getDefaultHeaders(),
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

  /**
   * Deletes an agent avatar from the API
   * @param id The ID of the agent to delete
   * @returns Void
   * @throws Will throw an error if request fails
   */
  async DeleteAgentAvatar(agentId: string): Promise<void> {
    try {
      await this.$fetch<void>(`${this.adminAgentsEndpoint}/${agentId}/avatars`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to delete agent avatar with id ${agentId}`,
      })
    }
  }
  /**
   * Updates an agent avatar from the API
   * @param id The ID of the agent to update
   * @param avatar The updated avatar for the agent
   * @returns A promise that resolves to Agent object
   * @throws Will throw an error if request fails
   */

  async UpdateAgentAvatar(agentId: string, avatar: File): Promise<void> {
    try {
      return await this.$fetch<void>(`${this.adminAgentsEndpoint}/${agentId}/avatars`, {
        method: 'POST',
        body: avatar,
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to update agent avatar with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches single agent versions by unique agent ID.
   * @param agentId - The ID of the agent.
   * @returns A promise that resolves to an AgentVersions object.
   * @throws Will throw an error if the request fails.
   */
  async GetAgentVersions(agentId: string): Promise<AgentVersions> {
    try {
      return await this.$fetch<AgentVersions>(`${this.adminAgentsEndpoint}/${agentId}/versions`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch agent versions with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches single agent version by unique agent ID and version ID.
   * @param agentId - The ID of the agent.
   * @param versionId - The ID of the version.
   * @returns A promise that resolves to an AgentVersion object.
   * @throws Will throw an error if the request fails.
   */
  async GetAgentVersion(agentId: string, versionId: string): Promise<AgentVersion> {
    try {
      return await this.$fetch<AgentVersion>(`${this.adminAgentsEndpoint}/${agentId}/versions/${versionId}`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch agent version with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches single agent version evaluation messages by unique agent ID and version ID.
   * @param agentId - The ID of the agent.
   * @param versionId - The ID of the version.
   *
   * @param {number} [page] - The current page of the results. Defaults to the first page.
   * @param {number} [perPage] - The number of agents to retrieve per page. Defaults to 10.
   * @param {string} [sortBy] - The field by which to sort the results. Defaults to 'status'.
   * @param {string | null} [name] - String used as search parametar for searching agents by name.
   * @param {boolean | null} [evaluation] - Whether to include evaluation messages filter by evaluation type.
   * @returns A promise that resolves to an AgentVersionEvaluationMessages object.
   * @throws Will throw an error if the request fails.
   */
  async GetAgentVersionEvaluationMessages(agentId: string, versionId: string, page: number = 1, perPage: number = 10, sortBy: string = 'createAt', sortOrder: 'asc' | 'desc' = 'desc', evaluation: boolean | undefined): Promise<AgentVersionEvaluationMessages> {
    try {
      const queryParams: Record<string, string> = {
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy,
        sortOrder,
      }

      if (evaluation !== undefined && evaluation !== null) {
        queryParams.evaluation = evaluation.toString()
      }

      const queryString = new URLSearchParams(queryParams).toString()

      return await this.$fetch<AgentVersionEvaluationMessages>(`${this.adminAgentsEndpoint}/${agentId}/versions/${versionId}/messages?${queryString}`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch agent version messages with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Updates an agent version
   * @param agentId The ID of the agent to update
   * @param versionID The ID of the version
   * @returns A promise that resolves to AgentVersion object
   * @throws Will throw an error if request fails
   */

  async RollbackAgentVersion(agentId: string, versionID: string): Promise<any> {
    try {
      await this.$fetch(`${this.adminAgentsEndpoint}/${agentId}/versions/${versionID}/rollback`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
        method: 'PUT',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to update agent version`,
      })
    }
  }

  /**
   * Fetches tool list
   * @returns A promise that resolves to an AgentVersions object.
   * @throws Will throw an error if the request fails.
   */

  async GetToolList(): Promise<AgentToolList> {
    try {
      return await this.$fetch(`${this.adminAgentsEndpoint}/tools`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),

      })
    }

    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch tool list with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches single aggent tools by unique agent ID.
   * @param agentId - The ID of the agent.
   * @returns A promise that resolves to an AgentVersions object.
   * @throws Will throw an error if the request fails.
   */

  async GetAgentsTools(agentId: string): Promise<AgentToolsResponse> {
    try {
      return await this.$fetch(`${this.adminAgentsEndpoint}/${agentId}/tools`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),

      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch agent tools with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Assign tools to agent
   * @param agentId The ID of the agent to update
   * @param body The updated data for the agent
   * @returns A promise that resolves to Agent object
   * @throws Will throw an error if request fails
   */

  async AssignAgentsTools(agentId: string, body: AssignAgentsToolsPayload): Promise<void> {
    const plainPayload = toRaw(body)
    try {
      await this.$fetch(`${this.adminAgentsEndpoint}/${agentId}/tools`, {
        credentials: 'include',
        method: 'PUT',
        headers: this.getDefaultHeaders(),
        body: JSON.stringify(plainPayload),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to assign tools to agent with id ${agentId}`,
      })
    }
  }
}
