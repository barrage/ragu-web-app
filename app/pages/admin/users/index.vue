<script lang="ts" setup>
import TeamIcon from '~/assets/icons/svg/team.svg'

definePageMeta({
  layout: 'admin-layout',
})

const { t } = useI18n()
const usersStore = useUsersStore()

// Define pagination state
const currentPage = ref(1)
const itemsPerPage = ref(10)

const fetchUsers = async (page: number = 1) => {
  const { error } = await useAsyncData(() =>
    usersStore.GET_AllUsers(page, itemsPerPage.value))
  errorHandler(error)
}

// Fetch users initially with the first page
await fetchUsers(currentPage.value)

// Method to handle page change
const handlePageChange = async (page: number) => {
  currentPage.value = page
  await fetchUsers(page)
}
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
    <!--  <UsersListActions /> -->
    <UsersList
      :users="usersStore.usersResponse?.items"
      @page-change="handlePageChange"
    />
  </AdminPageContainer>
</template>
