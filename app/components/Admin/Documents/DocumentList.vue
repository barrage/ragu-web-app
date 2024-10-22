<script lang="ts" setup>
import type { Document } from '~/types/document'

// Define the props for this component
const props = defineProps<{
  documents: Document[]
}>()
</script>

<template>
  <div class="document-list">
    <h6 class="list-title">
      All documents
    </h6>
    <div class="document-list-actions">
      <DocumentsListActions />
    </div>
    <div class="documents-container grid">
      <DocumentCard
        v-for="document in props.documents"
        :key="document.id"
        :document="document"
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
