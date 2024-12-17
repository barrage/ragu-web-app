<script lang="ts" setup>
import type { AgentCollection } from '~/types/agent'
import FolderPersonIcon from '~/assets/icons/svg/folder-person.svg'
import CollectionIcon from '~/assets/icons/svg/folder-add.svg'
import CollectionDelete from '~/assets/icons/svg/folder-remove.svg'
import FolderWarningIcon from '~/assets/icons/svg/folder-warning.svg'

// PROPS

const props = defineProps<{
  agentCollections: AgentCollection[] | undefined
}>()

// CONSTATNTS & STATES
const agentStore = useAgentStore()
const assignCollectionModalVisible = ref(false)
const deleteCollectionModalVisible = ref(false)
const { t } = useI18n()

// FUNCTIONS

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
        <LlmTooltip
          :disabled="!agentStore.singleAgent?.collections?.length"
          :content="$t('collections.assign_collection.notification.delete_collection')"
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
        </LlmTooltip>
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
    flex-wrap: wrap;

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
        color: var(--color-primary-100);
      }
    }
  }
}
</style>
