<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { SemanticChunker } from '~/types/document.ts'
import ChunkDocument from '~/assets/icons/svg/chunk-document.svg'
import AddIcon from '~/assets/icons/svg/add.svg'
import MinusIcon from '~/assets/icons/svg/minus.svg'
import CloseIcon from '~/assets/icons/svg/close.svg'
import SaveIcon from '~/assets/icons/svg/save-icon.svg'

// Define scroll options
const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}

const appConfigStore = useAppConfigStore()

appConfigStore.GET_AppConfig()

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
      embedProvider: '',
    },
  },

})

const validateThreshold = (_rule: any, value: any, callback: any) => {
  if (value < 0) {
    callback(new Error('Threshold cannot be negative'))
  }
  else {
    callback()
  }
}

const rules = reactive<FormRules<SemanticChunker>>({
  'semantic.config.size': [
    { required: true, message: 'Required', trigger: 'blur' },
  ],
  'semantic.config.threshold': [
    { required: true, message: 'Required', trigger: 'blur' },
    { validator: validateThreshold, trigger: 'change' },
  ],
  'semantic.config.distanceFn': [
    { required: true, message: 'Required', trigger: 'blur' },
  ],
  'semantic.config.delimiter': [
    { required: true, message: 'Required', trigger: 'blur' },
  ],
  'semantic.config.embedModel': [
    { required: true, message: 'Required', trigger: 'blur' },
  ],
  'semantic.config.embedProvider': [
    { required: true, message: 'Required', trigger: 'blur' },
  ],
  'semantic.config.skipForward': [
    { type: 'array', required: true, message: 'Required', trigger: 'blur' },
  ],
  'semantic.config.skipBack': [
    { type: 'array', required: true, message: 'Required', trigger: 'blur' },
  ],
})

function parseDocument() {
  if (selectedDocument.value?.id) {
    documentStore.POST_ChunkDocumentPreview(selectedDocument.value.id, form, form.semantic.config.embedProvider)
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
const embeddingProviders = ['fembed', 'openai']
const getModelsByProvider = (providerName: string) => {
  const models = appConfigStore.embeddingProviders[providerName]
  if (!models) {
    return []
  }

  return Object.entries(models).map(([name, value]) => ({
    name,
    value,
  }))
}

const availableModels = ref()
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

function onProviderChange() {
  form.semantic.config.embedModel = ''
  availableModels.value = getModelsByProvider(form.semantic.config.embedProvider)
}
</script>

<template>
  <div class="edit-parser-config-wrapper">
    <p> <b>Semantic Chunker Config</b></p>
    <ElForm
      ref="formRef"
      :model="form"
      :rules="rules"
      :scroll-to-error="true"
      :scroll-into-view-options="scrollIntoViewOptions"
    >
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
        label="Embed provider"
        prop="semantic.config.embedProvider"
      >
        <ElSelect
          v-model="form.semantic.config.embedProvider"
          placeholder="Select provider"
          @change="onProviderChange"
        >
          <ElOption
            v-for="(provider) in embeddingProviders"
            :key="provider"
            :label="provider"
            :value="provider"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem
        label="Embed Model"
        prop="semantic.config.embedModel"
      >
        <ElSelect
          v-model="form.semantic.config.embedModel"
          placeholder="Select model"
        >
          <ElOption
            v-for="model in availableModels"
            :key="model.value"
            :label="model.name"
            :value="model.name"
          />
        </ElSelect>
      </ElFormItem>

      <div class="range-filters-wrapper">
        <ElFormItem
          label="Skip Forward"
          prop="semantic.config.skipForward"
        >
          <ElInput v-model="forwardFilterString" @keyup.enter="addForwardFilter()" />
          <div class="filter-items-wrapper">
            <template v-for="filter in form.semantic.config.skipForward" :key="filter">
              <el-tag size="small">
                {{ filter }}
                <CloseIcon class="delete-filter-icon" @click="removeFilter(filter, 'skipForward')" />
              </el-tag>
            </template>
          </div>
        </ElFormItem>

        <ElFormItem
          label="Skip Back"
          prop="semantic.config.skipBack"
        >
          <ElInput v-model="backFilterString" @keyup.enter="addBackFilter()" />
          <template v-for="filter in form.semantic.config.skipBack" :key="filter">
            <el-tag>
              {{ filter }}
              <CloseIcon class="delete-filter-icon" @click="removeFilter(filter, 'skipBack')" />
            </el-tag>
          </template>
        </ElFormItem>
      </div>

      <ElFormItem>
        <div class="form-actions">
          <ElTooltip
            content="Preview Semantic chunker"
            :show-after="100"
            :enterable="false"
            placement="top"
          >
            <el-button @click="submitForm(formRef)">
              <ChunkDocument />  Preview
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
              <SaveIcon /> Save
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

.filter-items-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding-top: 12px;
  gap: 12px;
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
