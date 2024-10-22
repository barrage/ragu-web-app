<script lang="ts" setup>
import ChunkDocument from '~/assets/icons/svg/chunk-document.svg'
/* STATE */
/* const documentStore = useDocumentsStore()

const route = useRoute()
const documentId = Array.isArray(route.params.documentId) ? route.params.documentId[0] : route.params.documentId

if (documentId) {
  await documentStore.GET_SingleDocument(documentId)
} */
</script>

<template>
  <section class="edit-chunker-section">
    <div class="chunk-title-wrapper">
      <ChunkDocument size="32" />
      <h6> <b>Chunker</b> </h6>
    </div>
    <div class="document-parser-config-container">
      <div class="document-parser-config-wrapper">
        <EditChunkConfig />
      </div>
      <PreviewChunk />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.edit-chunker-section {
  margin: 2.5rem 0rem;
}
.range-checkbox {
  display: flex;
  align-items: center;
  gap: 22px;
}
.chunk-title-wrapper {
  display: flex;
  gap: 6px;
}

.document-parser-config-container {
  display: flex;
  gap: 22px;
  width: 100%;
  overflow: hidden;

  & .document-parser-config-wrapper {
    padding-inline: 22px;
    flex: 0 0 calc(50% - 22px);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
