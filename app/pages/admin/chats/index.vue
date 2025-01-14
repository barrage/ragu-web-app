<script lang="ts" setup>
import ChatsIcon from '~/assets/icons/svg/chat-multiple.svg'

const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('chat.admin.title')),
})
</script>

<template>
  <AdminPageContainer>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          data-testid="backoffice-chat-page-title-container"
          :title="t('chat.admin.title')"
          :description="t('chat.admin.description')"
        >
          <template #icon>
            <ChatsIcon size="48px" />
          </template>
        </AdminPageTitleContainer>
      </template>
      <template #actions />
    </AdminPageHeadingTemplate>

    <AsyncChatListTemplate />
  </AdminPageContainer>
</template>
