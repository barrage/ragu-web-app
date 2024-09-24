<script lang="ts" setup>
import type { UsersResponse } from '~/types/users'

const props = defineProps<{
  users: UsersResponse | null | undefined
}>()
</script>

<template>
  <div class="users-list-container">
    <template v-for="user in props.users" :key="user.id">
      <UserCard :user="user" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.users-list-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}
</style>
