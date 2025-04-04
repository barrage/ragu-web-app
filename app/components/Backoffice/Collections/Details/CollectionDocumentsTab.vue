<script lang="ts" setup>
import type { RouteLocationNormalizedGeneric } from 'vue-router'
import type { TransferKey } from 'element-plus'
import DocumentIcon from '~/assets/icons/svg/document.svg'
import NoteIcon from '~/assets/icons/svg/notes.svg'
import type { CollectionResponse } from '~/types/collection'

const props = defineProps<{
  singleCollection: CollectionResponse | null | undefined
}>()

// CONSTATNTS & STATES
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { $api } = useNuxtApp()
const documetStore = useDocumentsStore()
const selectedDocumentIds = ref<string[]>([])
const collectionId = ref(route.params.collectionId as string)
const rightValue = ref<string[]>([])
const hasUnsavedChanges = ref(false)
const showLeaveConfirmation = ref(false)
const nextRoute = ref<RouteLocationNormalizedGeneric | null>(null)

// COMPUTEDS

const transferNoteItems = computed(() => [
  t('collections.transfer.search_hint'),
  t('collections.transfer.move_hint'),
  t('collections.transfer.save_hint'),
])

const payload = ref({
  add: [] as string[],
  collection: route.params.collectionId as string,
  remove: [] as string[],
})

const { error: documentError } = await useAsyncData(() => documetStore.GET_AllDocuments(1, 1000, undefined, undefined, true))

errorHandler(documentError)

const { execute: updateCollection, error: collectionError, status } = await useAsyncData(() => $api.embedding.UpdateCollectionWithDocuments(payload.value), { immediate: false })
const { error, execute: getCollection, data: getSingleCollection } = await useAsyncData(() => $api.collection.GetSingleCollection(collectionId?.value), { immediate: false })

errorHandler(error)

// FUNCTIONS
const handleTransferChange = (newValue: TransferKey[]) => {
  const newValueStrings = newValue.map(String)

  payload.value.add = []
  payload.value.remove = []

  newValueStrings.forEach((id) => {
    if (!selectedDocumentIds.value.includes(id)) {
      payload.value.add.push(id)
    }
  })

  selectedDocumentIds.value.forEach((id) => {
    if (!newValueStrings.includes(id)) {
      payload.value.remove.push(id)
    }
  })

  rightValue.value = newValueStrings
  hasUnsavedChanges.value = true
}

const submitSelection = async () => {
  if (!collectionId.value) {
    console.error('No collection ID found - aborting submission')
    return
  }

  if (!payload.value.add.length && !payload.value.remove.length) {
    console.warn(' No changes detected in payload - aborting submission')
    return
  }

  await updateCollection()

  if (collectionError.value) {
    ElNotification({
      title: t('collections.assign_collection.notification.error_title'),
      message: t('collections.assign_collection.notification.update_error_collection'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
    return
  }

  // Success
  hasUnsavedChanges.value = false
  await getCollection()

  if (getSingleCollection.value?.documents) {
    selectedDocumentIds.value = getSingleCollection.value.documents.map(doc => doc.id)
  }

  ElNotification({
    title: t('collections.notifications.delete_title'),
    message: t('collections.assign_collection.notification.update_collection'),
    type: 'success',
    customClass: 'success',
    duration: 2500,
  })
}

const transformedDocuments = computed(() => {
  const availableDocuments = documetStore.documentResponse?.items || []
  return availableDocuments.map(doc => ({
    key: doc.id,
    label: doc.name,
  }))
})

const handleLeaveConfirmation = (confirm: boolean) => {
  showLeaveConfirmation.value = false
  if (confirm) {
    hasUnsavedChanges.value = false
    if (nextRoute.value) { router.push(nextRoute.value) }
  }
  else {
    nextRoute.value = null
  }
}

// LIFECYCLE HOOKS

onMounted(() => {
  if (props.singleCollection?.documents) {
    rightValue.value = props.singleCollection.documents.map(doc => doc.id)
    selectedDocumentIds.value = props.singleCollection.documents.map(doc => doc.id)
  }
})
</script>

<template>
  <div class="add-documents-container">
    <div class="label">
      <DocumentIcon size="18px" />
      <span>  {{ t('collections.labels.add_document') }}</span>
    </div>
    <Note
      :title="t('collections.transfer.title')"
      :items="transferNoteItems"
      :icon="NoteIcon"
    />

    <el-transfer
      v-model="rightValue"
      :titles="[t('documents.title'), t('collections.single_collection')]"
      filterable
      :filter-placeholder="t('documents.document_search')"
      :data="transformedDocuments"
      @change="handleTransferChange"
    >
      <template #right-footer>
        <el-button
          type="primary"
          style="margin-top: 16px;"
          :disabled="status === 'pending'"
          @click="submitSelection"
        >
          <template v-if="status === 'pending'">
            <LlmLoader />
          </template>
          <template v-else>
            {{ t('users.form.submit') }}
          </template>
        </el-button>
      </template>
    </el-transfer>

    <CollectionSearch
      :assigned-documents="getSingleCollection?.documents || singleCollection?.documents"
      :collection-id="collectionId"
    />

    <ConformationModal
      :is-visible="showLeaveConfirmation"
      :title="t('unsaved_changes.title')"
      :message="t('unsaved_changes.description')"
      :confirm-button-text="t('unsaved_changes.confirmButtonText')"
      :cancel-button-text="t('unsaved_changes.cancelButtonText')"
      @confirm="handleLeaveConfirmation(true)"
      @cancel="handleLeaveConfirmation(false)"
    />
  </div>
</template>

<style lang="scss" scoped>
.add-documents-container {
  margin-top: 1.5rem;
  .label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-primary-900);
    font-size: var(--font-size-fluid-3);
  }

  .barrage-transfer {
    border: 0;
    margin-top: 1.5rem;
    width: 100%;
    margin-bottom: 4rem;

    &:deep(.barrage-transfer-panel) {
      flex: 1;
    }
  }
}
.dark {
  & .collection-details-custom-label {
    color: var(--color-primary-100);
  }

  & .label,
  .collectionname {
    color: var(--color-primary-100);
  }
  & .description {
    color: var(--color-primary-0);
  }
}
</style>
