<script lang="ts" setup>
import type { ChunkerConfig, SemanticChunker, SlidingChunker, SnappingChunker } from '~/types/document.ts'
import InfoIcon from '~/assets/icons/svg/info.svg'

const documentStore = useDocumentsStore()
const selectedDocument = computed(() => {
  return documentStore.selectedDocument
})

const isSnappingChunker = (config: ChunkerConfig | null | undefined): config is SnappingChunker => {
  return !!config && 'snapping' in config
}

const isSlidingChunker = (config: ChunkerConfig | null | undefined): config is SlidingChunker => {
  return !!config && 'sliding' in config
}

const isSemanticChunker = (config: ChunkerConfig | null | undefined): config is SemanticChunker => {
  return !!config && 'semantic' in config
}

const editChunkerSelectedType = ref('semantic')

const selectChunkerType = (type: string) => {
  return editChunkerSelectedType.value = type
}

const checkConfigType = () => {
  if (isSnappingChunker(selectedDocument?.value?.chunkConfig)) {
    return editChunkerSelectedType.value = 'snapping'
  }
  else if (isSlidingChunker(selectedDocument?.value?.chunkConfig)) {
    return editChunkerSelectedType.value = 'sliding'
  }
  else if (isSemanticChunker(selectedDocument?.value?.chunkConfig)) {
    return editChunkerSelectedType.value = 'semantic'
  }
  else {
    return editChunkerSelectedType.value = 'snapping'
  }
}

onMounted(() => {
  checkConfigType()
})

const selectedButtonType = (name: string) => {
  return name === editChunkerSelectedType.value ? 'primary' : 'default'
}
</script>

<template>
  <div class="edit-chunker-config-container">
    <template v-if="selectedDocument?.parseConfig">
      <div class="select-chunker-type-wrapper">
        Selected type:
        <el-button
          size="small"
          :type="selectedButtonType('semantic')"
          @click="selectChunkerType('semantic')"
        >
          Semantic
        </el-button>
        <el-button
          size="small"
          :type="selectedButtonType('sliding')"
          @click="selectChunkerType('sliding')"
        >
          Sliding
        </el-button>
        <el-button
          size="small"
          :type="selectedButtonType('snapping')"
          @click="selectChunkerType('snapping')"
        >
          Snapping
        </el-button>
      </div>

      <div>
        <div v-if="editChunkerSelectedType === 'semantic'">
          <EditSemanticChunkerConfig />
        </div>
        <div v-else-if="editChunkerSelectedType === 'sliding'">
          <EditSlidingChunkerConfig />
        </div>
        <div v-else-if="editChunkerSelectedType === 'snapping'">
          <EditSnappingChunkerConfig />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="empty-parser-config-information">
        <InfoIcon />
        <p>
          You need to set Parser config first
        </p>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.edit-chunker-config-container {
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  & .edit-title {
    color: var(--color-primary-100);
    font-weight: var(--font-weight-bold);
  }

  & .select-chunker-type-wrapper {
    display: flex;
    gap: 22px;
    align-items: center;
  }
}
.empty-parser-config-information {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  color: var(--color-red-200);
  & p {
    color: var(--color-red-200);
  }
}
</style>
