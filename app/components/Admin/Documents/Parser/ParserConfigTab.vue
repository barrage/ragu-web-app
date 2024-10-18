<script lang="ts" setup>
/* STATE */
const documentStore = useDocumentsStore()

const selectedDocument = computed(() => {
  return documentStore.selectedDocument
})

const route = useRoute()
const documentId = Array.isArray(route.params.documentId) ? route.params.documentId[0] : route.params.documentId

if (documentId) {
  await documentStore.GET_SingleDocument(documentId)
}
</script>

<template>
  <h6>Edit Parser</h6>
  <div class="document-parser-config-container">
    <div class="document-parser-config-wrapper">
      <EditParserConfig />
    </div>
    <PreviewParser />
  </div>
</template>

<style lang="scss" scoped>
.range-checkbox {
  display: flex;
  align-items: center;
  gap: 22px;
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
