<script lang="ts" setup>
const props = defineProps<{
  embeddingProviders: Record<string, Record<string, number>> | undefined | null
}>()
</script>

<template>
  <div class="embedding-providers-card">
    <h6>Embedding Providers</h6>

    <div v-if="props.embeddingProviders && Object.keys(props.embeddingProviders).length" class="vector-providers-list">
      <div
        v-for="(models, provider) in embeddingProviders"
        :key="provider"
        class="provider"
      >
        <h6>{{ provider }}</h6>
        <ul>
          <li v-for="(dimension, modelName) in models" :key="modelName">
            {{ modelName }}: {{ dimension }}
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      No data
    </div>
  </div>
</template>

  <style lang="scss" scoped>
  .embedding-providers-card {
  border-radius: 8px;
  border: 1px solid var(--color-primary-400);
  padding: 12px 16px;

  .provider {
    margin-bottom: 16px;

    h6 {
      margin-bottom: 4px;
    }
  }

  .vector-providers-list {
    margin-top: 8px;
  }
}
</style>
