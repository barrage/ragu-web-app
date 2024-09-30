<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import FullscreenIcon from '~/assets/icons/svg/fullscreen.svg'
import ParseDocument from '~/assets/icons/svg/parse-document.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import AddIcon from '~/assets/icons/svg/add.svg'
import MinusIcon from '~/assets/icons/svg/minus.svg'
import type { Document, DocumentConfig, DocumentListResponse, ParserConfig } from '~/types/document.ts'

/* STATE */
const documentStore = useDocumentsStore()
const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}
const selectedDocument = computed(() => {
  return documentStore.selectedDocument
})

const formRef = ref<FormInstance>()
const form = reactive<ParserConfig>({
  start: selectedDocument.value?.parseConfig?.start || 0,
  end: selectedDocument.value?.parseConfig?.start || 0,
  range: selectedDocument.value?.parseConfig?.range || false,
  filters: selectedDocument.value?.parseConfig?.filters || [],
})

const route = useRoute()
const documentId = Array.isArray(route.params.documentId) ? route.params.documentId[0] : route.params.documentId

const isParserDialogVisible = ref(false)
const openParserDialog = () => {
  isParserDialogVisible.value = true
}

const closeParserDialog = () => {
  isParserDialogVisible.value = false
}
const parserResponse = computed(() => {
  return documentStore.parserPreview
})
const validateStartWithRange = (_rule: any, value: any, callback: any) => {
  if (form.range && form.start === 0) {
    callback(new Error('Start cannot be 0 when using range'))
  }
 else if(form.range && form.start > form.end) {
    callback(new Error('Start cannot be greater than end when using range'))
  }

  else {
    callback()
  }
}
/* FORM */
// STATE

const rules = reactive<FormRules<ParserConfig>>({
  start: [
    { required: true, message: 'mrs', trigger: 'blur' },
    { validator: validateStartWithRange, trigger: 'blur' },
  ],
  end: [
    { required: true, message: 'message', trigger: 'blur' },

  ],
  range: [
    { required: true, message: 'message', trigger: 'blur' },

  ],
  filters: [
    { required: true, message: 'message', trigger: 'blur' },

  ],
})

const filtersString = ref('')

function parseDocument() {
  if (selectedDocument.value?.id) {
    documentStore.POST_ParseDocumentPreview(selectedDocument.value.id, form)
    documentStore.GET_AllDocuments()
  }
}

async function saveConfig() {
  if (selectedDocument.value?.id) {
    await documentStore.PUT_UpdateDocumentConfig(selectedDocument.value.id, { parser: form, chunker: selectedDocument.value?.chunkConfig || null })
    await documentStore.GET_SingleDocument(selectedDocument.value.id)
  }
}

const prefillForm = () => {
  form.start = selectedDocument.value?.parseConfig?.start || 0
  form.end = selectedDocument.value?.parseConfig?.end || 0
  form.range = selectedDocument.value?.parseConfig?.range || false
  form.filters = selectedDocument.value?.parseConfig?.filters || []
}
watch(
  () => selectedDocument.value,
  () => {
    prefillForm()
  },
  { immediate: true },
)
if (documentId) {
  await documentStore.GET_SingleDocument(documentId)
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  } 
  await formEl.validate((valid, __) => {
    if (valid) {
      parseDocument()
    }
  })
}
const submitSaveForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  } 
  await formEl.validate((valid, __) => {
    if (valid) {
      saveConfig()
    }
  })
}
</script>

