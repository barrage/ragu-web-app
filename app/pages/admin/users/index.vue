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

const { error, execute } = await useAsyncData(() =>
  usersStore.GET_AllUsers(currentPage.value, itemsPerPage.value))

// Method to handle page change
const handlePageChange = async (page: number) => {
  currentPage.value = page
  execute()
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
    <!--  <UsersListActions /> -->
    <UsersList
      :users="usersStore.usersResponse?.items"
      @page-change="handlePageChange"
    />
  </AdminPageContainer>
</template>
