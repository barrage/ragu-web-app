<script lang="ts" setup>
import CollectionIcon from '~/assets/icons/svg/folder-icon.svg'
import PersonClockIcon from '~/assets/icons/svg/person-clock.svg'
import PersonCalendarIcon from '~/assets/icons/svg/person-calendar.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import DocumentIcon from '~/assets/icons/svg/document.svg'
import type { CollectionResponse } from '~/types/collection'

const props = defineProps<{
  singleCollection: CollectionResponse | null | undefined
}>()

const route = useRoute()
const { t } = useI18n()
const documetStore = useDocumentsStore()
const collectionStore = useCollectionsStore()
const selectedDocumentIds = ref<string[]>([])
const collectionId = ref(route.params.collectionId as string)
const rightValue = ref<string[]>([])

const payload = computed(() => {
  const add = rightValue.value.filter(id => !selectedDocumentIds.value.includes(id))
  const remove = selectedDocumentIds.value.filter(id => !rightValue.value.includes(id))

  return {
    add,
    collection: collectionId.value,
    remove,
  }
})
const { error: documentError } = await useAsyncData(() => documetStore.GET_AllDocuments(undefined, undefined, undefined, undefined, true))

errorHandler(documentError)

const { execute: updateCollection, error: collectionError, status } = await useAsyncData(() => collectionStore.POST_UpdateCollection(payload.value), { immediate: false })
const { error, execute: getCollection } = await useAsyncData(() => collectionStore.GET_SingleCollection(collectionId?.value), { immediate: false })

errorHandler(error)

const handleTransferChange = (newValue: string[]) => {
  const addedDocs = newValue.filter(id => !rightValue.value.includes(id))
  const removedDocs = rightValue.value.filter(id => !newValue.includes(id))

  addedDocs.forEach((id) => {
    if (!payload.value.remove.includes(id)) { payload.value.add.push(id) }
    payload.value.remove = payload.value.remove.filter(removeId => removeId !== id)
  })

  removedDocs.forEach((id) => {
    if (!payload.value.add.includes(id)) { payload.value.remove.push(id) }
    payload.value.add = payload.value.add.filter(addId => addId !== id)
  })

  rightValue.value = newValue
}

const transformedDocuments = computed(() => {
  const availableDocuments = documetStore.documentResponse?.items || []
  return availableDocuments.map(doc => ({
    key: doc.id,
    label: doc.name,
  }))
})

