<script lang="ts" setup>
// IMPORTS
import type { UploadProps, UploadUserFile } from 'element-plus'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import UploadIcon from '~/assets/icons/svg/upload-icon.svg'

// PROPS & EMITS
interface Props {
  uploadType: 'users' | 'agents' | 'adminUsers'
  agentId?: string
  userId?: string
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (event: 'profilePictureUploaded'): void
}>()

// CONSTANTS & STATES

const { t } = useI18n()
const { $api } = useNuxtApp()

const isUploadModalVisible = defineModel<boolean>()
const isUploadLoading = ref(false)
const fileList = ref<UploadUserFile[]>([])

// FUNCTIONS

const beforeUploadCheck: UploadProps['beforeUpload'] = (rawFile) => {
  isUploadLoading.value = true
  const allowedTypes = ['image/jpeg', 'image/png']
  const maxSize = 5 * 1024 * 1024

  if (!allowedTypes.includes(rawFile.type)) {
    ElNotification({
      title: t('profile.notifications.error_file_type_title'),
      message: t('profile.notifications.error_file_type_description'),
      type: 'error',
      customClass: 'error',
      duration: 3500,
    })
    isUploadLoading.value = false
    fileList.value = []
    return false
  }
  else if (rawFile.size > maxSize) {
    ElNotification({
      title: t('profile.notifications.error_file_size_title'),
      message: t('profile.notifications.error_file_size_description'),
      type: 'error',
      customClass: 'error',
      duration: 3500,
    })
    isUploadLoading.value = false
    fileList.value = []
    return false
  }
  return true
}

const upload = async () => {
  const file = fileList.value[0]?.raw
  if (!file || !(file instanceof File)) {
    console.error('No valid file selected for upload.')
    return
  }

  const resizedFile = await resizeImage(file, 100, 100)

  let execute, error

  if (props.uploadType === 'users' && props.userId) {
    ({ execute, error } = await useAsyncData(() =>
      $api.user.PostUploadProfilePicture(props.userId as string, resizedFile), { immediate: false }))
  }
  else if (props.uploadType === 'agents' && props.agentId) {
    ({ execute, error } = await useAsyncData(() =>
      $api.agent.UpdateAgentAvatar(props.agentId as string, resizedFile), { immediate: false }))
  }
  else if (props.uploadType === 'adminUsers' && props.userId) {
    ({ execute, error } = await useAsyncData(() =>
      $api.user.PostAdminUploadProfilePicture(props.userId as string, resizedFile), { immediate: false }))
  }
  else {
    console.error('Invalid upload type or missing ID')
    return
  }

  await execute()

  if (error.value) {
    if (error.value?.statusCode === 413) {
      ElNotification({
        title: t('documents.notifications.create.error_too_large_title'),
        message: t('documents.notifications.create.error_too_large_description'),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
    else {
      ElNotification({
        title: t(`${props.uploadType}.notifications.upload_error_title`),
        message: t(`${props.uploadType}.notifications.upload_error_description`),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
  }
  else {
    ElNotification({
      title: t(`${props.uploadType}.notifications.upload_success_title`),
      message: t(`${props.uploadType}.notifications.upload_success_description`),
      type: 'success',
      customClass: 'success',
      duration: 5500,
    })
    isUploadModalVisible.value = false
    emits('profilePictureUploaded')
  }

  fileList.value = []
  isUploadLoading.value = false
}

const handleUploadSuccess: UploadProps['onSuccess'] = () => {
  upload()
}

const setEmptyList = () => {
  fileList.value = []
  isUploadModalVisible.value = false
}
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="isUploadModalVisible"
      align-center
      class="barrage-dialog--large"
      :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
      destroy-on-close
      :before-close="setEmptyList"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <template #header>
        <h6>{{ t('profile.change_picture.title') }}</h6>
      </template>
      <el-upload
        v-model:file-list="fileList"
        drag
        action=""
        :show-file-list="false"
        :on-success="handleUploadSuccess"
        :before-upload="beforeUploadCheck"
        accept="image/jpeg,image/png"
      >
        <div class="upload-file-container">
          <template v-if="!isUploadLoading">
            <UploadIcon size="55px" />
            <div class="el-upload__text">
              {{ t('profile.change_picture.description') }} <em class="fake-link">{{ t('profile.change_picture.description_link') }}</em>
            </div>
          </template>

          <LlmLoader v-else />
        </div>
      </el-upload>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.upload-file-container {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
  &:hover {
    cursor: pointer;
  }

  & .fake-link {
    color: var(--color-blue-300);
  }
}

:deep(.barrage-dialog__close) {
  svg {
    width: 20px;
    height: 20px;
  }
}

.dark {
  .upload-file-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
