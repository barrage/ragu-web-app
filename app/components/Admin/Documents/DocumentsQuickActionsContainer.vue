<script lang="ts" setup>
import type { UploadUserFile } from 'element-plus'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import DocumentAddIcon from '~/assets/icons/svg/document-add.svg'

const documentStore = useDocumentsStore()
const isUploadModalVisible = ref(false)
const openUploadModal = () => {
  isUploadModalVisible.value = true
}

const fileList = ref<UploadUserFile[]>([])

const upload = async () => {
  const files = fileList.value.map(item => item.raw).filter(file => file instanceof File)
  if (!files.length) {
    console.error('No files selected for upload.')
    return
  }
  for (const file of files) {
    try {
      await documentStore.POST_UploadDocument(file)
      documentStore.GET_AllDocuments()
    }
    catch (error) {
      console.error('Error uploading file:', file.name, error)
    }
  }
}
</script>

<template>
  <div class="documents-actions-container">
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
        class="barrage-dialog--small"
        :close-icon="CloseCircleIcon"
      >
        <template #header>
          Header
        </template>
        <el-upload
          v-model:file-list="fileList"
          drag
          action=""
          :auto-upload="false"
          :before-upload="() => false"
        />
        <template #footer>
          <el-button @click="upload">
            Upload
          </el-button>
        </template>
      </ElDialog>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.documents-actions-container {
  display: flex;
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
.dark {
  .documents-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
