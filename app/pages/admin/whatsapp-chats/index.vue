<script lang="ts" setup>
import WhatsAppChatsIcon from '~/assets/icons/svg/whatsapp-chat-multiple.svg'
import type { SortingValues } from '~/types/sort'

definePageMeta({
  layout: 'admin-layout',
})

// CONSTANTS & STATES

const { $api } = useNuxtApp()
const sort = ref<SortingValues>({
  direction: 'desc',
  sortProperty: { name: '', value: 'createdAt' },
})
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
})

// API CALLS

const { error, execute, data: chatData } = await useAsyncData(() => $api.whatsApp.BoGetAllChats(pagination.value.currentPage, pagination.value.pageSize, sort.value.sortProperty.value, sort.value?.direction), { lazy: true })
errorHandler(error)

// FUNCTIONS

function handlePageChange(page: number) {
  pagination.value.currentPage = page
  execute()
}

function handleSortChange(sortingValues: SortingValues) {
  sort.value.direction = sortingValues.direction
  sort.value.sortProperty = sortingValues.sortProperty
  execute()
}
</script>

<template>
  <AdminPageContainer>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="$t('whatsapp_chat.admin.title')"
          :description="$t('whatsapp_chat.admin.description')"
        >
          <template #icon>
            <WhatsAppChatsIcon size="58px" />
          </template>
        </AdminPageTitleContainer>
      </template>
    </AdminPageHeadingTemplate>
    <WhatsAppChatsListAdminActions @sort-change="handleSortChange" />
    <WhatsAppChatsListAdmin
      :chats="chatData"
      @page-change="handlePageChange"
      @chat-deleted="(handlePageChange(1))"
      @chat-title-edited="(handlePageChange(1))"
    />
  </AdminPageContainer>
</template>
