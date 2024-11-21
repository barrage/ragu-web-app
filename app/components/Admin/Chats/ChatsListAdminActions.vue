<script lang="ts" setup>
import type { SortingValues } from '~/types/sort'

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
</script>

<template>
  <div class="chats-actions-container">
    <p class="chats-list-title">
      {{ $t('chat.all_chats') }}
    </p>
    <div class="actions-wrapper">
      <SortSelect :options="sortOptions" @sort-updated="updateSort" />
    </div>
  </div>
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
}
.dark {
  .chats-actions-container {
    & .chats-list-title {
      color: var(--color-primary-100);
    }
  }
}
</style>
