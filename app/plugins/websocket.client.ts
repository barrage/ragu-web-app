import { defineNuxtPlugin } from '#app'
import type { User } from '~/types/auth'

export default defineNuxtPlugin({
  name: 'ragu-ws',
  hooks: {
    'app:beforeMount': async function () {
      const nuxtApp = useNuxtApp()

      const { user } = storeToRefs(useAuthStore())
      const websocket: RaguWebSocket = new RaguWebSocket(user)

      nuxtApp.provide('ws', websocket)
    },
  },
})

export enum RaguWebSocketState {
  UNINITIALIZED = 0,
  INITIALIZED = 1,
}

/**
 * Encapsulates a WebSocket connection to the Ragu chat server.
 * A singleton of this is shared throughout the application via nuxt's context.
 * The reconnect logic is located in the plugin.
 */
export class RaguWebSocket {
  private ws: WebSocket | undefined

  private messageHandler: ((data: MessageEvent) => void) | undefined

  private _state: RaguWebSocketState = RaguWebSocketState.UNINITIALIZED

  private reconnectInterval: NodeJS.Timeout | undefined

  constructor(user: Ref<User | null>) {
    watch(
      user,
      async (authenticated) => {
        if (!authenticated) {
          this.close()
        }
        else {
          await this.init(user)
        }
      },
      { immediate: true },
    )
  }

  async init(user: Ref<User | null>) {
    const config = useRuntimeConfig()
    let response
    try {
      response = await fetch(`${config.public.apiBaseUrl}/ws`, {
        credentials: 'include',
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

    ws.onclose = () => this.attemptReconnect(user)

    // Resolve only when the websocket is ready, otherwise we might get
    // an undefined websocket from the plugin
    return new Promise((resolve, reject) => {
      ws.onopen = () => resolve()
      ws.onerror = error => reject(error)
    }).then(() => {
      console.log('Websocket connected')
      this.ws = ws
      this._state = RaguWebSocketState.INITIALIZED
    })
  }

  attemptReconnect(user: Ref<User | null>) {
    console.warn('Websocket closed, attempting reconnection')
    this._state = RaguWebSocketState.UNINITIALIZED
    // Do not attempt any reconnections if the user is not authenticated
    if (!user.value) {
      return
    }

    if (this.reconnectInterval) {
      return
    }

    this.reconnectInterval = setInterval(async () => {
      if (this._state === RaguWebSocketState.INITIALIZED) {
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

  state(): RaguWebSocketState {
    return this._state
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
      type: 'chat',
      text,
    }
    this.send(message)
  }

  /**
   * Send a system message of type `workflow.existing`.
   */
  openExistingWorkflow(workflowId: string) {
    const message = {
      type: 'system',
      payload: {
        type: 'workflow.existing',
        workflowId,
      },
    }
    this.send(message)
  }

  openNewWorkflow(workflowType: string, agentId: string | undefined) {
    const message = {
      type: 'system',
      payload: {
        type: 'workflow.new',
        workflowType,
        agentId,
      },
    }
    this.send(message)
  }

  /**
   * Sends a system message of type `workflow.close`.
   */
  closeWorkflow() {
    const message = {
      type: 'system',
      payload: {
        type: 'workflow.close',
      },
    }
    this.send(message)
  }

  /**
   * Sends a system message of type `workflow.cancel_stream`.
   */
  cancelStream() {
    this.send({
      type: 'system',
      payload: {
        type: 'workflow.cancel_stream',
      },
    })
  }

  onMessage(handler: (data: MessageEvent) => void | Promise<void>) {
    this.messageHandler = handler
  }

  close() {
    this.ws?.close()
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
