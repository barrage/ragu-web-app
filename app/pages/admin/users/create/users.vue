<script lang="ts" setup>
import TeamIcon from '~/assets/icons/svg/team.svg'
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
    <div class="back-links-wrapper">
      <LlmLink to="/admin/users" type="link">
        <ArrowLeftIcon size="20px" /> {{ t('users.title') }}
      </LlmLink>
      <LlmLink to="/admin/users/create" type="link">
        <ArrowLeftIcon size="20px" /> {{ t('users.titles.invite_users') }}
      </LlmLink>
    </div>

    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('users.titles.invite_users')"
          :description="t('users.descriptions.invite_multiple_users_csv')"
        >
          <template #icon>
            <TeamIcon size="48px" />
          </template>
        </AdminPageTitleContainer>
      </template>
    </AdminPageHeadingTemplate>
    <UploadUsersCsv />
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.back-links-wrapper {
  display: flex;
  gap: 22px;
}
</style>
