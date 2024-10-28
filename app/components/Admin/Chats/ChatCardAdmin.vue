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
}
</script>

<template>
  <div>
    <div class="user-card">
      <div class="user-profile-item" @click="redirectToChatDetails">
        <ChatIcon size="36" />
        <div class="username-mail-wrapper">
          <p class="username">
            {{ `${chatData.title}` }}
          </p>
        </div>
      </div>
      <div class="user-informations">
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
        <div class="user-actions">
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
            <el-button plain>
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
  </div>
</template>

<style lang="scss" scoped>
.user-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 22px;
  border: 0.5px solid var(--color-primary-300);
  background: var(--color-primary-0);
  box-shadow: 0 0.2rem 0.3rem var(--color-primary-100);
  border-radius: 16px;
  padding: 1rem;

  & .user-informations {
    display: flex;
    gap: 2.5rem;
    flex: 1 0 calc(70% - 22px);
    justify-content: space-around;
    width: 100%;
    margin-right: 1.5rem;
  }
}

.user-actions {
  display: flex;
  gap: 12px;
  justify-self: flex-end;

  & .delete-action {
    margin-left: 2rem;
  }
}

.user-profile-item {
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

.username-mail-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .username {
    margin: 0;
    font-size: var(--font-size-fluid-2);
    line-height: normal;
    font-weight: var(--font-weight-bold);
    color: var(--color-primary-900);
  }
  & .user-mail {
    margin: 0;
    line-height: normal;
    font-size: var(--font-size-fluid-1);
    color: var(--color-primary-800);
  }
}

.dark {
  .user-card {
    border: 0.5px solid var(--color-primary-700);
    background: var(--color-primary-900);
    box-shadow: 0 0.2rem 0.3rem var(--color-primary-800);
  }
  .username-title-wrapper {
    color: var(--color-primary-0);
    & .username {
      color: var(--color-primary-0);
    }
  }
  .user-profile-item {
    color: var(--color-primary-0);
  }
  .username-mail-wrapper {
    & .username {
      color: var(--color-primary-0);
    }
    & .user-mail {
      color: var(--color-primary-100);
    }
  }
}
</style>
