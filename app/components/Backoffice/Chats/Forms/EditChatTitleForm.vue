<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { AdminChatDetails, EditChatTitlePayload } from '~/types/chat'

const props = withDefaults(
  defineProps<{
    selectedChat: AdminChatDetails | null
    resetFormTrigger: boolean
    hasCancelOption: boolean
  }>(),
  {
    resetFormTrigger: false,
    hasCancelOption: true,
  },
)

const emits = defineEmits<Emits>()
const { $api } = useNuxtApp()

const { t } = useI18n()

interface Emits {
  (event: 'chatTitleEdited', newTitle: string): void
  (event: 'chatTitleEditCanceled'): void
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.resetFields()
}
const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
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

const { execute: executeUpdateChatTitle, error: editChatTitleError, status: editChatTitleStatus } = await useAsyncData(() => $api.chat.PutUpdateChatTitle(props.selectedChat!.chat?.id, editChatTitleForm.title), {
  immediate: false,
})
const submitedEditChatTitleForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }

  await formEl.validate(async (valid, __) => {
    if (valid) {
      await executeUpdateChatTitle()

      if (editChatTitleError.value) {
        ElNotification({
          title: t('chat.edit_title.notifications.error_title'),
          message: t('chat.edit_title.notifications.error_description'),
          type: 'error',
          customClass: 'error',
          duration: 2500,
        })
      }

      else {
        ElNotification({
          title: t('chat.edit_title.notifications.success_title'),
          message: t('chat.edit_title.notifications.success_description'),
          type: 'success',
          customClass: 'success',
          duration: 2500,
        })
        emits('chatTitleEdited', editChatTitleForm.title)
        resetForm(editChatTitleFormRef.value)
      }
    }
  })
}

const prefilleditChatTitleForm = () => {
  if (props.selectedChat) {
    editChatTitleForm.title = props.selectedChat?.chat?.title
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

watch(() => props.resetFormTrigger, (newVal) => {
  if (newVal) {
    resetForm(editChatTitleFormRef.value)
  }
})
const isEditChatTitleLoading = computed(() => {
  return editChatTitleStatus.value === 'pending'
})
</script>

<template>
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
          <div class="form-actions-left">
            <ElButton @click="emits('chatTitleEditCanceled')">
              {{ t('users.form.cancel') }}
            </ElButton>
            <ElButton
              size="small"
              :disabled="isEditChatTitleLoading"
              plain
              @click="resetForm(editChatTitleFormRef)"
            >
              {{ t('users.form.reset') }}
            </ElButton>
          </div>
          <ElButton
            type="primary"
            :disabled="isEditChatTitleLoading"
            @click="submitedEditChatTitleForm(editChatTitleFormRef)"
          >
            {{ t('users.form.submit') }}
          </ElButton>
        </div>
      </ElFormItem>
    </div>
  </ElForm>
</template>

<style lang="scss" scoped>
.form-actions {
  display: flex;
  gap: 22px;
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;

  & .form-actions-left {
    display: flex;
    gap: 22px;
  }
}
</style>
