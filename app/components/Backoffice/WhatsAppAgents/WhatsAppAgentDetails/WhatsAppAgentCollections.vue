<script lang="ts" setup>
import CollectionIcon from '~/assets/icons/svg/folder-add.svg'
import CollectionDelete from '~/assets/icons/svg/folder-remove.svg'
import FolderWarningIcon from '~/assets/icons/svg/folder-warning.svg'
import type { WhatsAppAgentData } from '~/components/Backoffice/WhatsAppAgents/WhatsAppAgentDetails/WhatsAppAgentDetails.vue'

// PROPS & EMITS
defineProps<{
  whatsAppAgent: WhatsAppAgentData | undefined
}>()
const emits = defineEmits<{
  (event: 'refreshWhatsAppAgent'): void
}>()

// CONSTANTS & STATES
const assignCollectionModalVisible = ref(false)
const deleteCollectionModalVisible = ref(false)
const { t } = useI18n()

// FUNCTIONS

const openAssignCollectionModal = () => {
  assignCollectionModalVisible.value = true
}

const openDeleteCollectionModal = () => {
  deleteCollectionModalVisible.value = true
}
</script>

<template>
  <section class="whatsapp-agent-collections-section grid">
    <div class="whatsapp-agent-collections-header-container">
      <h5 class="whatsapp-agent-collections-title">
        {{ t('collections.assign_collection.agent_collections') }}
      </h5>
      <div v-if="whatsAppAgent?.collections?.length" class="whatsapp-agent-collections-header-actions-container">
        <ElButton
          size="small"
          type="primary"
          plain
          @click="openAssignCollectionModal()"
        >
          <CollectionIcon /> {{ t('collections.assign_collection.title') }}
        </ElButton>

        <ElButton
          size="small"
          type="primary"
          plain
          :disabled="!whatsAppAgent?.collections.length"
          @click="openDeleteCollectionModal()"
        >
          <CollectionDelete />  {{ t('collections.deleteModal.title') }}
        </ElButton>
      </div>
    </div>
    <div class="whatsapp-agent-collection-list-container">
      <template v-if="whatsAppAgent?.collections?.length">
        <template
          v-for="collection in whatsAppAgent?.collections"
          :key="collection.id"
        >
          <AgentCollectionCard :agent-collection="collection" />
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
            <ElButton @click="openAssignCollectionModal">
              <CollectionIcon /> {{ t('collections.assign_collection.title') }}
            </ElButton>
          </template>
        </EmptyState>
      </template>
    </div>
  </section>
  <WhatsAppAssignCollectionModal
    v-model="assignCollectionModalVisible"
    :agent-collections="whatsAppAgent?.collections"
    @refresh-whats-app-agent="emits('refreshWhatsAppAgent')"
  />
  <WhatsAppDeleteAgentCollectionModal
    v-model="deleteCollectionModalVisible"
    :agent-collections="whatsAppAgent?.collections"
    @refresh-whats-app-agent="emits('refreshWhatsAppAgent')"
  />
</template>

<style lang="scss" scoped>
.whatsapp-agent-collections-section {
  margin-top: 22px;
  & .whatsapp-agent-collections-header-container {
    grid-column: span 12;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-inline: 0.8rem;
    & .whatsapp-agent-collections-title {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: var(--color-primary-900);
      font-size: var(--font-size-fluid-4);
    }

    & .whatsapp-agent-collections-header-actions-container {
      display: flex;
      align-items: center;
      gap: 22px;
      flex-wrap: wrap;
    }
  }

  & .whatsapp-agent-collection-list-container {
    margin-top: 1rem;
    grid-column: span 12;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.dark {
  .whatsapp-agent-collections-section {
    & .whatsapp-agent-collections-header-container {
      & .whatsapp-agent-collections-title {
        color: var(--color-primary-0);
      }
    }
  }
}
</style>
