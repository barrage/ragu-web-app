<!-- DeleteCollectionModal.vue -->
<script lang="ts" setup>
import { ref } from 'vue'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import { useCollectionsStore } from '~/stores/collections'
import type { Collection } from '~/types/collection'

// PROPS & EMITS

const props = defineProps<{
  collection: Collection | null
  visible: boolean
}>()

const emits = defineEmits(['update:visible'])

// CONSTANTS & STATES

const { t } = useI18n()
const collectionStore = useCollectionsStore()
const deleteCollectionModalVisible = ref(props.visible)

// API CALLS

const { execute: getAllCollections } = await useAsyncData(() => collectionStore.GET_AllCollections(), { immediate: false })
const { execute: deleteCollection, error: deleteCollectionError, status } = await useAsyncData(() => collectionStore.DELETE_Collection(props.collection!.id), { immediate: false })

// FUNCTIONS

const closeModal = () => {
  emits('update:visible', false)
}

const confirmDelete = async () => {
  if (!props.collection || !props.collection.id) { return }

  await deleteCollection()
  await getAllCollections()
  deleteCollectionModalVisible.value = false
  if (deleteCollectionError.value) {
    ElNotification({
      title: 'Error',
      message: t('collections.notifications.delete_error'),
      type: 'error',
      duration: 2500,
    })
  }
  else {
    ElNotification({
      title: 'Success',
      message: t('collections.notifications.delete_message'),
      type: 'success',
      customClass: 'success',
      duration: 2500,
    })
  }
}

// WATCHERS

watch(() => props.visible, (newVal) => {
  deleteCollectionModalVisible.value = newVal
})
</script>

<template>
  <ElDialog
    v-model="deleteCollectionModalVisible"
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
