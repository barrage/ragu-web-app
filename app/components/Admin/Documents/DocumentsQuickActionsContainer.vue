<script lang="ts" setup>
import type { UploadProps, UploadUserFile } from 'element-plus'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import DocumentAddIcon from '~/assets/icons/svg/document-add.svg'
import DocumentSyncIcon from '~/assets/icons/svg/document-sync.svg'
import UploadIcon from '~/assets/icons/svg/upload-icon.svg'

const documentStore = useDocumentsStore()
const isUploadModalVisible = ref(false)
const isUploadLoading = ref(false)
const openUploadModal = () => {
  isUploadModalVisible.value = true
}

const fileList = ref<UploadUserFile[]>([])
const { t } = useI18n()

const beforeUploadCheck: UploadProps['beforeUpload'] = (rawFile) => {
  isUploadLoading.value = true
  const allowedTypes = ['application/pdf', 'application/json', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

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
  else if (rawFile.size / 1024 / 1024 > 50) {
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

const upload = async () => {
  const files = fileList.value.map(item => item.raw).filter(file => file instanceof File)
  if (!files.length) {
    console.error('No files selected for upload.')
    return
  }
  for (const file of files) {
    const { execute: uploadDocument, error } = await useAsyncData(() => documentStore.POST_UploadDocument(file), { immediate: false })
    uploadDocument()
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
      fileList.value = []
      documentStore.GET_AllDocuments()
    }
    isUploadLoading.value = false
  }
}
const handleUploadSuccess: UploadProps['onSuccess'] = () => {
  upload()
}

const { error, execute, status } = await useAsyncData(() => documentStore.GET_SyncFs(), { immediate: false })

errorHandler(error)

const loading = ref(false)
const syncDocuments = async () => {
  try {
    loading.value = true
    await execute()
    if (status.value !== 'error') {
      ElNotification({
        title: 'Success',
        message: 'Sync docs',
        type: 'success',
        customClass: 'success',
        duration: 2500,
      })
    }
  }
  catch (error) {
    ElNotification({
      title: t('agents.notifications.form_title'),
      message: t('agents.notifications.form_message'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

const setEmptyList = () => {
  fileList.value = []
  isUploadModalVisible.value = false
}
</script>

<template>
  <div class="documents-actions-container">
    <el-button
      type="primary"
      :disabled="loading"
      @click="syncDocuments"
    >
      <DocumentSyncIcon v-if="!loading" /> <LlmLoader v-else />  Sync
    </el-button>
    <el-button
      type="primary"
      @click="openUploadModal"
    >
      <DocumentAddIcon />  Upload
    </el-button>
    <ClientOnly>
      <ElDialog
        v-model="isUploadModalVisible"
        align-center
        class="barrage-dialog--large"
        :close-icon="CloseCircleIcon"
        destroy-on-close
        :before-close="setEmptyList"
      >
        <template #header>
          <h6>Upload file</h6>
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
                Drop file here or <em class="fake-link">click to upload</em>
              </div>
            </template>

            <LlmLoader v-else />
          </div>
        </el-upload>
      </ElDialog>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.documents-actions-container {
  display: flex;
  gap: 22px;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.5rem;

  & h6 {
    color: var(--color-primary-800);
  }
  & .documents-actions-wrapper {
    display: flex;

    gap: 1.5rem;
    align-items: center;
    margin-bottom: 1.5rem;
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
.dark {
  .documents-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
