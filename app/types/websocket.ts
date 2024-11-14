/* Chat messages */
export interface WsChatMessage {
  type: 'chat'
  text: string
}

/* System messages */
export interface WsPayload {
  type: 'chat_open_new' | 'chat_open_existing' | 'chat_close' | 'chat_stop_stream'
  agentId?: string
  chatId?: string
}

export interface WsSystemMessage {
  type: 'system'
  payload: WsPayload
}

/* Server responses */
export interface WsResponseChatOpen {
  type: 'chat_open'
  chatId: string
}

export interface WsResponseChatTitle {
  type: 'chat_title'
  chatId: string
  title: string
}

export interface WsResponseChatClosed {
  type: 'chat_closed'
}

export interface WsResponseFinishEvent {
  type: 'finish_event'
  chatId: string
  messageId: string
  reason: string
  content: string | null
}

export interface WsResponseError {
  type: 'error'
  reason: string
  description: string
}
