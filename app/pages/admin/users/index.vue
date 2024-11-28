<script lang="ts" setup>
import TeamIcon from '~/assets/icons/svg/team.svg'
import type { SortingValues } from '~/types/sort'
import type { Pagination } from '~/types/pagination'

definePageMeta({
  layout: 'admin-layout',
})

const { t } = useI18n()

useHead({
  title: computed(() => t('users.title')),
})
const usersStore = useUsersStore()

const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
  total: usersStore.usersResponse?.total || 0,
  disabled: false,
})

const sort = ref<SortingValues>({
  direction: 'desc',
  sortProperty: { name: '', value: '' },
})

const { error, execute } = await useAsyncData(() => usersStore.GET_AllUsers(pagination.value.currentPage, pagination.value.pageSize, sort.value.sortProperty.value, sort.value?.direction))

const handlePageChange = async (page: number) => {
  pagination.value.currentPage = page
  await execute()
}

const handleSortChange = async (sortingValues: SortingValues) => {
  sort.value.direction = sortingValues.direction
  sort.value.sortProperty = sortingValues.sortProperty
  await execute()
}

errorHandler(error)

watch(
  () => usersStore.usersResponse?.total,
  () => {
    pagination.value.total = usersStore.usersResponse?.total || 0
  },
  { immediate: true },
)
</script>

<template>
  <AdminPageContainer>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('users.title')"
          :description="t('users.description')"
        >
          <template #icon>
            <TeamIcon size="58px" />
          </template>
        </AdminPageTitleContainer>
      </template>
      <template #actions>
        <UsersQuickActionsContainer />
      </template>
    </AdminPageHeadingTemplate>
    <UsersListActions @sort-change="handleSortChange" />
    <UsersList
      :users="usersStore.usersResponse?.items"
      :pagination="pagination"
      @page-change="handlePageChange"
      @user-deleted="(handlePageChange(1))"
      @user-edited="(handlePageChange(1))"
      @user-activated="(handlePageChange(1))"
      @user-deactivated="(handlePageChange(1))"
    />
  </AdminPageContainer>
</template>
