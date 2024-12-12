<script lang="ts" setup>
import type { User } from '~/types/users'

defineProps<{
  user: User | null
}>()

const emits = defineEmits<{
  (event: 'userDeleted'): void
  (event: 'userEdited'): void
  (event: 'userDeactivated'): void
  (event: 'userActivated'): void
}>()

const { isWhatsAppActive } = storeToRefs(useWhatsAppStore())
</script>

<template>
  <div class="user-details-wrapper">
    <UserDetailsHeroSection
      :user="user"
      @user-deleted="(emits('userDeleted'))"
      @user-edited="(emits('userEdited'))"
      @user-activated="(emits('userDeactivated'))"
      @user-deactivated="(emits('userActivated'))"
    />
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
