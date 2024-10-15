<script lang="ts" setup>
import type { User } from '~/types/users'

const props = defineProps<{
  user: User | null | undefined
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

.horizontal-divider {
  width: 100%;
  height: 1px;
  margin: 4px 0px;
  background: var(--color-primary-300);
}

.dark {
  & .horizontal-divider {
    background: var(--color-primary-700);
  }
}
</style>
