// Define the structure of a message
export interface Message {
  id: string
  sender: string
  senderType: 'user' | 'assistant'
  content: string
  chatId: string
  responseTo: string | null
  evaluation: any | null // Can be typed more strictly if known
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

// Define the structure of a chat
export interface Chat {
  id: string
  userId: string
  agentId: number
  title: string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
  messages: Message[]
}

// Define the structure of grouped chats
export interface GroupedChats {
  today: Chat[]
  yesterday: Chat[]
  last7Days: Chat[]
  last30Days: Chat[]
  monthsThisYear: { [month: string]: Chat[] }
  lastYear: Chat[]
}
