<script lang="ts" setup>
import AddCollectionIcon from '~/assets/icons/svg/folder-add.svg'

const emit = defineEmits(['refreshCollections'])
// CONSTANTS
const { t } = useI18n()
const isCreateModalVisible = ref(false)

const openCreateModal = () => {
  isCreateModalVisible.value = true
}

const handleCollectionCreated = () => {
  emit('refreshCollections') // Emit the event to refresh collections
}
</script>

<template>
  <div class="collection-quick-actions-container">
    <ElButton
      type="primary"
      @click="openCreateModal"
    >
      <AddCollectionIcon size="20px" /> {{ t('collections.buttons.create') }}
    </ElButton>
    <CreateCollectionModal
      v-model="isCreateModalVisible"
      @collection-created="handleCollectionCreated"
    />
  </div>
</template>

<style lang="scss" scoped>
.collection-quick-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.5rem;
}
.dark {
  .collection-quick-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
