<script lang="ts" setup>
import type { Document } from '~/types/document'

const props = defineProps<{
  documents: Document[] | null
}>()

const emits = defineEmits<{
  (event: 'documentDeleted'): void
}>()

/* Delete Document */
const documentToDelete = ref<Document | null>(null)
const isDeleteDialogVisible = ref(false)

const openDeleteModal = (document: Document | null) => {
  documentToDelete.value = document
  isDeleteDialogVisible.value = true
}
const handleDocumentDeleted = () => {
  emits('documentDeleted')
}
</script>

<template>
  <div class="document-list">
    <div class="documents-container grid">
      <DocumentCard
        v-for="(document, index) in props.documents"
        :key="document.id"
        v-motion-fade
        :delay="(index * 100)"
        :duration="400"
        :document="document"
        @delete-document="openDeleteModal(document)"
      />
      <DeleteDocumentDialog
        v-model="isDeleteDialogVisible"
        :document="documentToDelete"
        @document-deleted="handleDocumentDeleted"
      />
    </div>
  </div>
</template>

  <style lang="scss"  scoped>
.document-list {
  padding-left: var(--spacing-desktop-m);
}
.list-title {
  color: var(--color-primary-700);
}
.documents-container {
  row-gap: 0.8rem;

  & .document-card {
    grid-column: span 12;
    row-gap: 0.8rem;
  }
}
.dark {
  & .list-title {
    color: var(--color-primary-0);
  }
}
h2 {
  margin-bottom: 16px;
}
</style>
