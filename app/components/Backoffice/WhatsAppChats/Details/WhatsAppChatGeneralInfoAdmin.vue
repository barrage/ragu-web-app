<script lang="ts" setup>
import type { WhatsAppChat } from '~/types/whatsapp.ts'
import { StatusType } from '~/types/statusTypes'
import LabelDescriptionItem from '~/components/shared/LabelDescriptionItem.vue'
import ProfileIcon from '~/assets/icons/svg/account.svg'

const props = defineProps<{
  whatsAppChat: WhatsAppChat | null
  whatsAppUser: any | null
}>()

const { t } = useI18n()

const chatData = computed(() => {
  return {
    chat: {
      id: props.whatsAppChat?.id || '-',
      title: props.whatsAppChat?.title || '-',
      createdAt: formatDate(props.whatsAppChat?.createdAt, 'dddd, MMMM D, YYYY h:mm A') || '-',
      updatedAt: formatDate(props.whatsAppChat?.updatedAt, 'dddd, MMMM D, YYYY h:mm A') || '-',
    },
    user: {
      id: props.whatsAppUser?.id || '-',
      username: props.whatsAppUser?.fullName || '-',
      email: props.whatsAppUser?.email || '-',
      status: props.whatsAppUser?.active ? t('users.user_card.active_status') : t('users.user_card.inactive_status'),
      role: props.whatsAppUser?.role === 'admin' ? t('users.user_card.adminRole') : t('users.user_card.userRole'),
      statusType: props.whatsAppUser?.active ? StatusType.Success : StatusType.Danger,
    },
  }
})
</script>

<template>
  <div class="whatsapp-chat-general-info-container grid">
    <div class="whatsapp-chat-general-info-card">
      <div class="whatsapp-chat-grid-container grid">
        <LabelDescriptionItem
          label="Id:"
          :description="chatData.chat.id"
        />
        <LabelDescriptionItem
          :label="$t('chat.admin.chat_card.created_at')"
          :description="chatData.chat.createdAt"
        />
        <LabelDescriptionItem
          :label="$t('chat.admin.chat_card.updated_at')"
          :description="chatData.chat.updatedAt"
        />
      </div>

      <div class="whatsapp-chat-grid-container">
        <LlmLink
          :to="`/admin/users/${chatData.user?.id}`"
          type="link"
          class="whatsapp-user-profile-item"
        >
          <ProfileIcon size="36px" />
          <div class="username-mail-wrapper">
            <p class="username">
              {{ `${chatData.user.username}` }}
            </p>
            <span class="whatsapp-user-mail">{{ chatData.user.email }}</span>
          </div>
        </LlmLink>
        <div class="whatsapp-user-informations grid">
          <LabelDescriptionItem
            :label="$t('users.user_card.status')"
            :description="chatData.user.status"
          >
            <template #customDescription>
              <ElTag :type="chatData.user.statusType" size="small">
                <span class="status-dot" />  {{ chatData.user.status }}
              </ElTag>
            </template>
          </LabelDescriptionItem>
          <LabelDescriptionItem
            :label="$t('users.user_card.role')"
            :description="chatData.user.role"
          />
          <LabelDescriptionItem
            :label="$t('users.user_card.user_id')"
            :description="chatData.user.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.whatsapp-chat-general-info-container {
  & .whatsapp-chat-general-info-card {
    grid-column: span 12;

    & .whatsapp-chat-grid-container {
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
}

.whatsapp-user-informations {
  margin-top: 0.75rem;
  border-radius: 8px;
  padding: 1rem;

  & .label-description-item-container {
    grid-column: span 4;
  }
}

.whatsapp-user-profile-item {
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
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary-900);
  }
  & .whatsapp-user-mail {
    margin: 0;
    line-height: normal;
    font-size: var(--font-size-fluid-1);
    color: var(--color-primary-800);
  }
}

.dark {
  & .whatsapp-chat-general-info-container {
    & .whatsapp-chat-general-info-card {
      & .whatsapp-chat-grid-container {
        border: 0.5px solid var(--color-primary-700);
        background: var(--color-primary-900);
        box-shadow: 0 0.2rem 0.3rem var(--color-primary-800);
      }
    }
  }

  .username-title-wrapper {
    color: var(--color-primary-0);
    & .username {
      color: var(--color-primary-0);
    }
  }

  .whatsapp-user-profile-item {
    color: var(--color-primary-0);
  }

  .username-mail-wrapper {
    & .username {
      color: var(--color-primary-0);
    }

    & .whatsapp-user-mail {
      color: var(--color-primary-100);
    }
  }
}
</style>
