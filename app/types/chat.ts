export interface Message {
  id: string
  sender: string
  senderType: 'user' | 'assistant'
  content: string
  chatId: string
  responseTo: string | null
  evaluation: string | null
  createdAt: string
  updatedAt: string
}

export interface ChatConfig {
  id: string
  chatId: string
  model: string
  streaming: boolean
  temperature: number
  language: string
  createdAt: string
  updatedAt: string
}

export interface Chat {
  id: string
  userId: string
  agentId: number
  title: string
  createdAt: string
  updatedAt: string
  messages: Message[]
  config: ChatConfig
}

export interface GroupedChats {
  today: Chat[]
  yesterday: Chat[]
  last7Days: Chat[]
  last30Days: Chat[]
  monthsThisYear: { [month: string]: Chat[] }
  lastYear: Chat[]
}
