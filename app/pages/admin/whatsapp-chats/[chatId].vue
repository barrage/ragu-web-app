<script lang="ts" setup>
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'
import ChatWarningIcon from '~/assets/icons/svg/chat-warning.svg'
import WhatsAppChatIcon from '~/assets/icons/svg/whatsapp-chat.svg'

const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('whatsapp_chat.whatsapp_chat')),
})
const route = useRoute()
const { $api } = useNuxtApp()
const chatId = route.params.chatId

const { error: chatError, status: whatsAppChatStatus, data: whatsAppChatData } = await useAsyncData(() => $api.whatsApp.BoGetChat(chatId as string), { immediate: true, lazy: true })

errorHandler(chatError)

const selectedWhatsAppChat = computed(() => {
  return whatsAppChatData.value?.chat || null
})
const selectedWhatsAppUser = computed(() => {
  return whatsAppChatData.value?.user || null
})
const isWhatsAppChatLoading = computed(() => {
  return whatsAppChatStatus.value === 'pending'
})
</script>

<template>
  <AdminPageContainer>
    <LlmLink to="/admin/whatsapp-chats" type="link">
      <ArrowLeftIcon size="20px" /> {{ $t('whatsapp_chat.admin.title') }}
    </LlmLink>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="isWhatsAppChatLoading ? '' : selectedWhatsAppUser?.fullName || $t('whatsapp_chat.whatsapp_chat')"
          :description="$t('whatsapp_chat.admin.chat_details.description')"
        >
          <template #icon>
            <WhatsAppChatIcon size="48px" />
          </template>
        </AdminPageTitleContainer>
      </template>
    </AdminPageHeadingTemplate>
    <template v-if="isWhatsAppChatLoading">
      <div class="whatsapp-chat-details-loader">
        <MeetUpLoader />
      </div>
    </template>
    <template v-else-if="selectedWhatsAppChat?.id">
      <WhatsAppChatGeneralInfoAdmin
        :whats-app-chat="selectedWhatsAppChat"
        :whats-app-user="selectedWhatsAppUser"
      />
      <AsyncWhatsAppChatMessagesList
        :whats-app-chat-id="selectedWhatsAppChat?.id"
        :whats-app-user="selectedWhatsAppUser"
      />
    </template>
    <EmptyState
      v-else
      :title="$t('whatsapp_chat.empty_state_title_details')"
      :description="$t('whatsapp_chat.empty_state_desc_details')"
    >
      <template #icon>
        <ChatWarningIcon size="44px" />
      </template>
    </EmptyState>
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.whatsapp-chat-details-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--spacing-fluid-3-xl);
}
</style>
