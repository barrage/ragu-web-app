<script lang="ts" setup>
import type { AgentVersionEvaluationMessagesFilter } from '~/types/agent'

const props = defineProps<{
  filter: AgentVersionEvaluationMessagesFilter
}>()

const emits = defineEmits<Emits>()
const { drawerSize } = useDrawerSize()
const isOpen = defineModel<boolean>()

interface Emits {
  (event: 'filterApplied', filter: AgentVersionEvaluationMessagesFilter): void
}
const updateFilter = (filter: AgentVersionEvaluationMessagesFilter) => {
  isOpen.value = false
  emits('filterApplied', filter)
}
</script>

<template>
  <el-drawer
    v-model="isOpen"
    direction="rtl"
    title="Filter"
    destroy-on-close
    data-testid="agent-evaluation-filter-drawer"
    :size="drawerSize"
  >
    <AgentEvaluationsFilterForm :filter="props.filter" @filter-applied="updateFilter" />
  </el-drawer>
</template>
