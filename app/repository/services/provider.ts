import FetchFactory from '../fetchFactory'
import type { LLmList, ListProviders, TokenUsageListResponse } from '~/types/provider'

export default class ProviderService extends FetchFactory {
  // Endpoint for agent-related API requests.
  private readonly endpoint: string = '/admin'

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
   * Fetches a list of all providers.
   * @returns A promise that resolves to an ProvidersResponse type.
   * @throws Will throw an error if the request fails.
   */

  async GetListProviders(): Promise<ListProviders> {
    try {
      return await this.$fetch<ListProviders>(`${this.endpoint}/providers`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch providers with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Fetches a list of all available llms.
   * @returns A promise that resolves to an LLmList type.
   * @throws Will throw an error if the request fails.
   */

  async GetListAvailableLLms(id: string): Promise<LLmList> {
    try {
      return await this.$fetch(`${this.endpoint}/providers/llm/${id}`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to get Available LLms with id ${id}`,
      })
    }
  }

  /**
   * Fetches a paginated list of token usage records.
   * Returns detailed information about token usage including user, agent, and usage type.
   * @returns A promise that resolves to TokenUsageListResponse containing paginated token usage data
   * @throws Will throw an error if the request fails with appropriate status code and message
   */
  async GetTokenListUsage(): Promise<TokenUsageListResponse> {
    try {
      return await this.$fetch<TokenUsageListResponse>(`${this.endpoint}/tokens/usage`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch providers with code ${error?.statusCode}`,
      })
    }
  }

  /**
   * Retrieves the total token usage count across all operations.
   * Returns a single number representing the total tokens consumed.
   * @returns A promise that resolves to an object containing the total token count
   * @throws Will throw an error if the request fails with appropriate status code and message
   */
  async GetTokenTotalUsage(): Promise<number> {
    try {
      const response = await this.$fetch<number | { total: number }>(`${this.endpoint}/tokens/usage/total`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })

      // Handle both response types
      return typeof response === 'number' ? response : response.total
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch providers with code ${error?.statusCode}`,
      })
    }
  }
}
