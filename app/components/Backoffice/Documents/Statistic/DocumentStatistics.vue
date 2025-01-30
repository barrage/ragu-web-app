<script setup lang="ts">
import type { Pagination } from '~/types/pagination'

const { $api } = useNuxtApp()
const documentStore = useDocumentsStore()
const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 1000,
  total: 0,
  disabled: false,
})
const {
  execute: executeGetDocuments,
  error: getDocumentsError,
  status: getDocumentsStatus,
  data: documentsData,
} = await useAsyncData(() =>
  $api.document.GetAllDocuments(
    pagination.value.currentPage,
    pagination.value.pageSize,
  ), { lazy: true })

errorHandler(getDocumentsError)

const lastModifiedDocuments = computed(() => {
  if (!documentsData.value?.items) {
    return []
  }
  return documentsData.value?.items
    .slice()
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3)
})

const documentFormats = computed(() => {
  if (!documentsData.value?.items) {
    return []
  }
  const formatCounts: Record<string, number> = {}

  documentsData.value?.items.forEach((doc) => {
    formatCounts[doc.ext] = (formatCounts[doc.ext] || 0) + 1
  })

  return Object.entries(formatCounts).map(([name, value]) => ({
    name,
    value,
  }))
})

const totalDocuments = computed(() => documentsData.value?.total || 0)

watch(
  () => documentStore.newDocumentUploaded,
  (newValue) => {
    if (newValue) {
      executeGetDocuments()
      documentStore.newDocumentUploaded = false
    }
  },
)
watch(
  () => documentStore.documentDeleted,
  (newValue) => {
    if (newValue) {
      executeGetDocuments()
      documentStore.documentDeleted = false
    }
  },
)
/* const mostUsedTag = computed(() => {
  const tagCounts: Record<string, number> = {}

  props.documents.forEach((doc) => {
    doc.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  return Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 1)
    .map(([tag]) => tag)[0] || 'No tags'
}) */
</script>

<template>
  <div class="document-statistics grid">
    <div class="total-documents-count">
      <TotalDocumentCount :total="totalDocuments" />
    </div>

    <div class="last-modified-documents">
      <LastModifiedDocuments :documents="lastModifiedDocuments" />
    </div>
    <div class="documents-formats">
      <DocumentFormatsCount :formats="documentFormats" :chart-loading="getDocumentsStatus" />
    </div>
    <!--  <div class="last-modified-documents">
      <MostUsedTag :most-used-tag="mostUsedTag" />
    </div> -->
  </div>
</template>

  <style lang="scss" scoped>
  .document-statistics {
  margin-bottom: 32px;
  .last-modified-documents {
    grid-column: span 12;
  }
  .documents-formats {
    grid-column: span 12;
  }
  .total-documents-count {
    grid-column: span 12;
  }
}
</style>
