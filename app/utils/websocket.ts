import type { User } from '~/types/auth'

export enum RaguWebSocketState {
  UNINITIALIZED = 0,
  INITIALIZING = 1,
  INITIALIZED = 2,
}

/**
 * Encapsulates a WebSocket connection to the Ragu server.
 * A singleton of this is shared throughout the application via nuxt's context.
 */
export class RaguWebSocket {
  private ws: WebSocket | undefined

  private messageHandler: ((data: MessageEvent) => void) | undefined

  state: Ref<RaguWebSocketState> = ref(RaguWebSocketState.UNINITIALIZED)

  private reconnectInterval: NodeJS.Timeout | undefined
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

  constructor(user: Ref<User | null>) {
    console.debug('Initializing RaguWebSocket')
    watch(
      user,
      async (authenticated) => {
        if (!authenticated) {
          this.close()
        }
        else if (this.state.value === RaguWebSocketState.UNINITIALIZED) {
          this.init(user)
        }
      },
      { immediate: true },
    )
  }

  async init(user: Ref<User | null>): Promise<void> {
    if (this.state.value === RaguWebSocketState.INITIALIZED || this.state.value === RaguWebSocketState.INITIALIZING) {
      return
    }

    this.state.value = RaguWebSocketState.INITIALIZING

    const config = useRuntimeConfig()
    let response
    try {
      response = await fetch(`${config.public.apiBaseUrl}/ws`, {
        credentials: 'include',
        headers: this.getDefaultHeaders(),
      })
    }
    catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        statusMessage: error?.message
          || `Failed to fetch ws token with code ${error?.statusCode}`,
      })
    }
    const token = await response.text()
    const ws = new WebSocket(`${config.public.wsUrl}?token=${token}`)

    ws.onmessage = (event) => {
      if (this.messageHandler) {
        this.messageHandler(event)
      }
      else {
        console.warn('Message handler not registered, dropping event', event)
      }
    }

    ws.onclose = () => {
      console.warn('Websocket closed, attempting reconnection')
      this.state.value = RaguWebSocketState.UNINITIALIZED
      this.attemptReconnect(user)
    }

    // Resolve only when the websocket is ready, otherwise we might get
    // an undefined websocket from the plugin
    return new Promise((resolve, reject) => {
      ws.onopen = () => resolve()
      ws.onerror = (error) => {
        this.state.value = RaguWebSocketState.UNINITIALIZED
        reject(error)
      }
    }).then(() => {
      console.debug('Websocket connected')
      this.ws = ws
      this.state.value = RaguWebSocketState.INITIALIZED
    })
  }

  attemptReconnect(user: Ref<User | null>) {
    // Do not attempt any reconnections if the user is not authenticated
    if (!user.value) {
      return
    }

    if (this.reconnectInterval) {
      return
    }

    this.reconnectInterval = setInterval(async () => {
      if (this.state.value === RaguWebSocketState.INITIALIZING) {
        return
      }

      if (this.state.value === RaguWebSocketState.INITIALIZED) {
        if (this.reconnectInterval) {
          clearInterval(this.reconnectInterval)
        }
        return
      }

      try {
        await this.init(user)
      }
      catch (e) {
        console.error('Reconnection failed', e)
      }
    }, 10000)
  }

  /**
   * Returns the current state of the inner WebSocket connection.
   */
  wsState(): number | undefined {
    return this.ws?.readyState
  }

  /**
   * Send a text message, i.e. a message of type `chat`.
   */
  sendTextMessage(text: string) {
    const message = {
      text,
    }
    this.send(message)
  }

  /**
   * Send a system message of type `workflow.existing`.
   */
  openExistingWorkflow(workflowType: string, workflowId: string) {
    console.log('Opening existing workflow', workflowId)
    const message = {
      type: 'workflow.existing',
      workflowType,
      workflowId,
    }
    this.send(message)
  }

  openNewWorkflow(workflowType: string, agentId: string | undefined) {
    console.log('Opening new workflow', workflowType, agentId)
    const message = {
      type: 'workflow.new',
      workflowType,
      agentId,
    }
    this.send(message)
  }

  /**
   * Sends a system message of type `workflow.close`.
   */
  closeWorkflow() {
    const message = {
      type: 'workflow.close',
    }
    this.send(message)
  }

  /**
   * Sends a system message of type `workflow.cancel_stream`.
   */
  cancelStream() {
    this.send({
      type: 'workflow.cancel_stream',
    })
  }

  onMessage(handler: (data: MessageEvent) => void | Promise<void>) {
    this.messageHandler = handler
  }

  close() {
    this.ws?.close()
    this.state.value = RaguWebSocketState.UNINITIALIZED
  }

  private send(message: any) {
    if (this.ws?.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not open. Cannot send message.')
      return
    }

    try {
      this.ws.send(JSON.stringify(message))
    }
    catch (error) {
      console.error('Error sending message:', error)
    }
  }
}
