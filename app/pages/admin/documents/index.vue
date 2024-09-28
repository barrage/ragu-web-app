<script lang="ts" setup>
import type { UploadUserFile } from 'element-plus'
import AddIcon from '~/assets/icons/svg/add.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'

definePageMeta({
  layout: 'admin-layout',
})

const documentStore = useDocumentsStore()

documentStore.GET_AllDocuments()

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
  <div class="admin-documents-page-container ">
    <h4 class="page-title">
      Documents
    </h4>
    <p class="description">
      Manage documents of your organization
    </p>
    <div class="documents-actions-container">
      <h6>{{ documentStore?.documentResponse?.total }} Documents</h6>
      <div class="documents-actions-wrapper">
        <el-input placeholder="Search documents" />
        <el-button type="primary" @click="openUploadModal">
          <AddIcon />  Upload document
        </el-button>
      </div>
    </div>
    <template v-if="documentStore.documentResponse?.items">
      <DocumentList :documents="documentStore.documentResponse?.items" />
    </template>
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
.admin-documents-page-container {
  padding-left: 2rem;
  padding-top: 1rem;

  & .page-title {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--color-primary-900);
  }
  & .description {
    color: var(--color-primary-700);
  }
  & .documents-actions-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 1.5rem;

    & h6 {
      color: var(--color-primary-700);
    }
    & .documents-actions-wrapper {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      margin-bottom: 1.5rem;
    }
  }
}

.dark {
  & .page-title {
    color: var(--color-primary-100);
  }
  & .description {
    color: var(--color-primary-300);
  }
  & .documents-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
