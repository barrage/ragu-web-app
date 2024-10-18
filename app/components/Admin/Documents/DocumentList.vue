<script lang="ts" setup>
import type { Document } from '~/types/document'

// Define the props for this component
const props = defineProps<{
  documents: Document[]
}>()
</script>

<template>
  <div class="document-list ">
    <div class="documents-container grid">
      <DocumentCard
        v-for="document in props.documents"
        :key="document.id"
        :document="document"
      />
    </div>
  </div>
</template>

  <style scoped>
  .documents-container {
  row-gap: 0.8rem;
  padding-right: var(--spacing-desktop-l);
  & .document-card {
    grid-column: span 12;
    row-gap: 0.8rem;
  }
}

h2 {
  margin-bottom: 16px;
}
</style>
