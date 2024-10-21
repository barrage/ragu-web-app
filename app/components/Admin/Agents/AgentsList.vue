<script lang="ts" setup>
import type { Agent } from '~/types/agent'
import type { Pagination } from '~/types/pagination'

const props = defineProps<{
  agents: Agent[] | null | undefined
}>()

const emits = defineEmits<{
  (event: 'pageChange', page: number): number
}>()

const cardClasses = ref<string[]>([])
const agentStore = useAgentStore()
const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
  total: agentStore.agentsResponse?.total || 0,
  disabled: false,
})

const changePage = (page: number) => {
  pagination.value.currentPage = page
  emits('pageChange', pagination.value.currentPage)
}

onMounted(() => {
  nextTick(() => {
    props.agents?.forEach((_, index) => {
      setTimeout(() => {
        cardClasses.value[index] = 'list-item-visible'
      }, index * 100)
    })
  })
})
</script>

<template>
  <div class="agents-list-container">
    <div
      v-for="(agent, index) in props.agents"
      :key="agent.id"
      class="list-item"
      :class="[cardClasses[index]]"
    >
      <AgentCard :agent="agent" />
    </div>
    <Pagination
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      @page-change="(page) => changePage(page)"
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
