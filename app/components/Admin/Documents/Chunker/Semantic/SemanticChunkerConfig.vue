<script lang="ts" setup>
import type { SemanticChunker } from '~/types/document.ts'

defineProps<{
  config: SemanticChunker
}>()
</script>

<template>
  <div class="semantic-chunker-config-overview-container">
    <LabelDescriptionItem
      label="Type:"
      description="Semantic"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      label="Size:"
      :description="config.semantic.config.size.toString()"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      label="Threshold:"
      :description="config.semantic.config.threshold.toString()"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      label="Distance Function:"
      :description="config.semantic.config.distanceFn.toString()"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      label="Delimiter:"
      :description="config.semantic.config.delimiter.toString()"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      label="Skip Forward:"
      :description="config.semantic.config.skipForward.join(', ')"
    >
      <template #customDescription>
        <div class="tag-list">
          <el-tag
            v-for="item in config.semantic.config.skipForward"
            :key="item"
          >
            {{ item }}
          </el-tag>
        </div>
      </template>
    </LabelDescriptionItem>
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      label="Skip Back:"
      :description="config.semantic.config.skipBack.join(', ')"
    >
      <template #customDescription>
        <div class="tag-list">
          <el-tag
            v-for="item in config.semantic.config.skipBack"
            :key="item"
          >
            {{ item }}
          </el-tag>
        </div>
      </template>
    </LabelDescriptionItem>
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      label="Embedding Model:"
      :description="config.semantic.config.embedModel.toString() || '-'"
      horizontal
    />
  </div>
</template>

<style lang="scss" scoped>
.semantic-chunker-config-overview-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 4px;
}
.tag-list {
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
</style>
