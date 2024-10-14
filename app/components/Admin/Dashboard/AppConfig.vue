<script lang="ts" setup>
import type { AppConfig } from '~/types/appConfig'

const props = defineProps<{
  appConfig: AppConfig | null | undefined
}>()
</script>

<template>
  <div class="app-config-container">
    <h5>Providers</h5>
    <div class="app-config-widgets-wrapper">
      <VectorProviders :vector-providers="props.appConfig?.vectorProviders" />
      <EmbeddingProviders :embedding-providers="props.appConfig?.embeddingProviders" />
      <DefaultChunkers :default-chunkers="props.appConfig?.defaultChunkers" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-config-container {
  display: flex;
  flex-direction: column;
  gap: 22px;

  & .app-config-widgets-wrapper {
    display: flex;
    gap: 22px;
  }
}
</style>
