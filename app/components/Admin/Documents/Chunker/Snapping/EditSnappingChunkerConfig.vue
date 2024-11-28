<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { SnappingChunker } from '~/types/document.ts'
import ChunkDocument from '~/assets/icons/svg/chunk-document.svg'
import AddIcon from '~/assets/icons/svg/add.svg'
import MinusIcon from '~/assets/icons/svg/minus.svg'
import CloseIcon from '~/assets/icons/svg/close.svg'
import SaveIcon from '~/assets/icons/svg/save-icon.svg'

const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}
const { t } = useI18n()
const documentStore = useDocumentsStore()
const selectedDocument = computed(() => {
  return documentStore.selectedDocument
})

const formRef = ref<FormInstance>()
const form = reactive<SnappingChunker>({
  snapping: {
    size: 0,
    overlap: 0,
    delimiter: '',
    skipF: [],
    skipB: [],
  },
})

const validateSize = (_rule: any, value: any, callback: any) => {
  if (value <= form.snapping.overlap) {
    callback(new Error(t('documents.chunker.validation.size_validation')))
  }

  else {
    callback()
  }
}

// Validation rules
const rules = computed<FormRules<SnappingChunker>>(() => ({
  'snapping.size': [
    { required: true, message: t('form_rules.required'), trigger: 'blur' },
    { validator: validateSize, trigger: 'change' },
  ],
  'snapping.overlap': [
    { required: true, message: t('form_rules.required'), trigger: 'blur' },
  ],
  'snapping.delimiter': [
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
  if (chunkConfig && 'snapping' in chunkConfig) {
    form.snapping.size = chunkConfig.snapping.size || 0
    form.snapping.overlap = chunkConfig.snapping.overlap || 0
    form.snapping.delimiter = chunkConfig.snapping.delimiter || '.'
    form.snapping.skipF = chunkConfig.snapping.skipF || []
    form.snapping.skipB = chunkConfig.snapping.skipB || []
  }
}

watch(
  () => selectedDocument.value,
  () => {
    prefillForm()
  },
  { immediate: true },
)

const submitPreviewForm = async (formEl: FormInstance | undefined) => {
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
  if (!form.snapping.skipF.includes(forwardFilterString.value) && forwardFilterString.value) {
    form.snapping.skipF.push(forwardFilterString.value)
  }
  forwardFilterString.value = ''
}

const addBackFilter = () => {
  if (!form.snapping.skipB.includes(backFilterString.value) && backFilterString.value) {
    form.snapping.skipB.push(backFilterString.value)
  }
  backFilterString.value = ''
}

const removeFilter = (filter: string, type: 'skipF' | 'skipB') => {
  const index = form.snapping[type].indexOf(filter)
  if (index !== -1) {
    form.snapping[type].splice(index, 1)
  }
}
</script>

<template>
  <div class="edit-parser-config-wrapper">
    <p> <b>{{ $t('documents.chunker.snapping.title') }}</b></p>
    <ElForm
      ref="formRef"
      :model="form"
      :rules="rules"
      :scroll-to-error="true"
      :scroll-into-view-options="scrollIntoViewOptions"
    >
      <ElFormItem
        :label="$t('documents.chunker.snapping.form.size')"
        prop="snapping.size"
      >
        <ElInputNumber
          v-model="form.snapping.size"
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
        :label="$t('documents.chunker.snapping.form.overlap')"
        prop="snapping.config.overlap"
      >
        <ElInputNumber
          v-model="form.snapping.overlap"
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
        :label="$t('documents.chunker.snapping.form.delimiter')"
        prop="snapping.delimiter"
      >
        <ElInput v-model="form.snapping.delimiter" />
      </ElFormItem>

      <div class="range-filters-wrapper">
        <ElFormItem
          :label="$t('documents.chunker.snapping.form.skip_foward')"
          prop="snapping.skipF"
        >
          <ElInput v-model="forwardFilterString" @keyup.enter="addForwardFilter()" />
          <div class="filter-items-wrapper">
            <template v-for="filter in form.snapping.skipF" :key="filter">
              <el-tag size="small">
                <span> {{ filter }}  </span>
                <CloseIcon
                  size="12px"
                  class="delete-filter-icon"
                  @click="removeFilter(filter, 'skipF')"
                />
              </el-tag>
            </template>
          </div>
        </ElFormItem>

        <ElFormItem
          :label="$t('documents.chunker.snapping.form.skip_back')"
          prop="snapping.skipB"
        >
          <ElInput v-model="backFilterString" @keyup.enter="addBackFilter()" />
          <div class="filter-items-wrapper">
            <template v-for="filter in form.snapping.skipB" :key="filter">
              <el-tag size="small">
                <span> {{ filter }}  </span>
                <CloseIcon
                  size="12px"
                  class="delete-filter-icon"
                  @click="removeFilter(filter, 'skipB')"
                />
              </el-tag>
            </template>
          </div>
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
            <el-button :disabled="loadingPreviewChunker === 'pending'" @click="submitPreviewForm(formRef)">
              <ChunkDocument />  {{ t('documents.chunker.snapping.form.actions.preview') }}
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
              <SaveIcon />  {{ t('documents.chunker.snapping.form.actions.save') }}
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
  gap: 6px;
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
