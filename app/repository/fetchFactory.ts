import type { $Fetch } from 'nitropack'

/**
 * The FetchFactory class provides a generic mechanism for making HTTP requests.
 * It uses the $fetch client for sending requests and handles various HTTP methods.
 */
export default class FetchFactory {
  $fetch: $Fetch

  /**
   * Initializes the FetchFactory with a specific HTTP client.
   *
   * @param fetcher - The $fetch instance used for making API requests.
   */
  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher
  }
}
