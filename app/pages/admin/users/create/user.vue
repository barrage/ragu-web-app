<script lang="ts" setup>
import AddPersonIcon from '~/assets/icons/svg/person-add.svg'
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'
import type { User } from '~/types/users'

const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('users.titles.invite_users')),
})

const router = useRouter()

const handleCancelUserCreation = () => {
  router.push('/admin/users/create')
}
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
          :title="t('users.titles.invite_user')"
          :description="t('users.descriptions.invite_single_user')"
        >
          <template #icon>
            <AddPersonIcon size="48px" />
          </template>
        </AdminPageTitleContainer>
      </template>
    </AdminPageHeadingTemplate>

    <CreateUserForm @user-creation-canceled="handleCancelUserCreation" />
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.back-links-wrapper {
  display: flex;
  gap: 22px;
}
</style>
