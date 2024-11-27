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

const { t } = useI18n()

// Document store and selected document
const documentStore = useDocumentsStore()
const selectedDocument = computed(() => {
  return documentStore.selectedDocument
})

// Form reference and state
const formRef = ref<FormInstance>()
const form = reactive<SemanticChunker>({
  semantic: {
    size: 0,
    threshold: 0,
    distanceFn: '',
    delimiter: '',
    skipF: [],
    skipB: [],
    embeddingModel: '',
    embeddingProvider: '',
  },

})

const validateThreshold = (_rule: any, value: any, callback: any) => {
  if (value < 0) {
    callback(new Error(t('documents.chunker.validation.threshold_validation')))
  }
  else {
    callback()
  }
}

const rules = computed<FormRules<SemanticChunker>>(() => ({
  'semantic.size': [
    { required: true, message: t('form_rules.required'), trigger: 'blur' },
  ],
  'semantic.threshold': [
    { required: true, message: t('form_rules.required'), trigger: 'blur' },
    { validator: validateThreshold, trigger: 'change' },
  ],
  'semantic.distanceFn': [
    { required: true, message: t('form_rules.required'), trigger: 'blur' },
  ],
  'semantic.delimiter': [
    { required: true, message: t('form_rules.required'), trigger: 'blur' },
  ],
  'semantic.emeddingModel': [
    { required: true, message: t('form_rules.required'), trigger: 'blur' },
  ],
  'semantic.embeddingProvider': [
    { required: true, message: t('form_rules.required'), trigger: 'blur' },
  ],
  'semantic.skipF': [
    { type: 'array', required: true, message: t('form_rules.required'), trigger: 'blur' },
  ],
  'semantic.skipB': [
    { type: 'array', required: true, message: t('form_rules.required'), trigger: 'blur' },
  ],
}))

const { error: chunkPreviewError, status: loadingPreviewChunker, execute: executeChunkPreview } = await useAsyncData(() => documentStore.POST_ChunkDocumentPreview(selectedDocument.value!.id, form), { immediate: false })

const { error: upadteChunkConfigError, status: loadingUpdateConfig, execute: executeUpdateChunkConfig } = await useAsyncData(() => documentStore.PUT_UpdateDocumentConfig(selectedDocument.value!.id, { parser: selectedDocument.value!.parseConfig, chunker: form || null }), { immediate: false })

const { error: getSingleDocumentError, execute: executeGetSingleDocument } = await useAsyncData(() => documentStore.GET_SingleDocument(selectedDocument.value!.id), { immediate: false })

