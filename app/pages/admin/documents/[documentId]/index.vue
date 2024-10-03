<script lang="ts" setup>
import ChunkDocument from '~/assets/icons/svg/chunk-document.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import DataSettingsIcon from '~/assets/icons/svg/data-settings.svg'
import DocumentIcon from '~/assets/icons/svg/document.svg'

definePageMeta({
  layout: 'admin-layout',
})

const documentStore = useDocumentsStore()

const route = useRoute()
const documentId = Array.isArray(route.params.documentId) ? route.params.documentId[0] : route.params.documentId

if (documentId) {
  documentStore.GET_SingleDocument(documentId)
}

const selectedDocument = computed(() => {
  return documentStore.selectedDocument
})

onUnmounted(() => {
  documentStore.selectedDocument = null
})

/* Delete document */
const isDeleteDialogVisible = ref(false)

const openDeleteDialog = () => {
  isDeleteDialogVisible.value = true
}

const closeDeleteDialog = () => {
  isDeleteDialogVisible.value = false
}

function deleteDocument() {
  if (selectedDocument.value?.id) {
    documentStore.DELETE_Document(selectedDocument.value.id)
    documentStore.GET_AllDocuments()
  }
}

/* Parse document */

/* Chunk document */
/* const isChunkDialogVisible = ref(false)
const openChunkDialog = () => {
  isChunkDialogVisible.value = true
}

const closeChunkDialog = () => {
  isChunkDialogVisible.value = false
}

function chunkDocument() {
  if (selectedDocument.value?.id) {
    documentStore.POST_ParseDocumentPreview(selectedDocument.value.id)
    documentStore.GET_AllDocuments()
  }
} */

onUnmounted(() => {
  documentStore.parserPreview = null
})

/* Tabs */
const activeTab = ref('parser')
</script>

<template>
  <div class="admin-document-page-container">
    <div class="admin-document-page-header">
      <div>
        <h4 class="page-title">
          Document Details
        </h4>
        <p class="description">
          Manage your {{ selectedDocument?.name }} document
        </p>
      </div>

      <ElTooltip
        content="Delete document"
        :show-after="100"
        class="barrage-tabs--primary"
        :enterable="false"
        placement="top"
      >
        <el-button @click="openDeleteDialog">
          <DeleteIcon />
        </el-button>
      </ElTooltip>
    </div>

    <h6 class="document-title">
      <DocumentIcon size="32" /> <b>{{ selectedDocument?.name }}</b>
    </h6>
    <div class="document-details-wrapper">
      <LabelDescriptionItem
        label="Name:"
        :description="selectedDocument?.name"
        :can-copy="true"
      />
      <LabelDescriptionItem
        label="Exstension:"
        :description="selectedDocument?.ext"
      />
      <LabelDescriptionItem
        label="Path:"
        :description="selectedDocument?.path"
      />

      <LabelDescriptionItem
        label="Source:"
        :description="selectedDocument?.src"
      />
    </div>

    <!-- ------------ -->

    <!-- ------------ -->
    <div class="icon-title-container">
      <DataSettingsIcon size="32" />
      <h6>Configuration</h6>
    </div>
    <ElTabs
      v-model="activeTab"
      class="barrage-tabs--primary"
    >
      <ElTabPane label="Parser" name="parser">
        <template v-if="activeTab === 'parser'">
          <ParserConfigTab />
        </template>
      </ElTabPane>
      <ElTabPane label="Chunker" name="chunker">
        <template v-if="activeTab === 'chunker'">
          <ChunkerConfigTab />
          <!--  <ElTooltip
            content="Chunk document"
            :show-after="100"
            :enterable="false"
            placement="top"
          >
            <el-button>
              <ChunkDocument />
            </el-button>
          </ElTooltip> -->
        </template>
      </ElTabPane>
    </ElTabs>

    <el-dialog
      v-model="isDeleteDialogVisible"
      :before-close="closeDeleteDialog"
      :close-icon="CloseCircleIcon"
      class="barrage-dialog--medium"
    >
      <template #header>
        <h6>Parser</h6>
      </template>
      <p>Are you sure that you want to delete: <b>{{ selectedDocument?.name }} document</b> </p>
      <template #footer>
        <el-button @click="closeDeleteDialog">
          Cancel
        </el-button>
        <el-button @click="deleteDocument()">
          Delete
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.admin-document-page-header {
  display: flex;
  gap: 22px;
  justify-content: space-between;
}
.admin-document-page-container {
  padding: 1rem 2rem;
}
.page-title {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--color-primary-900);
}
.description {
  color: var(--color-primary-700);
}
.document-title {
  color: var(--color-primary-900);
  margin: 22px 0px 12px 12px;
  display: flex;
  gap: 8px;
  align-items: center;
}
.document-details-wrapper {
  display: flex;
  gap: 1.375rem;
  flex-wrap: wrap;
  background-color: var(--color-primary-100);
  border: 1px solid var(--color-primary-300);
  box-shadow: 0 2px 4px var(--color-primary-200);
  border-radius: 12px;
  padding: 22px;

  & .label-description-item-container {
    flex: 1 0 calc(25% - 22px);
  }
}
.icon-title-container {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 1rem;
  color: var(--color-primary-900);
}
.dark {
  .page-title {
    color: var(--color-primary-0);
  }
  .description {
    color: var(--color-primary-200);
  }
  .document-title {
    color: var(--color-primary-100);
  }
  .document-details-wrapper {
    background-color: var(--color-primary-800);
    border: 1px solid var(--color-primary-500);
    box-shadow: 0 2px 4px var(--color-primary-600);
  }
  & .icon-title-container {
    color: var(--color-primary-0);
  }
}
</style>
