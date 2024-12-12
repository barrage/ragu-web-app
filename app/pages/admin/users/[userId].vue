<script lang="ts" setup>
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'
import PersonQuestionMarkIcon from '~/assets/icons/svg/person-question-mark.svg'

definePageMeta({
  layout: 'admin-layout',
})
const { t } = useI18n()
const route = useRoute()
const { $api } = useNuxtApp()

useHead({
  title: computed(() => t('users.details')),
})

const selectedUserId = computed(() => {
  const userId = Array.isArray(route.params.userId) ? route.params.userId[0] : route.params.userId
  return userId || ''
})

const { execute: getUserDetails, error: getUserError, status: getUserStatus, data: userData } = await useAsyncData(() => $api.user.GetSingleUser(selectedUserId.value))

errorHandler(getUserError)

const isGetUserLoading = computed(() => {
  return getUserStatus.value === 'pending'
})
</script>

<template>
  <AdminPageContainer>
    <LlmLink to="/admin/users" type="link">
      <ArrowLeftIcon size="20px" /> {{ t('users.title') }}
    </LlmLink>

    <template v-if="isGetUserLoading">
      <div class="user-details-loader">
        <MeetUpLoader />
      </div>
    </template>
    <template v-else-if="userData?.id">
      <UserDetails
        :user="userData"
        @user-edited="(getUserDetails)"
        @user-activated="(getUserDetails)"
        @user-deactivated="(getUserDetails)"
      />
    </template>

    <template v-else>
      <EmptyState
        :title="t('users.empty_title')"
        :description="t('users.empty_description')"
      >
        <template #icon>
          <PersonQuestionMarkIcon size="44px" />
        </template>
      </EmptyState>
    </template>
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.user-details-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--spacing-fluid-3-xl);
}
</style>
