<script lang="ts" setup>
import ChatsIcon from '~/assets/icons/svg/chat-multiple.svg'
import type { SortingValues } from '~/types/sort'
import type { Pagination } from '~/types/pagination'

const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('chat.admin.title')),
})

const chatsStore = useChatStore()

const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
  total: chatsStore.adminAllChatsResponse?.total || 0,
  disabled: false,
})

const sort = ref<SortingValues>({
  direction: 'desc',
  sortProperty: { name: '', value: 'updatedAt' },
})

const { error, execute } = await useAsyncData(() =>
  chatsStore.GET_AllAdminChats(pagination.value.currentPage, pagination.value.pageSize, sort.value.sortProperty.value, sort.value?.direction),
)

const handlePageChange = async (page: number) => {
  pagination.value.currentPage = page
  await execute()
}

const handleSortChange = async (sortingValues: SortingValues) => {
  sort.value.direction = sortingValues.direction
  sort.value.sortProperty = sortingValues.sortProperty
  await execute()
}
errorHandler(error)

watch(
  () => chatsStore.adminAllChatsResponse?.total,
  () => {
    pagination.value.total = chatsStore.adminAllChatsResponse?.total || 0
  },
  { immediate: true },
)
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
            <ChatsIcon size="58px" />
          </template>
        </AdminPageTitleContainer>
      </template>
      <template #actions>
        <!--     <ChatsQuickActionsContainer /> -->
      </template>
    </AdminPageHeadingTemplate>
    <ChatsListAdminActions @sort-change="handleSortChange" />
    <ChatsListAdmin
      :chats="chatsStore?.adminAllChatsData"
      :pagination="pagination"
      @page-change="handlePageChange"
      @chat-deleted="(handlePageChange(1))"
      @chat-title-edited="(handlePageChange(1))"
    />
  </AdminPageContainer>
</template>
