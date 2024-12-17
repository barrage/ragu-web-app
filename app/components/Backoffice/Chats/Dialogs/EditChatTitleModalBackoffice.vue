<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { AdminChatDetails } from '~/types/chat'
import EditIcon from '~/assets/icons/svg/edit-text.svg'

const props = defineProps<{
  selectedChat: AdminChatDetails | null
}>()
const emits = defineEmits<Emits>()
interface Emits {
  (event: 'chatTitleEdited', newTitle: string): void
}

const isOpen = defineModel<boolean>()

const { t } = useI18n()

const resetFormTrigger = ref(false)
const closeModal = () => {
  isOpen.value = false
  resetFormTrigger.value = true
  resetFormTrigger.value = false
}

const handleNewChatTitle = (newChatTitle: string) => {
  return emits('chatTitleEdited', newChatTitle)
}
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="isOpen"
      data-testid="bo-edit-chat-title-dialog"
      :destroy-on-close="true"
      align-center
      class="barrage-dialog--small"
      :close-icon="CloseCircleIcon"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="closeModal"
    >
      <template #header>
        <div class="edit-user-modal-header">
          <EditIcon size="42px" />
          <h5> {{ t('chat.edit_title.title') }}</h5>
        </div>
      </template>

      <EditChatTitleForm
        :selected-chat="props.selectedChat"
        :has-cancel-option="true"
        :reset-form-trigger="resetFormTrigger"
        @chat-title-edit-canceled="closeModal"
        @chat-title-edited="handleNewChatTitle"
      />
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.form-actions {
  display: flex;
  gap: 22px;
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;
}

.edit-user-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
