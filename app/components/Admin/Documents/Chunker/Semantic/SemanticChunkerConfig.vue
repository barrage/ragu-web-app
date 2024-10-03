<script lang="ts" setup>
import type { SemanticChunker } from '~/types/document.ts'

defineProps<{
  config: SemanticChunker
}>()
</script>

<template>
  <div>
    <h6>Semantic Chunker</h6>
    <LabelDescriptionItem
      label="Size:"
      :description="config.semantic.config.size.toString()"
      horizontal
    />
    <LabelDescriptionItem
      label="Threshold:"
      :description="config.semantic.config.threshold.toString()"
      horizontal
    />
    <LabelDescriptionItem
      label="Distance Function:"
      :description="config.semantic.config.distanceFn.toString()"
      horizontal
    />
    <LabelDescriptionItem
      label="Delimiter:"
      :description="config.semantic.config.delimiter.toString()"
      horizontal
    />
    <LabelDescriptionItem
      label="Skip Forward:"
      :description="config.semantic.config.skipForward.join(', ')"
      horizontal
    />
    <LabelDescriptionItem
      label="Skip Back:"
      :description="config.semantic.config.skipBack.join(', ')"
      horizontal
    />
    <LabelDescriptionItem
      label="Embedding Model:"
      :description="config.semantic.config.embedModel.toString()"
      horizontal
    />
  </div>
</template>
