<script lang="ts" setup>
import ParseDocument from '~/assets/icons/svg/parse-document.svg'
import ChunkDocument from '~/assets/icons/svg/chunk-document.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'

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
  documentStore.DELETE_Document(selectedDocument?.value?.id)
  documentStore.GET_AllDocuments()
}

/* Parse document */
const isParserDialogVisible = ref(false)
const openParserDialog = () => {
  isParserDialogVisible.value = true
}

const closeParserDialog = () => {
  isParserDialogVisible.value = false
}

function parseDocument() {
  documentStore.POST_ParseDocument(props.document.id)
  documentStore.GET_AllDocuments()
}

/* Chunk document */
const isChunkDialogVisible = ref(false)
const openChunkDialog = () => {
  isChunkDialogVisible.value = true
}

const closeChunkDialog = () => {
  isChunkDialogVisible.value = false
}

function chunkDocument() {
  documentStore.POST_ParseDocument(props.document.id)
  documentStore.GET_AllDocuments()
}
</script>

<template>
  <div class="admin-document-page-container">
    <h4 class="page-title">
      Document Details
    </h4>
    <p class="description">
      Manage your {{ selectedDocument?.name }} document
    </p>
    <h6 class="document-title">
      <b>{{ selectedDocument?.name }}</b>
    </h6>
    <div class="document-details-wrapper">
      <LabelDescriptionItem
        label="Path:"
        :description="selectedDocument?.path"
        :can-copy="true"
      />
      <LabelDescriptionItem
        label="Exstension:"
        :description="selectedDocument?.ext"
      />
      <LabelDescriptionItem
        label="Source:"
        :description="selectedDocument?.src"
      />
      <LabelDescriptionItem
        label="Hash:"
        :description="selectedDocument?.hash"
        :can-copy="true"
      />
    </div>
    <h6>Config</h6>
    <pre>{{ selectedDocument }}</pre>
    <ElTooltip
      content="Parse document"
      :show-after="100"
      :enterable="false"
      placement="top"
    >
      <el-button @click="openParserDialog">
        <ParseDocument />
      </el-button>
    </ElTooltip>
    <ElTooltip
      content="Chunk document"
      :show-after="100"
      :enterable="false"
      placement="top"
    >
      <el-button>
        <ChunkDocument />
      </el-button>
    </ElTooltip>
    <ElTooltip
      content="Delete document"
      :show-after="100"
      :enterable="false"
      placement="top"
    >
      <el-button @click="openDeleteDialog">
        <DeleteIcon />
      </el-button>
    </ElTooltip>
    <el-dialog
      v-model="isParserDialogVisible"
      :before-close="closeParserDialog"
      :close-icon="CloseCircleIcon"
      class="barrage-dialog--medium"
    >
      <template #header>
        <h6>Parse Document</h6>
      </template>
      <p>Selected document: <b>{{ props.document.name }}</b> </p>
      <template #footer>
        <el-button @click="closeParserDialog">
          Close
        </el-button>
        <el-button @click="parseDocument">
          Parse
        </el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="isDeleteDialogVisible"
      :before-close="closeDeleteDialog"
      :close-icon="CloseCircleIcon"
      class="barrage-dialog--medium"
    >
      <template #header>
        <h6>Parser</h6>
      </template>
      <p>Are you sure that you want to delete: <b>{{ props.document.name }} document</b> </p>
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
  margin: 22px 0px 22px 12px;
}
.document-details-wrapper {
  display: flex;
  gap: 1.375rem;
  flex-wrap: wrap;
  background-color: var(--color-primary-0);
  border: 1px solid var(--color-primary-200);
  box-shadow: 0 2px 4px var(--color-primary-100);
  border-radius: 12px;
  padding: 22px;

  & .label-description-item-container {
    flex: 1 0 calc(33% - 22px);
  }
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
}
</style>
