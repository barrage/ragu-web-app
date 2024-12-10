<script lang="ts" setup>
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'
import ChatIcon from '~/assets/icons/svg/chat-icon.svg'
import ChatWarningIcon from '~/assets/icons/svg/chat-warning.svg'

const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('chat.admin.chat_details.title')),
})
const route = useRoute()

const chatStore = useChatStore()

const selectedChatId = computed(() => {
  const chatId = Array.isArray(route.params.chatId) ? route.params.chatId[0] : route.params.chatId
  return chatId || ''
})

const { error } = await useAsyncData(() =>
  chatStore.GET_AllChatMessagesAdmin(selectedChatId.value),
)
errorHandler(error)

const { error: SingleChatError } = await useAsyncData(() => chatStore.GET_SingleChatAdmin(selectedChatId.value))

errorHandler(SingleChatError)

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
            <ChatIcon size="58px" />
          </template>
        </AdminPageTitleContainer>
      </template>
    </AdminPageHeadingTemplate>
    <template v-if="selectedAgent">
      <ChatGeneralInfoAdmin
        :agent="selectedAgent"
        :chat="selectedChat"
        :user="selectedUser"
      />
      <ChatMessagesListAdmin :messages="chatStore.adminChatMessagesData" />
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
</style>
