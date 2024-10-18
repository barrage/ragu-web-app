<script setup lang="ts">
import type { Document } from '~/types/document'

const props = defineProps<{ documents: Document[] }>()

const lastModifiedDocuments = computed(() => {
  return props.documents
    .slice()
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)
})

const documentFormats = computed(() => {
  const formatCounts: Record<string, number> = {}

  props.documents.forEach((doc) => {
    formatCounts[doc.ext] = (formatCounts[doc.ext] || 0) + 1
  })

  return Object.entries(formatCounts).map(([name, value]) => ({
    name,
    value,
  }))
})

const totalDocuments = computed(() => props.documents.length)

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
      <DocumentFormatsCount :formats="documentFormats" />
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
