<script lang="ts" setup>
import type { SortingValues } from '~/types/sort'
import FilterIcon from '~/assets/icons/svg/filter.svg'

// EMITS

const emits = defineEmits<{
  (event: 'sortChange', sort: SortingValues): void
}>()

// CONSTANTS

const { t } = useI18n()

// COMPUTEDS

const sortOptions = computed(() => [
  { name: t('agents.labels.status'), value: 'active' },
  { name: t('agents.labels.name'), value: 'name' },
  { name: t('agents.labels.created_at'), value: 'createdAt' },
  { name: t('agents.labels.updated_at'), value: 'updatedAt' },

])

// FUNCTIONS

const updateSort = (sortingValues: SortingValues) => {
  emits('sortChange', sortingValues)
}

const drawer = ref(false)

const toggleFilterDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<template>
  <div class="agents-actions-container">
    <p class="agents-list-title">
      {{ $t('agents.all_agents') }}
    </p>
    <div class="actions-wrapper">
      <SortSelect :options="sortOptions" @sort-updated="updateSort" />

      <el-button
        size="small"
        data-testid="open-filter-button"
        @click="toggleFilterDrawer"
      >
        <FilterIcon />  Filter
      </el-button>
    </div>
  </div>
  <el-drawer
    v-model="drawer"
    direction="rtl"
    title="Filter"
  />
</template>

<style lang="scss" scoped>
.agents-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
  margin-bottom: 0.7rem;

  & .agents-list-title {
    font-size: var(--font-size-fluid-4);
    color: var(--color-primary-800);
  }
  & .actions-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 22px;
  }
}
.dark {
  .agents-actions-container {
    & .agents-list-title {
      color: var(--color-primary-100);
    }
  }
}
</style>
