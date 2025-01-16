<script lang="ts" setup>
import type { SortingValues } from '~/types/sort'

defineProps<{
  selectedSortBy: string
  selectedSortDirection: 'asc' | 'desc'
  selectedSearch: string | null
}>()

const emits = defineEmits<{
  (event: 'sortChange', sort: SortingValues): void
}>()

const { t } = useI18n()

const sortOptions = computed(() => [
  { name: t('chat.admin.chat_card.created_at'), value: 'createdAt' },
  { name: t('chat.admin.chat_card.updated_at'), value: 'updatedAt' },
  { name: t('whatsapp_chat.admin.sort_by_user_name'), value: 'name' },
])

const updateSort = (sortingValues: SortingValues) => {
  emits('sortChange', sortingValues)
}
</script>

<template>
  <div class="whatsapp-chats-actions-container">
    <p class="whatsapp-chats-list-title">
      {{ $t('whatsapp_chat.admin.all_whatsapp_chats') }}
    </p>
    <div
      v-motion-pop
      :delay="300"
      class="actions-wrapper"
    >
      <SortSelect
        :initial-sort-by="selectedSortBy"
        :initial-sort-direction="selectedSortDirection"
        :options="sortOptions"
        @sort-updated="updateSort"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.whatsapp-chats-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.7rem;

  & .whatsapp-chats-list-title {
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
  .whatsapp-chats-actions-container {
    & .whatsapp-chats-list-title {
      color: var(--color-primary-100);
    }
  }
}
</style>
