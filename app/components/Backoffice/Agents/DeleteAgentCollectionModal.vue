<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'

import CollectionIcon from '~/assets/icons/svg/folder-icon.svg'
import type { AgentCollection } from '~/types/agent'

// PROPS & EMITS

defineProps<{

  agentCollections: AgentCollection[] | undefined
}>()

const emits = defineEmits<Emits>()

interface Emits {
  (event: 'closeModal'): void
  (event: 'collectionDeleted'): void
}

// CONSTANTS & STATES

const { $api } = useNuxtApp()
const { t } = useI18n()
const route = useRoute()
const isOpen = defineModel<boolean>()
const deleteCollections = ref<string[]>([])
const agentId = route.params.agentId as string

// COMPUTEDS

const payload = computed(() => ({
  remove: deleteCollections.value.map(collectionName => ({
    name: collectionName,
    provider: 'weaviate',
  })),
}))

// FUNCTIONS

const closeModal = () => {
  isOpen.value = false
  deleteCollections.value = []
}

// API CALLS

const { execute: deleteCollection, error, status: deleteCollectionStatus } = await useAsyncData(() => $api.agent.UpdateAgentCollection(agentId, payload.value), { immediate: false })

// FUNCTIONS

const submitDeleteCollection = async () => {
  await deleteCollection()

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
    emits('collectionDeleted')
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
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="isOpen"
      destroy-on-close
      align-center
      class="barrage-dialog--small"
     :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
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
            v-for="collection in agentCollections"
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
          :disabled="deleteCollections.length === 0 || deleteCollectionStatus === 'pending'"
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
