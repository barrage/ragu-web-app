<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'

import CollectionIcon from '~/assets/icons/svg/folder-icon.svg'

// PROPS & EMITS

const props = defineProps<{
  isOpen: boolean
}>()

const emits = defineEmits<Emits>()

interface Emits {
  (event: 'closeModal'): void
}

// CONSTANTS & STATES

const { $api } = useNuxtApp()
const { t } = useI18n()
const route = useRoute()
const agentStore = useAgentStore()
const deleteCollectionModalVisible = ref(props.isOpen)
const deleteCollections = ref([])
const agentId = route.params.agentId as string

// COMPUTEDS

const payload = computed(() => ({
  provider: agentStore.singleAgent?.agent?.vectorProvider,
  remove: deleteCollections.value,
}))

// FUNCTIONS

const closeModal = () => {
  deleteCollectionModalVisible.value = false
  emits('closeModal')
  deleteCollections.value = []
}

// API CALLS

const { execute: deleteCollection, error } = await useAsyncData(() => $api.agent.UpdateAgentCollection(agentId, payload.value), { immediate: false })
const { execute: getAgent } = await useAsyncData(() => agentStore.GET_SingleAgent(agentId), { immediate: false })

// FUNCTIONS

const submitDeleteCollection = async () => {
  await deleteCollection()
  deleteCollectionModalVisible.value = false

  if (error.value) {
    ElNotification({
      title: t('collections.assign_collection.notification.error_title'),
      message: t('collections.notifications.delete_error'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
  }
  else {
    await getAgent()
    ElNotification({
      title: t('collections.notifications.delete_title'),
      message: t('collections.notifications.delete_message'),
      type: 'success',
      customClass: 'success',
      duration: 2500,
    })
    deleteCollections.value = []
  }
}

// WATCHERS

watch(() => props.isOpen, (newVal) => {
  deleteCollectionModalVisible.value = newVal
})
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="deleteCollectionModalVisible"
      destroy-on-close
      align-center
      class="barrage-dialog--small"
      :close-icon="CloseCircleIcon"
      @close="closeModal"
    >
      <template #header>
        <div class="delete-user-modal-header">
          <CollectionIcon size="42px" />
          <h5> {{ $t('collections.deleteModal.title') }}</h5>
        </div>
      </template>
      <div class="delete-user-modal-body">
        <span class="delete-user-description">
          {{ $t('collections.deleteModal.text') }}
        </span>
        <ElSelect
          v-model="deleteCollections"
          :placeholder="t('collections.assign_collection.placeholder.select')"
          multiple
        >
          <ElOption
            v-for="collection in agentStore.singleAgent?.collections"
            :key="collection.id"
            :label="collection.collection"
            :value="collection.collection"
          />
        </ElSelect>
      </div>

      <template #footer>
        <el-button @click="closeModal">
          {{ $t('collections.buttons.cancel') }}
        </el-button>
        <el-button
          type="danger"
          :disabled="deleteCollections.length === 0"
          @click="submitDeleteCollection"
        >
          {{ $t('collections.buttons.delete') }}
        </el-button>
      </template>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.delete-user-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.delete-user-modal-body {
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-bottom: 12px;

  & .delete-user-description {
    color: var(--color-primary-800);
    font-size: var(--font-size-fluid-3);
    line-height: normal;
  }

  & .user-profile-item {
    border: 0.5px solid var(--color-primary-300);
    border-radius: 16px;
    padding: 1rem;
  }
}
.dark {
  .delete-user-description {
    color: var(--color-primary-100);
    font-size: var(--font-size-fluid-3);
    line-height: normal;
  }
}
</style>
