<script setup lang="ts">
import { defineProps } from 'vue'
import type { Chat, Message } from '~/types/chat'
import EditTextIcon from '~/assets/icons/svg/edit-text.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import MoreIcon from '~/assets/icons/svg/more.svg'

const props = defineProps<{
  chat: Chat | null
  messages: Message[] | null
}>()

const popperOptions = {
  placement: 'bottom-end',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 6],
      },
    },
    {
      name: 'flip',
      options: {
        fallbackPlacements: ['top-start'],
      },
    },
  ],
}
</script>

<template>
  <div class="chat-container">
    <div class="chat-title">
      <h5>
        {{ props?.chat?.title || 'Chat title' }}
      </h5>
      <ClientOnly>
        <el-dropdown trigger="hover" :popper-options="popperOptions">
          <MoreIcon size="20" />

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <div style="display: flex; gap: 8px;">
                  <EditTextIcon /> Edit title
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div style="display: flex; gap: 8px;">
                  <DeleteIcon /> Delete chat
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </ClientOnly>
    </div>

    <div class="messages-container">
      <template
        v-for="message in props.messages"
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
  align-items: center;
  gap: 22px;
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
  &::after {
    content: '';
    position: absolute;
    bottom: -64px; // Slightly below the bottom of the title
    left: 0;
    width: 100%;
    height: 64px; // Height of the fade effect
    background: linear-gradient(
      to bottom,
      var(--color-primary-subtle),
      transparent
    );
    pointer-events: none; // Ensure it doesn’t interfere with interactions
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
    &::after {
      background: linear-gradient(
        to bottom,
        var(--color-primary-900),
        transparent
      );
    }
  }
}
</style>
