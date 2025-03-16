<script lang="ts" setup>
import type { Chat } from '~/types/chat'

// This component gets loaded whenever the `messages` array
// from the store contains messages in cases where a new chat
// has started, or if the path contains /c/:chatId.

const chatStore = useChatStore()

const { selectedChat, messages } = storeToRefs(chatStore)

/* Delete Chat */
const selectedChatDelete = ref<Chat | null>(null)
const deleteChatModalVisible = ref(false)

const openDeleteChatModal = () => {
  selectedChatDelete.value = selectedChat.value?.chat ?? null
  deleteChatModalVisible.value = true
}

const closeDeleteChatModal = () => {
  deleteChatModalVisible.value = false
}
/* Edit Chat title */
const selectedChatEdit = ref<Chat | null>(null)
const editChatModalVisible = ref(false)

const openEditChatModal = () => {
  selectedChatEdit.value = selectedChat.value?.chat ?? null
  editChatModalVisible.value = true
}

const closeEditChatModal = () => {
  editChatModalVisible.value = false
}
</script>

<template>
  <div
    class="chat-view-wrapper"
  >
    <div class="chat-wrapper">
      <Chat
        :chat="selectedChat?.chat ?? null"
        :messages="messages"
        @edit-chat-title="openEditChatModal"
        @delete-chat="openDeleteChatModal"
      />
    </div>
    <DeleteChatModalEndUser
      :is-open="deleteChatModalVisible"
      :selected-chat="selectedChatDelete"
      @close-modal="closeDeleteChatModal"
    />

    <EditChatTitleModalEndUser
      :is-open="editChatModalVisible"
      :selected-chat="selectedChatEdit"
      @close-modal="closeEditChatModal"
    />
  </div>
</template>

<style lang="scss" scoped>
.chat-view-wrapper {
  max-height: 100%;
  & .chat-wrapper {
    height: 100%;
    max-width: 48rem;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: transparent;
    position: relative;
    z-index: 0;
  }
}
</style>
