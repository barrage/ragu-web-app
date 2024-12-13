<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import DeletePersonIcon from '~/assets/icons/svg/delete-person.svg'
import type { SingleWhatsAppAgentResponse } from '~/types/whatsapp'

defineProps<{
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
const deleteCollections = ref<string[]>([])
const agentId = route.params.agentId as string
const collectionStore = useCollectionsStore()

const payload = computed(() => ({
  remove: deleteCollections.value.map(collectionName => ({
    name: collectionName,
    provider: 'weaviate',
  })),
}))

// API CALLS

const { execute: deleteCollection, error: deleteCollectionError } = await useAsyncData(() => $api.whatsApp.BoUpdateAgentCollection(agentId, payload.value), { immediate: false })
const { execute: getAllCollections } = await useAsyncData(() => collectionStore.GET_AllCollections(), { immediate: false })

// FUNCTIONS

async function submitDeleteCollection() {
  await deleteCollection()
  await getAllCollections()
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
    emits('refreshAgent')
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
      :close-icon="CloseCircleIcon"
      :close-on-click-modal="false"
    >
      <template #header>
        <div class="delete-user-modal-header">
          <DeletePersonIcon size="42px" />
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
            v-for="collection in singleAgent?.collections"
            :key="collection.id"
            :label="collection.collection"
            :value="collection.collection"
          />
        </ElSelect>
      </div>

      <template #footer>
        <ElButton @click="isOpen = false">
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
