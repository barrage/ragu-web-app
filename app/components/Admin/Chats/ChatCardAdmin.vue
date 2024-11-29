<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import ChatIcon from '~/assets/icons/svg/chat-icon.svg'
import EyeIcon from '~/assets/icons/svg/eye.svg'
import EditIcon from '~/assets/icons/svg/edit-text.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import type { AdminChatDetails } from '~/types/chat'

const props = defineProps<{
  chat: AdminChatDetails
}>()

const emits = defineEmits<Emits>()

const { t } = useI18n()

const relativeCreatedAtDate = ref(props.chat?.chat.createdAt ? useRelativeDate(props.chat.chat.createdAt) : t('timePeriod.unknown_date'))
const relativeUpdatedAtDate = ref(props.chat?.chat.updatedAt ? useRelativeDate(props.chat.chat.updatedAt) : t('timePeriod.unknown_date'))

const chatData = computed(() => {
  return {
    title: props.chat?.chat?.title || t('chat.admin.chat_card.unknown_title'),
    user: props.chat?.chat?.userId || '-',
    updatedAt: relativeUpdatedAtDate.value,
    createdAt: relativeCreatedAtDate.value,
    agentName: props.chat?.agent?.name || '-',
    userName: props.chat?.user?.fullName || '-',
  }
})

interface Emits {
  (event: 'delete-chat', chat: AdminChatDetails): void
  (event: 'edit-chat-title', chat: AdminChatDetails): void
}
</script>

<template>
  <el-card class="chat-card is-primary">
    <div class="grid">
      <LlmLink
        :to="`/admin/chats/${chat?.chat?.id}`"
        type="link"
        class="chat-profile-item"
      >
        <ChatIcon size="40px" class="chat-icon" />
        <div class="chat-wrapper">
          <p class="chat-name">
            {{ `${chatData.title}` }}
          </p>
        </div>
      </LlmLink>
      <div class="chat-informations">
        <LabelDescriptionItem
          :label="t('chat.admin.chat_card.updated_at')"
          size="small"
          :description="chatData.updatedAt"
        />
        <LabelDescriptionItem
          :label="t('users.user_card.username')"
          size="small"
          :description="chatData.userName"
        />
        <LabelDescriptionItem
          :label="t('agents.labels.name')"
          size="small"
          :description="chatData.agentName"
        />
      </div>
      <div class="chat-actions">
        <ElTooltip
          :content="t('chat.admin.chat_card.view_details')"
          :enterable="false"
          placement="top"
        >
          <LlmLink
            :to="`/admin/chats/${chat?.chat?.id}`"
            type="plainButtonPrimary"
          >
            <EyeIcon size="20px" />
          </LlmLink>
        </ElTooltip>

        <ElTooltip
          :content="t('chat.admin.chat_card.edit_chat')"
          :enterable="false"
          placement="top"
        >
          <el-button plain @click="emits('edit-chat-title', props.chat)">
            <EditIcon size="20px" />
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
            <DeleteIcon size="20px" />
          </el-button>
        </ElTooltip>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
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
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
    grid-column: span 6;
    width: 100%;
    padding-left: 22px;
  }

  & .chat-actions {
    grid-column: span 3;
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
