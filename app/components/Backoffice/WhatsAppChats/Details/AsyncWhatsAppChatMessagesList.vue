<script lang="ts" setup>
import ChatWarningIcon from '~/assets/icons/svg/chat-warning.svg'
import type { User } from '~/types/users'

const props = defineProps<{
  whatsAppChatId: string | null | undefined
  whatsAppUser: User | null | undefined
}>()

const { $api } = useNuxtApp()

const { error: getWhatsAppChatMessagesError, status: getWhatsAppMessagesStatus, data: whatsAppChatMessagesData } = await useAsyncData(() => $api.whatsApp.BoGetChat(props.whatsAppChatId as string), { lazy: true })
errorHandler(getWhatsAppChatMessagesError)

const delayedStatus = ref(getWhatsAppMessagesStatus.value)
const MIN_LOADING_TIME = 600

watch(getWhatsAppMessagesStatus, (newStatus) => {
  if (newStatus === 'pending') { delayedStatus.value = 'pending' }
  else { setTimeout(() => { delayedStatus.value = newStatus }, MIN_LOADING_TIME) }
}, { immediate: true })

const emptyWhatsAppChatMessagesData = computed(() => {
  return !(Array.isArray(whatsAppChatMessagesData?.value?.messages) && whatsAppChatMessagesData.value.messages?.length)
})
</script>

<template>
  <template v-if="(delayedStatus === 'pending') || (delayedStatus === 'idle')">
    <div class="whatsapp-chat-messages-loader">
      <MeetUpLoader />
    </div>
  </template>

  <template v-else-if="!emptyWhatsAppChatMessagesData">
    <WhatsAppChatMessagesListAdmin
      :whats-app-messages="whatsAppChatMessagesData.messages"
      :whats-app-user="whatsAppUser"
    />
  </template>

  <EmptyState
    v-else
    :title="$t('whatsapp_chat.empty_title_chats')"
    :description="$t('whatsapp_chat.empty_description_chats')"
  >
    <template #icon>
      <ChatWarningIcon size="44px" />
    </template>
  </EmptyState>
</template>

<style lang="scss" scoped>
.whatsapp-chat-messages-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  margin-top: var(--spacing-fluid-4-xl);
}
</style>
