<script lang="ts" setup>
import DocumentEditIcon from '~/assets/icons/svg/document-edit.svg'
import type { Document } from '~/types/document'

const props = defineProps<{
  document: Document
}>()
</script>

<template>
  <div class="current-configuration grid">
    <div class="parser-template">
      <CurrentParserConfig :config="props.document?.parseConfig" />
    </div>
    <div class="chunker-template">
      <CurrentChunkerConfig :config="props.document?.chunkConfig" />
    </div>
  </div>
  <div class="icon-title-container">
    <DocumentEditIcon size="32px" />
    <h5> {{ $t('documents.configuration') }} </h5>
  </div>
  <div class="horizontal-divider" />
  <ParserConfigTab />
  <div class="horizontal-divider" />
  <ChunkerConfigTab />
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
.icon-title-container {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: var(--color-primary-900);

  & h5 {
    color: var(--color-primary-900);
    font-weight: var(--font-weight-semibold);
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
