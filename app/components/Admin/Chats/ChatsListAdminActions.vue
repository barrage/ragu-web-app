<script lang="ts" setup>
import type { SortingValues } from '~/types/sort'

const emits = defineEmits<{
  (event: 'sortChange', sort: SortingValues): void
}>()

const { t } = useI18n()

const sortOptions = computed(() => [
  { name: t('chat.admin.chat_card.created_at'), value: 'createdAt' },
  { name: t('chat.admin.chat_card.title'), value: 'title' },
  { name: t('chat.admin.chat_card.updated_at'), value: 'updatedAt' },
])

const updateSort = (sortingValues: SortingValues) => {
  emits('sortChange', sortingValues)
}
</script>

<template>
  <div class="chats-actions-container">
    <SortSelect :options="sortOptions" @sort-updated="updateSort" />
  </div>
</template>

<style lang="scss" scoped>
.chats-actions-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-inline: 1rem;
  margin-bottom: 1rem;
}
</style>
