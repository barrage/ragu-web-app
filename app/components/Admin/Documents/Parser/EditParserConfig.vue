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

const formRef = ref<FormInstance>()
const form = reactive<ParserConfig>({
  start: 0,
  end: 0,
  range: false,
  filters: [],
})
const validateStartWithRange = (_rule: any, value: any, callback: any) => {
  if (form.range && form.start === 0) {
    callback(new Error('Start cannot be 0 when using range'))
  }
  else if (form.range && form.start > form.end) {
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
    { required: true, message: 'Required', trigger: 'blur' },
    { validator: validateStartWithRange, trigger: 'change' },
  ],
  end: [
    { required: true, message: 'Required', trigger: 'change' },

  ],
  range: [
    { required: true, message: 'Required', trigger: 'blur' },

  ],
  filters: [
    { required: true, message: 'Required', trigger: 'blur' },

  ],
})

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
  form.filters = selectedDocument.value?.parseConfig?.filters
    ? [...selectedDocument.value.parseConfig.filters]
    : []
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
const filtersString = ref('')
const addFilter = () => {
  if (!form.filters.includes(filtersString.value)) {
    form.filters.push(filtersString.value)
  }

  filtersString.value = ''
}

const removeFilter = (filter: string) => {
  const index = form.filters.indexOf(filter)
  if (index !== -1) {
    form.filters.splice(index, 1)
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
        <!--    <input
            v-model="form.range"
            type="checkbox"
          > -->

        <el-switch v-model="form.range" />
      </ElFormItem>
      <div class="range-filters-wrapper">
        <ElFormItem
          label="Filters"
          prop="end"
        >
          <ElInput v-model="filtersString" @keyup.enter="addFilter()" />
          <div class="filter-items-wrapper">
            <template v-for="filter in form.filters" :key="filter">
              <el-tag size="small">
                <span> {{ filter }}  </span>
                <CloseIcon
                  size="12"
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
  /*   border-top: 1px solid var(--color-primary-400); */
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  & h6 {
    font-weight: var(--font-weight-bold);
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
