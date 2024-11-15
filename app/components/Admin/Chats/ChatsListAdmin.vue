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

const cardClasses = ref<string[]>([])

const applyCardClasses = () => {
  cardClasses.value = []
  props.chats?.forEach((_, index) => {
    setTimeout(() => {
      cardClasses.value[index] = 'list-item-visible'
    }, index * 100)
  })
}

watch(
  () => props.chats,
  () => {
    nextTick(applyCardClasses)
  },
  { immediate: true },
)

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
        class="list-item"
        :class="[cardClasses[index]]"
      >
        <ChatCardAdmin
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

.list-item {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.list-item-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
