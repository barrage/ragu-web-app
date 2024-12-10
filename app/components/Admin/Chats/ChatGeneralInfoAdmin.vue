<script lang="ts" setup>
import type { Chat } from '~/types/chat.ts'
import type { SingleAgent } from '~/types/agent.ts'
import type { User } from '~/types/users'
import { StatusType } from '~/types/statusTypes'
import LabelDescriptionItem from '~/components/shared/LabelDescriptionItem.vue'
import ProfileIcon from '~/assets/icons/svg/account.svg'
import AgentIcon from '~/assets/icons/svg/chat-agent.svg'

const props = defineProps<{
  chat: Chat | null
  agent: SingleAgent | null
  user: User | null
}>()

const { t } = useI18n()
const relativeChatUpdatedDate = ref(props.chat?.createdAt ? useRelativeDate(props.chat.createdAt) : '-')

const chatData = computed(() => {
  return {
    chat: {
      title: props.chat?.title || '-',
      createdAt: props.chat?.title ? formatDate(props.chat.createdAt, 'dddd, MMMM D, YYYY h:mm A') : '-',
      updatedAt: relativeChatUpdatedDate.value,
      id: props.chat?.id || '-',
    },
    user: {
      username: props.user?.fullName || '-',
      email: props.user?.email || '-',
      id: props.user?.id || '-',
      status: props.user?.active ? t('users.user_card.active_status') : t('users.user_card.inactive_status'),
      role: props.user?.role === 'admin' ? t('users.user_card.adminRole') : t('users.user_card.userRole'),
      statusType: props.user?.active ? StatusType.Success : StatusType.Danger,
    },
    agent: {
      username: props.agent?.name || '-',
      id: props.agent?.id || '-',
      language: props.agent?.language || '',
      vectorProvider: props.agent?.vectorProvider || '-',
      status: props.agent?.active ? t('agents.agent_card.active_status') : t('agents.agent_card.inactive_status'),
      statusType: props.agent?.active ? StatusType.Success : StatusType.Danger,
      embeddingModel: props.agent?.embeddingModel || '-',
    },
  }
})
</script>

<template>
  <div class="chat-general-info-container grid">
    <div class="chat-general-info-card">
      <h5 class="chat-details-title">
        {{ chatData.chat.title }}
      </h5>
      <div class="chat-informations-wrapper grid">
        <LabelDescriptionItem label="Id:" :description="chatData.chat?.id" />
        <LabelDescriptionItem :label="t('chat.admin.chat_card.created_at')" :description="chatData.chat?.createdAt" />
        <LabelDescriptionItem :label="t('chat.admin.chat_card.updated_at')" :description="chatData.chat?.updatedAt" />
      </div>
    </div>
    <div class="user-general-info-card">
      <LlmLink
        :to="`/admin/users/${user?.id}`"
        type="link"
        class="user-profile-item"
      >
        <ProfileIcon size="36px" />
        <div class="username-mail-wrapper">
          <p class="username">
            {{ `${chatData.user.username}` }}
          </p>
          <span class="user-mail">{{ chatData.user.email }}</span>
        </div>
      </LlmLink>
      <div class="user-informations">
        <LabelDescriptionItem
          :label="t('users.user_card.status')"
          size="small"
          :description="chatData.user?.status"
        >
          <template #customDescription>
            <el-tag :type="chatData.user.statusType" size="small">
              <span class="status-dot" />  {{ chatData?.user.status }}
            </el-tag>
          </template>
        </LabelDescriptionItem>
        <LabelDescriptionItem
          :label="t('users.user_card.role')"
          size="small"
          :description="chatData.user.role"
        />

        <LabelDescriptionItem
          :label="t('users.user_card.user_id')"
          size="small"
          :description="chatData.user.id"
        />
      </div>
    </div>
    <div class="agent-general-info-card">
      <LlmLink
        :to="`/admin/users/${agent?.id}`"
        type="link"
        class="user-profile-item"
      >
        <AgentIcon size="36px" />
        <div class="username-mail-wrapper">
          <p class="username">
            {{ `${chatData.agent.username}` }}
          </p>
          <span class="user-mail">{{ chatData.agent.language }}</span>
        </div>
      </LlmLink>
      <div class="user-informations">
        <LabelDescriptionItem
          :label="t('agents.labels.status')"
          size="small"
          :description="chatData.agent?.status"
        >
          <template #customDescription>
            <el-tag :type="chatData.agent.statusType" size="small">
              <span class="status-dot" />  {{ chatData?.agent.status }}
            </el-tag>
          </template>
        </LabelDescriptionItem>

        <LabelDescriptionItem
          :label="t('agents.labels.vectorProvider')"
          size="small"
          :description="chatData.agent.vectorProvider"
        />

        <LabelDescriptionItem
          :label="t('agents.labels.embeddingModel')"
          size="small"
          :description="chatData.agent.embeddingModel"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-general-info-container {
  & .chat-general-info-card {
    grid-column: span 12;

    & .chat-details-title {
      font-weight: var(--font-weight-bold);
      color: var(--color-primary-800);
      font-size: var(--font-size-fluid-5);
    }
    & .chat-informations-wrapper {
      margin-top: 0.75rem;

      border: 0.5px solid var(--color-primary-300);
      background: var(--color-primary-0);
      box-shadow: 0 0.2rem 0.3rem var(--color-primary-100);
      border-radius: 8px;
      padding: 1rem;
      & .label-description-item-container {
        grid-column: span 4;
      }
    }
  }
  & .user-general-info-card {
    grid-column: span 6;
    border: 0.5px solid var(--color-primary-300);
    background: var(--color-primary-0);
    box-shadow: 0 0.2rem 0.3rem var(--color-primary-100);
    border-radius: 8px;
    padding: 1rem;
  }
  & .agent-general-info-card {
    grid-column: span 6;
    border: 0.5px solid var(--color-primary-300);
    background: var(--color-primary-0);
    box-shadow: 0 0.2rem 0.3rem var(--color-primary-100);
    border-radius: 8px;
    padding: 1rem;
  }
}

.user-informations {
  display: flex;
  gap: 32px;
  margin-top: 1rem;
}
.user-profile-item {
  grid-column: span 2;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  margin-right: 1rem;
  text-overflow: ellipsis;
  flex: 0 0 calc(30% - 22px);
  color: var(--color-primary-900);

  svg {
    flex-shrink: 0;
  }

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
  & .chat-general-info-container {
    & .chat-general-info-card {
      & .chat-informations-wrapper {
        border: 0.5px solid var(--color-primary-700);
        background: var(--color-primary-900);
        box-shadow: 0 0.2rem 0.3rem var(--color-primary-800);
      }
      & .chat-details-title {
        color: var(--color-primary-100);
      }
    }
    & .user-general-info-card {
      border: 0.5px solid var(--color-primary-700);
      background: var(--color-primary-900);
      box-shadow: 0 0.2rem 0.3rem var(--color-primary-800);
    }
    & .agent-general-info-card {
      border: 0.5px solid var(--color-primary-700);
      background: var(--color-primary-900);
      box-shadow: 0 0.2rem 0.3rem var(--color-primary-800);
    }
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
