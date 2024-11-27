<script lang="ts" setup>
import type { AgentCollection } from '~/types/agent'
import FolderPersonIcon from '~/assets/icons/svg/folder-person.svg'
import CollectionIcon from '~/assets/icons/svg/folder-add.svg'
import CollectionDelete from '~/assets/icons/svg/folder-remove.svg'

const props = defineProps<{
  agentCollections: AgentCollection[] | undefined
}>()

const agentStore = useAgentStore()
const assignCollectionModalVisible = ref(false)
const deleteCollectionModalVisible = ref(false)
const { t } = useI18n()
const openAssignCollectionModal = () => {
  assignCollectionModalVisible.value = true
}

const closeAssignCollectionModal = () => {
  assignCollectionModalVisible.value = false
}

const openDeleteCollectionModal = () => {
  deleteCollectionModalVisible.value = true
}

const closeDeleteCollectionModal = () => {
  deleteCollectionModalVisible.value = false
}
</script>

<template>
  <section class="agent-collections-section grid">
    <div class="agent-collections-header-container">
      <h3 class="agent-collections-title">
        <FolderPersonIcon size="42px" />
        {{ t('collections.assign_collection.agent_collections') }}
      </h3>
      <div v-if="agentCollections?.length" class="agent-collections-header-actions-container">
        <el-button
          size="small"
          type="primary"
          plain
          @click="openAssignCollectionModal()"
        >
          <CollectionIcon /> {{ t('collections.assign_collection.title') }}
        </el-button>
        <ElTooltip
          :disabled="!(agentStore.singleAgent?.collections?.length === 0)"
          :content="t('collections.assign_collection.notification.delete_collection')"
          :enterable="false"
          placement="top"
        >
          <el-button
            size="small"
            type="primary"
            plain
            :disabled="agentStore.singleAgent?.collections?.length === 0"
            @click="openDeleteCollectionModal()"
          >
            <CollectionDelete />  {{ t('collections.deleteModal.title') }}
          </el-button>
        </ElTooltip>
      </div>
    </div>
    <div class="agent-collection-list-container">
      <template v-if="props.agentCollections?.length && props.agentCollections?.length > 0">
        <template v-for="agentCollection in props.agentCollections" :key="agentCollection.id">
          <AgentCollectionCard :agent-collection="agentCollection" />
        </template>
      </template>
      <template v-else>
        <AgentCollectionsEmptyState />
      </template>
    </div>
  </section>
  <AssignCollectionModal
    :is-open="assignCollectionModalVisible"
    @close-modal="closeAssignCollectionModal"
  />
  <DeleteAgentCollectionModal
    :is-open="deleteCollectionModalVisible"
    @close-modal="closeDeleteCollectionModal"
  />
</template>

<style lang="scss" scoped>
.agent-collections-section {
  margin-top: 22px;
  padding-block: var(--spacing-fluid-l);
  & .agent-collections-header-container {
    grid-column: span 12;
    display: flex;
    justify-content: space-between;

    & .agent-collections-title {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-fluid-5);
      color: var(--color-primary-900);
    }

    & .agent-collections-header-actions-container {
      display: flex;
      align-items: center;
      gap: 22px;
    }
  }

  & .agent-collection-list-container {
    margin-top: 1rem;
    grid-column: span 12;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.dark {
  .agent-collections-section {
    & .agent-collections-header-container {
      & .agent-collections-title {
        color: var(--color-primary-100);
      }
    }
  }
}
</style>
