<script setup lang="ts">
import { defineProps } from 'vue'
import type { Chat, Message } from '~/types/chat'

const props = defineProps<{
  chat: Chat | null
  messages: Message[] | null
}>()
</script>

<template>
  <div v-if="props?.chat" class="chat-container">
    <h5 class="chat-title">
      {{ props.chat.title }}
    </h5>
    <div class="messages-container">
      <template
        v-for="message in messages"
        :key="message.id"
      >
        <ChatMessage :message="message" />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  width: 100%;

  & .messages-container {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 36px;
    width: 100%;
  }
}

.chat-title {
  color: var(--color-primary-900);
  font-weight: var(--font-weight-bold);
  margin: auto;
}
.dark {
  & .chat-title {
    color: var(--color-primary-0);
  }
}
</style>
