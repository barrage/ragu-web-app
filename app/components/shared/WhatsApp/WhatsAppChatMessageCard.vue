<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import ProfileIcon from '~/assets/icons/svg/account.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import { sanitizeHtml } from '~/utils/sanitizeHtml'
import type { Message } from '~/types/chat'
import type { WhatsAppMessage } from '~/types/whatsapp'
import type { User } from '~/types/users'

const props = defineProps<{
  message: Message | WhatsAppMessage
  user?: User | undefined
}>()

// CONSTANTS & STATES

const { t } = useI18n()
const relativeCreatedDate = ref(props.message?.createdAt ? useRelativeDate(props.message.createdAt) : '-')
const chatStore = useChatStore()
const selectedUser = computed(() => {
  return chatStore.selectedChatAdmin?.user || null
})

const messageData = computed(() => {
  const rawContent = props.message.content || ''
  const formattedContent = rawContent.replace(/\n/g, '<br>')
  const sanitizedContent = sanitizeHtml(formattedContent)

  let sender = ''
  if (props.message.senderType === 'user') {
    if (props.user) { sender = props.user.fullName }
    else { sender = selectedUser.value?.fullName || t('whatsapp_chat.you') }
  }
  else { sender = t('whatsapp_chat.admin.whatsapp_agent') }

  return {
    senderType: props.message?.senderType === 'user' ? t('chat.user') : t('chat.assistant'),
    iconType: props.message?.senderType === 'user' ? 'user' : 'assistant',
    createdAt: props.message.createdAt ? formatDate(props.message.createdAt, 'dddd, MMMM D, YYYY h:mm A') : '-',
    createdAtRealtiveTime: relativeCreatedDate.value,
    content: sanitizedContent,
    sender,
  }
})
</script>

<template>
  <div>
    <div class="message-card">
      <LlmLink
        :to="message?.senderType === 'user' ? `/admin/users/${message?.sender}` : `/admin/whatsapp-agents`"
        class="message-profile-item"
      >
        <ProfileIcon v-if="messageData.iconType === 'user'" size="36px" />
        <BrainIcon v-else-if="messageData.iconType === 'assistant'" size="36px" />
        <div class="messagename-mail-wrapper">
          <p class="messagename">
            {{ messageData.sender }}
          </p>
          <!-- <span class="message-mail">{{ messageData.createdAt }}</span> -->
        </div>
      </LlmLink>
      <div class="message-content" v-html="messageData.content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 22px;
  border: 0.5px solid var(--color-primary-300);
  background: var(--color-primary-0);
  box-shadow: 0 0.2rem 0.3rem var(--color-primary-100);
  border-radius: 16px;
  padding: 1rem;

  & .message-content {
    width: 100%;
    margin-right: 1.5rem;
    background: var(--color-primary-100);
    padding: 22px;
    border-radius: 10px;
    white-space: pre-wrap;
  }
}

.message-actions {
  display: flex;
  gap: 12px;
  justify-self: flex-end;

  & .delete-action {
    margin-left: 2rem;
  }
}

.message-profile-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  margin-right: 1rem;
  text-overflow: ellipsis;
  flex: 0 0 calc(30% - 22px);
  color: var(--color-primary-900);
}

.messagename-mail-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .messagename {
    margin: 0;
    font-size: var(--font-size-fluid-2);
    line-height: normal;
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary-900);
  }
  & .message-mail {
    margin: 0;
    line-height: normal;
    font-size: var(--font-size-fluid-1);
    color: var(--color-primary-800);
  }
}

.dark {
  .message-card {
    border: 0.5px solid var(--color-primary-700);
    background: var(--color-primary-900);
    box-shadow: 0 0.2rem 0.3rem var(--color-primary-800);
  }
  .messagename-title-wrapper {
    color: var(--color-primary-0);
    & .messagename {
      color: var(--color-primary-0);
    }
  }
  .message-content {
    background: var(--color-primary-800);
  }
  .message-profile-item {
    color: var(--color-primary-0);
  }
  .messagename-mail-wrapper {
    & .messagename {
      color: var(--color-primary-0);
    }
    & .message-mail {
      color: var(--color-primary-100);
    }
  }
}
</style>
