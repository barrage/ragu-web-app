<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import CollectionIcon from '~/assets/icons/svg/folder-icon.svg'
import type { AgentCollection } from '~/types/agent'

interface Emits {
  (event: 'refreshWhatsAppAgent'): void
}

defineProps<{ agentCollections: AgentCollection[] | undefined }>()
const emits = defineEmits<Emits>()
const isOpen = defineModel<boolean>()

// CONSTANTS & STATES

const { $api } = useNuxtApp()
const { t } = useI18n()
const route = useRoute()
const deleteCollections = ref<string[]>([])
const agentId = route.params.agentId as string

const payload = computed(() => ({
  remove: deleteCollections.value.map(collectionName => ({
    name: collectionName,
    provider: 'weaviate',
  })),
}))

// API CALLS

const { execute: deleteCollection, error: deleteCollectionError } = await useAsyncData(() => $api.whatsApp.BoUpdateAgentCollection(agentId, payload.value), { immediate: false })

// FUNCTIONS

const closeModal = () => {
  isOpen.value = false
  deleteCollections.value = []
}

const submitDeleteCollection = async () => {
  await deleteCollection()

  isOpen.value = false

  if (deleteCollectionError.value) {
    ElNotification({
      title: t('collections.assign_collection.notification.error_title'),
      message: t('collections.notifications.delete_error'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
  }
  else {
    emits('refreshWhatsAppAgent')
    ElNotification({
      title: t('collections.notifications.delete_title'),
      message: t('collections.notifications.delete_message'),
      type: 'success',
      customClass: 'success',
      duration: 2500,
    })
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
      :close-on-click-modal="false"
      :close-on-press-escape="false"
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
          filterable
        >
          <ElOption
            v-for="collection in agentCollections"
            :key="collection.id"
            :label="collection.collection ?? ''"
            :value="collection.collection ?? ''"
          />
        </ElSelect>
      </div>

      <template #footer>
        <ElButton @click="closeModal">
          {{ $t('collections.buttons.cancel') }}
        </ElButton>
        <ElButton
          type="danger"
          :disabled="!deleteCollections.length"
          @click="submitDeleteCollection"
        >
          {{ $t('collections.buttons.delete') }}
        </ElButton>
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
