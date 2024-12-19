<script lang="ts" setup>
import type { SlidingChunker } from '~/types/document.ts'

defineProps<{
  config: SlidingChunker
}>()
</script>

<template>
  <div class="current-sliding-chunker">
    <LabelDescriptionItem
      :label="$t('documents.chunker.selected_type')"
      description="Sliding"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      :label="$t('documents.chunker.sliding.form.size')"
      :description="config.sliding.size.toString()"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      :label="$t('documents.chunker.sliding.form.overlap')"
      :description="config.sliding.overlap.toString()"
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
