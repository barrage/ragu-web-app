<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import AddIcon from '~/assets/icons/svg/add.svg'
import { groupChatsByTime } from '~/utils/groupChatsByTime'
import type { Chat } from '~/types/chat'
import type { TimeLabel } from '~/components/EndUser/Chat/ChatListTimeLabel.vue'

const route = useRoute()
const chatStore = useChatStore()
const { isSidebarCollapsed } = storeToRefs(useNavigationStore())
const scrollableContainerRef = ref<HTMLElement | null>(null)
const allChats = computed(() => {
  return chatStore.chats
})

const groupedChats = computed(() => { return groupChatsByTime(allChats.value) })

useResizeObserver(scrollableContainerRef, () => {
  if (scrollableContainerRef.value) {
    if (scrollableContainerRef.value.scrollHeight > scrollableContainerRef.value.clientHeight - 70) {
      scrollableContainerRef.value.classList.add('has-scrollbar')
    }
    else { scrollableContainerRef.value.classList.remove('has-scrollbar') }
  }
})

function isChatGroupEmpty(chatGroup: Chat[] | null) {
  return !chatGroup?.length
}
</script>

<template>
  <div
    ref="scrollableContainerRef"
    class="chat-display"
    :class="{ 'collapsed-sidebar': isSidebarCollapsed }"
  >
    <ElTooltip
      :content="$t('chat.start_new_chat')"
      :show-after="1500"
      :hide-after="0"
      :disabled="!isSidebarCollapsed"
      :enterable="false"
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
    </ElTooltip>

    <div v-if="!isChatGroupEmpty(groupedChats.today)">
      <ChatListTimeLabel localization="today" />
      <ChatList :chats="groupedChats.today" />
    </div>

    <div v-if="!isChatGroupEmpty(groupedChats.yesterday)">
      <ChatListTimeLabel localization="yesterday" />
      <ChatList :chats="groupedChats.yesterday" />
    </div>

    <div v-if="!isChatGroupEmpty(groupedChats.last7days)">
      <ChatListTimeLabel localization="last7days" />
      <ChatList :chats="groupedChats.last7days" />
    </div>

    <div v-if="!isChatGroupEmpty(groupedChats.last30days)">
      <ChatListTimeLabel localization="last30days" />
      <ChatList :chats="groupedChats.last30days" />
    </div>

    <template v-if="groupedChats.monthsThisYear">
      <div
        v-for="(chat, month) in groupedChats.monthsThisYear"
        :key="month"
      >
        <ChatListTimeLabel :localization="`month${month}`" />
        <ChatList :chats="chat" />
      </div>
    </template>

    <div v-if="!isChatGroupEmpty(groupedChats.lastYear)">
      <ChatListTimeLabel localization="lastYear" />
      <ChatList :chats="groupedChats.lastYear" />
    </div>

    <div v-if="!isChatGroupEmpty(groupedChats.older)">
      <ChatListTimeLabel localization="older" />
      <ChatList :chats="groupedChats.older" />
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
  scrollbar-gutter: stable;
  scroll-snap-type: y mandatory;

  &.has-scrollbar {
    overflow-y: auto;
  }

  &.collapsed-sidebar {
    &::-webkit-scrollbar {
      width: 3px;
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
