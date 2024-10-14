import FetchFactory from '../fetchFactory'
import type { LLmList, ListProviders } from '~/types/provider'

export default class ProviderService extends FetchFactory {
  // Endpoint for agent-related API requests.
  private readonly endpoint: string = '/admin'

  async GetListProviders(): Promise<ListProviders> {
    try {
      return await this.$fetch<ListProviders>(`${this.endpoint}/providers`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to fetch providers with code ${error?.statusCode}`,
      })
    }
  }

  async GetListAvailableLLms(id: string): Promise<LLmList> {
    try {
      return await this.$fetch(`${this.endpoint}/providers/llm/${id}`, {
        credentials: 'include',
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message || `Failed to get Available LLms with id ${id}`,
      })
    }
  }
}
