<script lang="ts" setup>
import type { Pagination } from '~/types/pagination'
import type { Document } from '~/types/document'

// PROPS & EMITS
const props = defineProps<{
  documents: Document[]
}>()

const emits = defineEmits<{
  (event: 'pageChange', page: number): number
  (event: 'documentDeleted'): void
}>()

// CONSTANTS & STATES

const documentStore = useDocumentsStore()

/* Delete Document */
const documentToDelete = ref<Document | null>(null)
const isDeleteModalVisible = ref(false)

const openDeleteModal = (document: Document | null) => {
  documentToDelete.value = document
  isDeleteModalVisible.value = true
}
const handleDocumentDeleted = () => {
  emits('documentDeleted')
}

// FUNCTIONS

const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
  total: documentStore.documentResponse?.total || 0,
  disabled: false,
})

const changePage = (page: number) => {
  pagination.value.currentPage = page
  emits('pageChange', pagination.value.currentPage)
}

// WATCHERS

watch(
  () => documentStore.documentResponse?.total,
  (newTotal) => {
    if (newTotal !== undefined) {
      pagination.value.total = newTotal
    }
  },
)
</script>

<template>
  <div class="document-list">
    <!--    <div class="document-list-actions">
      <DocumentsListActions />
    </div> -->
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
      <DeleteDocumentModal
        v-model="isDeleteModalVisible"
        :document="documentToDelete"
        @document-deleted="handleDocumentDeleted"
      />
    </div>
    <Pagination
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      @page-change="(page:number) => changePage(page)"
    />
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
