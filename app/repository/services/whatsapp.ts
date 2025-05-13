import type { RouteLocationNormalized } from 'vue-router'
import FetchFactory from '../fetchFactory'
import { useWhatsAppStore } from '@/stores/whatsapp'
import { useAuthStore } from '@/stores/auth'
import type { BoChatResponse, BoChatsResponse, UserChatResponse, WhatsAppNumber } from '~/types/whatsapp.ts'

export default class whatsAppService extends FetchFactory {
  private readonly adminEndpoint: string = 'admin/whatsapp'
  private readonly userEndpoint: string = 'whatsapp'
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
        headers: this.getDefaultHeaders(),
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
        headers: this.getDefaultHeaders(),
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
      return await this.$fetch<WhatsAppNumber>(`${this.adminEndpoint}/numbers/${userId}`, {
        method: 'POST',
        body: JSON.stringify({ phoneNumber: phoneNumber.replaceAll(' ', '') }),
        headers: this.getDefaultHeaders(),
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
   * @param route
   * @returns A promise that resolves to the created WhatsAppNumber type.
   * @throws Will throw an error if the request fails.
   */
  async UserPostWhatsAppNumber(phoneNumber: string, route?: RouteLocationNormalized): Promise<WhatsAppNumber> {
    try {
      const response = await this.$fetch<WhatsAppNumber>(`${this.userEndpoint}/numbers`, {
        method: 'POST',
        body: JSON.stringify({ phoneNumber: phoneNumber.replaceAll(' ', '') }),
        headers: this.getDefaultHeaders(),
        credentials: 'include',
      })
      if (route?.name === 'admin-users-userId' && useAuthStore().user?.id === route.params.userId) {
        useWhatsAppStore().triggerReloadBOWhatsAppNumbers()
      }
      return response
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
        headers: this.getDefaultHeaders(),
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
   * @param route
   * @returns A promise that resolves to the WhatsAppNumber type.
   * @throws Will throw an error if the request fails.
   */
  async UserPutWhatsAppNumber(phoneNumber: string, phoneNumberId: string, route?: RouteLocationNormalized): Promise<WhatsAppNumber> {
    try {
      const response = await this.$fetch<WhatsAppNumber>(`${this.userEndpoint}/numbers/${phoneNumberId}`, {
        method: 'PUT',
        body: JSON.stringify({ phoneNumber }),
        headers: this.getDefaultHeaders(),
        credentials: 'include',
      })
      if (route?.name === 'admin-users-userId' && useAuthStore().user?.id === route.params.userId) {
        useWhatsAppStore().triggerReloadBOWhatsAppNumbers()
      }
      return response
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
        headers: this.getDefaultHeaders(),
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
   * @param route
   * @returns A promise that resolves when the WhatsApp phone number is successfully deleted.
   * @throws Will throw an error if the request fails.
   */
  async UserDeleteWhatsAppNumber(phoneNumberId: string, route?: RouteLocationNormalized): Promise<void> {
    try {
      await this.$fetch<void>(`${this.userEndpoint}/numbers/${phoneNumberId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
      if (route?.name === 'admin-users-userId' && useAuthStore().user?.id === route.params.userId) {
        useWhatsAppStore().triggerReloadBOWhatsAppNumbers()
      }
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to delete WhatsApp phone number with ID: ${phoneNumberId}`,
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
        headers: this.getDefaultHeaders(),
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
        headers: this.getDefaultHeaders(),
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
        headers: this.getDefaultHeaders(),
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
