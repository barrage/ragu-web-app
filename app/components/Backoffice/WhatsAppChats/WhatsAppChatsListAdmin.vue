<script lang="ts" setup>
import type { WhatsAppChat } from '~/types/whatsapp'

const props = defineProps<{
  whatsAppChats: WhatsAppChat[] | null | undefined
}>()
</script>

<template>
  <div class="whatsapp-chats-list-container">
    <div class="whatsapp-chats-list">
      <div
        v-for="(whatsAppChat, index) in props.whatsAppChats"
        :key="whatsAppChat?.chat?.id"
      >
        <WhatsAppChatCardAdmin
          v-motion-fade
          :data-testid="`bo-whatsapp-chat-data-card-${index + 1}`"
          :delay="(index * 100)"
          :duration="400"
          :whats-app-chat="whatsAppChat"
          @delete-chat="openDeleteChatModal(whatsAppChat)"
          @edit-chat-title="openEditChatModal(whatsAppChat)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.whatsapp-chats-list-container {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.whatsapp-chats-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>
