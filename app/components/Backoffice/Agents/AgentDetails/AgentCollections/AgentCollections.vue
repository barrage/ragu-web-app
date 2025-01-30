<script lang="ts" setup>
import type { Agent, AgentCollection, Configuration } from '~/types/agent'
import CollectionIcon from '~/assets/icons/svg/folder-add.svg'
import CollectionDelete from '~/assets/icons/svg/folder-remove.svg'
import FolderWarningIcon from '~/assets/icons/svg/folder-warning.svg'

const props = defineProps<{
  agentCollections?: AgentCollection[]
  agentId?: string
  configurationAgentId?: string
  agent?: Agent
}>()

const emits = defineEmits<{
  (event: 'refreshAgent'): void
  (event: 'rollbackAgentVersion', agent: Configuration): void
}>()

const assignCollectionModalVisible = ref(false)
const deleteCollectionModalVisible = ref(false)
const { t } = useI18n()

const selectedCollectionDelete = ref<AgentCollection | null>(null)

const openAssignCollectionModal = () => {
  assignCollectionModalVisible.value = true
}

const closeAssignCollectionModal = () => {
  assignCollectionModalVisible.value = false
  emits('refreshAgent')
}

const openDeleteCollectionModal = () => {
  deleteCollectionModalVisible.value = true
}

const closeDeleteCollectionModal = () => {
  deleteCollectionModalVisible.value = false
  emits('refreshAgent')
}

const handleCollectionAssigned = () => {
  closeAssignCollectionModal()
}

const handleCollectionDeleted = () => {
  closeDeleteCollectionModal()
}
</script>

<template>
  <section class="agent-collections-section grid">
    <div class="agent-collections-header-container">
      <h5 class="agent-collections-title">
        {{ t('collections.assign_collection.agent_collections') }}
      </h5>
      <div v-if="agentCollections?.length" class="agent-collections-header-actions-container">
        <el-button
          size="small"
          type="primary"
          plain
          @click="openAssignCollectionModal()"
        >
          <CollectionIcon /> {{ t('collections.assign_collection.title') }}
        </el-button>

        <el-button
          size="small"
          type="primary"
          plain
          :disabled="agentCollections.length === 0"
          @click="openDeleteCollectionModal()"
        >
          <CollectionDelete />  {{ t('collections.deleteModal.title') }}
        </el-button>
      </div>
    </div>
    <div class="agent-collection-list-container">
      <template v-if="props.agentCollections?.length && props.agentCollections?.length > 0">
        <template v-for="agentCollection in props.agentCollections" :key="agentCollection.id">
          <AgentCollectionCard :agent-collection="agentCollection" />
        </template>
      </template>
      <template v-else>
        <EmptyState
          :title="t('collections.empty_state.title')"
          :description="t('collections.empty_state.description')"
          :cta-text="t('collections.assign_collection.title')"
          @cta-click="openAssignCollectionModal"
        >
          <template #icon>
            <FolderWarningIcon size="44px" />
          </template>
          <template #cta>
            <el-button @click="openAssignCollectionModal">
              <CollectionIcon /> {{ t('collections.assign_collection.title') }}
            </el-button>
          </template>
        </EmptyState>
      </template>
    </div>
  </section>
  <AssignCollectionModal
    v-model="assignCollectionModalVisible"
    :agent-collections="props.agentCollections"
    @collection-assigned="handleCollectionAssigned"
  />

  <DeleteAgentCollectionModal
    v-model="deleteCollectionModalVisible"
    :selected-collection="selectedCollectionDelete"
    :agent-collections="props.agentCollections"
    @collection-deleted="handleCollectionDeleted"
  />
</template>

<style lang="scss" scoped>
.agent-collections-section {
  margin-top: 22px;
  & .agent-collections-header-container {
    grid-column: span 12;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-inline: 0.8rem;
    & .agent-collections-title {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: var(--color-primary-900);
      font-size: var(--font-size-fluid-4);
    }

    & .agent-collections-header-actions-container {
      display: flex;
      align-items: center;
      gap: 22px;
      flex-wrap: wrap;
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
        color: var(--color-primary-0);
      }
    }
  }
}
</style>
