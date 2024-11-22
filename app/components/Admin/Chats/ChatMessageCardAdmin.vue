<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import ProfileIcon from '~/assets/icons/svg/account.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import { sanitizeHtml } from '~/utils/sanitizeHtml'
import type { Message } from '~/types/chat'

const props = defineProps<{
  message: Message
}>()

const { t } = useI18n()

const relativeCreatedDate = ref(props.message?.createdAt ? useRelativeDate(props.message.createdAt) : '-')

const chatStore = useChatStore()
const selectedAgent = computed(() => {
  return chatStore.selectedChatAdmin?.agent || null
})
const selectedUser = computed(() => {
  return chatStore.selectedChatAdmin?.user || null
})

const messageData = computed(() => {
  const rawContent = props.message.content || ''
  const formattedContent = rawContent.replace(/\n/g, '<br>')
  const sanitizedContent = sanitizeHtml(formattedContent)

  return {
    senderType: props.message?.senderType === 'user' ? t('chat.user') : t('chat.assistant'),
    iconType: props.message?.senderType === 'user' ? 'user' : 'assistant',
    createdAt: props.message.createdAt ? formatDate(props.message.createdAt, 'dddd, MMMM D, YYYY h:mm A') : '-',
    createdAtRealtiveTime: relativeCreatedDate.value,
    content: sanitizedContent,
    sender: props.message?.senderType === 'user' ? selectedUser.value?.fullName : selectedAgent.value?.name,
  }
})

const router = useRouter()
const redirectToDetails = () => {
  return props.message?.senderType === 'user' ? router.push(`/admin/users/${props.message?.sender}`) : router.push(`/admin/agents/${props.message?.sender}`)
}
</script>

<template>
  <div>
    <div class="message-card">
      <div class="message-profile-item" @click="redirectToDetails()">
        <ProfileIcon v-if="messageData.iconType === 'user'" size="36" />
        <BrainIcon v-else-if="messageData.iconType === 'assistant'" size="36" />
        <div class="messagename-mail-wrapper">
          <p class="messagename">
            {{ `${messageData.sender}` }}
          </p>
          <span class="message-mail">{{ messageData.createdAt }}</span>
        </div>
      </div>
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

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}

.messagename-mail-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .messagename {
    margin: 0;
    font-size: var(--font-size-fluid-2);
    line-height: normal;
    font-weight: var(--font-weight-bold);
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
