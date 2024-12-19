<script lang="ts" setup>
import DocumentAddIcon from '~/assets/icons/svg/document-add.svg'
import DocumentSyncIcon from '~/assets/icons/svg/document-sync.svg'

const isUploadModalVisible = defineModel<boolean>()

const { $api } = useNuxtApp()
const openUploadModal = () => {
  isUploadModalVisible.value = true
}

const { t } = useI18n()

const { error, execute, status } = await useAsyncData(() => $api.document.GetSyncFs(), { immediate: false })

errorHandler(error)

const loading = ref(false)
const syncDocuments = async () => {
  try {
    loading.value = true
    await execute()
    if (status.value !== 'error') {
      ElNotification({
        title: t('agents.notifications.create_title'),
        message: t('documents.sync_docs'),
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
</script>

<template>
  <div class="documents-actions-container">
    <el-button
      :disabled="loading"
      @click="syncDocuments"
    >
      <DocumentSyncIcon v-if="!loading" size="20px" /> <LlmLoader v-else /> {{ t('documents.sync') }}
    </el-button>
    <el-button @click="openUploadModal">
      <DocumentAddIcon size="20px" />  {{ t('documents.upload') }}
    </el-button>
  </div>

  <UploadDocumentDialog v-model="isUploadModalVisible" />
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
