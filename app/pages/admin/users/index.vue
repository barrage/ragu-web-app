<script lang="ts" setup>
import TeamIcon from '~/assets/icons/svg/team.svg'

definePageMeta({
  layout: 'admin-layout',
})

const { t } = useI18n()

useHead({
  title: computed(() => t('users.title')),
})

const infoDrawerOpen = ref(false)

const toggleInfoDrawer = () => {
  infoDrawerOpen.value = !infoDrawerOpen.value
}
</script>

<template>
  <AdminPageContainer>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('users.title')"
          :description="t('users.description')"
          has-info
          @infoclicked="toggleInfoDrawer"
        >
          <template #icon>
            <TeamIcon size="48px" />
          </template>
        </AdminPageTitleContainer>
      </template>
      <template #actions>
        <UsersQuickActionsContainer />
      </template>
    </AdminPageHeadingTemplate>
    <AsyncUsersListTemplate />
    <UsersInfoDrawer v-model="infoDrawerOpen" />
  </AdminPageContainer>
</template>
