<script lang="ts" setup>
import { nextTick } from 'vue'
import type { WhatsAppMessage } from '~/types/whatsapp'
import type { User } from '~/types/users'
import ChatIcon from '~/assets/icons/svg/chat-icon.svg'
import ChatEmptyIcon from '~/assets/icons/svg/chat-warning.svg'
/* import type { Pagination } from '~/types/pagination' */

const props = defineProps<{
  messages: WhatsAppMessage[] | null | undefined
  title?: string | undefined
  user?: User | undefined
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
    <div class="message-title-wrapper">
      <ChatIcon size="36px" />
      <h6 class="messages-title">
        {{ $t('chat.messages') }}
      </h6>
    </div>
    <template v-if="messages?.length">
      <div class="messages-list">
        <div
          v-for="(message, index) in messagesListData"
          :key="message.id"
          class="list-item"
          :class="[cardClasses[index]]"
        >
          <WhatsAppChatMessageCard
            :message="message"
            :user="user"
          />
        </div>

      <!-- <Pagination
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @page-change="(page:number) => changePage(page)"
      /> -->
      </div>
    </template>
    <EmptyState
      v-else
      :title="$t('chat.admin.chat_details.empty_messages')"
      :description="$t('chat.admin.chat_details.empty_description')"
    >
      <template #icon>
        <ChatEmptyIcon size="44px" />
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
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-primary-800);
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
  .message-title-wrapper {
    color: var(--color-primary-100);
    .messages-title {
      color: var(--color-primary-100);
    }
  }
}
</style>
