<script lang="ts" setup>
import ChatsIcon from '~/assets/icons/svg/chat-multiple.svg'

definePageMeta({
  layout: 'admin-layout',
})

const { t } = useI18n()
const chatsStore = useChatStore()

const currentPage = ref(1)
const itemsPerPage = ref(10)

const fetchChats = async (page: number = 1) => {
  const { error } = await useAsyncData(() =>
    chatsStore.GET_AllAdminChats(page, itemsPerPage.value),
  )
  errorHandler(error)
}

await fetchChats(currentPage.value)

const handlePageChange = async (page: number) => {
  currentPage.value = page
  await fetchChats(page)
}
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
