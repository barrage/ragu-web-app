<script lang="ts" setup>
import type { ChunkerConfig } from '~/types/document'

defineProps<{
  defaultChunkers: ChunkerConfig[] | undefined
}>()

const getChunkerType = (chunker: ChunkerConfig) => Object.keys(chunker)[0]

const chunkerConfig = (chunker: ChunkerConfig) => {
  const key = getChunkerType(chunker)

  return chunker[key].config
}
</script>

<template>
  <div class="default-chunker-cards">
    <h6 class="title">
      Chunkers Configurations
    </h6>

    <div v-if="defaultChunkers && defaultChunkers.length" class="chunkers-list">
      <template
        v-for="(chunker) in defaultChunkers"
        :key="chunker"
      >
        <div class="chunker">
          <h6>{{ getChunkerType(chunker) }}</h6>
          <ul>
            <li>
              Size: {{ chunkerConfig(chunker).size }}
            </li>
            <li v-if="chunkerConfig(chunker).overlap !== undefined">
              Overlap: {{ chunkerConfig(chunker).overlap }}
            </li>

            <li v-if="chunkerConfig(chunker).delimiter">
              Delimiter: {{ chunkerConfig(chunker).delimiter }}
            </li>

            <li v-if="chunkerConfig(chunker).skipForward">
              Skip Forward: {{ chunkerConfig(chunker).skipForward.join(', ') }}
            </li>
            <li v-if="chunkerConfig(chunker).skipBack">
              Skip Back: {{ chunkerConfig(chunker).skipBack.join(', ') }}
            </li>

            <li v-if="chunkerConfig(chunker).threshold">
              Threshold: {{ chunkerConfig(chunker).threshold }}
            </li>
            <li v-if="chunkerConfig(chunker).distanceFn">
              Distance Function: {{ chunkerConfig(chunker).distanceFn }}
            </li>
            <li v-if="chunkerConfig(chunker).embeddingModel">
              Embedding Model: {{ chunkerConfig(chunker).embeddingModel }}
            </li>
            <li v-if="chunkerConfig(chunker).embeddingProvider">
              Embedding Provider: {{ chunkerConfig(chunker).embeddingProvider }}
            </li>
          </ul>
        </div>
      </template>
    </div>
    <div v-else>
      No data
    </div>
  </div>
</template>

  <style lang="scss" scoped>
  .default-chunker-cards {
  border-radius: 8px;
  border: 1px solid var(--color-primary-400);
  padding: 12px 16px;

  .title {
    display: inline-block;
    text-decoration: underline;
    font-weight: bold;
  }

  .chunker {
    margin-bottom: 16px;

    h6 {
      margin-bottom: 4px;
      font-style: italic;
    }
  }

  .vector-providers-list {
    margin-top: 8px;
  }
}
</style>
