import type { Chat, GroupedChats } from '~/types/chat'

export function groupChatsByTime(chats: Chat[]): GroupedChats {
  const groupedChats: GroupedChats = {
    today: [],
    yesterday: [],
    last7days: [],
    last30days: [],
    monthsThisYear: {},
    lastYear: [],
  }
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const isWithinDays = (date: Date, days: number): boolean =>
    (today.getTime() - date.getTime()) < days * 24 * 60 * 60 * 1000

  const addChatToGroup = (chat: Chat, group: keyof GroupedChats) => {
    if (Array.isArray(groupedChats[group])) {
      (groupedChats[group] as Chat[]).push(chat)
    }
  }

  chats.forEach((chat) => {
    const chatDate = new Date(chat.createdAt)
    const chatDateString = chatDate.toDateString()
    const todayString = today.toDateString()
    const yesterdayString = yesterday.toDateString()

    if (chatDateString === todayString) {
      addChatToGroup(chat, 'today')
    }
    else if (chatDateString === yesterdayString) {
      addChatToGroup(chat, 'yesterday')
    }
    else if (isWithinDays(chatDate, 7)) {
      addChatToGroup(chat, 'last7days')
    }
    else if (isWithinDays(chatDate, 30)) {
      addChatToGroup(chat, 'last30days')
    }
    else if (chatDate.getFullYear() === today.getFullYear()) {
      const monthName = chatDate.toLocaleString('default', { month: 'long' })
      groupedChats.monthsThisYear[monthName] = groupedChats.monthsThisYear[monthName] || []
      groupedChats.monthsThisYear[monthName].push(chat)
    }
    else {
      addChatToGroup(chat, 'lastYear')
    }
  })

  return groupedChats
}
