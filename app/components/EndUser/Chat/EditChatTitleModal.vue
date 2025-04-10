<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { Chat, EditChatTitlePayload } from '~/types/chat'
import EditIcon from '~/assets/icons/svg/edit-text.svg'

const props = defineProps<{
  selectedChat: Chat | null
  isOpen: boolean
}>()

const emits = defineEmits<Emits>()

const chatStore = useChatStore()

const { t } = useI18n()
const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}

const editUserModalVisible = ref(props.isOpen)

watch(() => props.isOpen, (newVal) => {
  editUserModalVisible.value = newVal
})
interface Emits {
  (event: 'closeModal'): void
  (event: 'editUserConfirm', newTitle: string): void
}

const editChatTitleFormRef = ref<FormInstance>()

const editChatTitleForm = reactive<EditChatTitlePayload>({
  title: '',
})

const rules = computed<FormRules<EditChatTitlePayload>>(() => ({
  title: [
    { required: true, message: t('users.form.rules.required'), trigger: 'blur' },
  ],
}))

const { execute: updateChatTitle, error } = await useAsyncData(() => chatStore.PUT_UpdateChatTitle(props.selectedChat!.id, editChatTitleForm.title), { immediate: false })

const submiteditChatTitleForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }

  await formEl.validate(async (valid, __) => {
    if (valid) {
      await updateChatTitle()
      editUserModalVisible.value = false
      if (error.value) {
        ElNotification({
          title: t('chat.edit_title.notifications.error_title'),
          message: t('chat.edit_title.notifications.error_description'),
          type: 'error',
          customClass: 'error',
          duration: 2500,
        })
      }

      else {
        chatStore.GET_AllChats()
        ElNotification({
          title: t('chat.edit_title.notifications.success_title'),
          message: t('chat.edit_title.notifications.success_description'),
          type: 'success',
          customClass: 'success',
          duration: 2500,
        })
      }
    }
  })
}

const prefilleditChatTitleForm = () => {
  if (props.selectedChat) {
    editChatTitleForm.title = props.selectedChat.title
  }
}
watch(
  () => props.selectedChat,
  () => {
    prefilleditChatTitleForm()
  },
)

onMounted(() => {
  prefilleditChatTitleForm()
})
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.resetFields()
}
const closeModal = () => {
  editUserModalVisible.value = false
  resetForm(editChatTitleFormRef.value)
  emits('closeModal')
}
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="editUserModalVisible"
      :destroy-on-close="true"
      align-center
      class="barrage-dialog--small"
      :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="closeModal"
    >
      <template #header>
        <div class="edit-user-modal-header">
          <EditIcon size="42px" />
          <h5> {{ $t('chat.edit_title.title') }}</h5>
        </div>
      </template>
      <ElForm
        ref="editChatTitleFormRef"
        :model="editChatTitleForm"
        :rules="rules"
        :scroll-to-error="true"
        :scroll-into-view-options="scrollIntoViewOptions"
      >
        <div class="start-end-form-items-wrapper">
          <ElFormItem
            :label="t('chat.edit_title.title_label')"
            prop="title"
          >
            <ElInput v-model="editChatTitleForm.title" :placeholder="t('chat.edit_title.title_placeholder')" />
          </ElFormItem>

          <ElFormItem>
            <div class="form-actions">
              <el-button @click="closeModal">
                {{ t('users.form.cancel') }}
              </el-button>

              <ElButton
                type="primary"
                @click="submiteditChatTitleForm(editChatTitleFormRef)"
              >
                {{ t('users.form.submit') }}
              </ElButton>
            </div>
          </ElFormItem>
        </div>
      </ElForm>
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
