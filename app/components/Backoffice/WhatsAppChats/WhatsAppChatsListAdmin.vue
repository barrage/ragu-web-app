<script lang="ts" setup>
import { nextTick } from 'vue'
import WhatsAppChatIcon from '~/assets/icons/svg/whatsapp-chat.svg'
import EyeIcon from '~/assets/icons/svg/eye.svg'
import ChatEmptyIcon from '~/assets/icons/svg/chat-warning.svg'
import type { Pagination } from '~/types/pagination'
import type { BoChatsResponse, WhatsAppChat } from '~/types/whatsapp'

const props = defineProps<{
  chats: BoChatsResponse | null | undefined
}>()
const emits = defineEmits<{
  (event: 'pageChange', page: number): number
  (event: 'chatDeleted'): void
  (event: 'chatTitleEdited'): void
}>()

// CONSTANTS & STATES

const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  disabled: false,
})
const cardClasses = ref<string[]>([])
const applyCardClasses = () => {
  cardClasses.value = []
  props.chats?.items.forEach((_, index) => {
    setTimeout(() => {
      cardClasses.value[index] = 'list-item-visible'
    }, index * 100)
  })
}

// WATCHERS

watch(
  () => props.chats,
  () => nextTick(applyCardClasses),
  { immediate: true },
)

watch(
  () => props.chats?.total,
  value => pagination.value.total = value ?? 0,
  { immediate: true },
)

// FUNCTIONS

function changePage(page: number) {
  pagination.value.currentPage = page
  emits('pageChange', pagination.value.currentPage)
}

const chatsData = computed(() => {
  return props.chats?.items.map(object => ({
    fullName: object.fullName,
    id: object.chat.id,
    userId: object.chat.userId,
    createdAt: formatDate(object.chat.updatedAt, 'MMMM DD, YYYY'),
    updatedAt: formatDate(object.chat.updatedAt, 'MMMM DD, YYYY'),
  })) || []
})
</script>

<template>
  <div class="chats-list-container">
    <div v-if="chatsData.length" class="chats-list">
      <div
        v-for="(chat, index) in chatsData"
        :key="chat.id"
        class="list-item"
        :class="[cardClasses[index]]"
      >
        <ElCard class="chat-card is-primary">
          <div class="grid">
            <LlmLink
              :to="`/admin/whatsapp-chats/${chat.id}`"
              type="link"
              class="chat-profile-item"
            >
              <WhatsAppChatIcon size="36" class="chat-icon" />
              <div class="chat-wrapper">
                <p class="chat-name">
                  {{ chat.fullName }}
                </p>
              </div>
            </LlmLink>
            <div class="chat-informations">
              <LabelDescriptionItem
                :label="$t('chat.admin.chat_card.updated_at')"
                size="small"
                :description="chat.updatedAt"
              />
              <LabelDescriptionItem
                :label="$t('chat.admin.chat_card.created_at')"
                size="small"
                :description="chat.createdAt"
              />
            </div>

            <div class="chat-actions">
              <LlmTooltip :content="$t('chat.admin.chat_card.view_details')">
                <LlmLink
                  :to="`/admin/whatsapp-chats/${chat.id}`"
                  type="plainButtonPrimary"
                >
                  <EyeIcon />
                </LlmLink>
              </LlmTooltip>
            </div>
          </div>
        </ElCard>
      </div>

      <Pagination
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="chats?.total ?? 0"
        @page-change="(page:number) => changePage(page)"
      />
    </div>

    <EmptyState
      v-else
      :title="$t('whatsapp_chat.empty_title_chats')"
      :description="$t('whatsapp_chat.empty_description_chats')"
    >
      <template #icon>
        <ChatEmptyIcon size="44px" />
      </template>
    </EmptyState>
  </div>
</template>

<style lang="scss" scoped>
.chats-list-container {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.chats-list {
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

/* CHAT CARD */

.chat-card {
  padding-inline: 0.6rem;
  padding-block: 0.8rem;
  & .chat-profile-item {
    grid-column: span 3;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-start;
    text-overflow: ellipsis;
    color: var(--color-primary-900);
    max-width: calc(100% - 40px);

    & .chat-icon {
      min-width: fit-content;
    }

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }

  & .chat-informations {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    grid-column: span 8;
    width: 100%;
    padding-left: 22px;
  }

  & .chat-actions {
    grid-column: span 1;
    display: flex;
    gap: 12px;
    justify-self: flex-end;

    & .delete-action {
      margin-left: 2rem;
    }
  }
}

.chat-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-overflow: ellipsis;
  max-width: 100%;

  & .chat-name {
    margin: 0;
    font-size: var(--font-size-fluid-2);
    line-height: normal;
    font-weight: var(--font-weight-bold);
    color: var(--color-primary-900);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
}

.dark {
  .chat-profile-item {
    color: var(--color-primary-0);
  }
  .chat-wrapper {
    & .chat-name {
      color: var(--color-primary-0);
    }
  }
}
</style>
