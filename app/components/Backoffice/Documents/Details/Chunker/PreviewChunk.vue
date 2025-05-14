<script lang="ts" setup>
import FullscreenIcon from '~/assets/icons/svg/fullscreen.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { ChunkerResponse } from '~/types/document.ts'

const { t } = useI18n()
const documentStore = useDocumentsStore()
const isChunkerDialogVisible = ref(false)
const isLoaderVisible = ref(false)

const itemsPerLoad = 200
const currentItemCount = ref(itemsPerLoad)

const openChunkerDialog = () => {
  isChunkerDialogVisible.value = true
}

const closeChunkerDialog = () => {
  isChunkerDialogVisible.value = false
}

const chunkerResponse = computed<ChunkerResponse | null>(() => {
  return documentStore.chunkPreview
})

const selectedDocument = computed(() => {
  return documentStore.selectedDocument
})

const hasChunks = computed(() => {
  return chunkerResponse.value
    && chunkerResponse.value.chunks
    && chunkerResponse.value.chunks.length > 0
})

const displayedChunks = computed(() => {
  if (!hasChunks.value) { return [] }
  return chunkerResponse?.value?.chunks
    .slice(0, currentItemCount.value)
    .map(item => item.chunk)
})

const hasMoreItems = computed(() => {
  if (!hasChunks.value) { return false }
  return currentItemCount.value < (chunkerResponse.value?.chunks?.length || 0)
})

function loadMoreItems() {
  if (hasMoreItems.value) {
    currentItemCount.value += itemsPerLoad
  }
}

watch(
  () => documentStore.loadingChunkPreview,
  (loading) => {
    isLoaderVisible.value = loading
    if (!loading) {
      setTimeout(() => {
        isLoaderVisible.value = false
      }, 800)
    }
  },
)
</script>

<template>
  <div class="chunker-preview-wrapper">
    <div class="chunker-preview-heading">
      <p class="chunker-preview-title">
        {{ t('documents.chunker.chunk_preview') }}
      </p>
      <el-button :disabled="!hasChunks" @click="openChunkerDialog">
        <FullscreenIcon />
      </el-button>
    </div>
    <div class="chunker-preview-content-wrapper">
      <div v-if="isLoaderVisible" class="preview-loader">
        <LlmLoader />
      </div>
      <template v-else>
        <template v-if="hasChunks">
          <span class="chunk-title"> {{ t('documents.chunker.chunk_preview') }}</span>
          <template v-for="(chunk, index) in displayedChunks" :key="chunk">
            <span class="chunk-title">{{ index + 1 }}. {{ t('documents.chunker.chunk') }}</span>
            <p class="single-chunk">
              {{ chunk }}
            </p>
          </template>
          <button
            v-if="hasMoreItems"
            class="load-more-button"
            @click="loadMoreItems"
          >
            {{ t('documents.chunker.load_more') }}
          </button>
        </template>
        <template v-else>
          <div class="chunk-preview-empty-state">
            <p class="chunker-preview-empty-state-description">
              {{ t('documents.chunker.chunk_preview_empty_state') }}
            </p>
          </div>
        </template>
      </template>
    </div>
  </div>

  <el-dialog
    v-model="isChunkerDialogVisible"
    :before-close="closeChunkerDialog"
    :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
    class="barrage-dialog--large"
  >
    <template #header>
      <h6>        {{ t('documents.chunker.chunk_preview') }}</h6>
    </template>
    <p>        {{ t('documents.chunker.selected_document') }}: <b>{{ selectedDocument?.name }}</b> </p>
    <p>   {{ t('documents.chunker.total_chunk') }}: <b>{{ chunkerResponse?.chunks?.length }}</b> </p>
    <div class="chunker-preview-content-wrapper">
      <template v-if="hasChunks">
        <template v-for="(chunk, index) in displayedChunks" :key="chunk">
          <span class="chunk-title">{{ index + 1 }}. {{ t('documents.chunker.chunk') }}</span>
          <p class="single-chunk">
            {{ chunk }}
          </p>
          <p v-if="chunkerResponse?.chunks[index]?.tokenCount" class="token-count">
            Tokens: cl100k: {{ chunkerResponse.chunks[index].tokenCount.cl100k }},
            o200k: {{ chunkerResponse.chunks[index].tokenCount.o200k }}
          </p>
        </template>
        <button
          v-if="hasMoreItems"
          class="load-more-button"
          @click="loadMoreItems"
        >
          {{ t('documents.chunker.load_more') }}
        </button>
      </template>
      <template v-else>
        <div class="chunk-preview-empty-state">
          <p class="chunker-preview-empty-state-description">
            {{ t('documents.chunker.chunk_preview_empty_state') }}
          </p>
        </div>
      </template>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.chunker-preview-wrapper {
  flex: 0 0 calc(50% - 22px);
  background: var(--color-primary-300);
  border-radius: 10px;
  padding: 12px;
  margin-right: 12px;
  max-height: max-content;
  & .chunker-preview-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-primary-800);
    padding-bottom: 8px;
    & .chunker-preview-title {
      color: var(--color-primary-800);
      font-weight: var(--font-weight-semibold);
    }
  }
  & .chunker-preview-content-wrapper {
    padding: 8px;
    margin-top: 8px;
    height: 480px;
    overflow-y: auto;
  }
}

.chunk-preview-empty-state {
  padding: 22px;
  max-width: 100%;

  & .chunker-preview-empty-state-description {
    text-overflow: ellipsis;
    text-align: center;
    white-space: wrap;
  }
}

.single-chunk {
  padding: 8px 12px;
  background: var(--color-primary-200);
  border-radius: 8px;
}

.preview-loader {
  margin: auto;
  display: flex;
  justify-content: center;
  height: 100%;
  backdrop-filter: blur(10px);
}

.chunk-title {
  font-size: var(--font-size-fluid-2);
  color: var(--color-primary-700);
}

.load-more-button {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  background-color: var(--color-primary-500);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.load-more-button:hover {
  background-color: var(--color-primary-600);
}

.token-count {
  font-size: var(--font-size-fluid-1);
  color: var(--color-primary-600);
  margin-top: -8px;
  margin-bottom: 12px;
  padding-left: 12px;
}

.dark {
  & .chunker-preview-wrapper {
    background: var(--color-primary-700);

    & .chunker-preview-heading {
      border-bottom: 1px solid var(--color-primary-800);
      padding-bottom: 8px;
      & .chunker-preview-title {
        color: var(--color-primary-200);
      }
    }
  }
  & .single-chunk {
    background: var(--color-primary-600);
  }
  & .chunk-title {
    color: var(--color-primary-200);
  }
  & .token-count {
    color: var(--color-primary-300);
  }
}
</style>
