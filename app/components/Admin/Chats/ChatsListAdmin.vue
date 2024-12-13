<script lang="ts" setup>
import { nextTick } from 'vue'
import type { AdminChatDetails, AdminChatsResponse } from '~/types/chat'
import type { Pagination } from '~/types/pagination'

const props = defineProps<{
  chats: AdminChatDetails[] | null | undefined
  pagination: Pagination
}>()

const emits = defineEmits<{
  (event: 'pageChange', page: number): number
  (event: 'chatDeleted'): void
  (event: 'chatTitleEdited'): void
}>()

const changePage = (page: number) => {
  emits('pageChange', page)
}

/* Delete Chat */
const selectedChatDelete = ref<AdminChatDetails | null>(null)
const deleteChatModalVisible = ref(false)

const openDeleteChatModal = (chat: AdminChatDetails) => {
  selectedChatDelete.value = chat
  deleteChatModalVisible.value = true
}

const closeDeleteChatModal = () => {
  deleteChatModalVisible.value = false
}
const chatDeleted = () => {
  emits('chatDeleted')
}
/* Edit Chat title */
const selectedChatEdit = ref<AdminChatDetails | null>(null)
const editChatModalVisible = ref(false)

const openEditChatModal = (chat: AdminChatDetails) => {
  selectedChatEdit.value = chat
  editChatModalVisible.value = true
}

const closeEditChatModal = () => {
  editChatModalVisible.value = false
}
const chatTitleEdited = () => {
  emits('chatTitleEdited')
}
</script>

<template>
  <div class="chats-list-container">
    <div class="chats-list">
      <div
        v-for="(chat, index) in props.chats"
        :key="chat?.chat?.id"
      >
        <ChatCardAdmin
          v-motion-fade
          :delay="(index * 100)"
          :duration="400"
          :chat="chat"
          @delete-chat="openDeleteChatModal(chat)"
          @edit-chat-title="openEditChatModal(chat)"
        />
      </div>
      <Pagination
        :current-page="props.pagination.currentPage"
        :page-size="props.pagination.pageSize"
        :total="props.pagination.total"
        @page-change="(page:number) => changePage(page)"
      />
    </div>

    <DeleteChatModalBackoffice
      :is-open="deleteChatModalVisible"
      :selected-chat="selectedChatDelete"
      @close-modal="closeDeleteChatModal"
      @chat-deleted="chatDeleted"
    />

    <EditChatTitleModalBackoffice
      :is-open="editChatModalVisible"
      :selected-chat="selectedChatEdit"
      @close-modal="closeEditChatModal"
      @chat-title-edited="chatTitleEdited"
    />
  </div>
</template>

<style lang="scss" scoped>
.chats-list-container {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.chats-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>
