<script lang="ts" setup>
import type { DocumentListFilterForm } from '~/types/document'

const props = defineProps<{
  filter: DocumentListFilterForm
}>()

const emits = defineEmits<Emits>()

const isOpen = defineModel<boolean>()

interface Emits {
  (event: 'filterApplied', filter: DocumentListFilterForm): void
}

const updateFilter = (filter: DocumentListFilterForm) => {
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
    data-testid="document-list-filter-drawer"
  >
    <DocumentListFilterForm
      :filter="props.filter"
      @filter-applied="updateFilter"
    />
  </el-drawer>
</template>
