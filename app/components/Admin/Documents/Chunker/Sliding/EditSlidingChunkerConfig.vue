<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { SlidingChunker, SlidingChunkerConfig } from '~/types/document.ts'
import ParseDocument from '~/assets/icons/svg/parse-document.svg'
import AddIcon from '~/assets/icons/svg/add.svg'
import MinusIcon from '~/assets/icons/svg/minus.svg'

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
const form = reactive<SlidingChunker>({
  sliding: {
    config: {
      size: 0,
      overlap: 0,
    },
  },
})
const validateSize = (_rule: any, value: any, callback: any) => {
  if (value <= form.sliding.config.overlap) {
    callback(new Error('Size must be greater than overlap'))
  }

  else {
    callback()
  }
}
// Validation rules
const rules = reactive<FormRules<SlidingChunker>>({
  'sliding.config.size': [
    { required: true, message: 'Required', trigger: 'blur' },
    { validator: validateSize, trigger: 'change' },
  ],
  'sliding.config.overlap': [
    { required: true, message: 'Required', trigger: 'blur' },
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
  if (chunkConfig && 'sliding' in chunkConfig) {
    form.sliding.config.size = chunkConfig.sliding.config.size || 0
    form.sliding.config.overlap = chunkConfig.sliding.config.overlap || 0
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
</script>

<template>
  <div class="edit-parser-config-wrapper">
    <h6>Sliding Chunker Config</h6>
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
          prop="sliding.config.size"
        >
          <ElInputNumber
            v-model="form.sliding.config.size"
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
          label="Overlap"
          prop="sliding.config.overlap"
        >
          <ElInputNumber
            v-model="form.sliding.config.overlap"
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
