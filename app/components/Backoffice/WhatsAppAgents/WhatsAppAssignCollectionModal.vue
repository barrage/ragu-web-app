<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import AddIcon from '~/assets/icons/svg/add.svg'
import MinusIcon from '~/assets/icons/svg/minus.svg'
import CollectionIcon from '~/assets/icons/svg/folder-icon.svg'
import type { AssignCollectionPayload } from '~/types/collection'
import type { AgentCollection } from '~/types/agent'

// PROPS & EMITS

const props = defineProps<{
  isOpen: boolean
  agentCollections: AgentCollection[] | undefined
}>()
const emits = defineEmits<Emits>()

interface Emits {
  (event: 'closeModal'): void
  (event: 'refreshAgent'): void
}

// CONSTANTS & STATES

const { $api } = useNuxtApp()
const { t } = useI18n()
const route = useRoute()
const agentId = route.params.agentId as string

const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}

const assignCollectionModalVisible = ref(props.isOpen)
const assignCollectionFormRef = ref<FormInstance>()
const assignCollectionForm = reactive({
  provider: 'weaviate',
  collectionName: '',
  amount: 1,
  instruction: '',
})

const payload = computed(() => ({
  add: [
    {
      name: assignCollectionForm.collectionName,
      amount: assignCollectionForm.amount,
      instruction: assignCollectionForm.instruction,
      provider: assignCollectionForm.provider,
    },
  ],
}))

// API CALLS

const { data: allCollections } = await useAsyncData(() => $api.collection.GetAllCollections())

const { execute: putCollection, error } = await useAsyncData(() => $api.whatsApp.BoUpdateAgentCollection(agentId, payload.value), { immediate: false })

// COMPUTEDS

const filteredCollections = computed(() => {
  const existingCollectionNames = new Set(
    (props.agentCollections ?? []).map(collection => collection.collection),
  )

  return allCollections.value?.items.filter((collection) => {
    return (
      !existingCollectionNames.has(collection.name)
    )
  })
})

const rules = computed<FormRules<AssignCollectionPayload>>(() => ({
  collectionName: [{ required: true, message: t('collections.assign_collection.rules.collection_name'), trigger: 'change' }],
  instruction: [{ required: true, message: t('collections.assign_collection.rules.instruction'), trigger: 'blur' }],
  amount: [{ required: true, message: t('collections.assign_collection.rules.amount'), trigger: 'blur' }],
}))

// WATCHERS

watch(() => props.isOpen, (newVal) => {
  assignCollectionModalVisible.value = newVal
})

// FUNCTIONS

const submitAssignCollectionForm = async () => {
  if (!assignCollectionFormRef.value) {
    return
  }

  await assignCollectionFormRef.value.validate(async (valid) => {
    if (valid) {
      await putCollection()
      assignCollectionModalVisible.value = false
      if (error.value) {
        ElNotification({
          title: t('collections.assign_collection.notification.error_title'),
          message: t('collections.assign_collection.notification.assign_error_title'),
          type: 'error',
          customClass: 'error',
          duration: 2500,
        })
      }
      else {
        emits('refreshAgent')
        ElNotification({
          title: t('collections.notifications.delete_title'),
          message: t('collections.assign_collection.notification.assign_cuccess_title'),
          type: 'success',
          customClass: 'success',
          duration: 2500,
        })
      }
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.resetFields()
}
const closeModal = () => {
  assignCollectionModalVisible.value = false
  resetForm(assignCollectionFormRef.value)
  emits('closeModal')
}
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="assignCollectionModalVisible"
      :destroy-on-close="true"
      align-center
      class="barrage-dialog--large"
      :close-icon="CloseCircleIcon"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="closeModal"
    >
      <template #header>
        <div class="edit-user-modal-header">
          <CollectionIcon size="42px" />
          <h5> {{ t('collections.assign_collection.title') }}</h5>
        </div>
      </template>

      <ElForm
        ref="assignCollectionFormRef"
        :model="assignCollectionForm"
        :rules="rules"
        :scroll-to-error="true"
        :scroll-into-view-options="scrollIntoViewOptions"
      >
        <!-- Collection Name Dropdown -->
        <ElFormItem :label="t('collections.assign_collection.labels.name')" prop="collectionName">
          <ElSelect
            v-model="assignCollectionForm.collectionName"
            :placeholder="t('collections.assign_collection.placeholder.select')"
          >
            <ElOption
              v-for="collection in filteredCollections"
              :key="collection.id"
              :label="collection.name"
              :value="collection.name"
            />

            <template #empty>
              <div>
                {{ t('collections.placeholders.empty_collection') || 'No collections available' }}
              </div>
            </template>
          </ElSelect>
        </ElFormItem>
        <el-divider class="is-weak" />
        <!-- Instruction (Text Input) -->
        <ElFormItem :label="t('collections.assign_collection.labels.instructions')" prop="instruction">
          <ElInput
            v-model="assignCollectionForm.instruction"
            type="textarea"
            :placeholder="t('collections.assign_collection.placeholder.instruction')"
          />
        </ElFormItem>
        <el-divider class="is-weak" />
        <!-- Amount (Number Input) -->
        <ElFormItem :label="t('collections.assign_collection.labels.amount')" prop="amount">
          <ElInputNumber
            v-model="assignCollectionForm.amount"
            :min="1"
            :placeholder="t('collections.assign_collection.placeholder.amount')"
          >
            <template #increase-icon>
              <AddIcon />
            </template>
            <template #decrease-icon>
              <MinusIcon />
            </template>
          </ElInputNumber>
        </ElFormItem>
        <div class="response-depth-info-wrapper">
          <LabelDescriptionItem
            size="small"
            :label="t('collections.assign_collection.descriptions.response_depth.low_depth.title')"
            :description="t('collections.assign_collection.descriptions.response_depth.low_depth.description')"
          />
          <LabelDescriptionItem
            size="small"
            :label="t('collections.assign_collection.descriptions.response_depth.moderate_depth.title')"
            :description="t('collections.assign_collection.descriptions.response_depth.moderate_depth.description')"
          />
          <LabelDescriptionItem
            size="small"
            :label="t('collections.assign_collection.descriptions.response_depth.high_depth.title')"
            :description="t('collections.assign_collection.descriptions.response_depth.high_depth.description')"
          />
          <span class="response-depth-note"> {{ t('collections.assign_collection.descriptions.response_depth.note') }}</span>
        </div>
        <el-divider class="is-weak" />
        <!-- Form Actions -->
        <ElFormItem>
          <div class="form-actions">
            <ElButton @click="closeModal">
              {{ t('collections.buttons.cancel') }}
            </ElButton>
            <ElButton type="primary" @click="submitAssignCollectionForm">
              {{ t('collections.assign_collection.title') }}
            </ElButton>
          </div>
        </ElFormItem>
      </ElForm>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.form-actions {
  display: flex;
  gap: 22px;
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;
}

.edit-user-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.response-depth-info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 22px;

  & .response-depth-note {
    font-size: var(--font-size-fluid-2);
  }
}

.barrage-form-item {
  padding-block: 32px;
}
</style>
