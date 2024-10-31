<script lang="ts" setup>
import ProfileIcon from '~/assets/icons/svg/account.svg'
import type { User } from '~/types/users'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import DeleteIcon from '~/assets/icons/svg/delete-person.svg'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'

const props = defineProps<{
  user: User | null
}>()
const { t } = useI18n()
enum StatusType {
  Primary = 'primary',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Danger = 'danger',
}

const userData = computed(() => {
  return {
    fullName: props.user?.fullName || t('users.user_card.unknown_name'),
    email: props.user?.email || t('users.user_card.unknown_email'),
    status: props.user?.active ? t('users.user_card.active_status') : t('users.user_card.inactive_status'),
    statusType: props.user?.active ? StatusType.Success : StatusType.Danger,
    role: props.user?.role === 'admin' ? t('users.user_card.adminRole') : t('users.user_card.userRole'),
    updatedAt: props.user?.updatedAt ? formatDate(props.user.updatedAt, 'MMMM DD, YYYY') : t('users.user_card.unknown_date'),
    createdAt: props.user?.updatedAt ? formatDate(props.user.createdAt, 'MMMM DD, YYYY') : t('users.user_card.unknown_date'),
  }
})

/* Edit User */
const selectedUserEdit = ref<User | null >(props.user)
const editUserModalVisible = ref(false)

const openEditUserModal = () => {
  editUserModalVisible.value = true
}

const closeEditModal = () => {
  editUserModalVisible.value = false
}

/* Delete User */
const selectedUserDelete = ref<User | null >(props.user)
const deleteUserModalVisible = ref(false)

const openDeleteUserModal = () => {
  deleteUserModalVisible.value = true
}

const closeDeleteModal = () => {
  deleteUserModalVisible.value = false
}

/* Activate User */
const selectedUserActivate = ref<User | null >(props.user)
const activateUserModalVisible = ref(false)

const openActivateUserModal = () => {
  activateUserModalVisible.value = true
}

const closeActivateModal = () => {
  activateUserModalVisible.value = false
}

/* Dectivate User */
const selectedUserDeactivate = ref<User | null >(props.user)
const deactivateUserModalVisible = ref(false)

const openDeactivateUserModal = () => {
  deactivateUserModalVisible.value = true
}

const closeDeactivateModal = () => {
  deactivateUserModalVisible.value = false
}
</script>

<template>
  <section class="user-details-hero-section">
    <div class="profile-avatar-wrapper">
      <ProfileIcon size="80" />
      <div class="username-status-wrapper">
        <h5 class="username">
          {{ `${userData.fullName}` }}
        </h5>
        <el-tag :type="userData.statusType" size="small">
          <span class="status-dot" />  {{ userData?.status }}
        </el-tag>
      </div>
    </div>
    <div class="user-details-actions-wrapper">
      <el-button
        size="small"
        type="primary"
        @click="openEditUserModal"
      >
        <EditIcon />  Edit
      </el-button>
      <el-button
        v-if="!props.user?.active"
        size="small"
        type="primary"
        @click="openActivateUserModal"
      >
        <PersonPasskeyIcon />  Activate
      </el-button>
      <el-button
        v-if="props.user?.active"
        size="small"
        type="primary"
        @click="openDeactivateUserModal"
      >
        <PersonLockIcon />  Deactivate
      </el-button>
      <el-button
        plain
        type="danger"
        size="small"
        @click="openDeleteUserModal"
      >
        <DeleteIcon /> Delete
      </el-button>
    </div>
    <DeleteUserModal
      :is-open="deleteUserModalVisible"
      :selected-user="selectedUserDelete"
      @close-modal="closeDeleteModal"
    />

    <EditUserModal
      :is-open="editUserModalVisible"
      :selected-user="selectedUserEdit"
      @close-modal="closeEditModal"
    />

    <ActivateUserModal
      :is-open="activateUserModalVisible"
      :selected-user="selectedUserActivate"
      @close-modal="closeActivateModal"
    />

    <DeactivateUserModal
      :is-open="deactivateUserModalVisible"
      :selected-user="selectedUserDeactivate"
      @close-modal="closeDeactivateModal"
    />
  </section>
</template>

<style lang="scss" scoped>
.user-details-hero-section {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  padding-block: 1rem;

  & .profile-avatar-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-start;
    margin-right: 1rem;
    text-overflow: ellipsis;
  }

  & .user-details-actions-wrapper {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  & .username {
    font-weight: var(--font-weight-bold);
    line-height: normal;
  }
}
</style>
