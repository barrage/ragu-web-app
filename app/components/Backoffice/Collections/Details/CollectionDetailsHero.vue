<script lang="ts" setup>
import CollectionIcon from '~/assets/icons/svg/folder-icon.svg'
import type { CollectionResponse } from '~/types/collection'
import DeleteIcon from '~/assets/icons/svg/delete.svg'

const props = defineProps<{
  singleCollection: CollectionResponse | null | undefined
}>()

const emits = defineEmits<{
  (event: 'collectionDeleted'): void

}>()

const { t } = useI18n()

const collectionName = computed(() => {
  return props.singleCollection?.collection?.name || t('collections.collection_card.unknown_collectin_name')
})

/* Delete User */
const selectedCollectionDelete = ref<CollectionResponse | undefined | null>(props.singleCollection)
const deleteCollectionModalVisible = ref(false)

const openCollectionUserModal = () => {
  deleteCollectionModalVisible.value = true
}

const handleCollectionDeleted = () => {
  emits('collectionDeleted')
}
</script>

<template>
  <div class="collection-details-hero-section">
    <div class="profile-avatar-wrapper">
      <CollectionIcon size="112px" />
      <div class="collectionname-status-wrapper">
        <h6 class="collectionname">
          {{ `${collectionName}` }}
        </h6>
      </div>
    </div>
    <div class="collection-details-actions-wrapper">
      <ElButton
        plain
        type="danger"
        size="small"
        disabled
        @click="openCollectionUserModal"
      >
        <DeleteIcon size="20px" />  {{ t('users.user_card.delete_user_title') }}
      </ElButton>
    </div>
  </div>
</template>

<style>
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
.collectionname {
  font-size: var(--font-size-fluid-6);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-900);
}
.dark {
  & .collection-details-custom-label {
    color: var(--color-primary-100);
  }

  & .label,
  .collectionname {
    color: var(--color-primary-0);
  }
  & .description {
    color: var(--color-primary-0);
  }
}
</style>
