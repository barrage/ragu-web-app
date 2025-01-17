<script lang="ts" setup>
import { nextTick } from 'vue'
import type { WhatsAppMessage } from '~/types/whatsapp'
import type { User } from '~/types/users'
import ChatIcon from '~/assets/icons/svg/chat-icon.svg'
import ChatEmptyIcon from '~/assets/icons/svg/chat-warning.svg'

const props = defineProps<{
  whatAppMessages: WhatsAppMessage[] | null | undefined
  whatsAppUser?: User | null | undefined
}>()

const cardClasses = ref<string[]>([])

onMounted(() => {
  nextTick(() => {
    props.whatAppMessages?.forEach((_, index) => {
      setTimeout(() => {
        cardClasses.value[index] = 'list-item-visible'
      }, index * 100)
    })
  })
})

const whatsAppMessagesListData = computed(() => {
  return props.whatAppMessages && props.whatAppMessages.length ? [...props.whatAppMessages].reverse() : []
})
</script>

<template>
  <div class="whatsapp-messages-list-container">
    <template v-if="whatsAppMessagesListData?.length">
      <div class="whatsapp-messages-list">
        <div
          v-for="(whatsAppMessage, index) in whatsAppMessagesListData"
          :key="whatsAppMessage.id"
          class="list-item"
          :class="[cardClasses[index]]"
        >
          <WhatsAppChatMessageCard
            v-motion-fade
            :delay="(index * 100)"
            :duration="400"
            :whats-app-message="whatsAppMessage"
            :whats-app-user="whatsAppUser"
          />
        </div>
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
.whatsapp-messages-list-container {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.whatsapp-messages-list {
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
</style>
