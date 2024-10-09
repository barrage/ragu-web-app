<script lang="ts" setup>
import FilterIcon from '~/assets/icons/svg/filter.svg'

const usersStore = useUsersStore()
</script>

<template>
  <div class="users-actions-container">
    <div class="users-actions-wrapper">
      <SearchInput placeholder="Search user" />
      <h6> <b>{{ usersStore?.usersResponse?.length || 0 }}</b> members</h6>
    </div>
    <el-button>
      <FilterIcon />
      Filter
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.users-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
  margin-bottom: 1.5rem;

  & h6 {
    color: var(--color-primary-800);
  }
  & .users-actions-wrapper {
    display: flex;
    gap: 1.5rem;
    align-items: center;
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
