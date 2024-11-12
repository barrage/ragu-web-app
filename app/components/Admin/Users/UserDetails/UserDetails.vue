<script lang="ts" setup>
import type { User } from '~/types/users'

const props = defineProps<{
  user: User | null
}>()
</script>

<template>
  <div class="user-details-wrapper">
    <UserDetailsHeroSection :user="props.user" />
    <div class="horizontal-divider" />
    <UserDetailsInformationsSection :user="props.user" />
    <div class="horizontal-divider" />
  </div>
</template>

<style lang="scss" scoped>
.users-list-container {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}
</style>
