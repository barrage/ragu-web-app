<script lang="ts" setup>
import type { SnappingChunker } from '~/types/document.ts'

defineProps<{
  config: SnappingChunker
}>()
</script>

<template>
  <div>
    <h6>Snapping Chunker</h6>
    <LabelDescriptionItem
      label="Size:"
      :description="config.snapping.config.size.toString()"
      horizontal
    />
    <LabelDescriptionItem
      label="Overlap:"
      :description="config.snapping.config.overlap.toString()"
      horizontal
    />
    <LabelDescriptionItem
      label="Delimiter:"
      :description="config.snapping.delimiter.toString()"
      horizontal
    />
    <LabelDescriptionItem
      label="Skip Forward:"
      :description="config.snapping.skipForward.join(', ')"
      horizontal
    />
    <LabelDescriptionItem
      label="Skip Back:"
      :description="config.snapping.skipBack.join(', ')"
      horizontal
    />
  </div>
</template>
