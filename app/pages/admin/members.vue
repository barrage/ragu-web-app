<script lang="ts" setup>
import AddIcon from '~/assets/icons/svg/add.svg'

definePageMeta({
  layout: 'admin-layout',
})
const usersStore = useUsersStore()

usersStore.GET_AllUsers()
</script>

<template>
  <div class="admin-users-page-container ">
    <h4 class="page-title">
      Members
    </h4>
    <p class="description">
      Manage team members of your organization and set their access level
    </p>
    <div class="users-actions-container">
      <h6>{{ usersStore?.usersResponse?.length }} Members</h6>
      <div class="users-actions-wrapper">
        <el-input placeholder="Search user" />
        <el-button type="primary">
          <AddIcon />  Add member
        </el-button>
      </div>
    </div>
    <UsersList :users="usersStore.usersResponse" />
  </div>
</template>

<style lang="scss" scoped>
.admin-users-page-container {
  padding-left: 2rem;
  padding-top: 1rem;

  & .page-title {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--color-primary-900);
  }
  & .description {
    color: var(--color-primary-700);
  }
  & .users-actions-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 1.5rem;

    & h6 {
      color: var(--color-primary-700);
    }
    & .users-actions-wrapper {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      margin-bottom: 1.5rem;
    }
  }
}

.dark {
  & .page-title {
    color: var(--color-primary-100);
  }
  & .description {
    color: var(--color-primary-300);
  }
  & .users-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
