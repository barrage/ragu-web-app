<script lang="ts" setup>
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'
import ChatIcon from '~/assets/icons/svg/chat-icon.svg'
import ChatWarningIcon from '~/assets/icons/svg/chat-warning.svg'

const { t } = useI18n()
const chatStore = useChatStore()

definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('chat.admin.chat_details.title')),
})
const route = useRoute()
const { $api } = useNuxtApp()

const selectedChatId = computed(() => {
  const chatId = Array.isArray(route.params.chatId) ? route.params.chatId[0] : route.params.chatId
  return chatId || ''
})

const { error: SingleChatError, status: getChatStatus, data: chatData } = await useAsyncData(() => $api.chat.GetAdminSingleChat(selectedChatId.value), { lazy: true })

errorHandler(SingleChatError)

watch(chatData, (newData) => {
  if (newData?.chat) {
    chatStore.setSelectedBoChatDetails(newData)
  }
})
const selectedAgent = computed(() => {
  return chatData.value?.agent || null
})
const selectedUser = computed(() => {
  return chatData.value?.user || null
})
const selectedChat = computed(() => {
  return chatData.value?.chat || null
})

const isGetChatLoading = computed(() => {
  return getChatStatus.value === 'pending'
})
</script>

<template>
  <AdminPageContainer>
    <LlmLink to="/admin/chats" type="link">
      <ArrowLeftIcon size="20px" /> {{ t('chat.admin.title') }}
    </LlmLink>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('chat.admin.chat_details.title')"
          :description="t('chat.admin.chat_details.description')"
        >
          <template #icon>
            <ChatIcon size="48px" />
          </template>
        </AdminPageTitleContainer>
      </template>
    </AdminPageHeadingTemplate>
    <template v-if="isGetChatLoading">
      <div class="chat-details-loader">
        <MeetUpLoader />
      </div>
    </template>
    <template v-else-if="selectedChat?.id">
      <ChatGeneralInfoAdmin
        :agent="selectedAgent"
        :chat="selectedChat"
        :user="selectedUser"
      />
      <AsyncChatMessagesList :chat-id="selectedChat.id" />
    </template>
    <EmptyState
      v-else
      :title="$t('chat.admin.chat_details.empty_state_title')"
      :description="$t('chat.admin.chat_details.empty_state_desc')"
    >
      <template #icon>
        <ChatWarningIcon size="44px" />
      </template>
    </EmptyState>
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.chat-details-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--spacing-fluid-3-xl);
}
</style>
