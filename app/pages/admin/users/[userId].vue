<script lang="ts" setup>
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'

definePageMeta({
  layout: 'admin-layout',
})
const { t } = useI18n()
const route = useRoute()

const usersStore = useUsersStore()

const selectedUserId = computed(() => {
  const userId = Array.isArray(route.params.userId) ? route.params.userId[0] : route.params.userId
  return userId || ''
})

const { error } = await useAsyncData(() => usersStore.GET_SingleUser(selectedUserId.value))

errorHandler(error)
</script>

<template>
  <AdminPageContainer>
    <NuxtLink to="/admin/users" class="back-link">
      <ArrowLeftIcon /> {{ t('users.title') }}
    </NuxtLink>

    <UserDetails :user="usersStore.selectedUser" />
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.back-link {
  display: flex;
  gap: 4px;
  align-items: center;
}
</style>
