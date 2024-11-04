<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import ChatIcon from '~/assets/icons/svg/chat-icon.svg'
import EyeIcon from '~/assets/icons/svg/eye.svg'
import EditIcon from '~/assets/icons/svg/edit-text.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import type { Chat } from '~/types/chat'

const props = defineProps<{
  chat: Chat
}>()

const emits = defineEmits<Emits>()

const { t } = useI18n()
const router = useRouter()

const relativeCreatedAtDate = ref(props.chat?.createdAt ? useRelativeDate(props.chat.createdAt) : t('users.user_card.unknown_date'))
const relativeUpdatedAtDate = ref(props.chat?.updatedAt ? useRelativeDate(props.chat.updatedAt) : t('users.user_card.unknown_date'))

const chatData = computed(() => {
  return {
    title: props.chat?.title || '-',
    user: props.chat?.userId || '-',
    updatedAt: relativeUpdatedAtDate.value,
    createdAt: relativeCreatedAtDate.value,
  }
})

const redirectToChatDetails = () => {
  return router.push(`/admin/chats/${props.chat?.id}`)
}

interface Emits {
  (event: 'delete-chat', chat: Chat): void
  (event: 'edit-chat-title', chat: Chat): void
}
</script>

<template>
  <div>
    <div class="chat-card grid">
      <div class="chat-profile-item" @click="redirectToChatDetails">
        <ChatIcon size="36" />
        <div class="chat-wrapper">
          <p class="chat-name">
            {{ `${chatData.title}` }}
          </p>
        </div>
      </div>
      <div class="chat-informations">
        <LabelDescriptionItem
          :label="t('chat.admin.chat_card.created_at')"
          size="small"
          :description="chatData.createdAt"
        />

        <LabelDescriptionItem
          :label="t('chat.admin.chat_card.updated_at')"
          size="small"
          :description="chatData.updatedAt"
        />
      </div>
      <div class="chat-actions">
        <ElTooltip
          :content="t('chat.admin.chat_card.view_details')"
          :enterable="false"
          placement="top"
        >
          <el-button
            plain
            type="primary"
            @click="redirectToChatDetails()"
          >
            <EyeIcon />
          </el-button>
        </ElTooltip>

        <ElTooltip
          :content="t('chat.admin.chat_card.edit_chat')"
          :enterable="false"
          placement="top"
        >
          <el-button plain @click="emits('edit-chat-title', props.chat)">
            <EditIcon />
          </el-button>
        </ElTooltip>

        <ElTooltip
          :content="t('chat.admin.chat_card.delete_chat')"
          :enterable="false"
          placement="top"
        >
          <el-button
            plain
            type="danger"
            class="delete-action"
            @click="emits('delete-chat', props.chat)"
          >
            <DeleteIcon />
          </el-button>
        </ElTooltip>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-card {
  border: 0.5px solid var(--color-primary-300);
  background: var(--color-primary-0);
  box-shadow: 0 0.2rem 0.3rem var(--color-primary-100);
  border-radius: 16px;
  padding: 1rem;

  & .chat-profile-item {
    grid-column: span 4;
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

  & .chat-informations {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    grid-column: span 4;
    width: 100%;
    margin-right: 1.5rem;
  }

  & .chat-actions {
    grid-column: span 4;
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

  & .chat-name {
    margin: 0;
    font-size: var(--font-size-fluid-2);
    line-height: normal;
    font-weight: var(--font-weight-bold);
    color: var(--color-primary-900);
  }
}

.dark {
  .chat-card {
    border: 0.5px solid var(--color-primary-700);
    background: var(--color-primary-900);
    box-shadow: 0 0.2rem 0.3rem var(--color-primary-800);
  }
  .username-title-wrapper {
    color: var(--color-primary-0);
    & .chat-name {
      color: var(--color-primary-0);
    }
  }
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
