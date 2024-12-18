<script lang="ts" setup>
import ChatWarningIcon from '~/assets/icons/svg/chat-warning.svg'

const props = defineProps<{
  chatId: string
}>()

const { $api } = useNuxtApp()

const { execute: executeGetChatMessages, error: getChatMessagesError, status: getMessagesStatus, data: chatMessagesData } = await useAsyncData(`chatId-${props.chatId}`, () => $api.chat.GetAllChatMessagesAdmin(props.chatId), { lazy: true })

const delayedStatus = ref(getMessagesStatus.value)
const MIN_LOADING_TIME = 600

watch(
  getMessagesStatus,
  (newStatus) => {
    if (newStatus === 'pending') {
      delayedStatus.value = 'pending'
    }
    else {
      setTimeout(() => {
        delayedStatus.value = newStatus
      }, MIN_LOADING_TIME)
    }
  },
  { immediate: true },
)

errorHandler(getChatMessagesError)

const emptyChatMessagesData = computed(() => {
  return !(Array.isArray(chatMessagesData?.value) && chatMessagesData.value.length > 0)
})
</script>

<template>
  <template v-if="(delayedStatus === 'pending') || (delayedStatus === 'idle')">
    <div class="chat-messages-loader">
      <MeetUpLoader />
    </div>
  </template>

  <template v-else-if="!emptyChatMessagesData">
    <ChatMessagesListAdmin :messages="chatMessagesData" />
  </template>

  <EmptyState
    v-else
    :title="$t('chat.admin.chat_card.empty_state_title')"
    :description="$t('chat.admin.chat_details.empty_messages')"
  >
    <template #icon>
      <ChatWarningIcon size="44px" />
    </template>
  </EmptyState>
</template>

<style lang="scss" scoped>
.chat-messages-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  margin-top: var(--spacing-fluid-4-xl);
}
</style>
