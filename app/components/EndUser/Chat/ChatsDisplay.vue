<script setup lang="ts">
import BrainIcon from '~/assets/icons/svg/brain.svg'
import AddIcon from '~/assets/icons/svg/add.svg'
import { groupChatsByTime } from '~/utils/groupChatsByTime'
import type { Chat } from '~/types/chat'

const route = useRoute()
const chatStore = useChatStore()
const { isSidebarCollapsed } = storeToRefs(useNavigationStore())
const allChats = computed(() => {
  return chatStore.chats
})

const groupedChats = computed(() => { return groupChatsByTime(allChats.value) })
</script>

<template>
  <div
    class="chat-display"
    :class="{ 'collapsed-sidebar': isSidebarCollapsed }"
  >
    <LlmTooltip
      :content="$t('chat.start_new_chat')"
      delayed
      :disabled="!isSidebarCollapsed"
      placement="right"
    >
      <LlmLink
        to="/"
        type="link"
        class="new-chat"
        :class="{ opened: !isSidebarCollapsed, selected: route.path === '/' }"
      >
        <BrainIcon size="24px" />
        <span v-if="!isSidebarCollapsed">{{ $t('chat.newChat.title') }}</span>
        <AddIcon
          v-if="!isSidebarCollapsed"
          size="24px"
          class="add-icon"
        />
      </LlmLink>
    </LlmTooltip>

    <div v-for="_, group in groupedChats" :key="group">
      <template v-if="group === 'monthsThisYear'">
        <div
          v-for="(chat, month) in groupedChats.monthsThisYear"
          :key="month"
        >
          <ChatListTimeLabel :localization="`month${month}`" />
          <ChatList v-if="chat" :chats="chat" />
        </div>
      </template>
      <div v-else-if="groupedChats[group].length">
        <ChatListTimeLabel :localization="group" />
        <ChatList :chats="groupedChats[group]" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-display {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  padding-bottom: 1rem;
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary-500) var(--color-primary-200);

  &.collapsed-sidebar {
    &::-webkit-scrollbar {
      width: 1px;
    }
  }

  & .new-chat {
    margin-inline: auto;
    height: 3rem;
    transition: all 0.2s ease-out;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary-900);
    text-wrap: nowrap;
    width: 100%;
    margin-top: 1rem;
    padding-inline: 0.25rem;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 8px;
    background-color: transparent;
    font-size: var(--font-size-fluid-3);
    scroll-snap-align: start;

    &.selected {
      background: var(--color-primary-300);
      color: var(--color-primary-900);
    }

    &:hover {
      background: var(--color-primary-300);
    }
    &.opened {
      justify-content: flex-start;

      &:hover {
        & .add-icon {
          opacity: 1;
          transform: translateX(-5px);
        }
      }
    }

    &:deep(.llm-link--template) {
      justify-content: center;
      width: 100%;
    }
  }
}

.add-icon {
  opacity: 0;
  margin-left: auto;
  transition: all 0.3s ease;
  transform: translateX(5px);
}

html.dark {
  .new-chat {
    color: var(--color-primary-100);
    &.selected {
      background: var(--color-primary-700);
      color: var(--color-primary-0);
    }
    &.opened {
      color: var(--color-primary-100);
    }

    &:hover {
      background: var(--color-primary-700);
    }
  }
  & .typing-effect {
    color: var(--color-primary-200);
  }
}
</style>
