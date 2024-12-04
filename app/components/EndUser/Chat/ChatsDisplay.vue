<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { groupChatsByTime } from '~/utils/groupChatsByTime'
import type { Chat, GroupedChats } from '~/types/chat'

const chatStore = useChatStore()
const allChats = computed(() => {
  return chatStore.chats
})

const groupedChats = ref<GroupedChats>({
  today: [],
  yesterday: [],
  last7days: [],
  last30days: [],
  monthsThisYear: {},
  lastYear: [],
})

const updateGroupedChats = () => {
  if (allChats.value) {
    groupedChats.value = groupChatsByTime(allChats.value)
  }
}

onMounted(() => {
  updateGroupedChats()
})

watch(allChats, () => {
  updateGroupedChats()
})

const isChatGroupEmpty = (chatGroup: Chat[] | null) => {
  return chatGroup?.length ? !(chatGroup?.length > 0) : true
}
</script>

<template>
  <div class="chat-display scrollable-element">
    <div v-if="!isChatGroupEmpty(groupedChats.today)">
      <h6 class="chat-group-title typing-effect">
        {{ $t('timePeriod.today') }}
      </h6>
      <ChatList :chats="groupedChats.today" />
    </div>

    <div v-if="!isChatGroupEmpty(groupedChats.yesterday)">
      <h6 class="chat-group-title typing-effect">
        {{ $t('timePeriod.yesterday') }}
      </h6>
      <ChatList :chats="groupedChats.yesterday" />
    </div>

    <div v-if="!isChatGroupEmpty(groupedChats.last7days)">
      <h6 class="chat-group-title typing-effect">
        {{ $t('timePeriod.last7days') }}
      </h6>
      <ChatList :chats="groupedChats.last7days" />
    </div>

    <div v-if="!isChatGroupEmpty(groupedChats.last30days)">
      <h6 class="chat-group-title typing-effect">
        {{ $t('timePeriod.last30days') }}
      </h6>
      <ChatList :chats="groupedChats.last30days" />
    </div>

    <template v-if="allChats.length > 0">
      <div
        v-for="(chats, month) in groupedChats.monthsThisYear"
        :key="month"
      >
        <h6 class="chat-group-title typing-effect">
          {{ month }}
        </h6>
        <ChatList :chats="chats" />
      </div>
    </template>

    <div v-if="!isChatGroupEmpty(groupedChats.lastYear)">
      <h6 class="chat-group-title  typing-effect">
        {{ $t('timePeriod.lastYear') }}
      </h6>
      <ChatList :chats="groupedChats.lastYear" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .chat-display {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow-y: auto;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  padding-bottom: 1rem;
}

.chat-group-title {
  color: var(--color-primary-800);
  font-weight: 700;
  font-size: var(--font-size-desktop-1);
  padding: 12px 0px 8px 0px;
}
.dark {
  & .chat-group-title {
    color: var(--color-primary-200);
  }
}
</style>
