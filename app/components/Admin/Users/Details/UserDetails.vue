<script lang="ts" setup>
import type { User } from '~/types/users'

defineProps<{
  user: User | null
}>()

const { isWhatsAppActive } = storeToRefs(useWhatsAppStore())
</script>

<template>
  <div class="user-details-wrapper">
    <UserDetailsHeroSection :user="user" />
    <div class="horizontal-divider" />
    <UserDetailsInformationsSection :user="user" />
    <div class="horizontal-divider" />
    <UserChats :user="user" />
    <div class="horizontal-divider" />
    <template v-if="isWhatsAppActive">
      <UserWhatsAppNumbersSection :user="user" />
      <div class="horizontal-divider" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.users-list-container {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}
</style>
