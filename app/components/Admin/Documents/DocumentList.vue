<script lang="ts" setup>
import type { Document } from '~/types/document'

// Define the props for this component
const props = defineProps<{
  documents: Document[]
}>()
</script>

<template>
  <div class="document-list">
    <div class="documents-container">
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
  display: flex;
  flex-direction: column;
  gap: 16px;
}

h2 {
  margin-bottom: 16px;
}
</style>
