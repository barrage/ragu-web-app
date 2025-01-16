<script lang="ts" setup>
import ProfileIcon from '~/assets/icons/svg/account.svg'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import DeleteIcon from '~/assets/icons/svg/delete-person.svg'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'
import { StatusType } from '~/types/statusTypes'
import type { User } from '~/types/users'

const props = defineProps<{
  user: User | undefined | null
}>()

const emits = defineEmits<{
  (event: 'userDeleted'): void
  (event: 'userEdited'): void
  (event: 'userDeactivated'): void
  (event: 'userActivated'): void
}>()
const { t } = useI18n()
const router = useRouter()

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

const oAuthStore = useAuthStore()

const isLoggedInUserViewingOwnProfile = computed(() => {
  return oAuthStore.user?.id === props.user?.id
})

/* Edit User */
const selectedUserEdit = ref<User | undefined | null >(props.user)
const editUserModalVisible = ref(false)

const openEditUserModal = () => {
  editUserModalVisible.value = true
}

const handleUserUpdated = () => {
  emits('userEdited')
}
/* Delete User */
const selectedUserDelete = ref<User | undefined | null>(props.user)
const deleteUserModalVisible = ref(false)

const openDeleteUserModal = () => {
  deleteUserModalVisible.value = true
}

const handleUserDeleted = () => {
  router.push(`/admin/users`)
  emits('userDeleted')
}
/* Activate User */
const selectedUserActivate = ref<User | undefined | null>(props.user)
const activateUserModalVisible = ref(false)

const openActivateUserModal = () => {
  activateUserModalVisible.value = true
}

const handleUserActivated = () => {
  emits('userActivated')
}

/* Dectivate User */
const selectedUserDeactivate = ref<User | undefined | null>(props.user)
const deactivateUserModalVisible = ref(false)

const openDeactivateUserModal = () => {
  deactivateUserModalVisible.value = true
}
const handleUserDeactivated = () => {
  emits('userDeactivated')
}
</script>

<template>
  <section class="user-details-hero-section">
    <div class="profile-avatar-wrapper">
      <ProfileIcon size="80px" class="profile-icon" />
      <div>
        <h5 class="username">
          {{ `${userData.fullName}` }}
        </h5>
        <ElTag :type="userData.statusType" size="small">
          <span class="status-dot" />  {{ userData?.status }}
        </ElTag>
      </div>
    </div>
    <div class="user-details-actions-wrapper">
      <ElButton
        size="small"
        type="primary"
        plain
        @click="openEditUserModal"
      >
        <EditIcon size="20px" />  {{ t('users.user_card.edit_user_title') }}
      </ElButton>
      <ElButton
        v-if="!props.user?.active"
        size="small"
        type="primary"
        plain
        @click="openActivateUserModal"
      >
        <PersonPasskeyIcon size="20px" />   {{ t('users.user_card.activate_user_title') }}
      </ElButton>
      <ElButton
        v-if="props.user?.active && !isLoggedInUserViewingOwnProfile"
        size="small"
        type="primary"
        plain
        @click="openDeactivateUserModal"
      >
        <PersonLockIcon size="20px" />   {{ t('users.user_card.deactivate_user_title') }}
      </ElButton>
      <ElButton
        v-if="!isLoggedInUserViewingOwnProfile"
        plain
        type="danger"
        size="small"
        @click="openDeleteUserModal"
      >
        <DeleteIcon size="20px" />  {{ t('users.user_card.delete_user_title') }}
      </ElButton>
    </div>

    <DeleteUserModalBackoffice
      v-model="deleteUserModalVisible"
      :selected-user="selectedUserDelete"
      @user-deleted="handleUserDeleted"
    />

    <EditUserModalBackoffice
      v-model="editUserModalVisible"
      :selected-user="selectedUserEdit"
      @user-edited="handleUserUpdated"
    />

    <ActivateUserModalBackoffice
      v-model="activateUserModalVisible"
      :selected-user="selectedUserActivate"
      @user-activated="handleUserActivated"
    />

    <DeactivateUserModalBackoffice
      v-model="deactivateUserModalVisible"
      :selected-user="selectedUserDeactivate"
      @user-deactivated="handleUserDeactivated"
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
    .profile-icon {
      color: var(--color-primary-900);
    }
  }

  & .user-details-actions-wrapper {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  & .username {
    font-weight: var(--font-weight-semibold);
    line-height: normal;
    color: var(--color-primary-900);
  }
}

.dark {
  .user-details-hero-section {
    .profile-avatar-wrapper {
      .profile-icon {
        color: var(--color-primary-0);
      }
    }
    .username {
      color: var(--color-primary-0);
    }
  }
}
</style>
