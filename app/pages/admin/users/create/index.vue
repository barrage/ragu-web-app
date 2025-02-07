<script lang="ts" setup>
import AddPersonIcon from '~/assets/icons/svg/person-add.svg'
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'

const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('users.titles.invite_users')),
})
</script>

<template>
  <AdminPageContainer>
    <LlmLink to="/admin/users" type="link">
      <ArrowLeftIcon size="20px" /> {{ t('users.title') }}
    </LlmLink>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('users.titles.invite_users')"
          :description="t('users.descriptions.invite_users')"
        >
          <template #icon>
            <AddPersonIcon size="48px" />
          </template>
        </AdminPageTitleContainer>
      </template>
    </AdminPageHeadingTemplate>

    <CreateUserOptionsList />
  </AdminPageContainer>
</template>
