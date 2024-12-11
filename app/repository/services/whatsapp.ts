import FetchFactory from '../fetchFactory'
import type { AssignCollectionPayload } from '~/types/collection'
import type { AllWhatsAppAgentsResponse, BoChatResponse, BoChatsResponse, BoUpdateAgentRequest, PostWhatsAppAgentBody, SingleWhatsAppAgentResponse, UserChatResponse, WhatsAppAgent, WhatsAppNumber } from '~/types/whatsapp.ts'

export default class whatsAppService extends FetchFactory {
  private readonly adminEndpoint: string = 'admin/whatsapp'
  private readonly userEndpoint: string = 'whatsapp'

  /* PHONE NUMBERS */

  /**
   * Fetches all WHatsApp numbers by user unique ID.
   * @returns A promise that resolves to an WhatsAppNumbers type.
   * @throws Will throw an error if the request fails.
   */
  async BoGetWhatsAppNumbers(userId: string): Promise<WhatsAppNumber[]> {
    try {
      return await this.$fetch<WhatsAppNumber[]>(`${this.adminEndpoint}/numbers/${userId}`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch WhatsApp phone numbers with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches all user's WHatsApp numbers.
   * @returns A promise that resolves to an WhatsAppNumbers type.
   * @throws Will throw an error if the request fails.
   */
  async UserGetWhatsAppNumbers(): Promise<WhatsAppNumber[]> {
    try {
      return await this.$fetch<WhatsAppNumber[]>(`${this.userEndpoint}/numbers`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch WhatsApp phone numbers with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Create a new user's WhatsApp phone number.
   * @param userId
   * @param phoneNumber
   * @returns A promise that resolves to the created WhatsAppNumber type.
   * @throws Will throw an error if the request fails.
   */
  async BoPostWhatsAppNumber(userId: string, phoneNumber: string): Promise<WhatsAppNumber> {
    try {
      const payload = phoneNumber.replaceAll(' ', '')
      return await this.$fetch<WhatsAppNumber>(`${this.adminEndpoint}/numbers/${userId}`, {
        method: 'POST',
        body: JSON.stringify({ payload }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to create WhatsApp phone number with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Create a new user's WhatsApp phone number.
   * @param phoneNumber
   * @returns A promise that resolves to the created WhatsAppNumber type.
   * @throws Will throw an error if the request fails.
   */
  async UserPostWhatsAppNumber(phoneNumber: string): Promise<WhatsAppNumber> {
    try {
      const payload = phoneNumber.replaceAll(' ', '')
      return await this.$fetch<WhatsAppNumber>(`${this.userEndpoint}/numbers`, {
        method: 'POST',
        body: JSON.stringify({ payload }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to create WhatsApp phone number with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Updates existing user's WhatsApp phone number.
   * @param userId
   * @param phoneNumber
   * @param phoneNumberId
   * @returns A promise that resolves to the WhatsAppNumber type.
   * @throws Will throw an error if the request fails.
   */
  async BoPutWhatsAppNumber(userId: string, phoneNumber: string, phoneNumberId: string): Promise<WhatsAppNumber> {
    try {
      return await this.$fetch<WhatsAppNumber>(`${this.adminEndpoint}/numbers/${userId}/${phoneNumberId}`, {
        method: 'PUT',
        body: JSON.stringify({ phoneNumber }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to update WhatsApp phone number with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Updates existing user's WhatsApp phone number.
   * @param phoneNumber
   * @param phoneNumberId
   * @returns A promise that resolves to the WhatsAppNumber type.
   * @throws Will throw an error if the request fails.
   */
  async UserPutWhatsAppNumber(phoneNumber: string, phoneNumberId: string): Promise<WhatsAppNumber> {
    try {
      return await this.$fetch<WhatsAppNumber>(`${this.userEndpoint}/numbers/${phoneNumberId}`, {
        method: 'PUT',
        body: JSON.stringify({ phoneNumber }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to update WhatsApp phone number with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Deletes a user's WhatsApp phone number by ID.
   * @param userId
   * @param phoneNumberId
   * @returns A promise that resolves when the WhatsApp phone number is successfully deleted.
   * @throws Will throw an error if the request fails.
   */
  async BoDeleteWhatsAppNumber(userId: string, phoneNumberId: string): Promise<void> {
    try {
      await this.$fetch<void>(`${this.adminEndpoint}/numbers/${userId}/${phoneNumberId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to delete WhatsApp phone number with ID: ${phoneNumberId}`,
      })
    }
  }

  /**
   * Deletes a user's WhatsApp phone number by ID.
   * @param phoneNumberId
   * @returns A promise that resolves when the WhatsApp phone number is successfully deleted.
   * @throws Will throw an error if the request fails.
   */
  async UserDeleteWhatsAppNumber(phoneNumberId: string): Promise<void> {
    try {
      await this.$fetch<void>(`${this.userEndpoint}/numbers/${phoneNumberId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to delete WhatsApp phone number with ID: ${phoneNumberId}`,
      })
    }
  }

  /* AGENTS */

  /**
   * Fetches a list of WhatsApp agents.
   *
   * @param {number} [page=1] - The current page of the results. Defaults to the first page.
   * @param {number} [perPage=10] - The number of agents to retrieve per page. Defaults to 10.
   * @param {string} [sortBy='status'] - The field by which to sort the results. Defaults to 'status'.
   * @param {'asc' | 'desc'} [sortOrder='asc'] - The order in which to sort the results: 'asc' for ascending, 'desc' for descending. Defaults to 'asc'.
   *
   *
   * @throws {Error} - Throws an error if the request fails, including a status code and error message.
   */

  async BoGetAllWhatsAppAgents(
    page: number = 1,
    perPage: number = 10,
    sortBy: string = 'active',
    sortOrder: 'asc' | 'desc' = 'desc',
  ): Promise<AllWhatsAppAgentsResponse> {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy,
        sortOrder,
      }).toString()

      return await this.$fetch<AllWhatsAppAgentsResponse>(`${this.adminEndpoint}/agents?${queryParams}`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch WhatsApp agents with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches single WhatsApp agent for a specific agent by its ID.
   * @param agentId - The ID of the agent.
   * @returns A promise that resolves to an Agent object.
   * @throws Will throw an error if the request fails.
   */
  async BoGetSingleWhatsAppAgent(agentId: string): Promise<SingleWhatsAppAgentResponse> {
    try {
      return await this.$fetch<SingleWhatsAppAgentResponse>(`${this.adminEndpoint}/agents/${agentId}`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch WhatsApp agent with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Create an WhatsApp agent
   * @param body The updated data for the agent
   * @returns A promise that resolves to Agent object
   * @throws Will throw an error if request fails
   */
  async BoCreateWhatsAppAgent(body: PostWhatsAppAgentBody): Promise<WhatsAppAgent> {
    try {
      return await this.$fetch(`${this.adminEndpoint}/agents`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(body),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to create WhatsApp agent with name ${body.name}`,
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
  async BoUpdateAgent(id: string, body: BoUpdateAgentRequest): Promise<WhatsAppAgent> {
    try {
      return await this.$fetch(`${this.adminEndpoint}/agents/${id}`, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(body),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to update WhatsApp agent with id ${id}`,
      })
    }
  }

  /**
   * Create an WhatsApp agent
   * @param id Agent id
   * @param body The updated data for the agent
   * @returns A promise that resolves to Agent object
   * @throws Will throw an error if request fails
   */
  async BoUpdateAgentCollection(id: string, body: AssignCollectionPayload): Promise<any> {
    const plainPayload = toRaw(body)
    try {
      await this.$fetch(`${this.adminEndpoint}/agents/${id}/collections`, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(plainPayload),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to update collection to WhatsApp agent with id ${id}`,
      })
    }
  }

  /**
   * Set WhatsApp agent as active
   * @param agentId Agent id
   * @throws Will throw an error if request fails
   */
  async BoSetActiveAgent(agentId: string): Promise<any> {
    try {
      await this.$fetch(`${this.adminEndpoint}/agents/${agentId}`, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({ active: true }),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to set active WhatsApp agent for agent with id ${agentId}`,
      })
    }
  }

  /**
   * Deletes an WhatsApp agent by ID.
   * @param agentId
   * @throws Will throw an error if the request fails.
   */
  async BoDeleteWhatsAppAgent(agentId: string): Promise<void> {
    try {
      await this.$fetch<void>(`${this.adminEndpoint}/agents/${agentId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to delete WhatsApp agent with ID: ${agentId}`,
      })
    }
  }

  /* CHATS */

  /**
   * Fetches a list of all chats for the user from the API.
   * @param {number} [page] - The current page of the results. Defaults to the first page.
   * @param {number} [perPage] - The number of agents to retrieve per page. Defaults to 10.
   * @param {string} [sortBy] - The field by which to sort the results. Defaults to 'status'.
   * @param {'asc' | 'desc'} [sortOrder] - The order in which to sort the results: 'asc' for ascending, 'desc' for descending. Defaults to 'asc'.
   *
   * @returns A promise that resolves to an array of WhatsApp Chat objects.
   * @throws Will throw an error if the request fails.
   */
  async BoGetAllChats(
    page: number = 1,
    perPage: number = 10,
    sortBy: string = 'active',
    sortOrder: 'asc' | 'desc' = 'desc',
  ): Promise<BoChatsResponse> {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy,
        sortOrder,
      }).toString()

      return await this.$fetch<BoChatsResponse>(`${this.adminEndpoint}/chats?${queryParams}`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch WhatsApp chats with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches a chat with messages for the WhatsApp chat from the API.
   * @param {string} [chatId] - The ID of WhatsApp chat.
   *
   * @returns A promise that resolves to an array of WhatsApp Chat objects.
   * @throws Will throw an error if the request fails.
   */
  async BoGetChat(chatId: string): Promise<BoChatResponse> {
    try {
      return await this.$fetch<BoChatResponse>(`${this.adminEndpoint}/chats/${chatId}`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch WhatsApp chat with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches user's WhatsApp chat data.
   * @returns A promise that resolves to an object with arrays of WhatsApp Chat data & messages objects.
   * @throws Will throw an error if the request fails.
   */
  async UserGetChatData(): Promise<UserChatResponse> {
    try {
      return await this.$fetch<UserChatResponse>(`${this.userEndpoint}/chats`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch WhatsApp chat with code ${error?.statusCode}`,
      })
    }
  }
}
