<script lang="ts" setup>
import ChunkDocument from '~/assets/icons/svg/chunk-document.svg'
import DocumentConfigurationIcon from '~/assets/icons/svg/document-configuration.svg'
import DocumentEditIcon from '~/assets/icons/svg/document-edit.svg'
import DocumentIcon from '~/assets/icons/svg/document.svg'
import type { Document } from '~/types/document'

const props = defineProps<{
  document: Document | null | undefined
}>()

definePageMeta({
  layout: 'admin-layout',
})

/* Parse document */

/* Chunk document */
/* const isChunkDialogVisible = ref(false)
const openChunkDialog = () => {
  isChunkDialogVisible.value = true
}

const closeChunkDialog = () => {
  isChunkDialogVisible.value = false
}

function chunkDocument() {
  if (selectedDocument.value?.id) {
    documentStore.POST_ParseDocumentPreview(selectedDocument.value.id)
    documentStore.GET_AllDocuments()
  }
} */

/* onUnmounted(() => {
  documentStore.parserPreview = null
}) */

/* Tabs */
</script>

<template>
  <div class="admin-document-page-container">
    <DocumentDetailsHeroSection :document="document" />
    <div class="horizontal-divider" />
    <DocumentDetailsInformationsSection :document="document" />

    <div class="horizontal-divider" />

    <div class="icon-title-container">
      <DocumentConfigurationIcon size="42" />
      <h5> Configuration</h5>
    </div>
    <div class="current-configuration grid">
      <div class="parser-template">
        <CurrentParserConfig :config="document?.parseConfig" />
      </div>
      <div class="chunker-template">
        <CurrentChunkerConfig :config="document?.chunkConfig" />
      </div>
    </div>
    <div class="icon-title-container">
      <DocumentEditIcon size="32" />
      <h5>Edit configuration</h5>
    </div>
    <div class="horizontal-divider" />
    <ParserConfigTab />
    <div class="horizontal-divider" />
    <ChunkerConfigTab />
    <!-- ------------ -->

    <!-- ------------ -->

    <!-- <ParserConfigTab />

    <ChunkerConfigTab /> -->
    <!--  <ElTooltip
            content="Chunk document"
            :show-after="100"
            :enterable="false"
            placement="top"
          >
            <el-button>
              <ChunkDocument />
            </el-button>
          </ElTooltip> -->
  </div>
</template>

<style lang="scss" scoped>
.current-configuration {
  height: max-content;

  & .parser-template {
    grid-column: span 6;
    & .current-parser-config-card {
      height: 100%;
    }
  }
  & .chunker-template {
    grid-column: span 6;
    & .current-chunker-config-card {
      height: 100%;
    }
  }
}
.admin-document-page-header {
  display: flex;
  gap: 22px;
  justify-content: space-between;
}
.admin-document-page-container {
  padding: 1rem 2rem;
}

.icon-title-container {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: var(--color-primary-900);

  & h5 {
    color: var(--color-primary-900);
    font-weight: var(--font-weight-bold);
  }
}
.dark {
  & .icon-title-container {
    color: var(--color-primary-0);
  }
  & h5 {
    color: var(--color-primary-0);
  }
}
</style>
