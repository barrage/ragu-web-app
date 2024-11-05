<script setup lang="ts">
import { defineProps } from 'vue'
import EditChatTitleModal from './EditChatTitleModal.vue'
import type { Chat, Message } from '~/types/chat'
import EditTextIcon from '~/assets/icons/svg/edit-text.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import MoreIcon from '~/assets/icons/svg/more.svg'

const props = defineProps<{
  chat: Chat | null
  messages: Message[] | null
}>()

const popperOptions = {
  placement: 'bottom-end',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 6],
      },
    },
    {
      name: 'flip',
      options: {
        fallbackPlacements: ['top-start'],
      },
    },
  ],
}

/* Delete Chat */
const selectedChatDelete = ref<Chat | null>(null)
const deleteChatModalVisible = ref(false)

const openDeleteChatModal = (chat: Chat | null) => {
  selectedChatDelete.value = chat
  deleteChatModalVisible.value = true
}

const closeDeleteChatModal = () => {
  deleteChatModalVisible.value = false
}
/* Edit Chat title */
const selectedChatEdit = ref<Chat | null>(null)
const editChatModalVisible = ref(false)

const openEditChatModal = (chat: Chat | null) => {
  selectedChatEdit.value = chat
  editChatModalVisible.value = true
}

const closeEditChatModal = () => {
  editChatModalVisible.value = false
}
</script>

<template>
  <div class="chat-container">
    <div class="chat-title">
      <h5>
        {{ props?.chat?.title || 'Chat title' }}
      </h5>

      <ClientOnly>
        <el-dropdown trigger="hover" :popper-options="popperOptions">
          <MoreIcon size="20" />

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="openEditChatModal(props.chat)">
                <div class="dropdown-item">
                  <EditTextIcon />  {{ $t('chat.edit_title.title') }}
                </div>
              </el-dropdown-item>
              <el-dropdown-item @click="openDeleteChatModal(props.chat)">
                <div class="dropdown-item">
                  <DeleteIcon /> {{ $t('chat.delete_chat.title') }}
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </ClientOnly>
    </div>

    <div class="messages-container">
      <template
        v-for="message in props.messages"
        :key="message.id"
      >
        <ChatMessage :message="message" />
      </template>
    </div>
  </div>
  <DeleteChatModal
    :is-open="deleteChatModalVisible"
    :selected-chat="selectedChatDelete"
    @close-modal="closeDeleteChatModal"
  />

  <EditChatTitleModal
    :is-open="editChatModalVisible"
    :selected-chat="selectedChatEdit"
    @close-modal="closeEditChatModal"
  />
</template>

<style lang="scss" scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  width: 100%;

  & .messages-container {
    margin: 32px 0 32px;
    display: flex;
    flex-direction: column;
    gap: 36px;
    width: 100%;
    z-index: 1;
  }
}

.chat-title {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  gap: 22px;
  justify-content: center;
  width: 100%;
  z-index: 2;
  background: var(--color-primary-subtle);
  padding: var(--spacing-fluid-5-xs);

  & h5 {
    transition: all 0.3s ease-out;
    color: var(--color-primary-900);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-fluid-5);
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -64px;
    left: 0;
    width: 100%;
    height: 64px;
    background: linear-gradient(
      to bottom,
      var(--color-primary-subtle),
      transparent
    );
    pointer-events: none;
  }

  .edit-input {
    max-width: 31.25rem;
    width: 100%;
  }
}

.chat_title_small {
  .chat-title {
    & h5 {
      font-size: var(--font-size-fluid-4);
    }
  }
}

.dropdown-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.modal__content {
  .delete-text {
    margin-bottom: 0.9375rem;
    color: var(--color-primary-800);
  }
  .action-text {
    color: var(--color-primary-600);
    margin-bottom: 1rem;
  }

  .buttons-container {
    display: flex;
    flex-direction: row-reverse;
    gap: 0.625rem;

    button {
      border-radius: 30px;
      padding: 0.5rem 0.875rem;
      background-color: inherit;
    }

    .delete {
      border: 0.0625rem solid var(--color-primary-600);
      color: var(--color-primary-600);
    }
  }
}

.dark {
  & .chat-title {
    background: var(--color-primary-1000);
    & h5 {
      margin-bottom: 4px;
      color: var(--color-primary-0);
    }
    &::after {
      background: linear-gradient(
        to bottom,
        var(--color-primary-1000),
        transparent
      );
    }
  }

  .modal__content {
    .delete-text {
      color: var(--color-primary-200);
    }
    .action-text {
      color: var(--color-primary-100);
    }

    .buttons-container {
      .delete {
        border: 0.0625rem solid var(--color-primary-200);
        color: var(--color-primary-200);
      }
      .cancel {
        border: 0.0625rem solid var(--color-primary-100);
        color: var(--color-primary-100);
      }
    }
  }
}
</style>
