<script lang="ts" setup>
import type { SortingValues } from '~/types/sort'

const emits = defineEmits<{
  (event: 'sortChange', sort: SortingValues): void
}>()

const { t } = useI18n()

const sortOptions = computed(() => [
  { name: t('users.user_card.username'), value: 'fullName' },
  { name: t('users.user_card.created_at'), value: 'createdAt' },
  { name: t('users.user_card.status'), value: 'active' },
  { name: t('users.user_card.email'), value: 'email' },
])

const updateSort = (sortingValues: SortingValues) => {
  emits('sortChange', sortingValues)
}
</script>

<template>
  <div class="users-list-actions-container">
    <p class="user-list-title">
      {{ $t('users.all_users') }}
    </p>

    <div class="actions-wrapper">
      <SortSelect :options="sortOptions" @sort-updated="updateSort" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.users-list-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
  margin-bottom: 0.7rem;

  & .user-list-title {
    font-size: var(--font-size-fluid-4);
    color: var(--color-primary-800);
  }
}
.dark {
  .users-list-actions-container {
    & .user-list-title {
      color: var(--color-primary-100);
    }
  }
}
</style>
