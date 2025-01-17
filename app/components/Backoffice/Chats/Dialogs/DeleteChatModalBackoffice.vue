<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { AdminChatDetails } from '~/types/chat'
import DeleteChatIcon from '~/assets/icons/svg/chat-delete.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'

const props = defineProps<{
  selectedChat: AdminChatDetails | null
}>()
const emits = defineEmits<Emits>()

const isOpen = defineModel<boolean>()

const { t } = useI18n()
const { $api } = useNuxtApp()

const closeModal = () => {
  isOpen.value = false
}

interface Emits {
  (event: 'chatDeleted'): void
}

const { execute: executeDeleteChat, error: deleteChatError, status: deleteChatStatus } = await useAsyncData(() => $api.chat.DeleteChat(props.selectedChat!.chat?.id), {
  immediate: false,
})

const submitDeleteChat = async () => {
  if (props.selectedChat?.chat?.id) {
    await executeDeleteChat()
    if (deleteChatError.value) {
      ElNotification({
        title: t('chat.delete_chat.notifications.error_title'),
        message: t('chat.delete_chat.notifications.error_description'),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
    else {
      emits('chatDeleted')
      ElNotification({
        title: t('chat.delete_chat.notifications.success_title'),
        message: t('chat.delete_chat.notifications.success_description'),
        type: 'success',
        customClass: 'success',
        duration: 2500,
      })
    }
    closeModal()
  }
}
const isDeleteChatLoading = computed(() => {
  return deleteChatStatus.value === 'pending'
})
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="isOpen"
      data-testid="bo-delete-chat-dialog"
      :destroy-on-close="true"
      align-center
      class="barrage-dialog--small"
      :close-icon="CloseCircleIcon"
      @close="closeModal"
    >
      <template #header>
        <div class="delete-chat-modal-header">
          <DeleteChatIcon size="42px" />
          <h5> {{ $t('chat.delete_chat.title') }}</h5>
        </div>
      </template>
      <div>
        <p>
          {{ $t('chat.delete_chat.description') }}  <br> <b>{{ props.selectedChat?.chat?.title }}</b>
        </p>
      </div>

      <template #footer>
        <el-button data-testid="bo-delete-chat-dialog-cancel-button" @click="closeModal">
          {{ t('settings.cancel') }}
        </el-button>
        <el-button
          type="danger"
          data-testid="bo-delete-chat-dialog-delete-button"
          :disabled="isDeleteChatLoading"
          @click="submitDeleteChat()"
        >
          {{ t('settings.delete') }} <DeleteIcon />
        </el-button>
      </template>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.delete-chat-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
