<script setup lang="ts">
import { defineProps } from 'vue'
import type { Chat } from '~/types/ChatTypes'
import MoreIcon from '~/assets/icons/svg/more.svg'

const props = defineProps<{
  chats: Chat[]
}>()
</script>

<template>
  <div class="chat-list">
    <div
      v-for="chat in props.chats"
      :key="chat.id"
      class="chat-item"
    >
      <div class="chat-content">
        <span class="chat-title">{{ chat.title }}</span>
        <MoreIcon class="more-icon icon-container" />
      </div>
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
  padding: 0.5rem;
  font-size: var(--font-size-desktop-2);
  color: var(--color-primary-800);
  transition:
    background-color 0.2s ease-out,
    color 0.2s ease-out;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  &:hover {
    background: var(--color-primary-300);
    color: var(--color-primary-900);
  }

  &:hover .icon-container {
    opacity: 1;
    transform: translateX(10px);
  }
  &:hover .chat-title {
    &::after {
      display: none;
    }
  }
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
  height: 100%;
  border-radius: 0 8px 8px 0;
  color: var(--color-primary-700);
}

.dark {
  .chat-item {
    color: var(--color-primary-100);

    &:hover {
      background: var(--color-primary-700);
      color: var(--color-primary-0);
    }
  }

  .chat-title::after {
    background: linear-gradient(to left, var(--color-primary-800), transparent);
  }

  .icon-container {
    background: var(--color-primary-700);
  }

  .more-icon {
    color: var(--color-primary-100);
  }
}
</style>
