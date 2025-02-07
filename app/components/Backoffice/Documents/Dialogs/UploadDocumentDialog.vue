<script lang="ts" setup>
import type { UploadProps, UploadUserFile } from 'element-plus'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import UploadIcon from '~/assets/icons/svg/upload-icon.svg'
import AddDocumentIcon from '~/assets/icons/svg/document.svg'
import NoteIcon from '~/assets/icons/svg/notes.svg'

const isUploadModalVisible = defineModel<boolean>()
const documentStore = useDocumentsStore()
const isUploadLoading = ref(false)

const fileList = ref<UploadUserFile[]>([])
const { t } = useI18n()
const { $api } = useNuxtApp()

const allowedTypes = [
  'application/pdf',
  'application/json',
  'text/plain',
  'text/markdown',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'text/xml',
]

const maxFileSize = 100 * 1024 * 1024
const failedFiles = ref<{ name: string, reason: string }[]>([])

const noteItems = computed(() => [
  t('documents.uploads.note_supported_types', { types: 'PDF, JSON, TXT, MD, DOCX, XLSX, CSV, XML' }),
  t('documents.uploads.note_file_size', { size: '100MB' }),
  t('documents.uploads.note_multiple_files'),
])

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  const file = uploadFile.raw
  if (!file) { return }

  if (!allowedTypes.includes(file.type) || file.size > maxFileSize) {
    failedFiles.value.push({
      name: file.name,
      reason: file.size > maxFileSize ? t('documents.uploads.error_too_large_title') : t('documents.uploads.error_file_type_title'),
    })

    const index = uploadFiles.indexOf(uploadFile)
    if (index !== -1) {
      uploadFiles.splice(index, 1)
    }

    fileList.value = uploadFiles
    return
  }

  // Update fileList with only valid files
  fileList.value = uploadFiles
}
const beforeUploadCheck: UploadProps['beforeUpload'] = (rawFile) => {
  isUploadLoading.value = true
  return true
}

const handleExceed = () => {
  ElNotification({
    title: t('documents.notifications.create.error_file_limit_title'),
    message: t('documents.notifications.create.error_file_limit_description'),
    type: 'warning',
    customClass: 'warning',
    duration: 3500,
  })
}

const handleRemove = (file: UploadUserFile) => {
  const index = fileList.value.indexOf(file)
  if (index !== -1) {
    fileList.value.splice(index, 1)
  }
}

const uploadFiles = async () => {
  if (!fileList.value.length) {
    ElNotification({
      title: t('documents.notifications.create.error_no_files_title'),
      message: t('documents.notifications.create.error_no_files_description'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
    return
  }

  isUploadLoading.value = true
  let hasError = false

  try {
    const formData = new FormData()

    fileList.value.forEach((file) => {
      if (file.raw && file.raw instanceof File) {
        formData.append('file', file.raw)
      }
    })

    const { execute: uploadDocument, error, data: uploadedDocument } = await useAsyncData(
      () => $api.document.PostUploadDocument(formData),
      { immediate: false },
    )
    await uploadDocument()

    const hasErrors = uploadedDocument.value?.errors
      && Object.keys(uploadedDocument.value.errors).length > 0

    if (error.value || hasErrors) {
      hasError = true
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

    if (!hasError) {
      ElNotification({
        title: t('documents.notifications.create.success_title'),
        message: t('documents.notifications.create.success_description'),
        type: 'success',
        customClass: 'success',
        duration: 5500,
      })

      documentStore.documentsDataEmpty = false
      documentStore.newDocumentUploaded = true
    }
  }
  catch (e) {
    hasError = true
    ElNotification({
      title: t('documents.notifications.create.error_title'),
      message: t('documents.notifications.create.error_description'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
  }

  finally {
    fileList.value = []
    failedFiles.value = []
    isUploadLoading.value = false
    isUploadModalVisible.value = false
  }
}

const handleUploadSuccess: UploadProps['onSuccess'] = () => {
  uploadFiles()
}

const setEmptyList = () => {
  fileList.value = []
  failedFiles.value = []
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
        <div class="add-document-modal-header">
          <AddDocumentIcon size="42px" />
          <h5 class="document-modal-title">
            {{ t('documents.uploads.title') }}
          </h5>
        </div>
      </template>
      <Note
        :title="t('users.import.notes_title')"
        :items="noteItems"
        :icon="NoteIcon"
      />
      <div v-if="failedFiles.length > 0" class="failed-documents">
        <div class="documents-actions-container">
          <h6>{{ t('documents.uploads.failed_documents') }}</h6>
          <div class="failed-files-list">
            <div
              v-for="(file, index) in failedFiles"
              :key="index"
              class="failed-file-item"
            >
              <span>{{ file.name }}</span>
              <span class="file-reason">{{ file.reason }}</span>
            </div>
          </div>
        </div>
      </div>
      <el-upload
        v-model:file-list="fileList"
        drag
        multiple
        :auto-upload="false"
        :show-file-list="true"
        :before-upload="beforeUploadCheck"
        :on-exceed="handleExceed"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :on-success="handleUploadSuccess"
        accept=".pdf,.json,.txt,.md,.docx,.xlsx,.csv,.xml"
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
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="setEmptyList">
            {{ t('agents.buttons.cancel') }}
          </el-button>
          <el-button
            type="primary"
            :loading="isUploadLoading"
            :disabled="!fileList.length"
            class="submit-button"
            @click="uploadFiles"
          >
            {{ t('documents.upload') }}
          </el-button>
        </div>
      </template>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.add-document-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
  color: var(--color-primary-900);

  & .document-modal-title {
    color: var(--color-primary-900);
  }
}

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

.dialog-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

:deep(.barrage-dialog__close) {
  svg {
    width: 20px;
    height: 20px;
  }
}

.failed-documents {
  padding: 12px;
  background-color: var(--color-primary-50);
  border-radius: 8px;

  .documents-actions-container {
    h6 {
      color: var(--color-error-700);
      margin-bottom: 8px;
    }
  }

  .failed-files-list {
    .failed-file-item {
      display: flex;
      justify-content: space-between;
      padding: 8px;
      margin-bottom: 4px;
      background-color: var(--color-primary-100);
      border-radius: 4px;

      .file-reason {
        color: var(--color-error-600);
        font-size: 0.9em;
      }
    }
  }
}

.dark {
  .add-document-modal-header {
    color: var(--color-primary-0);

    & .document-modal-title {
      color: var(--color-primary-0);
    }
  }

  .documents-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }

  .failed-documents {
    background-color: var(--color-primary-700);
    color: var(--color-primary-0);
    .documents-actions-container h6 {
      color: var(--color-primary-100);
    }

    .failed-files-list .failed-file-item {
      background-color: var(--color-primary-600);

      .file-name {
        color: var(--color-primary-100);
      }

      .file-reason {
        color: var(--color-primary-300);
      }
    }
  }
}
</style>
