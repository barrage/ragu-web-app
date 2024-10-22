<script lang="ts" setup>
import type { SlidingChunker } from '~/types/document.ts'

defineProps<{
  config: SlidingChunker
}>()
</script>

<template>
  <div class="current-sliding-chunker">
    <LabelDescriptionItem
      label="Type:"
      description="Sliding"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      label="Size:"
      :description="config.sliding.config.size.toString()"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      label="Overlap:"
      :description="config.sliding.config.overlap.toString()"
      horizontal
    />
  </div>
</template>

<style lang="scss" scoped>
.current-sliding-chunker {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
