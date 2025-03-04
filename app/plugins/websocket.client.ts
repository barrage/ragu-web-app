import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin({
  name: 'ragu-ws',
  hooks: {
    'app:beforeMount': async function() {
      const nuxtApp = useNuxtApp()

      let websocket: RaguWebSocket | undefined
      let reconnectIntervalId: NodeJS.Timeout

      const auth = useAuthStore()
      const { isAuthenticated } = storeToRefs(auth)

      if (isAuthenticated.value) {
        await connect()
      }

      watch(isAuthenticated, async (authenticated) => {
        if (!authenticated) {
          if (websocket) {
            websocket.close()
            websocket = undefined
          }
          return
        }

        if (websocket) {
          return
        }

        await connect()
      }, { immediate: true })

      function attemptReconnect() {
        // Do not attempt any reconnections if the user is not authenticated
        if (!isAuthenticated.value) {
          return
        }

        reconnectIntervalId = setInterval(async () => {
          if (websocket && reconnectIntervalId) {
            clearInterval(reconnectIntervalId)
            return
          }
          try {
            websocket = await RaguWebSocket.init()
          }
          catch (e) {
            console.error('Reconnection failed', e)
          }
        }, 1000)
      }

      async function connect() {
        try {
          websocket = await RaguWebSocket.init()
          websocket.onDisconnect(() => {
            websocket = undefined
            attemptReconnect()
          })
        }
        catch (e) {
          console.error('Websocket connection failed', e)
          attemptReconnect()
        }
      }

      nuxtApp.provide('ws', () => websocket)
    },
  },
})

/**
 * Encapsulates a WebSocket connection to the Ragu chat server.
 * A singleton of this is shared throughout the application via nuxt's context.
 * The reconnect logic is located in the plugin.
 */
export class RaguWebSocket {
  private ws: WebSocket

  constructor(ws: WebSocket) {
    this.ws = ws
  }

  static async init(): Promise<RaguWebSocket> {
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
        statusMessage: error?.message || `Failed to fetch ws token with code ${error?.statusCode}`,
      })
    }
    const token = await response.text()
    const ws = new WebSocket(`${config.public.wsUrl}?token=${token}`)

    // Resolve only when the websocket is ready, otherwise we might get
    // an undefined websocket from the plugin
    return new Promise((resolve, reject) => {
      ws.onopen = () => resolve(new RaguWebSocket(ws))
      ws.onerror = error => reject(error)
    })
  }

  /**
   * Returns the current state of the WebSocket connection.
   */
  state(): number {
    return this.ws.readyState
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
    this.ws.onmessage = handler
  }

  onDisconnect(handler: (event: Event) => void | Promise<void>) {
    this.ws.onclose = handler
  }

  close() {
    this.ws.close()
  }

  private send(message: any) {
    if (this.ws.readyState !== WebSocket.OPEN) {
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
