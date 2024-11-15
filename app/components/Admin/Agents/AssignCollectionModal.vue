<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import AddIcon from '~/assets/icons/svg/add.svg'
import MinusIcon from '~/assets/icons/svg/minus.svg'
import CollectionIcon from '~/assets/icons/svg/folder-icon.svg'
import type { AssignCollectionPayload } from '~/types/collection'

const props = defineProps<{
  isOpen: boolean
}>()

const emits = defineEmits<Emits>()
const collectionStore = useCollectionsStore()
const agentStore = useAgentStore()

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
  provider: agentStore.singleAgent?.agent?.vectorProvider,
  collectionName: '',
  amount: 1,
  instruction: '',
})

const payload = computed(() => ({
  provider: assignCollectionForm.provider,
  add: [
    {
      name: assignCollectionForm.collectionName,
      amount: assignCollectionForm.amount,
      instruction: assignCollectionForm.instruction,
    },
  ],
}))

const filteredCollections = computed(() => {
  const vectorProvider = agentStore.singleAgent?.agent?.vectorProvider
  let embeddingProvider = agentStore.singleAgent?.agent?.embeddingProvider
  const embeddingModel = agentStore.singleAgent?.agent?.embeddingModel

  if (embeddingProvider === 'azure') {
    embeddingProvider = 'openai'
  }

  const existingCollectionNames = new Set(
    [...agentStore.singleAgent?.collections].map(entry => entry.collection),
  )

  return collectionStore.collections.filter((collection) => {
    return (
      collection.provider === vectorProvider
      && collection.embedder === embeddingProvider
      && collection.model === embeddingModel
      && !existingCollectionNames.has(collection.name)
    )
  })
})

watch(() => props.isOpen, (newVal) => {
  assignCollectionModalVisible.value = newVal
})

interface Emits {
  (event: 'closeModal'): void
}

const rules = computed<FormRules<AssignCollectionPayload>>(() => ({
  collectionName: [{ required: true, message: t('collections.assign_collection.rules.collection_name'), trigger: 'change' }],
  instruction: [{ required: true, message: t('collections.assign_collection.rules.instruction'), trigger: 'blur' }],
  amount: [{ required: true, message: t('collections.assign_collection.rules.amount'), trigger: 'blur' }],
}
))

await useAsyncData(() => collectionStore.GET_AllCollections())

const { execute: putCollection, error } = await useAsyncData(() => agentStore.PUT_UpdateAgentCollection(agentId, payload.value), { immediate: false })

const { execute: getAgent } = await useAsyncData(() => agentStore.GET_SingleAgent(agentId), { immediate: false })

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
        await getAgent()
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
      class="barrage-dialog--small"
      :close-icon="CloseCircleIcon"
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
          </ElSelect>
        </ElFormItem>

        <!-- Instruction (Text Input) -->
        <ElFormItem :label="t('collections.assign_collection.labels.instructions')" prop="instruction">
          <ElInput v-model="assignCollectionForm.instruction" :placeholder="t('collections.assign_collection.placeholder.instruction')" />
        </ElFormItem>

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
</style>