errorHandler(getSingleDocumentError)
async function previewDocumentChunker() {
  if (selectedDocument.value?.id) {
    await executeChunkPreview()
    if (chunkPreviewError.value) {
      ElNotification({
        title: t('documents.chunker.notifications.preview.error_title'),
        message: t('documents.chunker.notifications.preview.error_description'),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
  }
}

async function saveConfig() {
  if (selectedDocument.value?.id) {
    await executeUpdateChunkConfig()
    if (upadteChunkConfigError.value) {
      ElNotification({
        title: t('documents.chunker.notifications.update.error_title'),
        message: t('documents.chunker.notifications.update.error_description'),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
    else {
      ElNotification({
        title: t('documents.chunker.notifications.update.success_title'),
        message: t('documents.chunker.notifications.update.success_description'),
        type: 'success',
        customClass: 'success',
        duration: 2500,
      })
      await executeGetSingleDocument()
    }
  }
}

const prefillForm = () => {
  const chunkConfig = selectedDocument.value?.chunkConfig
  if (chunkConfig && 'semantic' in chunkConfig) {
    form.semantic.size = chunkConfig.semantic.size || 0
    form.semantic.threshold = chunkConfig.semantic.threshold || 0
    form.semantic.distanceFn = chunkConfig.semantic.distanceFn || ''
    form.semantic.delimiter = chunkConfig.semantic.delimiter || ''
    form.semantic.skipF = chunkConfig.semantic.skipF || []
    form.semantic.skipB = chunkConfig.semantic.skipB || []
    form.semantic.embeddingModel = chunkConfig.semantic.embeddingModel
    form.semantic.embeddingProvider = chunkConfig.semantic.embeddingProvider
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
      previewDocumentChunker()
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
  if (!form.semantic.skipF.includes(forwardFilterString.value) && forwardFilterString.value) {
    form.semantic.skipF.push(forwardFilterString.value)
  }
  forwardFilterString.value = ''
}

const addBackFilter = () => {
  if (!form.semantic.skipB.includes(backFilterString.value) && backFilterString.value) {
    form.semantic.skipB.push(backFilterString.value)
  }
  backFilterString.value = ''
}

const removeFilter = (filter: string, type: 'skipF' | 'skipB') => {
  const index = form.semantic[type].indexOf(filter)
  if (index !== -1) {
    form.semantic[type].splice(index, 1)
  }
}

function onProviderChange() {
  form.semantic.embeddingModel = ''
  availableModels.value = getModelsByProvider(form.semantic.embeddingProvider)
}
</script>

<template>
  <div class="edit-parser-config-wrapper">
    <p> <b>{{ t('documents.chunker.semantic.title') }}</b></p>
    <!--     <span>{{ t('documents.chunker.semantic.description') }}</span> -->
    <ElForm
      ref="formRef"
      :model="form"
      :rules="rules"
      :scroll-to-error="true"
      :scroll-into-view-options="scrollIntoViewOptions"
    >
      <ElFormItem
        :label="t('documents.chunker.semantic.form.size')"
        prop="semantic.size"
      >
        <ElInputNumber
          v-model="form.semantic.size"
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
        :label="t('documents.chunker.semantic.form.threshold')"
        prop="semantic.threshold"
      >
        <ElInputNumber
          v-model="form.semantic.threshold"
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
        :label="t('documents.chunker.semantic.form.distance_function')"
        prop="semantic.distanceFn"
      >
        <ElInput v-model="form.semantic.distanceFn" />
      </ElFormItem>

      <ElFormItem
        :label="t('documents.chunker.semantic.form.delimiter')"
        prop="semantic.delimiter"
      >
        <ElInput v-model="form.semantic.delimiter" />
      </ElFormItem>
      <ElFormItem
        :label="t('documents.chunker.semantic.form.embed_provider')"
        prop="semantic.embeddingProvider"
      >
        <ElSelect
          v-model="form.semantic.embeddingProvider"
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
        :label="t('documents.chunker.semantic.form.embed_model')"
        prop="semantic.embeddingModel"
      >
        <ElSelect
          v-model="form.semantic.embeddingModel"
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
          :label="t('documents.chunker.semantic.form.skip_foward')"
          prop="semantic.skipF"
        >
          <ElInput v-model="forwardFilterString" @keyup.enter="addForwardFilter()" />
          <div class="filter-items-wrapper">
            <template v-for="filter in form.semantic.skipF" :key="filter">
              <el-tag size="small">
                {{ filter }}
                <CloseIcon class="delete-filter-icon" @click="removeFilter(filter, 'skipF')" />
              </el-tag>
            </template>
          </div>
        </ElFormItem>

        <ElFormItem
          :label="t('documents.chunker.semantic.form.skip_back')"
          prop="semantic.skipB"
        >
          <ElInput v-model="backFilterString" @keyup.enter="addBackFilter()" />
          <div class="filter-items-wrapper">
            <template v-for="filter in form.semantic.skipB" :key="filter">
              <el-tag size="small">
                {{ filter }}
                <CloseIcon class="delete-filter-icon" @click="removeFilter(filter, 'skipB')" />
              </el-tag>
            </template>
          </div>
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
            <el-button :disabled="loadingPreviewChunker === 'pending'" @click="submitForm(formRef)">
              <ChunkDocument />  {{ t('documents.chunker.semantic.form.actions.preview') }}
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
              :disabled="loadingUpdateConfig === 'pending'"
              @click="submitSaveForm(formRef)"
            >
              <SaveIcon /> {{ t('documents.chunker.semantic.form.actions.save') }}
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
