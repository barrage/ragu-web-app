<script lang="ts" setup>
import PdfIcon from '~/assets/icons/svg/pdfIcon.svg'
import DocxIcon from '~/assets/icons/svg/docx-icon.svg'
import TxtIcon from '~/assets/icons/svg/txt-icon.svg'
import MarkdownIcon from '~/assets/icons/svg/markdown-icon.svg'
import CsvIcon from '~/assets/icons/svg/csv-icon.svg'
import JsonIcon from '~/assets/icons/svg/json-icon.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import UnknownDocumentIcon from '~/assets/icons/svg/unknown-document-icon.svg'
import type { Document } from '~/types/document'
import DeleteIcon from '~/assets/icons/svg/delete.svg'

const props = defineProps<{
  document: Document | null | undefined
}>()
const { t } = useI18n()
const router = useRouter()
const documentData = computed(() => {
  return {
    name: props.document?.name || t('documents.document_card.unknown_name'),
    extension: props.document?.ext || t('documents.document_card.unknown_email'),
    path: props.document?.path || t('documents.document_card.path'),
    id: props.document?.id || t('documents.document_card.id'),
    hash: props.document?.hash || t('documents.document_card.hash'),
    source: props.document?.src || t('documents.document_card.src'),
  }
})
/* Delete document */
const isDeleteDialogVisible = ref(false)
const documentStore = useDocumentsStore()
const openDeleteDialog = () => {
  isDeleteDialogVisible.value = true
}

const closeDeleteDialog = () => {
  isDeleteDialogVisible.value = false
}

const { error: deleteError, execute: deleteDocument } = await useAsyncData(() => documentStore.DELETE_Document(props.document!.id), { immediate: false })
const { error, execute: getAllDocs } = await useAsyncData(() => documentStore.GET_AllDocuments(), { immediate: false })

async function submitDelete() {
  if (props?.document?.id) {
    await deleteDocument()
    router.push('/admin/documents')
    await getAllDocs()
  }
}

errorHandler(error)
errorHandler(deleteError)
</script>

<template>
  <section class="document-details-hero-section">
    <div class="profile-avatar-wrapper">
      <PdfIcon
        v-if="documentData.extension === 'pdf'"
        size="80px"
        original
      />
      <DocxIcon v-else-if="documentData.extension === 'docx'" size="80" />
      <MarkdownIcon
        v-else-if="documentData.extension === 'md'"
        size="80px"
        original
      />
      <CsvIcon
        v-else-if="documentData.extension === 'csv'"
        size="80px"
        original
      />
      <JsonIcon
        v-else-if="documentData.extension === 'json'"
        size="80px"
        original
      />
      <TxtIcon
        v-else-if="documentData.extension === 'txt'"
        size="80px"
        original
      />
      <UnknownDocumentIcon
        v-else
        size="80px"
        original
      />
      <div class="documentname-status-wrapper">
        <h5 class="documentname">
          {{ `${documentData.name}` }}
        </h5>
        <el-tag size="small">
          {{ documentData?.path }}
        </el-tag>
      </div>
    </div>
    <div class="document-details-actions-wrapper">
      <el-button
        plain
        type="danger"
        size="small"
        @click="openDeleteDialog"
      >
        <DeleteIcon size="20px" />{{ t('agents.buttons.delete') }}
      </el-button>
    </div>
    <el-dialog
      v-model="isDeleteDialogVisible"
      :before-close="closeDeleteDialog"
      :close-icon="CloseCircleIcon"
      class="barrage-dialog--small"
    >
      <template #header>
        <h6>{{ t('agents.buttons.delete') }}</h6>
      </template>
      <p>Are you sure that you want to delete: <b>{{ document?.name }} document</b> </p>
      <template #footer>
        <el-button @click="closeDeleteDialog">
          {{ t('agents.buttons.cancel') }}
        </el-button>
        <el-button type="danger" @click="submitDelete()">
          {{ t('agents.buttons.delete') }}
        </el-button>
      </template>
    </el-dialog>
  </section>
</template>

<style lang="scss" scoped>
.document-details-hero-section {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  padding-block: 1rem;

  & .profile-avatar-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-start;
    margin-right: 1rem;
    text-overflow: ellipsis;
  }

  & .document-details-actions-wrapper {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  & .documentname {
    font-weight: var(--font-weight-bold);
    line-height: normal;
  }
}
</style>
