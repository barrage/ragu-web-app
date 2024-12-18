<script lang="ts" setup>
import DocumentDismissIcon from '~/assets/icons/svg/document-dismiss.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { Document } from '~/types/document'

// PROPS & EMITS

const props = defineProps<{
  document: Document | null
}>()
const emits = defineEmits<Emits>()

interface Emits {
  (event: 'documentDeleted'): void
}

const isOpen = defineModel<boolean>()

// CONSTANTS & STATES

const { t } = useI18n()
const documentStore = useDocumentsStore()

// API CALLS

const { execute: executeDeleteDocument, error } = await useAsyncData(() => documentStore.DELETE_Document(props.document!.id), { immediate: false })
const { execute: getAllDocuments } = await useAsyncData(() => documentStore.GET_AllDocuments(), { immediate: false })

// FUNCTIONS

const closeModal = () => {
  isOpen.value = false
}

const submitDelete = async () => {
  if (props.document?.id) {
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
      await getAllDocuments()
      emits('documentDeleted')
      closeModal()
      ElNotification({
        title: t('documents.delete_document.notifications.success_title'),
        message: t('documents.delete_document.notifications.success_description'),
        type: 'success',
        customClass: 'success',
        duration: 2500,
      })
    }
  }
}
</script>

<template>
  <el-dialog
    v-model="isOpen"
    destroy-on-close
    align-center
    :close-icon="CloseCircleIcon"
    class="barrage-dialog--small"
    @close="closeModal"
  >
    <template #header>
      <div class="delete-document-modal-header">
        <DocumentDismissIcon size="42px" />
        <h6>{{ t('documents.delete_document.title') }}</h6>
      </div>
    </template>
    <div class="delete-document-modal-body">
      <p>{{ t('documents.delete_document.description') }}</p>
      <b>{{ document?.name }}</b>
    </div>
    <template #footer>
      <el-button @click="closeModal">
        {{ t('collections.buttons.cancel') }}
      </el-button>
      <el-button type="danger" @click="submitDelete">
        {{ t('collections.buttons.delete') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.delete-document-modal-header {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
}
</style>
