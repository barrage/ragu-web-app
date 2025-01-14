<script lang="ts" setup>
import OpenFolderIcon from '~/assets/icons/svg/open-folder.svg'
import type { ChunkerConfig, SemanticChunker, SlidingChunker, SnappingChunker } from '~/types/document.ts'

const props = defineProps<{
  config: ChunkerConfig | null | undefined
}>()

const isSnappingChunker = (config: ChunkerConfig | null | undefined): config is SnappingChunker => {
  return !!config && 'snapping' in config
}

const isSlidingChunker = (config: ChunkerConfig | null | undefined): config is SlidingChunker => {
  return !!config && 'sliding' in config
}

const isSemanticChunker = (config: ChunkerConfig | null | undefined): config is SemanticChunker => {
  return !!config && 'semantic' in config
}
</script>

<template>
  <div class="current-chunker-config-card ">
    <h6 class="current-config-title">
      {{ $t('documents.chunker.title') }}
    </h6>
    <div class="current-parser-config">
      <template v-if="props.config">
        <SnappingChunkerConfig v-if="isSnappingChunker(config)" :config="config" />
        <SlidingChunkerConfig v-else-if="isSlidingChunker(config)" :config="config" />
        <SemanticChunkerConfig v-else-if="isSemanticChunker(config)" :config="config" />
        <p v-else>
          {{ $t('documents.chunker.unknown_configuration') }}
        </p>
      </template>

      <template v-else>
        <div class="empty-config-container">
          <OpenFolderIcon />
          <span>       {{ $t('documents.chunker.empty_configuration') }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.current-chunker-config-card {
  border: 0.5px solid var(--color-primary-300);
  background: var(--color-primary-0);
  box-shadow: 0 0.2rem 0.3rem var(--color-primary-100);
  border-radius: 16px;
  padding: 1rem;
  width: 100%;
}
.current-config-title {
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-800);
}
.current-parser-config {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-inline: 12px;
  padding-top: 16px;

  & .start-end-range-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: space-between;
  }
  & span {
    margin: 0;
    color: var(--color-primary-800);
  }
}
.empty-config-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dark {
  & .current-config-title {
    color: var(--color-primary-0);
  }
  & .current-parser-config {
    & span {
      margin: 0;
      color: var(--color-primary-100);
    }
  }
  & .current-chunker-config-card {
    border: 0.5px solid var(--color-primary-600);
    background: var(--color-primary-800);
    box-shadow: 0 0.2rem 0.3rem var(--color-primary-700);
  }
}
</style>
