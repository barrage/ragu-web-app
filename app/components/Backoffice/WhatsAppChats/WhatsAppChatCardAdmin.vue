<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import WhatsAppChatIcon from '~/assets/icons/svg/whatsapp-chat.svg'
import EyeIcon from '~/assets/icons/svg/eye.svg'
import EditIcon from '~/assets/icons/svg/edit-text.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import type { WhatsAppChat } from '~/types/whatsapp'

const props = defineProps<{
  whatsAppChat: WhatsAppChat
}>()
const chatData = computed(() => {
  return {
    fullname: props.whatsAppChat?.fullName,
    createdAt: formatDate(props.whatsAppChat.chat.updatedAt, 'MMMM DD, YYYY'),
    updatedAt: formatDate(props.whatsAppChat.chat.updatedAt, 'MMMM DD, YYYY'),
  }
})
</script>

<template>
  <ElCard class="whatsapp-chat-card is-primary">
    <div class="grid">
      <LlmLink
        :to="`/admin/whatsapp-chats/${whatsAppChat?.chat?.id}`"
        type="link"
        class="whatsapp-chat-profile-item"
      >
        <WhatsAppChatIcon size="40px" class="whatsapp-chat-icon" />
        <div class="whatsapp-chat-wrapper">
          <p class="whatsapp-chat-name">
            {{ chatData.fullname }}
          </p>
        </div>
      </LlmLink>
      <div class="whatsapp-chat-informations">
        <LabelDescriptionItem
          :label="$t('chat.admin.chat_card.updated_at')"
          size="small"
          :description="chatData.updatedAt"
        />
        <LabelDescriptionItem
          :label="$t('chat.admin.chat_card.created_at')"
          size="small"
          :description="chatData.createdAt"
        />
      </div>
      <div class="whatsapp-chat-actions">
        <LlmTooltip :content="$t('chat.admin.chat_card.view_details')">
          <LlmLink
            :to="`/admin/whatsapp-chats/${whatsAppChat?.chat?.id}`"
            type="plainButtonPrimary"
          >
            <EyeIcon size="20px" />
          </LlmLink>
        </LlmTooltip>
      </div>
    </div>
  </ElCard>
</template>

<style lang="scss" scoped>
.whatsapp-chat-card {
  padding-inline: 0.6rem;
  padding-block: 0.8rem;
  & .whatsapp-chat-profile-item {
    grid-column: span 3;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    color: var(--color-primary-900);

    & .whatsapp-chat-icon {
      min-width: fit-content;
    }

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }

  & .whatsapp-chat-informations {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
    grid-column: span 6;
    width: 100%;
    padding-left: 22px;

    & > * {
      min-width: 0;
    }

    &:deep(.label-description-item-container .description) {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }
  }

  & .whatsapp-chat-actions {
    grid-column: span 3;
    display: flex;
    gap: 12px;
    justify-self: flex-end;

    & .delete-action {
      margin-left: 2rem;
    }
  }
}

.whatsapp-chat-wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: space-between;
  text-overflow: ellipsis;
  max-width: 100%;
  overflow: hidden;

  & .whatsapp-chat-name {
    margin: 0;
    font-size: var(--font-size-fluid-2);
    line-height: normal;
    font-weight: var(--font-weight-semibold);
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
  .whatsapp-chat-profile-item {
    color: var(--color-primary-0);
  }
  .whatsapp-chat-wrapper {
    & .whatsapp-chat-name {
      color: var(--color-primary-0);
    }
  }
}
</style>
