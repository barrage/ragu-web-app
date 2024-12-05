<script lang="ts" setup>
import AddPersonIcon from '~/assets/icons/svg/person-add.svg'

/* Invite */
const inviteUserModalVisible = ref(false)

const openInviteUserModal = () => {
  inviteUserModalVisible.value = true
}

const closeInviteUserModal = () => {
  inviteUserModalVisible.value = false
}
</script>

<template>
  <div class="users-actions-container">
    <el-button
      type="primary"
      @click="openInviteUserModal()"
    >
      <AddPersonIcon size="20px" /> {{ $t('users.invite_user') }}
    </el-button>
    <CreateUserModalBackoffice
      :is-open="inviteUserModalVisible"
      @close-modal="closeInviteUserModal"
    />
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

.add-user-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.form-actions {
  display: flex;
  gap: 22px;
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;
}
.dark {
  .users-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
