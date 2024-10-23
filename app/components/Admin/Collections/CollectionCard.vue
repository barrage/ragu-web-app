<script lang="ts" setup>
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import type { Collection } from '~/types/collection'

const props = defineProps<{
  collection: Collection | null
}>()

const emit = defineEmits(['openDeleteModal'])

const { t } = useI18n()

const collectionData = computed(() => {
  return {
    collectionId: props.collection?.id,
    name: props.collection?.name || 'Unknown name',
    updatedAt: props.collection?.updatedAt || 'Unknown date',
    createdAt: props.collection?.createdAt || 'Unknown date',
    model: props.collection?.model || 'Unknown model',
  }
})

const openDeleteModal = () => {
  emit('openDeleteModal', props.collection)
}
</script>

<template>
  <div class="collection-card">
    <LabelDescriptionItem
      :label="t('collections.labels.name')"
      :description="collectionData?.name"
      size="small"
    />

    <LabelDescriptionItem
      :label="t('collections.labels.updated_at')"
      :description="formatDate(collectionData.updatedAt)"
      size="small"
      centered
    />
    <LabelDescriptionItem
      :label="t('collections.labels.created_at')"
      :description="formatDate(collectionData.createdAt)"
      size="small"
      centered
    />
    <LabelDescriptionItem
      :label="t('collections.labels.model')"
      :description="collectionData.model"
      size="small"
      centered
    />

    <div class="action-links">
      <ElButton
        type="danger"
        plain
        @click.stop="openDeleteModal"
      >
        <DeleteIcon />
      </ElButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collection-card {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  border: 0.5px solid var(--color-primary-300);
  background: var(--color-primary-0);
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
  }
}

.dark {
  .collection-card {
    border: 0.5px solid var(--color-primary-500);
    background: var(--color-primary-900);
    box-shadow: 0 0.25rem 0.5rem var(--color-primary-800);
  }
}
</style>
