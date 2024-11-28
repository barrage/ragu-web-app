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
import DocumentDismissIcon from '~/assets/icons/svg/document-dismiss.svg'

import type { Document } from '~/types/document'

/* Setup */
const props = defineProps<{
  document: Document
}>()
/* const emits = defineEmits<Emits>() */
const documentStore = useDocumentsStore()
const router = useRouter()

const navigateToDocumentDetailsPage = () => {
  if (props.document.id) {
    router.push(`documents/${props.document.id}`)
  }
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
const { execute: executeDeleteDocument, error } = await useAsyncData(() => documentStore.DELETE_Document(props.document.id), { immediate: false })
/* Delete document */
const isDeleteDialogVisible = ref(false)

const openDeleteDialog = () => {
  isDeleteDialogVisible.value = true
}

const closeDeleteDialog = () => {
  isDeleteDialogVisible.value = false
}

const submitDeleteDocument = async () => {
  if (props?.document?.id) {
    await executeDeleteDocument()
    if (error.value) {
      ElNotification({
        title: t('documents.delete_document.notifications.error_title'),
        message: t('documents.delete_document.notifications.error_description'),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
    else {
      documentStore.GET_AllDocuments()
      ElNotification({
        title: t('documents.delete_document.notifications.success_title'),
        message: t('documents.delete_document.notifications.success_description'),
        type: 'success',
        customClass: 'success',
        duration: 2500,
      })
    }
    isDeleteDialogVisible.value = false
  }
}
</script>

<template>
  <el-card class="document-card is-primary">
    <div class="grid">
      <div class="document-name-type-wrapper" @click="navigateToDocumentDetailsPage()">
        <PdfIcon
          v-if="documentData.extension === 'pdf'"
          size="40px"
          original
          class="document-icon"
        />
        <DocxIcon v-else-if="documentData.extension === 'docx'" size="40px" />
        <MarkdownIcon
          v-else-if="documentData.extension === 'md'"
          size="40px"
          original
          class="document-icon"
        />
        <CsvIcon
          v-else-if="documentData.extension === 'csv'"
          size="40px"
          original
          class="document-icon"
        />
        <JsonIcon
          v-else-if="documentData.extension === 'json'"
          size="40px"
          original
          class="document-icon"
        />
        <TxtIcon
          v-else-if="documentData.extension === 'txt'"
          size="40px"
          original
          class="document-icon"
        />
        <UnknownDocumentIcon
          v-else
          size="40px"
          original
          class="document-icon"
        />
        <div class="document-name-wrapper">
          <h6>{{ documentData.name }}</h6>
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
          :content="t('documents.tooltip.manage_document')"
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
            <DocumentEditIcon size="24px" />
          </el-button>
        </ElTooltip>
        <ElTooltip
          :content="t('documents.tooltip.delete_document')"
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
            <DeleteIcon size="24px" />
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
          <div class="delete-document-modal-header">
            <DocumentDismissIcon size="42px" />
            <h6>{{ $t('documents.delete_document.title') }}</h6>
          </div>
        </template>
        <div class="delete-document-modal-body">
          <p>{{ $t('documents.delete_document.description') }} </p>
          <b>{{ document?.name }} </b>
        </div>
        <template #footer>
          <el-button @click="closeDeleteDialog">
            Cancel
          </el-button>
          <el-button type="danger" @click="submitDeleteDocument">
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
    white-space: nowrap;
    overflow: hidden;
    gap: 6px;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }

    & .document-icon {
      min-width: fit-content;
    }

    & .document-name-wrapper {
      h6 {
        font-weight: var(--font-weight-semibold);
        font-size: var(--font-size-fluid-);
        color: var(--color-primary-900);
        line-height: normal;
        margin-bottom: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      & span {
        line-height: normal;
        font-size: var(--font-size-fluid-2);
        color: var(--color-primary-700);
        white-space: nowrap;
        text-overflow: ellipsis;
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
.delete-document-modal-header {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
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
