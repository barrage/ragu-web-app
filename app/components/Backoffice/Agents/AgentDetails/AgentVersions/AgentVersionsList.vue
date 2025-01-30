<script lang="ts" setup>
import type { Configuration } from '~/types/agent'

const props = defineProps<{
  agentVersions: Configuration[] | null | undefined
}>()

const emits = defineEmits<{
  (event: 'agentVersionRollback', config: Configuration): Configuration
}>()

/* Rollback agent version */
const selectedAgentRollback = ref<Configuration | null>(null)
const rollbackAgentModalVisible = ref(false)

const openRollbackAgentModal = (config: Configuration) => {
  selectedAgentRollback.value = config
  rollbackAgentModalVisible.value = true
}

const agentVersionRollbacked = (config: Configuration) => {
  emits('agentVersionRollback', config)
}

/* Agent version details */
const selectedAgentVersionDetails = ref<Configuration | null>(null)
const agentVersionDetailsModalVisible = ref(false)

const openAgentVersionDetailsModal = (config: Configuration) => {
  selectedAgentVersionDetails.value = config
  agentVersionDetailsModalVisible.value = true
}
</script>

<template>
  <div>
    <div class="agent-versions-list">
      <template v-for="(agentConfiguration, index) in props.agentVersions" :key="index">
        <AgentVersionCard
          v-motion-fade
          :agent-configuration="agentConfiguration"
          :delay="(index * 100)"
          :duration="400"
          @rollback-agent-version="openRollbackAgentModal"
          @open-agent-details="openAgentVersionDetailsModal"
        />
      </template>
    </div>
  </div>
  <Teleport to="body">
    <RollbackAgentVersionModal
      v-model="rollbackAgentModalVisible"
      :selected-agent-version="selectedAgentRollback"
      @agent-version-rollback="agentVersionRollbacked"
    />

    <AgentVersionDetailsModal
      v-model="agentVersionDetailsModalVisible"
      :selected-agent-version="selectedAgentVersionDetails"
    />
  </Teleport>
</template>

<style lang="scss" scoped>
.agent-versions-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>
