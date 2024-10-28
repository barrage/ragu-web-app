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

const selectedUser = ref<Chat | null>(null)
const deleteUserModalVisible = ref(false)

const openDeleteUserModal = (chat: Chat) => {
  selectedUser.value = chat
  deleteUserModalVisible.value = true
}

const toggleModal = () => {
  deleteUserModalVisible.value = !deleteUserModalVisible.value
}

const chatsStore = useChatStore()
/* const handleDeleteUser = async (chat: Chat) => {
  try {
    await chatsStore.DELETE_User(chat.id)
    deleteUserModalVisible.value = false
    chatsStore.GET_Allchats()
  }
  catch (error) {
    console.error('Error deleting user:', error)
  }
} */

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
        <ChatCardAdmin :chat="chat" @delete-user="openDeleteUserModal(chat)" />
      </div>
      <Pagination
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @page-change="(page:number) => changePage(page)"
      />
    </div>

    <!-- <DeleteUserModal
      :is-open="deleteUserModalVisible"
      :selected-user="selectedUser"
      @toggle-modal="toggleModal"
      @delete-user-confirm="handleDeleteUser"
    /> -->
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
