<script lang="ts" setup>
import CollectionIcon from '~/assets/icons/svg/folder-add.svg'
import OpenFolderIcon from '~/assets/icons/svg/open-folder.svg'

const { t } = useI18n()
const assignCollectionModalVisible = ref(false)
const openAssignCollectionModal = () => {
  assignCollectionModalVisible.value = true
}

const closeAssignCollectionModal = () => {
  assignCollectionModalVisible.value = false
}
</script>

<template>
  <div class="user-details-empty-state">
    <div class="empty-state-content">
      <OpenFolderIcon size="44px" />
      <p><b>No Collections Assigned</b></p>
      <span>
        This agent currently doesn’t have any collections associated with them.
      </span>
      <el-button @click="openAssignCollectionModal()">
        <CollectionIcon /> {{ t('collections.assign_collection.title') }}
      </el-button>
    </div>
  </div>
  <AssignCollectionModal
    :is-open="assignCollectionModalVisible"
    @close-modal="closeAssignCollectionModal"
  />
</template>

<style lang="scss" scoped>
.user-details-empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 300px;
  padding: var(--spacing-fluid-4-md);
  text-align: center;
}

.empty-state-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-state-content p {
  font-size: var(--font-size-fluid-4);
  color: var(--color-primary-900);
}

.empty-state-content span {
  font-size: var(--font-size-fluid-3);
  color: var(--color-primary-600);
  max-width: 700px;
}
.dark {
  .empty-state-content p {
    color: var(--color-primary-0);
  }
  .empty-state-content span {
    color: var(--color-primary-200);
  }
}
</style>
