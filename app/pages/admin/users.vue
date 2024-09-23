<script lang="ts" setup>
definePageMeta({
  layout: 'admin-layout',
})
const usersStore = useUsersStore()

usersStore.GET_AllUsers()
</script>

<template>
  <div class="admin-users-page-container">
    <h4 class="page-title">
      Users
    </h4>

    <UsersList :users="usersStore.usersResponse" />
  </div>
</template>

<style lang="scss" scoped>
.admin-users-page-container {
  padding-left: 2rem;
  & .page-title {
    margin-bottom: 2rem;
    font-weight: 600;
    color: var(--color-primary-900);
  }
}

.dark {
  & .page-title {
    margin-bottom: 2rem;
    color: var(--color-primary-100);
  }
}
</style>
