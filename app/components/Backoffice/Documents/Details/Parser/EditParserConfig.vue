<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { Document, DocumentConfig, DocumentListResponse, ParserConfig } from '~/types/document.ts'
import ParseDocument from '~/assets/icons/svg/parse-document.svg'
import AddIcon from '~/assets/icons/svg/add.svg'
import SaveIcon from '~/assets/icons/svg/save-icon.svg'
import MinusIcon from '~/assets/icons/svg/minus.svg'
import CloseIcon from '~/assets/icons/svg/close.svg'

const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}
const documentStore = useDocumentsStore()
const selectedDocument = computed(() => {
  return documentStore.selectedDocument
})
const { t } = useI18n()
const formRef = ref<FormInstance>()
const form = reactive<ParserConfig>({
  mode: {
    string: {
      start: 0,
      end: 0,
      range: false,
      filters: [],
    },
  },
  includeImages: false,
})

const validateStartWithRange = (_rule: any, value: any, callback: any) => {
  if (form.mode.string.range && form.mode.string.start === 0) {
    callback(new Error(t('documents.parser.validation.start_0_with_range')))
  }
  else if (form.mode.string.range && form.mode.string.start > form.mode.string.end) {
    callback(new Error(t('documents.parser.validation.start_greater_with_range')))
  }
  else {
    callback()
  }
}
/* FORM */
// STATE

const rules = computed<FormRules<ParserConfig>>(() => ({
  start: [
    { required: true, message: t('form_rules.required'), trigger: 'blur' },
    { validator: validateStartWithRange, trigger: 'change' },
  ],
  end: [
    { required: true, message: t('form_rules.required'), trigger: 'change' },

  ],
  range: [
    { required: true, message: t('form_rules.required'), trigger: 'blur' },

  ],
  /*  filters: [
    { required: true, message: t('form_rules.required'), trigger: 'blur' },

  ], */
}))

const { error: parsePreviewError, status: loadingPreviewParser, execute: executeParserPreview } = await useAsyncData(() => documentStore.POST_ParseDocumentPreview(selectedDocument.value!.id, form), { immediate: false })

const { error: upadteParserConfigError, status: loadingUpdateConfig, execute: executeUpdateParserConfig } = await useAsyncData(() => documentStore.PUT_UpdateDocumentConfig(selectedDocument.value!.id, { parser: form, chunker: selectedDocument.value!.chunkConfig || null }), { immediate: false })

const { error: getSingleDocumentError, execute: executeGetSingleDocument } = await useAsyncData(() => documentStore.GET_SingleDocument(selectedDocument.value!.id), { immediate: false })

errorHandler(getSingleDocumentError)
async function previewDocumentParser() {
  if (selectedDocument.value?.id) {
    await executeParserPreview()
    if (parsePreviewError.value) {
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
    await executeUpdateParserConfig()
    if (upadteParserConfigError.value) {
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
  form.mode.string.start = selectedDocument.value?.parseConfig?.mode.string.start || 0
  form.mode.string.end = selectedDocument.value?.parseConfig?.mode.string.end || 0
  form.mode.string.range = selectedDocument.value?.parseConfig?.mode.string.range || false
  form.mode.string.filters = selectedDocument.value?.parseConfig?.mode.string.filters
    ? [...selectedDocument.value.parseConfig.mode.string.filters]
    : []
  form.includeImages = selectedDocument.value?.parseConfig?.includeImages || false
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
  await formEl.validate((valid, __) => {
    if (valid) {
      previewDocumentParser()
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

const filtersString = ref('')
const addFilter = () => {
  if (filtersString.value && !form.mode.string.filters.includes(filtersString.value)) {
    form.mode.string.filters.push(filtersString.value)
  }
  filtersString.value = ''
}

const removeFilter = (filter: string) => {
  const index = form.mode.string.filters.indexOf(filter)
  if (index !== -1) {
    form.mode.string.filters.splice(index, 1)
  }
}
</script>

<template>
  <div class="edit-parser-config-wrapper">
    <ElForm
      ref="formRef"
      :model="form"
      :rules="rules"
      :scroll-to-error="true"
      :scroll-into-view-options="scrollIntoViewOptions"
    >
      <ElFormItem
        :label="t('documents.parser.form.start')"
        prop="mode.string.start"
      >
        <ElInputNumber
          v-model="form.mode.string.start"
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
        :label="t('documents.parser.form.end')"
        prop="mode.string.end"
      >
        <ElInputNumber v-model="form.mode.string.end" :min="0">
          <template #increase-icon>
            <AddIcon />
          </template>
          <template #decrease-icon>
            <MinusIcon />
          </template>
        </ElInputNumber>
      </ElFormItem>
      <ElFormItem
        :label="t('documents.parser.form.range')"
        prop="mode.string.range"
        class="range-checkbox"
      >
        <!--    <input
            v-model="form.range"
            type="checkbox"
          > -->

        <el-switch v-model="form.mode.string.range" />
      </ElFormItem>
      <div class="range-filters-wrapper">
        <ElFormItem
          :label="t('documents.parser.form.filters')"
          prop="mode.string.filters"
        >
          <ElInput v-model="filtersString" @keyup.enter="addFilter()" />
          <div class="filter-items-wrapper">
            <template v-for="filter in form.mode.string.filters" :key="filter">
              <el-tag size="small">
                <span> {{ filter }}  </span>
                <CloseIcon
                  size="12px"
                  class="delete-filter-icon"
                  @click="removeFilter(filter)"
                />
              </el-tag>
            </template>
          </div>
        </ElFormItem>
      </div>

      <ElFormItem>
        <div class="form-actions">
          <LlmTooltip :content="$t('documents.parser.form.actions.preview_description')">
            <el-button :disabled="loadingPreviewParser === 'pending'" @click="submitForm(formRef)">
              {{ t('documents.parser.form.actions.preview') }} <ParseDocument />
            </el-button>
          </LlmTooltip>
          <LlmTooltip :content="$t('documents.parser.form.actions.save_description')">
            <ElButton
              type="primary"
              :disabled="loadingUpdateConfig === 'pending'"
              @click="submitSaveForm(formRef)"
            >
              <SaveIcon /> {{ t('documents.parser.form.actions.save') }}
            </ElButton>
          </LlmTooltip>
        </div>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
.edit-parser-config-wrapper {
  /*   border-top: 1px solid var(--color-primary-400); */
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  & h6 {
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary-800);
  }

  & .range-filters-wrapper {
    display: flex;
    gap: 32px;

    & .range-checkbox {
      width: fit-content;
    }
  }
}

.filter-items-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding-top: 12px;
  gap: 6px;

  .filter-item {
    display: flex;
    margin-right: 12px;
    align-items: center;
    border: 1px solid var(--color-primary-400);
    color: var(--color-primary-700);
    width: max-content;
    padding: 2px 4px;
    border-radius: 6px;
    font-size: var(--font-size-fluid-2);

    & .delete-filter-icon {
      color: var(--color-primary-600);
      cursor: pointer;
      &:hover {
        opacity: 0.5;
      }
    }
  }
}

.form-actions {
  display: flex;
  gap: 22px;
  width: 100%;
  justify-content: flex-end;
}

.dark {
  & .edit-parser-config-wrapper {
    /*   border-top: 1px solid var(--color-primary-600); */

    & h6 {
      color: var(--color-primary-100);
    }
  }
  & .filter-items-wrapper {
    .filter-item {
      border: 1px solid var(--color-primary-300);
      color: var(--color-primary-300);

      & .delete-filter-icon {
        color: var(--color-primary-400);
      }
    }
  }
}
</style>
