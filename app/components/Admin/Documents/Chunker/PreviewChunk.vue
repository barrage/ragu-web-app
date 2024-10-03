<script lang="ts" setup>
import FullscreenIcon from '~/assets/icons/svg/fullscreen.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'

const documentStore = useDocumentsStore()
const isChunkerDialogVisible = ref(false)
const isLoaderVisible = ref(false)
const openChunkerDialog = () => {
  isChunkerDialogVisible.value = true
}

const closeChunkerDialog = () => {
  isChunkerDialogVisible.value = false
}

const chunkerResponse = computed(() => {
  return documentStore.chunkPreview
})

const selectedDocument = computed(() => {
  return documentStore.selectedDocument
})

watch(
  () => documentStore.loadingChunkPreview,
  (loading) => {
    if (loading) {
      isLoaderVisible.value = true
    }
    else {
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
        Chunker preview
      </p>
      <el-button :disabled="chunkerResponse === null" @click="openChunkerDialog">
        <FullscreenIcon />
      </el-button>
    </div>
    <div class="chunker-preview-content-wrapper">
      <div v-if="isLoaderVisible" class="preview-loader">
        <LlmLoader />
      </div>
      <template v-else>
        <template v-for="(chunk, index) in chunkerResponse" :key="chunk">
          <span class="chunk-title">  {{ index + 1 }}. Chunk</span>
          <p class="single-chunk">
            {{ chunk }}
          </p>
        </template>
      </template>
    </div>
  </div>

  <el-dialog
    v-model="isChunkerDialogVisible"
    :before-close="closeChunkerDialog"
    :close-icon="CloseCircleIcon"
    class="barrage-dialog--large"
  >
    <template #header>
      <h6>Chunk Preview</h6>
    </template>
    <p>Selected document: <b>{{ selectedDocument?.name }}</b> </p>
    <div class="chunker-preview-content-wrapper">
      <template v-for="(chunk, index) in chunkerResponse" :key="chunk">
        {{ index + 1 }}. Chunk
        <p class="single-chunk">
          {{ chunk }}
        </p>
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
      font-weight: var(--font-weight-bold);
    }
  }
  & .chunker-preview-content-wrapper {
    padding: 8px;
    margin-top: 8px;
    height: 480px;
    overflow-y: auto;

    & p {
      word-break: break-all;
    }
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
}
</style>