<template>
  <div class="document-parser-config-container">
    <div class="document-parser-config-wrapper">
      <p>Current config</p>
      <template v-if="selectedDocument?.parseConfig === null">
        Empty config
      </template>
      <template v-else>
        <div class="current-parser-config">
          <span>Start:  {{ selectedDocument?.parseConfig?.start }}</span>
          <span>End:  {{ selectedDocument?.parseConfig?.end }}</span>
          <span>Range:  {{ selectedDocument?.parseConfig?.range }}</span>

          <span>Filters:
            <template v-if="selectedDocument?.parseConfig?.filters?.length">
              <template v-for="filter in selectedDocument?.parseConfig?.filters">
                {{ filter }}
              </template>
            </template>
            <template v-else>
              Empty
            </template>
          </span>
        </div>
      </template>
      <div class="edit-parser-config-wrapper">
        <h6>Edit Config </h6>
        <ElForm
          ref="formRef"
          :model="form"
          :rules="rules"
          :scroll-to-error="true"
          :scroll-into-view-options="scrollIntoViewOptions"
        >
          <ElFormItem
            label="Start"
            prop="start"
          >
            <ElInputNumber
              v-model="form.start"
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
            label="End"
            prop="end"
          >
            <ElInputNumber v-model="form.end" :min="0">
              <template #increase-icon>
                <AddIcon />
              </template>
              <template #decrease-icon>
                <MinusIcon />
              </template>
            </ElInputNumber>
          </ElFormItem>
          <ElFormItem
            label="Range"
            prop="range"
            class="range-checkbox"
          >
            <input
              v-model="form.range"
              type="checkbox"
            >
          </ElFormItem>
          <ElFormItem
            label="Filters"
            prop="end"
          >
            <ElInput v-model="filtersString" />
          </ElFormItem>

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
    </div>
    <div class="parser-preview-wrapper">
      <div class="parser-preview-heading">
        <p class="parser-preview-title">
          {{ selectedDocument?.name }} parser preview
        </p>
        <el-button :disabled="parserResponse === null" @click="openParserDialog">
          <FullscreenIcon />
        </el-button>
      </div>
      <div class="parser-preview-content-wrapper">
        <p>{{ parserResponse }}</p>
      </div>
    </div>
    <el-dialog
      v-model="isParserDialogVisible"
      :before-close="closeParserDialog"
      :close-icon="CloseCircleIcon"
      class="barrage-dialog--large"
    >
      <template #header>
        <h6>Parse Preview</h6>
      </template>
      <p>Selected document: <b>{{ selectedDocument?.name }}</b> </p>
      <div class="parser-preview-content-wrapper">
        <p>{{ parserResponse }}</p>
      </div>

      <template #footer>
        <el-button @click="closeParserDialog">
          Keep editing
        </el-button>
        <el-button @click="parseDocument">
          Save
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.range-checkbox {
  display: flex;
  align-items: center;
  gap: 22px;
}
.current-parser-config {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-inline: 12px;
  & span {
    margin: 0;
    color: var(--color-primary-800);
  }
}

.form-actions {
  display: flex;
  gap: 22px;
  width: 100%;
  justify-content: flex-end;
}

.document-parser-config-container {
  display: flex;
  gap: 22px;
  width: 100%;
  overflow: hidden;

  & .document-parser-config-wrapper {
    padding-inline: 22px;
    flex: 0 0 calc(50% - 22px);
    display: flex;
    flex-direction: column;
    gap: 12px;

    & .edit-parser-config-wrapper {
      border-top: 1px solid var(--color-primary-400);
      padding-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }

  & .parser-preview-wrapper {
    flex: 0 0 calc(50% - 22px);
    background: var(--color-primary-300);
    border-radius: 10px;
    padding: 12px;
    margin-right: 12px;
    max-height: max-content;
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
      height: 600px;
      overflow-y: auto;

      & p {
        word-break: break-all;
      }
    }
  }
}

.dark{
    & .current-parser-config {

  & span {
    margin: 0;
    color: var(--color-primary-100);
  }
}
& .document-parser-config-container {

  & .document-parser-config-wrapper {


    & .edit-parser-config-wrapper {
      border-top: 1px solid var(--color-primary-600);

    }
  }

  & .parser-preview-wrapper {
    background: var(--color-primary-700);

    & .parser-preview-heading {
      border-bottom: 1px solid var(--color-primary-800);
      padding-bottom: 8px;
      & .parser-preview-title {
        color: var(--color-primary-200);
      }
    }
  
  }
}
}
</style>
