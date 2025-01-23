<script setup lang="ts">
import BrainIcon from '~/assets/icons/svg/brain.svg'
import AddIcon from '~/assets/icons/svg/add.svg'
import { groupChatsByTime } from '~/utils/groupChatsByTime'

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
      :disabled="!isSidebarCollapsed"
      placement="right"
      :content="$t('chat.newChat.title')"
    >
      <LlmLink
        v-motion-fade-visible-once
        :delay="300"
        to="/"
        type="link"
        class="menu-item"
        :class="{ 'selected': '/' === route.path, 'collapsed-link': isSidebarCollapsed }"
      >
        <div class="menu-content">
          <BrainIcon class="sidebar-icon" size="24px" />
          <span v-if="!isSidebarCollapsed" class="new-chat-title">{{ $t('chat.newChat.title') }}</span>
          <AddIcon
            v-if="!isSidebarCollapsed"
            size="24px"
            class="add-icon"
          />
        </div>
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
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary-500) var(--color-primary-200);

  &.collapsed-sidebar {
    &::-webkit-scrollbar {
      width: 1px;
    }
  }
}

.menu-item {
  display: flex;
  align-items: center;
  min-height: 40px;
  width: calc(100% - 3px);
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
    cursor: auto;
  }

  &:hover {
    background: var(--color-primary-300);
    color: var(--color-primary-900);
    .add-icon {
      opacity: 1;
      transform: translateX(-5px);
      color: var(--color-primary-900);
    }
  }
}

.collapsed-link {
  display: flex;
  justify-content: center;
}

.menu-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 295px;
  position: relative;
  gap: 8px;

  .new-chat-title {
    white-space: nowrap;
  }

  .sidebar-icon {
    min-width: 24px;
    min-height: 24px;
  }
}

.add-icon {
  opacity: 0;
  margin-left: auto;
  transition: all 0.3s ease;
  transform: translateX(5px);
}

.dark {
  .menu-item {
    color: var(--color-primary-100);

    &:hover {
      background: var(--color-primary-700);
      color: var(--color-primary-0);
      .add-icon {
        color: var(--color-primary-400);
      }
    }
    &.selected {
      background: var(--color-primary-700);
      color: var(--color-primary-0);
    }
  }
}
</style>
