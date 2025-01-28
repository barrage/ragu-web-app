<script lang="ts" setup>
import type { ChatListFilterForm } from '~/types/chat'

const props = defineProps<{
  filter: ChatListFilterForm
}>()

const emits = defineEmits<Emits>()

const isOpen = defineModel<boolean>()

interface Emits {
  (event: 'filterApplied', filter: ChatListFilterForm): void
}
const updateFilter = (filter: ChatListFilterForm) => {
  isOpen.value = false
  emits('filterApplied', filter)
}
</script>

<template>
  <el-drawer
    v-model="isOpen"
    direction="rtl"
    title="Filter"
  >
    <ChatListAdminFilterForm :filter="props.filter" @filter-applied="updateFilter" />
  </el-drawer>
</template>
