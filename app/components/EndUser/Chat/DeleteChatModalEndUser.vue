<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { Chat } from '~/types/chat'
import DeleteChatIcon from '~/assets/icons/svg/chat-delete.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'

const props = defineProps<{
  selectedChat: Chat | null
  isOpen: boolean
}>()
const emits = defineEmits<Emits>()
const { t } = useI18n()
const deleteChatModalVisible = ref(props.isOpen)
const router = useRouter()
const chatStore = useChatStore()
const closeModal = () => {
  deleteChatModalVisible.value = false
  emits('closeModal')
}
const btnLoading = ref(false)

watch(() => props.isOpen, (newVal) => {
  deleteChatModalVisible.value = newVal
})
interface Emits {
  (event: 'closeModal'): void
}
const { execute: deleteChat, error } = await useAsyncData(() => chatStore.DELETE_Chat(props.selectedChat!.id), { immediate: false })

const submitDeleteChat = async () => {
  if (props.selectedChat?.id) {
    btnLoading.value = true
    await deleteChat()
    deleteChatModalVisible.value = false
    if (error.value) {
      ElNotification({
        title: t('chat.delete_chat.notifications.error_title'),
        message: t('chat.delete_chat.notifications.error_description'),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
    else {
      router.push('/')
      ElNotification({
        title: t('chat.delete_chat.notifications.success_title'),
        message: t('chat.delete_chat.notifications.success_description'),
        type: 'success',
        customClass: 'success',
        duration: 2500,
      })
    }
    btnLoading.value = true
  }
}
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="deleteChatModalVisible"
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
          {{ $t('chat.delete_chat.description') }}  <br> <b>{{ props.selectedChat?.title }}</b>
        </p>
      </div>

      <template #footer>
        <el-button @click="closeModal">
          Cancel
        </el-button>
        <el-button type="danger" @click="submitDeleteChat()">
          Delete <DeleteIcon />
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
