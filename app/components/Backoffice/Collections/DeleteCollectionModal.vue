<!-- DeleteCollectionModal.vue -->
<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { Collection } from '~/types/collection'

// PROPS & EMITS

const props = defineProps<{
  collection: Collection | null
}>()

const emits = defineEmits<Emits>()

interface Emits {
  (event: 'collectionDeleted'): void
}

// CONSTANTS & STATES

const { t } = useI18n()
const { $api } = useNuxtApp()
const isOpen = defineModel<boolean>()

// API CALLS

const { execute: deleteCollection, error: deleteCollectionError, status } = await useAsyncData(() => $api.collection.DeleteCollection(props.collection!.id), { immediate: false })
const { execute: deleteCollectionFromALlAgents, error: deleteCollectionAllError } = await useAsyncData(() => $api.agent.DeleteCollectionFromAllAgents(props.collection!.name, props.collection!.provider), { immediate: false })

errorHandler(deleteCollectionAllError)

// FUNCTIONS

const closeModal = () => {
  isOpen.value = false
}

const confirmDelete = async () => {
  if (!props.collection || !props.collection.id) { return }

  await deleteCollection()
  await deleteCollectionFromALlAgents()

  if (deleteCollectionError.value) {
    ElNotification({
      title: 'Error',
      message: t('collections.notifications.delete_error'),
      type: 'error',
      duration: 2500,
    })
  }
  else {
    emits('collectionDeleted')
    closeModal()
    ElNotification({
      title: 'Success',
      message: t('collections.notifications.delete_message'),
      type: 'success',
      customClass: 'success',
      duration: 2500,
    })
  }
}
</script>

<template>
  <ElDialog
    v-model="isOpen"
    destroy-on-close
    align-center
    class="barrage-dialog--small"
    :close-icon="CloseCircleIcon"
    @close="closeModal"
  >
    <template #header>
      <h5>{{ t('collections.deleteModal.title') }}</h5>
    </template>
    <p>{{ t('collections.deleteModal.text') }}</p>
    <template #footer>
      <el-button @click="closeModal">
        {{ t('collections.buttons.cancel') }}
      </el-button>
      <el-button
        type="danger"
        :disabled="status === 'pending'"
        @click="confirmDelete"
      >
        {{ t('collections.buttons.delete') }}
      </el-button>
    </template>
  </ElDialog>
</template>
