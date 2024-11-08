export default defineNuxtRouteMiddleware(async (to) => {
  const whatsAppStore = useWhatsAppStore()

  const publicRouteNames = [
    'admin-whatsapp-chats',
    'admin-whatsapp-chats-chatId',
    'admin-whatsapp-agents',
    'admin-whatsapp-agents-create',
    'admin-whatsapp-agents-agentId',
  ]

  if (publicRouteNames.includes(String(to.name))
    && import.meta.client && !whatsAppStore.isWhatsAppActive) {
    console.warn('WhatsApp plugin is not enabled!')

    if (to.name?.toString().includes('admin')) { return navigateTo('/admin') }
    return navigateTo('/')
  }
})
