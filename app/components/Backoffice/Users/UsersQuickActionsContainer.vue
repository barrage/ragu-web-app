<script lang="ts" setup>
import AddPersonIcon from '~/assets/icons/svg/person-add.svg'
import AddCsvIcon from '~/assets/icons/svg/document.svg'

// Invite User
const inviteUserModalVisible = ref(false)

const openInviteUserModal = () => {
  inviteUserModalVisible.value = true
}

// Import CSV
const importCsvModalVisible = ref(false)

const openCsvModal = () => {
  importCsvModalVisible.value = true
}
</script>

<template>
  <div class="users-actions-container">
    <el-button
      type="primary"
      data-testid="bo-users-create-user-button"
      @click="openInviteUserModal"
    >
      <AddPersonIcon size="20px" /> {{ $t('users.invite_user') }}
    </el-button>
    <LlmTooltip
      :content="$t('users.import.title')"
    >
      <el-button
        type="primary"
        data-testid="bo-users-create-user-button"
        @click="openCsvModal"
      >
        <AddCsvIcon size="20px" />{{ $t('users.import_users') }}
      </el-button>
    </LlmTooltip>
    <CreateUserModalBackoffice v-model="inviteUserModalVisible" />
    <ImportUsersCsvModalBackoffice v-model="importCsvModalVisible" />
  </div>
</template>

<style lang="scss" scoped>
.users-actions-container {
  display: flex;
  justify-content: space-between;
  gap: 22px;
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
