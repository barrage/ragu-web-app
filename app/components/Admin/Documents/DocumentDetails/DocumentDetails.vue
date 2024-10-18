<script lang="ts" setup>
import ChunkDocument from '~/assets/icons/svg/chunk-document.svg'

import DataSettingsIcon from '~/assets/icons/svg/data-settings.svg'
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
      <DataSettingsIcon size="42" />
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
  & .parser-template {
    grid-column: span 6;
  }
  & .chunker-template {
    grid-column: span 6;
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
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: var(--color-primary-900);

  & h5 {
    color: var(--color-primary-900);
  }
}
.dark {
  & .icon-title-container {
    color: var(--color-primary-0);
  }
  & .horizontal-divider {
    background: var(--color-primary-700);
  }
}
.horizontal-divider {
  width: 100%;
  height: 1px;
  margin: 4px 0px;
  background: var(--color-primary-300);
}
</style>
