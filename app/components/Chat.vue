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
    <div class="chat-title">
      <h5>
        {{ props.chat.title }}
      </h5>
    </div>

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
    margin: 32px 0 32px;
    display: flex;
    flex-direction: column;
    gap: 36px;
    width: 100%;
  }
}

.chat-title {
  position: sticky;
  top: 0;
  background: inherit;
  display: flex;
  justify-content: center;
  width: 100%;
  background: var(--color-primary-subtle);
  padding: var(--spacing-fluid-5-xs);

  & h5 {
    transition: all 0.3s ease-out;
    color: var(--color-primary-900);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-fluid-5);
  }
}

.chat_title_small {
  .chat-title {
    & h5 {
      font-size: var(--font-size-fluid-4);
    }
  }
}
.dark {
  & .chat-title {
    background: var(--color-primary-900);
    & h5 {
      margin-bottom: 4px;
      color: var(--color-primary-0);
    }
  }
}
</style>
