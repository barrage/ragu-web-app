<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { SlidingChunker, SlidingChunkerConfig } from '~/types/document.ts'
import ChunkDocument from '~/assets/icons/svg/chunk-document.svg'
import AddIcon from '~/assets/icons/svg/add.svg'
import MinusIcon from '~/assets/icons/svg/minus.svg'
import SaveIcon from '~/assets/icons/svg/save-icon.svg'
// Define scroll options
const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}
const { t } = useI18n()
// Document store and selected document
const documentStore = useDocumentsStore()
const selectedDocument = computed(() => {
  return documentStore.selectedDocument
})

// Form reference and state
const formRef = ref<FormInstance>()
const form = reactive<SlidingChunker>({
  sliding: {
    size: 0,
    overlap: 0,
  },
})
const validateSize = (_rule: any, value: any, callback: any) => {
  if (value <= form.sliding.overlap) {
    callback(new Error(t('documents.chunker.validation.size_validation')))
  }

  else {
    callback()
  }
}
// Validation rules
const rules = computed<FormRules<SlidingChunker>>(() => ({
  'sliding.size': [
    { required: true, message: t('form_rules.required'), trigger: 'blur' },
    { validator: validateSize, trigger: 'change' },
  ],
  'sliding.overlap': [
    { required: true, message: t('form_rules.required'), trigger: 'blur' },
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
  if (chunkConfig && 'sliding' in chunkConfig) {
    form.sliding.size = chunkConfig.sliding.size || 0
    form.sliding.overlap = chunkConfig.sliding.overlap || 0
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
</script>

<template>
  <div class="edit-parser-config-wrapper">
    <p> <b>{{ t('documents.chunker.sliding.title') }}</b></p>
    <ElForm
      ref="formRef"
      :model="form"
      :rules="rules"
      :scroll-to-error="true"
      :scroll-into-view-options="scrollIntoViewOptions"
    >
      <div class="form-items-wrapper">
        <ElFormItem
          :label="t('documents.chunker.sliding.form.size')"
          prop="sliding.size"
        >
          <ElInputNumber
            v-model="form.sliding.size"
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
          :label="t('documents.chunker.sliding.form.overlap')"
          prop="sliding.overlap"
        >
          <ElInputNumber
            v-model="form.sliding.overlap"
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
      </div>

      <ElFormItem>
        <div class="form-actions">
          <ElTooltip
            content="Preview Parse document"
            :show-after="100"
            :enterable="false"
            placement="top"
          >
            <el-button :disabled="loadingPreviewChunker === 'pending'" @click="submitForm(formRef)">
              <ChunkDocument />    {{ t('documents.chunker.sliding.form.actions.preview') }}
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
              <SaveIcon />  {{ t('documents.chunker.sliding.form.actions.save') }}
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
}
.form-actions {
  display: flex;
  gap: 22px;
  width: 100%;
  justify-content: flex-end;
  margin-top: 32px;
}

.dark {
  & .edit-parser-config-wrapper {
    border-top: 1px solid var(--color-primary-600);
  }
}
</style>
