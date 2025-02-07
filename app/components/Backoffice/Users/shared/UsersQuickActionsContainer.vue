<script lang="ts" setup>
import AddPersonIcon from '~/assets/icons/svg/person-add.svg'
</script>

<template>
  <div class="users-actions-container">
    <LlmLink to="/admin/users/create" type="buttonPrimary">
      <AddPersonIcon size="24px" /> {{ $t('users.invite_user') }}
    </LlmLink>
  </div>
</template>

<style lang="scss" scoped>
.users-actions-container {
  display: flex;
  justify-content: space-between;
  gap: 22px;
  align-items: center;
  padding-left: 1.5rem;
  & .users-actions-wrapper {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    margin-bottom: 1.5rem;
  }
}
</style>
