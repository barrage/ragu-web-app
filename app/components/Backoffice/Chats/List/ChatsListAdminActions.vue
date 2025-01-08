<script lang="ts" setup>
import type { SortingValues } from '~/types/sort'
import FilterIcon from '~/assets/icons/svg/filter.svg'

const props = defineProps<{
  selectedSortBy: string
  selectedSortDirection: 'asc' | 'desc'
}>()

const emits = defineEmits<{
  (event: 'sortChange', sort: SortingValues): void
}>()

const { t } = useI18n()

const sortOptions = computed(() => [
  { name: t('chat.admin.chat_card.updated_at'), value: 'updatedAt' },
  { name: t('chat.admin.chat_card.created_at'), value: 'createdAt' },
  { name: t('chat.admin.chat_card.title'), value: 'title' },
])

const updateSort = (sortingValues: SortingValues) => {
  emits('sortChange', sortingValues)
}

const drawer = ref(false)

const toggleFilterDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<template>
  <div class="chats-actions-container">
    <p class="chats-list-title">
      {{ $t('chat.all_chats') }}
    </p>
    <div
      v-motion-pop
      :delay="300"
      class="actions-wrapper"
    >
      <SortSelect
        :initial-sort-by="props.selectedSortBy"
        :initial-sort-direction="props.selectedSortDirection"
        :options="sortOptions"
        @sort-updated="updateSort"
      />
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
.chats-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
  margin-bottom: 0.7rem;

  & .chats-list-title {
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
  .chats-actions-container {
    & .chats-list-title {
      color: var(--color-primary-100);
    }
  }
}
</style>
