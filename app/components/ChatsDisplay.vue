<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { groupChatsByTime } from '~/utils/groupChatsByTime'
import type { GroupedChats } from '~/types/chat'

const chatStore = useChatStore()
const allChats = computed(() => {
  return chatStore.chats
})

const groupedChats = ref<GroupedChats>({
  today: [],
  yesterday: [],
  last7Days: [],
  last30Days: [],
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
</script>

<template>
  <div class="chat-display">
    <div v-if="groupedChats.today.length > 0">
      <h6 class="chat-group-title">
        Today
      </h6>
      <ChatList :chats="groupedChats.today" />
    </div>

    <div v-if="groupedChats.yesterday.length > 0">
      <h6 class="chat-group-title">
        Yesterday
      </h6>
      <ChatList :chats="groupedChats.yesterday" />
    </div>

    <div v-if="groupedChats.last7Days.length > 0">
      <h6 class="chat-group-title">
        Last 7 Days
      </h6>
      <ChatList :chats="groupedChats.last7Days" />
    </div>

    <div v-if="groupedChats.last30Days.length > 0">
      <h6 class="chat-group-title">
        Last 30 Days
      </h6>
      <ChatList :chats="groupedChats.last30Days" />
    </div>
    <template v-if="chats">
      <template v-if="chats.length > 0">
        <div
          v-for="(chats, month) in groupedChats.monthsThisYear"
          :key="month"
        >
          <h6 class="chat-group-title">
            {{ month }}
          </h6>
          <ChatList :chats="chats" />
        </div>
      </template>
    </template>

    <div v-if="groupedChats.lastYear.length > 0">
      <h6 class="chat-group-title">
        Last Year
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
  margin-bottom: 2rem;
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
