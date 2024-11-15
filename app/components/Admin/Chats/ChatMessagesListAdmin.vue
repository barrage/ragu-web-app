<script lang="ts" setup>
import { nextTick } from 'vue'
import ChatWarningIcon from '~/assets/icons/svg/chat-warning.svg'
import type { Message } from '~/types/chat'
/* import type { Pagination } from '~/types/pagination' */

const props = defineProps<{
  messages: Message[] | null | undefined
}>()

const cardClasses = ref<string[]>([])

onMounted(() => {
  nextTick(() => {
    props.messages?.forEach((_, index) => {
      setTimeout(() => {
        cardClasses.value[index] = 'list-item-visible'
      }, index * 100)
    })
  })
})

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
    <h6 class="messages-title">
      {{ $t('chat.messages') }}
    </h6>
    <template v-if="props.messages?.length">
      <div class="messages-list">
        <div
          v-for="(message, index) in messagesListData"
          :key="message.id"
          class="list-item"
          :class="[cardClasses[index]]"
        >
          <ChatMessageCardAdmin :message="message" />
        </div>

      <!-- <Pagination
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @page-change="(page:number) => changePage(page)"
      /> -->
      </div>
    </template>
    <template v-else>
      <div class="chat-messages-empty-state">
        <ChatWarningIcon size="42px" />
        <p> <b>{{ $t('chat.admin.chat_details.empty_messages') }}</b></p>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.messages-list-container {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}
.messages-title {
  color: var(--color-primary-800);
  margin: 2rem 0rem 1rem;
}
.messages-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.list-item {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.list-item-visible {
  opacity: 1;
  transform: translateY(0);
}
.chat-messages-empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.dark {
  .messages-title {
    color: var(--color-primary-100);
  }
}
</style>
