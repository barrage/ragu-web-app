<script lang="ts" setup>
import ChatMutipleIcon from '~/assets/icons/svg/chat-multiple.svg'
import type { ChatMessage } from '~/types/chat'

const props = defineProps<{
  messages: ChatMessage[] | null | undefined
  userName: string
}>()

const messagesListData = computed(() => {
  if (!props.messages || !props.messages.length) { return [] }

  return [...props.messages]
    .reverse()
    .flatMap(group =>
      group.messages.sort((a, b) => a.order - b.order),
    )
})
</script>

<template>
  <div class="messages-list-container">
    <div class="message-title-wrapper">
      <ChatMutipleIcon size="36px" />
      <h6 class="messages-title">
        {{ $t('chat.messages') }}
      </h6>
    </div>
    <div v-if="messages?.length" class="messages-list">
      <div
        v-for="(message, index) in messagesListData"
        :key="message.id"
      >
        <ChatMessageCardAdmin
          v-motion-fade
          :delay="(index * 100)"
          :duration="400"
          :message="message"
          :user-name="userName"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.messages-list-container {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}
.message-title-wrapper {
  color: var(--color-primary-800);
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 2rem 0rem 1rem;

  .messages-title {
    color: var(--color-primary-800);
  }
}
.messages-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.dark {
  .message-title-wrapper {
    color: var(--color-primary-100);
    .messages-title {
      color: var(--color-primary-100);
    }
  }
}
</style>
