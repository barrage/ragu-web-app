<script lang="ts" setup>
import type { AdminChatDetails } from '~/types/chat'

const props = defineProps<{
  chats: AdminChatDetails[] | null | undefined
}>()

const emits = defineEmits<{
  (event: 'chatDeleted'): void
  (event: 'chatTitleEdited'): void
}>()

/* Delete Chat */
const selectedChatDelete = ref<AdminChatDetails | null>(null)
const deleteChatModalVisible = ref(false)

const openDeleteChatModal = (chat: AdminChatDetails) => {
  selectedChatDelete.value = chat
  deleteChatModalVisible.value = true
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
          :data-testid="`bo-chat-data-card-${index + 1}`"
          :delay="(index * 100)"
          :duration="400"
          :chat="chat"
          @delete-chat="openDeleteChatModal(chat)"
          @edit-chat-title="openEditChatModal(chat)"
        />
      </div>
    </div>

    <DeleteChatModalBackoffice
      v-model="deleteChatModalVisible"
      :selected-chat="selectedChatDelete"
      @chat-deleted="chatDeleted"
    />

    <EditChatTitleModalBackoffice
      v-model="editChatModalVisible"
      :selected-chat="selectedChatEdit"
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
  gap: var(--spacing-fluid-3-xs);
}
</style>
