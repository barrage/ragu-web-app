// plugins/websocket.client.ts
import { ref } from 'vue'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  let ws: WebSocket | null = null
  const messages = ref<any[]>([])
  const connectionState = ref<'closed' | 'opening' | 'open' | 'closing'>('closed')

  // Function to establish a WebSocket connection
  const connect = (chatId: string | null = null, agentId: string | number) => {
    ws = null

    const userId = '660a7998-2a27-11ee-be56-0242ac120002'

    ws = new WebSocket(`wss://llmao-kotlin-api-staging.m2.barrage.beer?userId=${userId}`)
    connectionState.value = 'opening'

    ws.onopen = () => {
      console.log('WebSocket connection established', agentId)
      connectionState.value = 'open'

      const initialMessage = {
        userId,
        type: 'system',
        payload: {
          header: 'open_chat',
          body: {
            agentId: agentId || 1,
            llm: 'gpt-4',
            language: 'eng',
            ...(chatId && { chatId }), // Add chatId if it exists
          },
        },
      }

      // Send initial message only if WebSocket is fully open
      if (ws?.readyState === WebSocket.OPEN) {
        try {
          ws.send(JSON.stringify(initialMessage))
          console.log('Initial message sent successfully.')
        }
        catch (error) {
          console.error('Error sending the initial message:', error)
        }
      }
      else {
        console.error('WebSocket is not open. Cannot send the initial message.')
      }
    }

    ws.onmessage = (event) => {
      console.log('Message received from server:', event.data)
      messages.value.push(event.data) // Store incoming message in the reactive state
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      connectionState.value = 'closed'
      ws = null
    }

    ws.onclose = (event) => {
      if (event.code === 1000) {
        console.log('WebSocket connection closed normally:', event.code, event.reason)
        connectionState.value = 'closed'
        ws = null
      }
      else {
        console.warn('WebSocket connection closed with an error:', event.code, event.reason)
      }
    }
  }

  // Function to send a chat message
  const sendSocketMessage = (message: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        userId: '660a7998-2a27-11ee-be56-0242ac120002',
        type: 'chat',
        payload: message,
      }))
    }
    else {
      console.error('WebSocket is not open. Cannot send message.')
    }
  }

  // Function to disconnect the WebSocket connection
  const disconnect = () => {
    if (ws) {
      connectionState.value = 'closing'
      ws.close(1000, 'Manual disconnection') // Gracefully close with code 1000
      ws = null
    }
    else {
      console.log('No active WebSocket connection to close.')
    }
  }

  // Provide the WebSocket instance and connection-related functions
  nuxtApp.provide('getWs', () => ws)
  nuxtApp.provide('wsConnect', connect)
  nuxtApp.provide('wsDisconnect', disconnect)
  nuxtApp.provide('wsMessages', messages)
  nuxtApp.provide('wsConnectionState', connectionState)
  nuxtApp.provide('wsSendMessage', sendSocketMessage)
})
