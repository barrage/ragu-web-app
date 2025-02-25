<script lang="ts" setup>
import type { UsersListFilterForm } from '~/types/users'

const props = defineProps<{
  filter: UsersListFilterForm
}>()

const emits = defineEmits<Emits>()
const { drawerSize } = useDrawerSize()
const isOpen = defineModel<boolean>()

interface Emits {
  (event: 'filterApplied', filter: UsersListFilterForm): void
}
const updateFilter = (filter: UsersListFilterForm) => {
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
    <UsersListFilterForm :filter="props.filter" @filter-applied="updateFilter" />
  </el-drawer>
</template>
