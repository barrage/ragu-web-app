<script lang="ts" setup>
import DeactivateAgentModalBackoffice from './DeactivateAgentModalBackoffice.vue'
import type { Agents } from '~/types/agent'

const props = defineProps<{
  agents: Agents[] | null | undefined
}>()

const emits = defineEmits<{
  (event: 'pageChange', page: number): number
  (event: 'agentDeactivated'): void
  (event: 'agentActivated'): void
  (event: 'agentDeleted'): void
}>()

/* Activate Agent */
const selectedAgentActivate = ref<Agents | null>(null)
const activateAgentModalVisible = ref(false)

const openActivateAgentModal = (agent: Agents) => {
  selectedAgentActivate.value = agent
  activateAgentModalVisible.value = true
}

const agentActivated = () => {
  emits('agentActivated')
}
/* Deactivate Agent */
const selectedAgentDeactivate = ref<Agents | null>(null)
const deactivateAgentModalVisible = ref(false)

const openDeactivateAgentModal = (agent: Agents) => {
  selectedAgentDeactivate.value = agent
  deactivateAgentModalVisible.value = true
}

const agentDeactivated = () => {
  emits('agentDeactivated')
}

/* Delete Agent */
const selectedAgentDelete = ref<Agents | null>(null)
const deleteAgentModalVisible = ref(false)

const openDeleteAgentModal = (agent: Agents) => {
  selectedAgentDelete.value = agent
  deleteAgentModalVisible.value = true
}

const agentDeleted = () => {
  emits('agentDeleted')
}
</script>

<template>
  <div class="agents-list-container">
    <div class="agents-list">
      <template
        v-for="(agent, index) in props.agents"
        :key="agent.agent.id"
      >
        <AgentCard
          v-motion-fade
          :delay="(index * 100)"
          :duration="400"
          :single-agent="agent"
          @activate-agent="openActivateAgentModal(agent)"
          @deactivate-agent="openDeactivateAgentModal(agent)"
          @delete-agent="openDeleteAgentModal(agent)"
        />
      </template>
    </div>
    <ActivateAgentModalBackoffice
      v-model="activateAgentModalVisible"
      :selected-agent="selectedAgentActivate"
      @agent-activated="agentActivated"
    />

    <DeactivateAgentModalBackoffice
      v-model="deactivateAgentModalVisible"
      :selected-agent="selectedAgentDeactivate"
      @agent-deactivated="agentDeactivated"
    />
    <DeleteAgentModalBackoffice
      v-model="deleteAgentModalVisible"
      :selected-agent="selectedAgentDelete"
      @agent-deleted="agentDeleted"
    />
  </div>
</template>

<style lang="scss" scoped>
.agents-list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.agents-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-fluid-3-xs);
}
</style>
