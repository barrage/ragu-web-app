export interface Message {
  id: string // Unique identifier for the message
  sender: string // Identifier of the sender (could be userId or agentId)
  senderType: 'user' | 'assistant' // Type of the sender
  content: string // The actual message content
  chatId: string // ID of the chat to which this message belongs
  responseTo: string | null // ID of the message this message is responding to (if any)
  evaluation: string | null // Evaluation of the message (if any)
  createdAt: string // Timestamp of when the message was created
  updatedAt: string // Timestamp of when the message was last updated
}

export interface ChatConfig {
  id: string // Unique identifier for the chat configuration
  chatId: string // ID of the chat this configuration is linked to
  model: string // AI model used (e.g., gpt-4)
  streaming: boolean // Indicates if streaming is enabled
  temperature: number // Temperature setting for the model (affects randomness)
  language: string // Language of the chat
  createdAt: string // Timestamp of when the configuration was created
  updatedAt: string // Timestamp of when the configuration was last updated
}

export interface Chat {
  id: string // Unique identifier for the chat
  userId: string // ID of the user associated with the chat
  agentId: number // ID of the agent or assistant in the chat
  title: string // Title of the chat
  createdAt: string // Timestamp of when the chat was created
  updatedAt: string // Timestamp of when the chat was last updated
  messages: Message[] // Array of messages within the chat
  config: ChatConfig // Configuration settings for the chat
}

export interface GroupedChats {
  today: Chat[] // Chats from today
  yesterday: Chat[] // Chats from yesterday
  last7Days: Chat[] // Chats from the last 7 days
  last30Days: Chat[] // Chats from the last 30 days
  monthsThisYear: { [month: string]: Chat[] } // Chats grouped by month of the current year
  lastYear: Chat[] // Chats from the last year
}
