<script lang="ts" setup>
import DeactivateAgentModalBackoffice from './DeactivateAgentModalBackoffice.vue'
import type { Agents } from '~/types/agent'
import type { Pagination } from '~/types/pagination'

const props = defineProps<{
  agents: Agents[] | null | undefined
  pagination: Pagination
}>()

const emits = defineEmits<{
  (event: 'pageChange', page: number): number
  (event: 'agentDeactivated'): void
  (event: 'agentActivated'): void
}>()

const cardClasses = ref<string[]>([])

const applyCardClasses = () => {
  cardClasses.value = []
  props.agents?.forEach((_, index) => {
    setTimeout(() => {
      cardClasses.value[index] = 'list-item-visible'
    }, index * 100)
  })
}

watch(
  () => props.agents,
  () => {
    nextTick(applyCardClasses)
  },
  { immediate: true },
)

const changePage = (page: number) => {
  emits('pageChange', page)
}

/* Activate Agent */
const selectedAgentActivate = ref<Agents | null>(null)
const activateAgentModalVisible = ref(false)

const openActivateAgentModal = (agent: Agents) => {
  selectedAgentActivate.value = agent
  activateAgentModalVisible.value = true
}

const closeActivateModal = () => {
  activateAgentModalVisible.value = false
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

const closeDeactivateModal = () => {
  deactivateAgentModalVisible.value = false
}

const agentDeactivated = () => {
  emits('agentDeactivated')
}
</script>

<template>
  <div class="agents-list-container">
    <div
      v-for="(agent, index) in props.agents"
      :key="agent.agent.id"
      class="list-item"
      :class="[cardClasses[index]]"
    >
      <AgentCard
        :single-agent="agent"
        @activate-agent="openActivateAgentModal(agent)"
        @deactivate-agent="openDeactivateAgentModal(agent)"
      />
    </div>

    <Pagination
      :current-page="props.pagination.currentPage"
      :page-size="props.pagination.pageSize"
      :total="props.pagination.total"
      @page-change="(page) => changePage(page)"
    />
  </div>
  <ActivateAgentModalBackoffice
    :is-open="activateAgentModalVisible"
    :selected-agent="selectedAgentActivate"
    @close-modal="closeActivateModal"
    @agent-activated="agentActivated"
  />

  <DeactivateAgentModalBackoffice
    :is-open="deactivateAgentModalVisible"
    :selected-agent="selectedAgentDeactivate"
    @close-modal="closeDeactivateModal"
    @agent-deactivated="agentDeactivated"
  />
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

.list-item {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.list-item-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
