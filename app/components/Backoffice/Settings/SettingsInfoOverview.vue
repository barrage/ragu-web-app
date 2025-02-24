<script lang="ts" setup>
import type { AppConfig } from '~/types/appConfig'
import ChunkerIcon from '~/assets/icons/svg/chunk-document.svg'
import DocumentIcon from '~/assets/icons/svg/document.svg'
import EmbeddingIcon from '~/assets/icons/svg/parse-document.svg'
import FileTypeIcon from '~/assets/icons/svg/document-format.svg'
import VectorIcon from '~/assets/icons/svg/vector-icon.svg'

defineProps<{
  appConfig: AppConfig | null | undefined
}>()

const { t } = useI18n()
const getChunkerType = (chunker: any) => Object.keys(chunker)[0]
</script>

<template>
  <div class="group-heading-wrapper">
    <span class="group-description">{{ t('global_settings.info.description') }}</span>
  </div>
  <div class="settings-info-grid">
    <!-- Default Chunkers Card -->
    <el-card
      v-motion-fade
      class="info-card"
      :delay="100"
    >
      <template #header>
        <div class="card-header">
          <ChunkerIcon />
          <h6>{{ t('global_settings.info.chunkers.title') }}</h6>
        </div>
      </template>

      <div class="card-content">
        <template v-for="chunker in appConfig?.defaultChunkers" :key="getChunkerType(chunker)">
          <div class="info-item">
            <span class="item-label">{{ getChunkerType(chunker) }}</span>
          </div>
        </template>
      </div>
    </el-card>

    <!-- Document Providers Card -->
    <el-card
      v-motion-fade
      class="info-card"
      :delay="200"
    >
      <template #header>
        <div class="card-header">
          <DocumentIcon />
          <h6>{{ t('global_settings.info.document_providers.title') }}</h6>
        </div>
      </template>
      <div class="card-content">
        <template v-for="provider in appConfig?.documentProviders" :key="provider">
          <div class="info-item">
            <span class="item-label">{{ provider }}</span>
          </div>
        </template>
      </div>
    </el-card>

    <!-- Embedding Providers Card -->
    <el-card
      v-motion-fade
      class="info-card"
      :delay="300"
    >
      <template #header>
        <div class="card-header">
          <EmbeddingIcon />
          <h6>{{ t('global_settings.info.embedding_providers.title') }}</h6>
        </div>
      </template>
      <div class="card-content">
        <template v-for="(models, provider) in appConfig?.embeddingProviders" :key="provider">
          <div class="info-item">
            <span class="item-label">{{ provider }}</span>
            <div class="model-list">
              <el-tag
                v-for="(dimension, model) in models"
                :key="model"
                size="small"
              >
                {{ model }} ({{ dimension }})
              </el-tag>
            </div>
          </div>
        </template>
      </div>
    </el-card>

    <!-- Supported Document Types Card -->
    <el-card
      v-motion-fade
      class="info-card"
      :delay="400"
    >
      <template #header>
        <div class="card-header">
          <FileTypeIcon />
          <h6>{{ t('global_settings.info.document_types.title') }}</h6>
        </div>
      </template>
      <div class="card-content">
        <div class="tag-cloud">
          <el-tag
            v-for="type in appConfig?.supportedDocumentTypes"
            :key="type"
            size="small"
          >
            {{ type }}
          </el-tag>
        </div>
      </div>
    </el-card>

    <!-- Vector Providers Card -->
    <el-card
      v-motion-fade
      class="info-card"
      :delay="500"
    >
      <template #header>
        <div class="card-header">
          <VectorIcon />
          <h6>{{ t('global_settings.info.vector_providers.title') }}</h6>
        </div>
      </template>
      <div class="card-content">
        <template v-for="provider in appConfig?.vectorProviders" :key="provider">
          <div class="info-item">
            <span class="item-label">{{ provider }}</span>
          </div>
        </template>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.group-heading-wrapper {
  grid-column: 1/-1;
  margin-bottom: var(--spacing-fluid-m);

  & .group-description {
    font-size: var(--font-size-fluid-3);
    color: var(--color-primary-700);
  }
}
.settings-info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-fluid-m);
  width: 100%;
  margin-bottom: var(--spacing-fluid-m);

  @include viewport-xs {
    grid-template-columns: repeat(2, 1fr);
  }
  @include viewport-m {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-fluid-s);
  color: var(--color-primary-900);
  margin-bottom: var(--spacing-fluid-s);
  border-bottom: 1px solid var(--color-primary-300);
  padding-bottom: var(--spacing-fluid-xs);

  & svg {
    width: 24px;
    height: 24px;
  }

  & h6 {
    margin: 0;
    font-weight: var(--font-weight-semibold);
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-fluid-xs);

  .item-label {
    font-weight: var(--font-weight-medium);
    color: var(--color-primary-800);
  }
}

.model-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-fluid-xs);
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-fluid-xs);
}

html.dark {
  .group-heading-wrapper {
    & .group-description {
      color: var(--color-primary-300);
    }
  }

  .card-header {
    color: var(--color-primary-100);
  }

  .info-item .item-label {
    color: var(--color-primary-200);
  }
}
</style>
