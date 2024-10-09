<script lang="ts" setup>
import AddIcon from '~/assets/icons/svg/add.svg'

const usersStore = useUsersStore()
</script>

<template>
  <div class="users-actions-container">
    <el-button type="primary">
      <AddIcon />  Invite member
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.users-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.5rem;

  & h6 {
    color: var(--color-primary-800);
  }
  & .users-actions-wrapper {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    margin-bottom: 1.5rem;
  }
}
.dark {
  .users-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
