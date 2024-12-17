<script lang="ts" setup>
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'
import WhatsAppChatIcon from '~/assets/icons/svg/whatsapp-chat.svg'
import ProfileIcon from '~/assets/icons/svg/account.svg'
import ChatEmptyIcon from '~/assets/icons/svg/chat-warning.svg'
import { StatusType } from '~/types/statusTypes'

definePageMeta({
  layout: 'admin-layout',
})

// CONSTANTS & STATES

const { $api } = useNuxtApp()
const { t } = useI18n()
const route = useRoute()
const chatId = route.params.chatId

// API CALLS

const { error, data: chatData } = await useAsyncData(() => $api.whatsApp.BoGetChat(chatId as string), { immediate: true, lazy: true })
errorHandler(error)

// COMPUTED

const chat = computed(() => {
  return {
    id: chatData.value?.chat?.id,
    createdAt: formatDate(chatData.value?.chat?.createdAt, 'MMMM DD, YYYY'),
    updatedAt: formatDate(chatData.value?.chat?.updatedAt, 'MMMM DD, YYYY'),
  }
})

const user = computed(() => {
  return {
    id: chatData.value?.user.id,
    fullName: chatData.value?.user.fullName,
    email: chatData.value?.user.email,
    role: chatData.value?.user.role,
    status: chatData.value?.user.active ? t('users.user_card.active_status') : t('users.user_card.inactive_status'),
    statusType: chatData.value?.user.active ? StatusType.Success : StatusType.Danger,
    createdAt: formatDate(chatData.value?.chat.createdAt, 'MMMM DD, YYYY'),
    updatedAt: formatDate(chatData.value?.chat.updatedAt, 'MMMM DD, YYYY'),
  }
})
</script>

<template>
  <AdminPageContainer>
    <LlmLink
      type="link"
      to="/admin/whatsapp-chats"
      class="back-link"
    >
      <ArrowLeftIcon /> {{ $t('whatsapp_chat.admin.title') }}
    </LlmLink>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="user.fullName || $t('whatsapp_chat.whatsapp_chat')"
          :description="$t('whatsapp_chat.admin.chat_details.description')"
        >
          <template #icon>
            <WhatsAppChatIcon size="52" />
          </template>
        </AdminPageTitleContainer>
      </template>
    </AdminPageHeadingTemplate>
    <div v-if="chatData" class="chat-general-info-container grid">
      <div class="chat-general-info-card">
        <div class="chat-informations-wrapper grid">
          <LabelDescriptionItem
            label="Id:"
            :description="chat.id"
          />
          <LabelDescriptionItem
            :label="$t('chat.admin.chat_card.created_at')"
            :description="chat.createdAt"
          />
          <LabelDescriptionItem
            :label="$t('chat.admin.chat_card.updated_at')"
            :description="chat.updatedAt"
          />
        </div>
      </div>
      <div class="user-general-info-card">
        <LlmLink
          :to="`/admin/users/${user.id}`"
          type="link"
          class="user-profile-item"
        >
          <ProfileIcon size="36" />
          <div class="username-mail-wrapper">
            <p class="username">
              {{ `${user.fullName}` }}
            </p>
            <span class="user-mail">
              {{ user.email }}
            </span>
          </div>
        </LlmLink>
        <div class="user-informations">
          <LabelDescriptionItem
            :label="$t('users.user_card.status')"
            size="small"
            :description="$t('users.user_card.status')"
          >
            <template #customDescription>
              <ElTag :type="user.statusType" size="small">
                <span class="status-dot" />
                {{ user.status }}
              </ElTag>
            </template>
          </LabelDescriptionItem>
          <LabelDescriptionItem
            :label="t('users.user_card.role')"
            size="small"
            :description="user.role"
          />
          <LabelDescriptionItem
            :label="t('users.user_card.user_id')"
            size="small"
            :description="user.id"
          />
        </div>
      </div>
      <WhatsAppChatMessagesList
        :messages="chatData?.messages"
        :user="chatData?.user"
        class="chat-messages-list"
      />
    </div>

    <EmptyState
      v-else
      :title="$t('whatsapp_chat.empty_state_title_details')"
      :description="$t('whatsapp_chat.empty_state_desc_details')"
    >
      <template #icon>
        <ChatEmptyIcon size="44px" />
      </template>
    </EmptyState>
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.back-link {
  display: flex;
  gap: 4px;
  align-items: center;
  margin-bottom: 32px;
}
.chat-general-info-container {
  & .chat-general-info-card {
    grid-column: span 12;
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
    grid-column: span 12;
    border: 0.5px solid var(--color-primary-300);
    background: var(--color-primary-0);
    box-shadow: 0 0.2rem 0.3rem var(--color-primary-100);
    border-radius: 8px;
    padding: 1rem;
  }
  & .chat-messages-list {
    grid-column: span 12;
  }
}

.user-informations {
  display: flex;
  justify-content: space-between;
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
    }
    & .user-general-info-card {
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
