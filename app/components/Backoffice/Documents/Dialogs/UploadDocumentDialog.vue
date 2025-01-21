<script lang="ts" setup>
import type { UploadProps, UploadUserFile } from 'element-plus'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import UploadIcon from '~/assets/icons/svg/upload-icon.svg'

const isUploadModalVisible = defineModel<boolean>()
const documentStore = useDocumentsStore()
const isUploadLoading = ref(false)

const fileList = ref<UploadUserFile[]>([])
const { t } = useI18n()

const beforeUploadCheck: UploadProps['beforeUpload'] = (rawFile) => {
  isUploadLoading.value = true
  const allowedTypes = ['application/pdf', 'application/json', 'text/plain', 'text/markdown', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

  if (!allowedTypes.includes(rawFile.type)) {
    ElNotification({
      title: t('documents.notifications.create.error_file_type_title'),
      message: t('documents.notifications.create.error_file_type_description'),
      type: 'error',
      customClass: 'error',
      duration: 3500,
    })
    isUploadLoading.value = false
    fileList.value = []
    return false
  }
  else if (rawFile.size / 1024 / 1024 > 100) {
    ElNotification({
      title: t('documents.notifications.create.error_file_size_title'),
      message: t('documents.notifications.create.error_file_size_description'),
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

const { $api } = useNuxtApp()

const upload = async () => {
  const files = fileList.value.map(item => item.raw).filter(file => file instanceof File)
  if (!files.length) {
    console.error('No files selected for upload.')
    return
  }
  for (const file of files) {
    const formData = new FormData()
    formData.append('file', file)
    const { execute: uploadDocument, error } = await useAsyncData(() => $api.document.PostUploadDocument(formData), { immediate: false })
    await uploadDocument()
    if (error.value) {
      if (error.value?.statusCode === 409) {
        ElNotification({
          title: t('documents.notifications.create.error_existing_document_title'),
          message: t('documents.notifications.create.error_existing_document_description'),
          type: 'error',
          customClass: 'error',
          duration: 2500,
        })
      }
      else {
        ElNotification({
          title: t('documents.notifications.create.error_title'),
          message: t('documents.notifications.create.error_description'),
          type: 'error',
          customClass: 'error',
          duration: 2500,
        })
      }
    }
    else {
      ElNotification({
        title: t('documents.notifications.create.success_title'),
        message: t('documents.notifications.create.success_description'),
        type: 'success',
        customClass: 'success',
        duration: 5500,
      })
      isUploadModalVisible.value = false
    }
    documentStore.documentsDataEmpty = false
    documentStore.newDocumentUploaded = true
    fileList.value = []
    isUploadLoading.value = false
  }
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
        <h6>{{ t('documents.uploads.title') }}</h6>
      </template>
      <el-upload
        v-model:file-list="fileList"
        drag
        action=""
        :show-file-list="false"
        :on-success="handleUploadSuccess"
        :before-upload="beforeUploadCheck"
      >
        <div class="upload-file-container">
          <template v-if="!isUploadLoading">
            <UploadIcon size="55px" />
            <div class="el-upload__text">
              {{ t('documents.uploads.description') }} <em class="fake-link">{{ t('documents.uploads.description_link') }}</em>
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
  .documents-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
