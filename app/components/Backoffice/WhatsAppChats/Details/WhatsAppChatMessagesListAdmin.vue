<script lang="ts" setup>
import WhatsAppChatMutipleIcon from '~/assets/icons/svg/whatsapp-chat-multiple.svg'
import type { WhatsAppMessage } from '~/types/whatsapp'
import type { User } from '~/types/users'

defineProps<{
  whatsAppMessages: WhatsAppMessage[] | null | undefined
  whatsAppUser: User | null | undefined
}>()
</script>

<template>
  <div class="whatsapp-messages-list-container">
    <div class="whatsapp-message-title-wrapper">
      <WhatsAppChatMutipleIcon size="36px" />
      <h6 class="whatsapp-messages-title">
        {{ $t('chat.messages') }}
      </h6>
    </div>

    <WhatsAppChatMessagesList
      :what-app-messages="whatsAppMessages"
      :whats-app-user="whatsAppUser"
    />
  </div>
</template>

<style lang="scss" scoped>
.whatsapp-messages-list-container {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}
.whatsapp-message-title-wrapper {
  color: var(--color-primary-800);
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 2rem 0rem 1rem;

  .whatsapp-messages-title {
    color: var(--color-primary-800);
  }
}
.whatsapp-messages-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.dark {
  .whatsapp-message-title-wrapper {
    color: var(--color-primary-100);
    .whatsapp-messages-title {
      color: var(--color-primary-100);
    }
  }
}
</style>
