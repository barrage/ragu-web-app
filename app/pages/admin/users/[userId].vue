<script lang="ts" setup>
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'
import PersonQuestionMarkIcon from '~/assets/icons/svg/person-question-mark.svg'

definePageMeta({
  layout: 'admin-layout',
})
const { t } = useI18n()
const route = useRoute()

const usersStore = useUsersStore()

useHead({
  title: computed(() => t('users.details')),
})

const selectedUserId = computed(() => {
  const userId = Array.isArray(route.params.userId) ? route.params.userId[0] : route.params.userId
  return userId || ''
})

const { error, status } = await useAsyncData(() => usersStore.GET_SingleUser(selectedUserId.value))

errorHandler(error)
</script>

<template>
  <AdminPageContainer>
    <NuxtLink to="/admin/users" class="back-link">
      <ArrowLeftIcon size="20px" /> {{ t('users.title') }}
    </NuxtLink>

    <template v-if="status === 'pending'">
      <div class="user-details-loader">
        <MeetUpLoader />
      </div>
    </template>
    <template v-else-if="usersStore.selectedUser?.id">
      <UserDetails :user="usersStore.selectedUser" />
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

.back-link {
  display: flex;
  gap: 4px;
  align-items: center;
}
</style>
