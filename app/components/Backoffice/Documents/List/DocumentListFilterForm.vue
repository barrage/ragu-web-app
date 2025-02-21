<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { DocumentListFilterForm } from '~/types/document'

const props = defineProps<{
  filter: DocumentListFilterForm
}>()

const emits = defineEmits<Emits>()
interface Emits {
  (event: 'filterApplied', filter: DocumentListFilterForm): void
}

const { t } = useI18n()

const documentsFilterFormRef = ref<FormInstance>()
const documentsFilterForm = reactive<DocumentListFilterForm>({
  ready: undefined,
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.resetFields()
}

const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}

const prefillDocumentsFilter = () => {
  documentsFilterForm.ready = props.filter?.ready
}

onMounted(() => {
  prefillDocumentsFilter()
})

const rules = computed<FormRules<DocumentListFilterForm>>(() => ({
  ready: [
    /* { required: true, message: t(''), trigger: 'blur' }, */
  ],
}))

const documentStatuses = computed(() => [
  {
    id: 1,
    label: t('documents.status.ready'),
    value: true,
  },
  {
    id: 2,
    label: t('documents.status.not_ready'),
    value: false,
  },
])

const submitDocumentFilterForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  emits('filterApplied', documentsFilterForm)
}
</script>

<template>
  <div>
    <ElForm
      ref="documentsFilterFormRef"
      :model="documentsFilterForm"
      data-testid="bo-documents-list-filter-form"
      :rules="rules"
      :scroll-to-error="true"
      :scroll-into-view-options="scrollIntoViewOptions"
    >
      <div class="document-list-filter-form-items-wrapper">
        <ElFormItem
          :label="t('documents.labels.status')"
          prop="ready"
        >
          <ElSelect
            v-model="documentsFilterForm.ready"
            :placeholder="t('documents.placeholder.filter_by_status')"
            clearable
            data-testid="bo-documents-list-filter-form-status-select"
          >
            <ElOption
              v-for="status in documentStatuses"
              :key="status.id"
              :label="status.label"
              :value="status.value"
              data-testid="bo-documents-list-filter-form-status-option"
            />
          </ElSelect>
        </ElFormItem>

        <ElFormItem>
          <div class="form-actions">
            <ElButton
              size="small"
              data-testid="bo-document-list-filter-form-reset-button"
              plain
              @click="resetForm(documentsFilterFormRef)"
            >
              {{ t('documents.form.reset') }}
            </ElButton>

            <ElButton
              type="primary"
              size="small"
              data-testid="bo-document-list-filter-form-confirm-button"
              @click="submitDocumentFilterForm(documentsFilterFormRef)"
            >
              {{ t('documents.form.confirm') }}
            </ElButton>
          </div>
        </ElFormItem>
      </div>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
.document-list-filter-form-items-wrapper {
  padding: 1rem;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
</style>
