<script lang="ts" setup>
import PdfIcon from '~/assets/icons/svg/pdfIcon.svg'
import DocxIcon from '~/assets/icons/svg/docx-icon.svg'
import TxtIcon from '~/assets/icons/svg/txt-icon.svg'
import MarkdownIcon from '~/assets/icons/svg/markdown-icon.svg'
import CsvIcon from '~/assets/icons/svg/csv-icon.svg'
import JsonIcon from '~/assets/icons/svg/json-icon.svg'
import DocumentEditIcon from '~/assets/icons/svg/document-edit.svg'
import UnknownDocumentIcon from '~/assets/icons/svg/unknown-document-icon.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { Document } from '~/types/document'

/* Setup */
const props = defineProps<{
  document: Document
}>()
/* const emits = defineEmits<Emits>() */

const router = useRouter()

const navigateToDocumentDetailsPage = () => {
  if (props.document.id) {
    router.push(`documents/${props.document.id}`)
  }
}
const formatName = (str: string, n: number) => {
  return str.length > n ? `${str.slice(0, n)}...` : str
}

const { t } = useI18n()

const documentData = computed(() => {
  return {
    name: props.document?.name || t('users.user_card.unknown_name'),
    extension: props.document?.ext || t('users.user_card.unknown_email'),
    updatedAt: props.document?.updatedAt || t('users.user_card.unknown_date'),
    createdAt: props.document?.createdAt || t('users.user_card.unknown_date'),
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

function deleteDocument() {
  if (props?.document?.id) {
    documentStore.DELETE_Document(props.document.id)
    documentStore.GET_AllDocuments()
  }
}
</script>

<template>
  <el-card class="document-card is-primary">
    <div class="grid">
      <div class="document-name-type-wrapper" @click="navigateToDocumentDetailsPage()">
        <PdfIcon
          v-if="documentData.extension === 'pdf'"
          size="36"
          original
        />
        <DocxIcon v-else-if="documentData.extension === 'docx'" size="36" />
        <MarkdownIcon
          v-else-if="documentData.extension === 'md'"
          size="36"
          original
        />
        <CsvIcon
          v-else-if="documentData.extension === 'csv'"
          size="36"
          original
        />
        <JsonIcon
          v-else-if="documentData.extension === 'json'"
          size="36"
          original
        />
        <TxtIcon
          v-else-if="documentData.extension === 'txt'"
          size="36"
          original
        />
        <UnknownDocumentIcon
          v-else
          size="36"
          original
        />
        <div class="document-name-wrapper">
          <h6>{{ formatName(documentData.name, 25) }}</h6>
        </div>
      </div>
      <div class="document-inforamtions">
        <LabelDescriptionItem
          label="Extension"
          size="small"
          :description="documentData.extension "
        />
      </div>
      <div class="document-actions">
        <ElTooltip
          content="Manage your document"
          :show-after="100"
          :enterable="false"
          placement="top"
        >
          <el-button
            type="primary"
            plain
            class="manage-document-button"
            @click="navigateToDocumentDetailsPage"
          >
            <DocumentEditIcon size="24" />
          </el-button>
        </ElTooltip>
        <ElTooltip
          content="Delete your document"
          :show-after="100"
          :enterable="false"
          placement="top"
        >
          <el-button
            type="danger"
            plain
            class="manage-document-button"
            @click="openDeleteDialog"
          >
            <DeleteIcon size="24" />
          </el-button>
        </ElTooltip>
      </div>
      <el-dialog
        v-model="isDeleteDialogVisible"
        :before-close="closeDeleteDialog"
        :close-icon="CloseCircleIcon"
        class="barrage-dialog--small"
      >
        <template #header>
          <h6>Delete</h6>
        </template>
        <p>Are you sure that you want to delete: <b>{{ document?.name }} document</b> </p>
        <template #footer>
          <el-button @click="closeDeleteDialog">
            Cancel
          </el-button>
          <el-button type="danger" @click="deleteDocument()">
            Delete
          </el-button>
        </template>
      </el-dialog>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.document-card {
  padding-inline: 0.6rem;
  padding-block: 0.8rem;

  & .document-name-type-wrapper {
    grid-column: span 7;
    align-items: center;
    text-overflow: ellipsis;
    display: flex;
    min-width: fit-content;
    gap: 6px;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }

    & .document-name-wrapper {
      h6 {
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-fluid-3);
        color: var(--color-primary-900);
        line-height: normal;
        margin-bottom: 0;
      }
      & span {
        line-height: normal;
        font-size: var(--font-size-fluid-2);
        color: var(--color-primary-700);
      }
    }
  }

  & .document-inforamtions {
    grid-column: span 3;
    display: flex;
    gap: 22px;
    width: 100%;
    align-items: center;
  }

  & .document-actions {
    grid-column: span 2;
    display: flex;
    gap: 12px;
  }
}
.manage-document-button {
  margin-left: auto;
}
.dark {
  .document-card {
    & .document-name-wrapper {
      h6 {
        color: var(--color-primary-0);
      }
      & span {
        color: var(--color-primary-200);
      }
    }
  }
}
</style>
