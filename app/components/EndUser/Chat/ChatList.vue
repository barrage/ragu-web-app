<script setup lang="ts">
import { defineProps } from 'vue'
import type { Chat } from '~/types/chat'

const props = defineProps<{
  chats: Chat[]
}>()

const router = useRouter()
const route = useRoute()
const chatId = computed(() => {
  return route.params.chatId
})
</script>

<template>
  <div class="chat-list">
    <div
      v-for="chat in props.chats"
      :key="chat.id"
      class="chat-item"
      :class="{ selected: chatId === chat.id }"
      @click="router.push(`/c/${chat.id}`)"
    >
      <ElTooltip
        :show-after="1500"
        :enterable="false"
        placement="right"
      >
        <template #content>
          <div class="chat-tooltip">
            <span>{{ chat.title }}</span>
            <span>{{ formatDate(chat.createdAt) }}</span>
          </div>
        </template>
        <div class="chat-content">
          <span class="chat-title">{{ chat.title || 'Chat' }}</span>
        </div>
      </ElTooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 4px;
  padding-inline-start: 8px;
  font-size: var(--font-size-desktop-2);
  color: var(--color-primary-800);
  transition:
    background-color 0.2s ease-out,
    color 0.2s ease-out;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  &.selected {
    background: var(--color-primary-300);
    color: var(--color-primary-900);
  }
}
.chat-tooltip {
  display: flex;
  flex-direction: column;
}
.chat-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
}

.chat-title {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  transition: color 0.3s ease;
  text-overflow: ellipsis;
}

.more-icon {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateX(20px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  background: var(--color-primary-300);
  padding-right: 0.1875rem;
  height: 100% !important;
  border-radius: 0 8px 8px 0;

  color: var(--color-primary-700);
}

.dark {
  .more-icon {
    color: var(--color-primary-100);
  }
}
</style>
