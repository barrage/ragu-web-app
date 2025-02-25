<script lang="ts" setup>
import type { AgentListFilterForm } from '~/types/agent'

const props = defineProps<{
  filter: AgentListFilterForm
}>()

const emits = defineEmits<Emits>()

const isOpen = defineModel<boolean>()
const { drawerSize } = useDrawerSize()

interface Emits {
  (event: 'filterApplied', filter: AgentListFilterForm): void
}
const updateFilter = (filter: AgentListFilterForm) => {
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
    :size="drawerSize"
  >
    <AgentsListFilterForm :filter="props.filter" @filter-applied="updateFilter" />
  </el-drawer>
</template>
