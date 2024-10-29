<script lang="ts" setup>
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'

definePageMeta({
  layout: 'admin-layout',
})
const { t } = useI18n()
const route = useRoute()

const chatStore = useChatStore()

const selectedChatId = computed(() => {
  const chatId = Array.isArray(route.params.chatId) ? route.params.chatId[0] : route.params.chatId
  return chatId || ''
})

/* const currentPage = ref(1)
const itemsPerPage = ref(10) */

const { error } = await useAsyncData(() =>
  chatStore.GET_AllChatMessagesAdmin(selectedChatId.value),
)
errorHandler(error)

/* const handlePageChange = async (page: number) => {
  currentPage.value = page
  await fetchMessages(page)

} */
const fetchChat = async () => {
  const { error } = await useAsyncData(() =>
    chatStore.GET_SingleChatAdmin(selectedChatId.value),
  )
  errorHandler(error)
}
await fetchChat()
const selectedAgent = computed(() => {
  return chatStore.selectedChatAdmin?.agent || null
})
const selectedUser = computed(() => {
  return chatStore.selectedChatAdmin?.user || null
})
const selectedChat = computed(() => {
  return chatStore.selectedChatAdmin?.chat || null
})
</script>

<template>
  <AdminPageContainer>
    <NuxtLink to="/admin/chats" class="back-link">
      <ArrowLeftIcon /> {{ t('chat.admin.title') }}
    </NuxtLink>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('chat.admin.chat_details.title')"
          :description="t('chat.admin.chat_details.description')"
        >
          <template #icon>
            <TeamIcon size="52" />
          </template>
        </AdminPageTitleContainer>
      </template>
    </AdminPageHeadingTemplate>
    <ChatGeneralInfoAdmin
      :agent="selectedAgent"
      :chat="selectedChat"
      :user="selectedUser"
    />

    <ChatMessagesListAdmin :messages="chatStore.adminChatMessagesData" />
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.back-link {
  display: flex;
  gap: 4px;
  align-items: center;
  margin-bottom: 32px;
}
</style>
