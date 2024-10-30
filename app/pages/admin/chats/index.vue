<script lang="ts" setup>
import ChatsIcon from '~/assets/icons/svg/chat-multiple.svg'

definePageMeta({
  layout: 'admin-layout',
})

const { t } = useI18n()
const chatsStore = useChatStore()

const currentPage = ref(1)
const itemsPerPage = ref(10)

const { error, execute } = await useAsyncData(() =>
  chatsStore.GET_AllAdminChats(currentPage.value, itemsPerPage.value),
)

const handlePageChange = async (page: number) => {
  currentPage.value = page
  await execute()
}

errorHandler(error)
</script>

<template>
  <AdminPageContainer>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('chat.admin.title')"
          :description="t('chat.admin.description')"
        >
          <template #icon>
            <ChatsIcon size="52" />
          </template>
        </AdminPageTitleContainer>
      </template>
      <template #actions>
        <!--     <ChatsQuickActionsContainer /> -->
      </template>
    </AdminPageHeadingTemplate>

    <ChatsListAdmin
      :chats="chatsStore?.adminAllChatsData"
      @page-change="handlePageChange"
    />
  </AdminPageContainer>
</template>
