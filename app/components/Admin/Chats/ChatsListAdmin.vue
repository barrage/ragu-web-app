<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import type { Chat } from '~/types/chat'
import type { Pagination } from '~/types/pagination'

const props = defineProps<{
  chats: Chat[] | null | undefined
}>()

const emits = defineEmits<{
  (event: 'pageChange', page: number): number
}>()

const cardClasses = ref<string[]>([])

onMounted(() => {
  nextTick(() => {
    props.chats?.forEach((_, index) => {
      setTimeout(() => {
        cardClasses.value[index] = 'list-item-visible'
      }, index * 100)
    })
  })
})

const chatsStore = useChatStore()

const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
  total: chatsStore.adminAllChatsResponse?.total || 0,
  disabled: false,
})

const changePage = (page: number) => {
  pagination.value.currentPage = page
  emits('pageChange', pagination.value.currentPage)
}

/* Delete Chat */
const selectedChatDelete = ref<Chat | null>(null)
const deleteChatModalVisible = ref(false)

const openDeleteChatModal = (chat: Chat) => {
  selectedChatDelete.value = chat
  deleteChatModalVisible.value = true
}

const closeDeleteChatModal = () => {
  deleteChatModalVisible.value = false
}

/* Edit Chat title */
const selectedChatEdit = ref<Chat | null>(null)
const editChatModalVisible = ref(false)

const openEditChatModal = (chat: Chat) => {
  selectedChatEdit.value = chat
  editChatModalVisible.value = true
}

const closeEditChatModal = () => {
  editChatModalVisible.value = false
}
</script>

<template>
  <div class="chats-list-container">
    <div class="chats-list">
      <div
        v-for="(chat, index) in props.chats"
        :key="chat.id"
        class="list-item"
        :class="[cardClasses[index]]"
      >
        <ChatCardAdmin
          :chat="chat"
          @delete-chat="openDeleteChatModal(chat)"
          @edit-chat-title="openEditChatModal"
        />
      </div>
      <Pagination
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @page-change="(page:number) => changePage(page)"
      />
    </div>

    <DeleteChatModalBackoffice
      :is-open="deleteChatModalVisible"
      :selected-chat="selectedChatDelete"
      @close-modal="closeDeleteChatModal"
    />

    <EditChatTitleModalBackoffice
      :is-open="editChatModalVisible"
      :selected-chat="selectedChatEdit"
      @close-modal="closeEditChatModal"
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
