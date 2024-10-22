<script lang="ts" setup>
import type { SnappingChunker } from '~/types/document.ts'

defineProps<{
  config: SnappingChunker
}>()
</script>

<template>
  <div class="current-snapping-config">
    <LabelDescriptionItem
      label="Type:"
      description="Snapping"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      label="Size:"
      :description="config.snapping.config.size.toString()"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      label="Overlap:"
      :description="config.snapping.config.overlap.toString()"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      label="Delimiter:"
      :description="config.snapping.delimiter.toString()"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      label="Skip Forward:"
      :description="config.snapping.skipForward.join(', ')"
    >
      <template #customDescription>
        <div class="tag-list">
          <el-tag
            v-for="item in config.snapping.skipForward"
            :key="item"
            size="small"
          >
            {{ item }}
          </el-tag>
        </div>
      </template>
    </LabelDescriptionItem>
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      label="Skip Back:"
      :description="config.snapping.skipBack.join(', ')"
    >
      <template #customDescription>
        <div class="tag-list">
          <el-tag
            v-for="item in config.snapping.skipBack"
            :key="item"
            size="small"
          >
            {{ item }}
          </el-tag>
        </div>
      </template>
    </LabelDescriptionItem>
  </div>
</template>

<style lang="scss" scoped>
.current-snapping-config {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
