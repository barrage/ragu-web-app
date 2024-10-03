<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { SemanticChunker, SemanticChunkerConfig } from '~/types/document.ts'
import ParseDocument from '~/assets/icons/svg/parse-document.svg'
import AddIcon from '~/assets/icons/svg/add.svg'
import MinusIcon from '~/assets/icons/svg/minus.svg'
import CloseIcon from '~/assets/icons/svg/close.svg'

// Define scroll options
const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}

// Document store and selected document
const documentStore = useDocumentsStore()
const selectedDocument = computed(() => {
  return documentStore.selectedDocument
})

// Form reference and state
const formRef = ref<FormInstance>()
const form = reactive<SemanticChunker>({
  semantic: {
    config: {
      size: 0,
      threshold: 0,
      distanceFn: '',
      delimiter: '',
      skipForward: [],
      skipBack: [],
      embedModel: '',
    },
  },

})

// Validation rules
const validateThreshold = (_rule: any, value: any, callback: any) => {
  if (value < 0) {
    callback(new Error('Threshold cannot be negative'))
  }
  else {
    callback()
  }
}

const rules = reactive<FormRules<SemanticChunkerConfig>>({
  size: [
    { required: true, message: 'Required', trigger: 'blur' },
  ],
  threshold: [
    { required: true, message: 'Required', trigger: 'blur' },
    { validator: validateThreshold, trigger: 'change' },
  ],
  distanceFn: [
    { required: true, message: 'Required', trigger: 'blur' },
  ],
  delimiter: [
    { required: true, message: 'Required', trigger: 'blur' },
  ],
  skipForward: [
    { type: 'array', required: true, message: 'Required', trigger: 'blur' },
  ],
  skipBack: [
    { type: 'array', required: true, message: 'Required', trigger: 'blur' },
  ],
})

function parseDocument() {
  if (selectedDocument.value?.id) {
    documentStore.POST_ChunkDocumentPreview(selectedDocument.value.id, form)
    documentStore.GET_AllDocuments()
  }
}

async function saveConfig() {
  if (selectedDocument.value?.id) {
    await documentStore.PUT_UpdateDocumentConfig(selectedDocument.value.id, { parser: selectedDocument.value?.parseConfig, chunker: form || null })
    await documentStore.GET_SingleDocument(selectedDocument.value.id)
  }
}

const prefillForm = () => {
  const chunkConfig = selectedDocument.value?.chunkConfig
  if (chunkConfig && 'semantic' in chunkConfig) {
    form.semantic.config.size = chunkConfig.semantic.config.size || 0
    form.semantic.config.threshold = chunkConfig.semantic.config.threshold || 0
    form.semantic.config.distanceFn = chunkConfig.semantic.config.distanceFn || ''
    form.semantic.config.delimiter = chunkConfig.semantic.config.delimiter || ''
    form.semantic.config.skipForward = chunkConfig.semantic.config.skipForward || []
    form.semantic.config.skipBack = chunkConfig.semantic.config.skipBack || []
  }
}

watch(
  () => selectedDocument.value,
  () => {
    prefillForm()
  },
  { immediate: true },
)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  await formEl.validate((valid) => {
    if (valid) {
      parseDocument()
    }
  })
}

const submitSaveForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  await formEl.validate((valid) => {
    if (valid) {
      saveConfig()
    }
  })
}

const forwardFilterString = ref('')
const backFilterString = ref('')

const addForwardFilter = () => {
  if (!form.semantic.config.skipForward.includes(forwardFilterString.value) && forwardFilterString.value) {
    form.semantic.config.skipForward.push(forwardFilterString.value)
  }
  forwardFilterString.value = ''
}

const addBackFilter = () => {
  if (!form.semantic.config.skipBack.includes(backFilterString.value) && backFilterString.value) {
    form.semantic.config.skipBack.push(backFilterString.value)
  }
  backFilterString.value = ''
}

const removeFilter = (filter: string, type: 'skipForward' | 'skipBack') => {
  const index = form.semantic.config[type].indexOf(filter)
  if (index !== -1) {
    form.semantic.config[type].splice(index, 1)
  }
}
</script>

