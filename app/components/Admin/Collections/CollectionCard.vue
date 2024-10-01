<script lang="ts" setup>
// IMPORTS
import type { Agent } from '~/types/agent'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import { useAgentStore } from '~/stores/agents'
import type { Collection } from '~/types/collection'
import DeleteIcon from '~/assets/icons/svg/delete.svg'

// PROPS
const props = defineProps<{
  collection: Collection | null
}>()

// CONSTANTS

const { t } = useI18n()
const collectionStore = useCollectionsStore()

// STATE

const collectionToDeleteId = ref<string>('')
const isDeleteModalVisible = ref(false)

// API CALLS
const { error: deleteError, status: deleteStatus } = await useAsyncData(() => collectionStore.DELETE_Collection(collectionToDeleteId.value as string), {

  immediate: false,
})

// HELPERS
const collectionData = computed(() => {
  return {
    collectionId: props.collection?.id,
    name: props.collection?.name || 'Unknown name',
    updatedAt: props.collection?.updatedAt || 'Unknown date',
    createdAt: props.collection?.createdAt || 'Unknown date',
    model: props.collection?.model || 'Unknown model',
  }
})

const confirmDelete = async (collection: Collection | null | undefined): Promise<void> => {
  if (!collection || !collection.id) {
    ElNotification({
      title: 'Error',
      message: t('collections.notifications.invalid_collection'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
    return
  }

  try {
    await collectionStore.DELETE_Collection(collection.id)

    ElNotification({
      title: t('collections.notifications.delete_title'),
      message: t('collections.notifications.delete_message', { name: collection.name }),
      type: 'success',
      customClass: 'success',
      duration: 2500,
    })
    await collectionStore.GET_AllCollections()
    isDeleteModalVisible.value = false
  }
  catch {
    ElNotification({
      title: 'Error',
      message: t('collections.notifications.delete_error'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
  }
}

const openDeleteAgentModal = () => {
  isDeleteModalVisible.value = true
}

// ERROR HANDLERS
errorHandler(deleteError)
</script>

<template>
  <div class="collection-card">
    <LabelDescriptionItem
      label="Collection Name"
      :description="collectionData?.name"
    />

    <LabelDescriptionItem
      label="Updated at"
      :description="formatDate(collectionData.updatedAt)"
      centered
    />
    <LabelDescriptionItem
      label="Created at"
      :description="formatDate(collectionData.createdAt)"
      centered
    />
    <LabelDescriptionItem
      label="Model"
      :description="collectionData.model"
      centered
    />

    <div class="action-links">
      <ElButton
        type="primary"
        @click.stop
        @click=" openDeleteAgentModal"
      >
        <DeleteIcon />
      </ElButton>
    </div>
  </div>
  <ElDialog
    v-model="isDeleteModalVisible"
    align-center
    class="barrage-dialog--small"
    :close-icon="CloseCircleIcon"
  >
    <template #header>
      <h5>  {{ t('collections.titles.deleteTitle') }} </h5>
    </template>
    <p> {{ t('collections.titles.deleteDescription') }}</p>
    <template #footer>
      <el-button @click="isDeleteModalVisible = false">
        {{ t('collections.buttons.cancel') }}
      </el-button>
      <el-button
        type="primary"
        :loading="deleteStatus === 'pending'"
        @click.stop="confirmDelete(collection)"
      >
        {{ t('collections.buttons.delete') }}
      </el-button>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.collection-card {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  border: 0.5px solid var(--color-primary-300);
  background: var(--color-primary-100);
  box-shadow: 0 0.2rem 0.3rem var(--color-primary-200);
  border-radius: 16px;
  padding: 1rem;
}

.action-links {
  display: flex;
  align-items: center;
  justify-content: end;

  button {
    font-size: var(--font-size-fluid-3);
    color: var(--color-primary-700);
  }
}

.dark {
  .collection-card {
    border: 0.5px solid var(--color-primary-500);
    background: var(--color-primary-800);
    box-shadow: 0 0.25rem 0.5rem var(--color-primary-800);
  }

  .action-links {
    button {
      color: var(--color-primary-100);
    }
  }
}
</style>