const submitSelection = async () => {
  if (!collectionId.value) { return }

  const existingDocIds = props.singleCollection?.documents.map(doc => doc.id) || []
  payload.value.add = payload.value.add.filter(id => !existingDocIds.includes(id))

  if (!payload.value.add.length && !payload.value.remove.length) { return }
  await updateCollection()

  if (collectionError.value) {
    ElNotification({
      title: t('collections.assign_collection.notification.error_title'),
      message: t('collections.assign_collection.notification.update_error_collection'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
  }
  else {
    ElNotification({
      title: t('collections.notifications.delete_title'),
      message: t('collections.assign_collection.notification.update_collection'),
      type: 'success',
      customClass: 'success',
      duration: 2500,
    })

    await getCollection()
  }
}

const collectionData = computed(() => {
  return {
    id: props.singleCollection?.collection?.id || t('collections.collection_card.unknown_id'),
    name: props.singleCollection?.collection?.name || t('collections.collection_card.unknown_collectin_name'),
    provider: props.singleCollection?.collection?.provider || t('collections.collection_card.unknown_llmProvider'),
    embedder: props.singleCollection?.collection?.embedder || t('collections.collection_card.unknown_llmProvider'),
    model: props.singleCollection?.collection?.model || t('collections.collection_card.unknown_model'),
    updatedAt: props.singleCollection?.collection?.updatedAt ? formatDate(props.singleCollection?.collection.updatedAt, 'MMMM DD, YYYY') : t('collections.collection_card.unknown_date'),
    createdAt: props.singleCollection?.collection?.createdAt ? formatDate(props.singleCollection?.collection.createdAt, 'MMMM DD, YYYY') : t('collections.collection_card.unknown_date'),
  }
})

onMounted(() => {
  if (props.singleCollection?.documents) {
    rightValue.value = props.singleCollection.documents.map(doc => doc.id)
    selectedDocumentIds.value = props.singleCollection.documents.map(doc => doc.id)
  }
})
</script>

<template>
  <div class="collection-details-hero-section">
    <div class="profile-avatar-wrapper">
      <CollectionIcon size="80px" />
      <div class="collectionname-status-wrapper">
        <h6 class="collectionname">
          {{ `${collectionData.name}` }}
        </h6>
      </div>
    </div>
    <div class="collection-details-actions-wrapper" />
  </div>
  <div class="collection-informations-section">
    <LabelDescriptionItem
      :label="t('collections.labels.id')"
      :description="collectionData.id"
      horizontal
    >
      <template #customLabel>
        <div class="collection-details-custom-label">
          <PersonInfoIcon size="18px" />
          <span>  {{ t('collections.labels.id') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('collections.labels.name')"
      :description="collectionData.name"
      horizontal
    >
      <template #customLabel>
        <div class="collection-details-custom-label">
          <PersonInfoIcon size="18px" />
          <span>  {{ t('collections.labels.name') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>

    <LabelDescriptionItem
      :label=" t('collections.labels.provider')"
      :description="collectionData.provider"
      horizontal
    >
      <template #customLabel>
        <div class="collection-details-custom-label">
          <BrainIcon size="18px" />
          <span>  {{ t('collections.labels.provider') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>

    <LabelDescriptionItem
      :label="t('collections.labels.embedder')"
      :description="collectionData.embedder"
      horizontal
    >
      <template #customLabel>
        <div class="collection-details-custom-label">
          <BrainIcon size="18px" />
          <span>  {{ t('collections.labels.embedder') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('collections.labels.model')"
      :description="collectionData.model"
      horizontal
    >
      <template #customLabel>
        <div class="collection-details-custom-label">
          <BrainIcon size="18px" />
          <span>  {{ t('collections.labels.model') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('collections.labels.created_at') "
      :description="collectionData.createdAt"
      horizontal
    >
      <template #customLabel>
        <div class="collection-details-custom-label">
          <PersonCalendarIcon size="18px" />
          <span>  {{ t('collections.labels.created_at') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('collections.labels.updated_at')"
      :description="collectionData.updatedAt"
      horizontal
    >
      <template #customLabel>
        <div class="collection-details-custom-label">
          <PersonClockIcon size="18px" />
          <span>  {{ t('collections.labels.updated_at') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
  </div>
  <div class="add-documents-container">
    <div class="label">
      <DocumentIcon size="18px" />
      <span>  {{ t('collections.labels.add_document') }}</span>
    </div>
    <el-transfer
      v-model="rightValue"
      :titles="['Documents', 'Collection']"
      filterable
      filter-placeholder="Search for documents..."
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
          Submit
        </el-button>
      </template>
    </el-transfer>
  </div>
</template>

<style lang="scss" scoped>
.collection-details-hero-section {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  padding-block: 1rem;

  & .profile-avatar-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-start;
    margin-right: 1rem;
    text-overflow: ellipsis;
  }

  & .collection-details-actions-wrapper {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
}

.collection-informations-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  padding-block: 2rem;
  row-gap: 1.5rem;
  border-top: 1px solid var(--color-primary-300);
  border-bottom: 1px solid var(--color-primary-300);

  :deep(.description) {
    font-size: var(--font-size-fluid-2);
  }
}

.collection-details-custom-label {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 calc(30% - 0.5rem);
  color: var(--color-primary-900);
  font-size: var(--font-size-fluid-3);

  svg {
    flex-shrink: 0;
  }
}

.context-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & .label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--font-size-fluid-3);
    line-height: normal;
    color: var(--color-primary-900);
  }
  & .description {
    line-height: normal;
    color: var(--color-primary-800);
    font-size: var(--font-size-fluid-2);
    padding-left: 1.675rem;
  }
}

.collectionname {
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-900);
}

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
