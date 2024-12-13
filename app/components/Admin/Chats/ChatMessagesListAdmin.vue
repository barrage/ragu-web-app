<script lang="ts" setup>
import { nextTick } from 'vue'
import ChatWarningIcon from '~/assets/icons/svg/chat-warning.svg'
import ChatMutipleIcon from '~/assets/icons/svg/chat-multiple.svg'
import type { Message } from '~/types/chat'
/* import type { Pagination } from '~/types/pagination' */

const props = defineProps<{
  messages: Message[] | null | undefined
}>()

/* const emits = defineEmits<{
  (event: 'pageChange', page: number): number
}>() */

/*
const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
  total: chatsStore.adminAllChatsResponse?.total || 0,
  disabled: false,
})

const changePage = (page: number) => {
  pagination.value.currentPage = page
  emits('pageChange', pagination.value.currentPage)
} */

const messagesListData = computed(() => {
  return props.messages && props.messages.length ? [...props.messages].reverse() : []
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
        />
      </div>

      <!-- <Pagination
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @page-change="(page:number) => changePage(page)"
      /> -->
    </div>
    <EmptyState
      v-else
      :title="$t('chat.admin.chat_card.empty_state_title')"
      :description="$t('chat.admin.chat_details.empty_messages')"
    >
      <template #icon>
        <ChatWarningIcon size="44px" />
      </template>
    </EmptyState>
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
