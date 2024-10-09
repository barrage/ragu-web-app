<script lang="ts" setup>
import TeamIcon from '~/assets/icons/svg/team.svg'

definePageMeta({
  layout: 'admin-layout',
})

const { t } = useI18n()
const usersStore = useUsersStore()

const { error } = await useAsyncData(() => usersStore.GET_AllUsers())

errorHandler(error)
</script>

<template>
  <AdminPageContainer>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('members.title')"
          :description="t('members.description')"
        >
          <template #icon>
            <TeamIcon size="52" />
          </template>
        </AdminPageTitleContainer>
      </template>
      <template #actions>
        <MembersQuickActionsContainer />
      </template>
    </AdminPageHeadingTemplate>
    <MembersListActions />
    <MembersList :users="usersStore.usersResponse" />
  </AdminPageContainer>
</template>
