<script lang="ts" setup>
import type { SlidingChunker } from '~/types/document.ts'

defineProps<{
  config: SlidingChunker
}>()
</script>

<template>
  <div>
    <h6>Sliding Chunker</h6>
    <LabelDescriptionItem
      label="Size:"
      :description="config.sliding.config.size.toString()"
      horizontal
    />
    <LabelDescriptionItem
      label="Overlap:"
      :description="config.sliding.config.overlap.toString()"
      horizontal
    />
  </div>
</template>
