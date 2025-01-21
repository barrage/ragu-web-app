<script lang="ts" setup>
import { nextTick } from 'vue'
import FullscreenIcon from '~/assets/icons/svg/fullscreen.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'

const documentStore = useDocumentsStore()
const isParserDialogVisible = ref(false)
const isLoaderVisible = ref(false)
const openParserDialog = () => {
  isParserDialogVisible.value = true
}

const closeParserDialog = () => {
  isParserDialogVisible.value = false
}

const parserResponse = computed(() => {
  return documentStore.parserPreview
})

const selectedDocument = computed(() => {
  return documentStore.selectedDocument
})

watch(
  () => documentStore.loadingParsePreview,
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
  <div class="parser-preview-wrapper">
    <div class="parser-preview-heading">
      <p class="parser-preview-title">
        {{ $t('documents.parser.parser_preview') }}
      </p>
      <el-button :disabled="parserResponse === null" @click="openParserDialog">
        <FullscreenIcon />
      </el-button>
    </div>
    <div class="parser-preview-content-wrapper">
      <div v-if="isLoaderVisible" class="preview-loader">
        <LlmLoader />
      </div>

      <p v-else>
        {{ parserResponse }}
      </p>
    </div>
  </div>

  <el-dialog
    v-model="isParserDialogVisible"
    :before-close="closeParserDialog"
  :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
    class="barrage-dialog--large"
  >
    <template #header>
      <h6>   {{ $t('documents.parser.parser_preview') }}</h6>
    </template>
    <p>   {{ $t('documents.parser.selected_document') }}: <b>{{ selectedDocument?.name }}</b> </p>
    <div class="parser-preview-content-wrapper">
      <p>{{ parserResponse }}</p>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.parser-preview-wrapper {
  flex: 0 0 calc(50% - 22px);
  background: var(--color-primary-200);
  border-radius: 10px;
  padding: 12px;
  margin-right: 12px;
  max-height: max-content;
  max-width: calc(50% - 22px);
  & .parser-preview-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-primary-800);
    padding-bottom: 8px;
    & .parser-preview-title {
      color: var(--color-primary-700);
    }
  }
  & .parser-preview-content-wrapper {
    padding: 8px;
    margin-top: 8px;
    height: 480px;
    overflow-x: hidden;
    overflow-y: auto;

    & p {
      word-break: break-all;
    }
  }
}
.preview-loader {
  margin: auto;
  display: flex;
  justify-content: center;
  height: 100%;
  backdrop-filter: blur(10px);
}

.dark {
  & .parser-preview-wrapper {
    background: var(--color-primary-800);

    & .parser-preview-heading {
      border-bottom: 1px solid var(--color-primary-800);
      padding-bottom: 8px;
      & .parser-preview-title {
        color: var(--color-primary-200);
      }
    }
  }
}
</style>
