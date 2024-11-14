import { ref } from 'vue'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  let ws: WebSocket | null = null
  const messages = ref<any[]>([])
  const connectionState = ref<'closed' | 'opening' | 'open' | 'closing'>('closed')
  const messageHandlers: ((data: string) => void)[] = []

  const connect = (webSocketToken: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      return
    }

    ws = new WebSocket(`${config.public.wsUrl}?token=${webSocketToken}`)
    connectionState.value = 'opening'

    ws.onopen = () => {
      connectionState.value = 'open'
    }

    ws.onmessage = (event) => {
      const data = event.data
      messages.value.push(data)
      messageHandlers.forEach(handler => handler(data))
    }

    ws.onerror = (error) => {
      console.error('WS error:', error)
      connectionState.value = 'closed'
      ws = null
    }

    ws.onclose = (event) => {
      connectionState.value = 'closed'
      ws = null
    }
  }
  const addMessageHandler = (handler: (data: string) => void) => {
    messageHandlers.push(handler)
  }
  // SEND MESSAGE TO WS
  const sendSocketMessage = (message: any) => {
    if (ws && ws?.readyState === WebSocket.OPEN) {
      try {
        ws.send(JSON.stringify(message))
      }
      catch (error) {
        console.error('Error sending message:', error)
      }
    }
    else {
      console.error('WebSocket is not open. Cannot send message.')
    }
  }

  // CLOSE CHAT
  const closeChat = () => {
    sendSocketMessage({
      type: 'system',
      payload: {
        type: 'chat_close',
      },
    })
  }

  // SEND MESSAGE TO OPEN NEW/EXISTING CHAT
  const sendInitialMessage = (chatId: string | null, agentId: string | number) => {
    closeChat()
    const message = chatId
      ? {
          type: 'system',
          payload: {
            type: 'chat_open_existing',
            chatId,
          },
        }
      : {
          type: 'system',
          payload: {
            type: 'chat_open_new',
            agentId,
          },
        }

    sendSocketMessage(message)
  }

  // SEND CHAT MESSAGE
  const sendChatMessage = (text: string) => {
    sendSocketMessage({
      type: 'chat',
      text,
    })
  }

  // STOP STREAM
  const stopStream = () => {
    sendSocketMessage({
      type: 'system',
      payload: {
        type: 'chat_stop_stream',
      },
    })
  }

  // DISCONNECT WS
  const disconnect = () => {
    if (ws) {
      connectionState.value = 'closing'
      ws.close(1000, 'Manual disconnection')
      ws = null
    }
    else {
      console.error('No active WebSocket connection to close.')
    }
  }

  nuxtApp.provide('getWs', () => ws)
  nuxtApp.provide('wsConnect', connect)
  nuxtApp.provide('wsDisconnect', disconnect)
  nuxtApp.provide('wsSendInitialMessage', sendInitialMessage)
  nuxtApp.provide('wsAddMessageHandler', addMessageHandler)
  nuxtApp.provide('wsMessages', messages)
  nuxtApp.provide('wsConnectionState', connectionState)
  nuxtApp.provide('wsSendChatMessage', sendChatMessage)
  nuxtApp.provide('wsCloseChat', closeChat)
  nuxtApp.provide('wsStopStream', stopStream)
})
