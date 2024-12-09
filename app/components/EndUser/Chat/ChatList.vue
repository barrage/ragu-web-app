<script setup lang="ts">
import { defineProps } from 'vue'
import ChatIcon from '~/assets/icons/svg/chat-icon.svg'
import type { Chat } from '~/types/chat'

const props = defineProps<{
  chats: Chat[]
}>()

const { isSidebarCollapsed } = storeToRefs(useNavigationStore())
const route = useRoute()
const chatId = computed(() => {
  return route.params.chatId
})
</script>

<template>
  <div class="chat-list">
    <LlmTooltip
      v-for="chat in props.chats"
      :key="chat.id"
      :delayed="!isSidebarCollapsed"
      placement="right"
    >
      <template #content>
        <div class="chat-tooltip">
          <span>{{ chat.title }}</span>
          <span>{{ formatDate(chat.createdAt) }}</span>
        </div>
      </template>
      <LlmLink
        :to="`/c/${chat.id}`"
        type="link"
        class="chat-item"
        :class="{ 'selected': chatId === chat.id, 'collapsed-link': isSidebarCollapsed }"
      >
        <div class="chat-content">
          <span v-if="isSidebarCollapsed">
            <ChatIcon size="24px" />
          </span>
          <span v-else class="chat-title">{{ chat.title || $t('chat.chat') }}</span>
        </div>
      </LlmLink>
    </LlmTooltip>
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
  min-height: 40px;
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
  scroll-snap-align: start;
  margin-right: 3px;

  &.selected {
    background: var(--color-primary-300);
    color: var(--color-primary-900);
    .chat-title::after {
      background: linear-gradient(
        to left,
        var(--color-primary-300),
        transparent
      );
    }
  }

  &:hover {
    background: var(--color-primary-300);
    color: var(--color-primary-900);
  }

  &:hover .icon-container {
    opacity: 1;
    transform: translateX(6px);
  }
  &:hover .chat-title {
    &::after {
      display: none;
    }
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

.collapsed-link {
  display: flex;
  justify-content: center;
}

.chat-title {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  padding-right: 2rem;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 2rem;
    background: linear-gradient(to left, var(--color-primary-200), transparent);
    pointer-events: none;
  }
}

.dark {
  .chat-item {
    color: var(--color-primary-100);

    &:hover {
      background: var(--color-primary-700);
      color: var(--color-primary-0);
    }
    &.selected {
      background: var(--color-primary-700);
      color: var(--color-primary-0);
      .chat-title::after {
        background: linear-gradient(
          to left,
          var(--color-primary-700),
          transparent
        );
      }
    }
  }

  .chat-title::after {
    background: linear-gradient(to left, var(--color-primary-800), transparent);
  }
}
</style>
