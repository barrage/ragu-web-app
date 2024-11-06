<script lang="ts" setup>
import TeamIcon from '~/assets/icons/svg/team.svg'
import type { SortingValues } from '~/types/sort'

definePageMeta({
  layout: 'admin-layout',
})

const { t } = useI18n()
const usersStore = useUsersStore()

const currentPage = ref(1)
const itemsPerPage = ref(10)
const sort = ref<SortingValues>({
  direction: 'desc',
  sortProperty: { name: '', value: '' },
})

const { error, execute } = await useAsyncData(() => usersStore.GET_AllUsers(currentPage.value, itemsPerPage.value, sort.value.sortProperty.value, sort.value?.direction))

const handlePageChange = async (page: number) => {
  currentPage.value = page
  await execute()
}

const handleSortChange = async (sortingValues: SortingValues) => {
  sort.value.direction = sortingValues.direction
  sort.value.sortProperty = sortingValues.sortProperty
  await execute()
}

errorHandler(error)
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
            <TeamIcon size="52" />
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
      @page-change="handlePageChange"
    />
  </AdminPageContainer>
</template>
