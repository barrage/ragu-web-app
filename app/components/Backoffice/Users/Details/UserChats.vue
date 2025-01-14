<script lang="ts" setup>
import PersonMessageIcon from '~/assets/icons/svg/person-message.svg'
import EmptyChatIcon from '~/assets/icons/svg/chat-warning.svg'
import type { User } from '~/types/users'
import type { SortingValues } from '~/types/sort'
import type { Pagination } from '~/types/pagination'

const props = defineProps<{
  user: User | null
}>()

const chatStore = useChatStore()

const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
  total: chatStore.adminAllChatsResponse?.total || 0,
  disabled: false,
})

const sort = ref<SortingValues>({
  direction: 'desc',
  sortProperty: { name: '', value: 'updatedAt' },
})

const { error, status: loadingUserChats, data, execute: getUserChats } = await useAsyncData(() =>
  chatStore.GET_AllAdminChats(pagination.value.currentPage, pagination.value.pageSize, sort.value.sortProperty.value, sort.value?.direction, props.user!.id), { lazy: true })

const handlePageChange = async (page: number) => {
  pagination.value.currentPage = page
  await getUserChats()
}

const userHasChats = computed(() => {
  return data.value?.total && data.value?.total > 0
})

const handleSortChange = async (sortingValues: SortingValues) => {
  sort.value.direction = sortingValues.direction
  sort.value.sortProperty = sortingValues.sortProperty
  await getUserChats()
}
errorHandler(error)

watch(
  () => chatStore.adminAllChatsResponse?.total,
  () => {
    pagination.value.total = chatStore.adminAllChatsResponse?.total || 0
  },
  { immediate: true },
)
</script>

<template>
  <section class="user-chats-section">
    <div class="user-chats-section-title-wrapper">
      <PersonMessageIcon size="36px" />
      <h4 class="user-chats-title">
        {{ $t('users.user_chats_history') }}
      </h4>
    </div>
    <template v-if="loadingUserChats === 'pending' && !userHasChats">
      <div class="user-chats-loading-container">
        <MeetUpLoader />
      </div>
    </template>
    <template v-else-if="userHasChats">
      <div class="user-chats-container">
        <ChatsListAdminActions
          :selected-sort-by="sort.sortProperty"
          :selected-sort-direction="sort.direction"
          @sort-change="handleSortChange"
        />
        <ChatsListAdmin
          :chats="chatStore?.adminAllChatsData"
          :pagination="pagination"
          @page-change="handlePageChange"
          @chat-deleted="(handlePageChange(1))"
          @chat-title-edited="(handlePageChange(1))"
        />
      </div>
    </template>
    <template v-else>
      <EmptyState :title="$t('users.empty_chats_title')" :description="$t('users.empty_chats_description')">
        <template #icon>
          <EmptyChatIcon size="44px" />
        </template>
      </EmptyState>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.user-chats-section {
  padding-block: var(--spacing-fluid-m);

  & .user-chats-loading-container {
    display: flex;
    align-items: center;
    min-height: 200px;
    justify-content: center;
  }

  & .user-chats-section-title-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-primary-800);

    & .user-chats-title {
      color: var(--color-primary-800);
      font-size: var(--font-size-fluid-4);
      font-weight: var(--font-weight-semibold);
    }
  }

  & .user-chats-container {
    display: flex;
    flex-direction: column;
    padding-top: var(--spacing-fluid-m);
    gap: var(--spacing-fluid-2-xs);
  }
}

html.dark {
  .user-chats-section {
    & .user-chats-section-title-wrapper {
      color: var(--color-primary-100);
      & .user-chats-title {
        color: var(--color-primary-100);
      }
    }
  }
}
</style>
