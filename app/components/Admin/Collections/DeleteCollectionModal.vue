<!-- DeleteCollectionModal.vue -->
<script lang="ts" setup>
import { ref } from 'vue'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import { useCollectionsStore } from '~/stores/collections'
import type { Collection } from '~/types/collection'

const props = defineProps<{
  collection: Collection | null
  visible: boolean
}>()

const emits = defineEmits(['update:visible'])
const { t } = useI18n()
const collectionStore = useCollectionsStore()
const deleteStatus = ref('')
const deleteCollectionModalVisible = ref(props.visible)

watch(() => props.visible, (newVal) => {
  deleteCollectionModalVisible.value = newVal
})

const closeModal = () => {
  emits('update:visible', false)
}

const { execute } = await useAsyncData(() => collectionStore.GET_AllCollections(), { immediate: false })

const confirmDelete = async () => {
  if (!props.collection || !props.collection.id) { return }

  try {
    deleteStatus.value = 'pending'
    await collectionStore.DELETE_Collection(props.collection.id)
    await execute()
    deleteCollectionModalVisible.value = false
    ElNotification({
      title: 'Success',
      message: t('collections.notifications.delete_message'),
      type: 'success',
      customClass: 'success',
      duration: 2500,
    })
  }
  catch {
    ElNotification({
      title: 'Error',
      message: t('collections.notifications.delete_error'),
      type: 'error',
      duration: 2500,
    })
  }
  finally {
    deleteStatus.value = ''
  }
}
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
        :loading="deleteStatus === 'pending'"
        @click="confirmDelete"
      >
        {{ t('collections.buttons.delete') }}
      </el-button>
    </template>
  </ElDialog>
</template>
