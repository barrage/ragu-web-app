<script lang="ts" setup>
import type { SemanticChunker } from '~/types/document.ts'

defineProps<{
  config: SemanticChunker
}>()
const { t } = useI18n()
</script>

<template>
  <div class="semantic-chunker-config-overview-container">
    <LabelDescriptionItem
      :label="$t('documents.chunker.selected_type')"
      description="Semantic"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      :label="t('documents.chunker.semantic.form.size')"
      :description="config.semantic.size.toString()"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      :label="t('documents.chunker.semantic.form.threshold')"
      :description="config.semantic.threshold.toString()"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      :label="t('documents.chunker.semantic.form.distance_function')"
      :description="config.semantic.distanceFn.toString()"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      :label="t('documents.chunker.semantic.form.delimiter')"
      :description="config.semantic.delimiter.toString()"
      horizontal
    />
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      :label="t('documents.chunker.semantic.form.skip_foward')"
      :description="config.semantic.skipF.join(', ')"
    >
      <template #customDescription>
        <div class="tag-list">
          <el-tag
            v-for="item in config.semantic.skipF"
            :key="item"
          >
            {{ item }}
          </el-tag>
        </div>
      </template>
    </LabelDescriptionItem>
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      :label="t('documents.chunker.semantic.form.skip_back')"
      :description="config.semantic.skipB.join(', ')"
    >
      <template #customDescription>
        <div class="tag-list">
          <el-tag
            v-for="item in config.semantic.skipB"
            :key="item"
          >
            {{ item }}
          </el-tag>
        </div>
      </template>
    </LabelDescriptionItem>
    <div class="horizontal-divider" />
    <LabelDescriptionItem
      :label="t('documents.chunker.semantic.form.embed_model')"
      :description="config.semantic.embeddingModel.toString() || '-'"
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