<template>
  <div class="edit-parser-config-wrapper">
    <h6>Semantic Chunker Config</h6>
    <ElForm
      ref="formRef"
      :model="form"
      :rules="rules"
      :scroll-to-error="true"
      :scroll-into-view-options="scrollIntoViewOptions"
    >
      <div class="form-items-wrapper">
        <ElFormItem
          label="Size"
          prop="semantic.config.size"
        >
          <ElInputNumber
            v-model="form.semantic.config.size"
            :min="0"
          >
            <template #increase-icon>
              <AddIcon />
            </template>
            <template #decrease-icon>
              <MinusIcon />
            </template>
          </ElInputNumber>
        </ElFormItem>

        <ElFormItem
          label="Threshold"
          prop="semantic.config.threshold"
        >
          <ElInputNumber
            v-model="form.semantic.config.threshold"
            :min="0"
            :step="0.1"
            :max="1"
          >
            <template #increase-icon>
              <AddIcon />
            </template>
            <template #decrease-icon>
              <MinusIcon />
            </template>
          </ElInputNumber>
        </ElFormItem>

        <ElFormItem
          label="Distance Function"
          prop="semantic.config.distanceFn"
        >
          <ElInput v-model="form.semantic.config.distanceFn" />
        </ElFormItem>

        <ElFormItem
          label="Delimiter"
          prop="semantic.config.delimiter"
        >
          <ElInput v-model="form.semantic.config.delimiter" />
        </ElFormItem>
        <ElFormItem
          label="Embed Model"
          prop="semantic.config.embedModel"
        >
          <ElInput v-model="form.semantic.config.embedModel" />
        </ElFormItem>
      </div>

      <div class="range-filters-wrapper">
        <ElFormItem
          label="Skip Forward"
          prop="semantic.config.skipForward"
        >
          <ElInput v-model="forwardFilterString" @keyup.enter="addForwardFilter()" />
          <template v-for="filter in form.semantic.config.skipForward" :key="filter">
            <div class="filter-item">
              <span>{{ filter }}</span>
              <CloseIcon class="delete-filter-icon" @click="removeFilter(filter, 'skipForward')" />
            </div>
          </template>
        </ElFormItem>

        <ElFormItem
          label="Skip Back"
          prop="semantic.config.skipBack"
        >
          <ElInput v-model="backFilterString" @keyup.enter="addBackFilter()" />
          <template v-for="filter in form.semantic.config.skipBack" :key="filter">
            <div class="filter-item">
              <span>{{ filter }}</span>
              <CloseIcon class="delete-filter-icon" @click="removeFilter(filter, 'skipBack')" />
            </div>
          </template>
        </ElFormItem>
      </div>

      <ElFormItem>
        <div class="form-actions">
          <ElTooltip
            content="Preview Parse document"
            :show-after="100"
            :enterable="false"
            placement="top"
          >
            <el-button @click="submitForm(formRef)">
              Preview <ParseDocument />
            </el-button>
          </ElTooltip>
          <ElTooltip
            content="Save New Config"
            :show-after="100"
            :enterable="false"
            placement="top"
          >
            <ElButton
              type="primary"
              @click="submitSaveForm(formRef)"
            >
              Save
            </ElButton>
          </ElTooltip>
        </div>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
.edit-parser-config-wrapper {
  border-top: 1px solid var(--color-primary-400);
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  & .form-items-wrapper {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  & .range-filters-wrapper {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
}
.form-actions {
  display: flex;
  gap: 22px;
  width: 100%;
  justify-content: flex-end;
  margin-top: 32px;
}

.filter-item {
  display: flex;
  margin-right: 12px;
  align-items: center;
  border: 1px solid var(--color-primary-400);
  width: max-content;
  padding: 2px 4px;
  border-radius: 6px;

  & .delete-filter-icon {
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
}

.dark {
  & .edit-parser-config-wrapper {
    border-top: 1px solid var(--color-primary-600);
  }
}
</style>
