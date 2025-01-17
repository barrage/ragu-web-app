<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import ProfileIcon from '~/assets/icons/svg/account.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import { sanitizeHtml } from '~/utils/sanitizeHtml'
import type { WhatsAppMessage } from '~/types/whatsapp'
import type { User } from '~/types/users'

const props = defineProps<{
  whatsAppMessage: WhatsAppMessage | null | undefined
  whatsAppUser: User | null | undefined
}>()

// CONSTANTS & STATES

const { t } = useI18n()

const messageData = computed(() => {
  const rawContent = props.whatsAppMessage.content || ''
  const formattedContent = rawContent.replace(/\n/g, '<br>')
  const sanitizedContent = sanitizeHtml(formattedContent)

  let sender = ''
  if (props.whatsAppMessage.senderType === 'user') {
    sender = props.whatsAppUser.fullName || t('whatsapp_chat.you')
  }
  else { sender = t('whatsapp_chat.admin.whatsapp_agent') }

  return {
    senderType: props.whatsAppMessage?.senderType === 'user' ? t('chat.user') : t('chat.assistant'),
    iconType: props.whatsAppMessage?.senderType === 'user' ? 'user' : 'assistant',
    createdAt: props.whatsAppMessage.createdAt ? formatDate(props.whatsAppMessage.createdAt, 'dddd, MMMM D, YYYY h:mm A') : '-',
    content: sanitizedContent,
    sender,
  }
})
</script>

<template>
  <div>
    <div class="whatsapp-message-card">
      <LlmLink
        :to="whatsAppMessage?.senderType === 'user' ? `/admin/users/${whatsAppMessage?.sender}` : `/admin/whatsapp-agents`"
        class="whatsapp-message-profile-item"
      >
        <ProfileIcon v-if="messageData.iconType === 'user'" size="36px" />
        <BrainIcon v-else size="36px" />
        <div class="whatsapp-messagename-mail-wrapper">
          <p class="whatsapp-messagename">
            {{ messageData.sender }}
          </p>
          <span class="whatsapp-message-mail">{{ messageData.createdAt }}</span>
        </div>
      </LlmLink>
      <div class="whatsapp-message-content" v-html="messageData.content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.whatsapp-message-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 22px;
  border: 0.5px solid var(--color-primary-300);
  background: var(--color-primary-0);
  box-shadow: 0 0.2rem 0.3rem var(--color-primary-100);
  border-radius: 16px;
  padding: 1rem;

  & .whatsapp-message-content {
    width: 100%;
    margin-right: 1.5rem;
    background: var(--color-primary-100);
    padding: 22px;
    border-radius: 10px;
    white-space: pre-wrap;
  }
}

.whatsapp-message-profile-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  margin-right: 1rem;
  text-overflow: ellipsis;
  flex: 0 0 calc(30% - 22px);
  color: var(--color-primary-900);

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}

.whatsapp-messagename-mail-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .whatsapp-messagename {
    margin: 0;
    font-size: var(--font-size-fluid-2);
    line-height: normal;
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary-900);
  }

  & .whatsapp-message-mail {
    margin: 0;
    line-height: normal;
    font-size: var(--font-size-fluid-1);
    color: var(--color-primary-800);
  }
}

.dark {
  .whatsapp-message-card {
    border: 0.5px solid var(--color-primary-700);
    background: var(--color-primary-900);
    box-shadow: 0 0.2rem 0.3rem var(--color-primary-800);
  }
  .whatsapp-message-content {
    background: var(--color-primary-800);
  }
  .whatsapp-message-profile-item {
    color: var(--color-primary-0);
  }
  .whatsapp-messagename-mail-wrapper {
    & .whatsapp-messagename {
      color: var(--color-primary-0);
    }
    & .whatsapp-message-mail {
      color: var(--color-primary-100);
    }
  }
}
</style>
