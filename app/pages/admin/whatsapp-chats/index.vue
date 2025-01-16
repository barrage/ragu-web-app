<script lang="ts" setup>
import WhatsAppChatsIcon from '~/assets/icons/svg/whatsapp-chat-multiple.svg'

const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('whatsapp_chat.admin.title')),
})
</script>

<template>
  <AdminPageContainer>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          data-testid="backoffice-whatsapp-chat-page-title-container"
          :title="$t('whatsapp_chat.admin.title')"
          :description="$t('whatsapp_chat.admin.description')"
        >
          <template #icon>
            <WhatsAppChatsIcon size="48px" />
          </template>
        </AdminPageTitleContainer>
      </template>
      <template #actions />
    </AdminPageHeadingTemplate>

    <AsyncWhatsAppChatListTemplate />
  </AdminPageContainer>
</template>
