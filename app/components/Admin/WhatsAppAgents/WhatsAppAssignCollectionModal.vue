<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import AddIcon from '~/assets/icons/svg/add.svg'
import MinusIcon from '~/assets/icons/svg/minus.svg'
import CollectionIcon from '~/assets/icons/svg/folder-icon.svg'
import type { AssignCollectionPayload } from '~/types/collection'
import type { SingleWhatsAppAgentResponse } from '~/types/whatsapp'

const props = defineProps<{
  singleAgent: SingleWhatsAppAgentResponse | null | undefined
}>()
const emits = defineEmits<{
  (event: 'refreshAgent'): void
}>()
const isOpen = defineModel<boolean>()

// CONSTANTS & STATES

const { $api } = useNuxtApp()
const { t } = useI18n()
const route = useRoute()
const collectionStore = useCollectionsStore()
const agentId = route.params.agentId as string
const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}

// FORM

const assignCollectionFormRef = ref<FormInstance>()
const assignCollectionForm = reactive({
  provider: 'weaviate',
  collectionName: '',
  amount: 1,
  instruction: '',
})
const rules = computed<FormRules<AssignCollectionPayload>>(() => ({
  collectionName: [{ required: true, message: t('collections.assign_collection.rules.collection_name'), trigger: 'change' }],
  instruction: [{ required: true, message: t('collections.assign_collection.rules.instruction'), trigger: 'blur' }],
  amount: [{ required: true, message: t('collections.assign_collection.rules.amount'), trigger: 'blur' }],
}))

// API CALLS

await useAsyncData(() => $api.collection.GetAllCollections())
const { execute: putCollection, error: putCollectionError } = await useAsyncData(() => $api.whatsApp.BoUpdateAgentCollection(agentId, getPayload()), { immediate: false })

// FUNCTIONS

const filteredCollections = computed(() => {
  const existingCollectionNames = new Set([...(props.singleAgent?.collections || [])].map(collection => collection.collection))

  return collectionStore.collections.filter((collection) => {
    return (
      !existingCollectionNames.has(collection.name)
    )
  })
})

function getPayload() {
  return {
    add: [
      {
        name: assignCollectionForm.collectionName,
        amount: assignCollectionForm.amount,
        instruction: assignCollectionForm.instruction,
        provider: assignCollectionForm.provider,
      },
    ],
  }
}

async function submitAssignCollectionForm(formEl: FormInstance | undefined) {
  if (!formEl) { return }

  await formEl.validate(async (valid) => {
    if (valid) {
      await putCollection()
      isOpen.value = false
      if (putCollectionError.value) {
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

function resetForm(formEl: FormInstance | undefined) {
  if (!formEl) { return }
  formEl.resetFields()
}

function closeModal(formEl: FormInstance | undefined) {
  isOpen.value = false
  resetForm(formEl)
}
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="isOpen"
      :destroy-on-close="true"
      align-center
      class="barrage-dialog--small"
      :close-icon="CloseCircleIcon"
      :close-on-click-modal="false"
      @close="closeModal(assignCollectionFormRef)"
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

        <ElFormItem :label="t('collections.assign_collection.labels.instructions')" prop="instruction">
          <ElInput v-model="assignCollectionForm.instruction" :placeholder="t('collections.assign_collection.placeholder.instruction')" />
        </ElFormItem>

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

        <ElFormItem>
          <div class="form-actions">
            <ElButton @click="closeModal(assignCollectionFormRef)">
              {{ t('collections.buttons.cancel') }}
            </ElButton>
            <ElButton type="primary" @click="submitAssignCollectionForm(assignCollectionFormRef)">
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
