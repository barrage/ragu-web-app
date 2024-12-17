<script lang="ts" setup>
import type { User } from '~/types/users'

const props = defineProps<{
  users: User[] | null | undefined
}>()

const emits = defineEmits<{
  (event: 'userDeleted'): void
  (event: 'userEdited'): void
  (event: 'userDeactivated'): void
  (event: 'userActivated'): void
}>()

/* Edit User */
const selectedUserEdit = ref<User | null>(null)
const editUserModalVisible = ref(false)

const openEditUserModal = (user: User) => {
  selectedUserEdit.value = user
  editUserModalVisible.value = true
}

const handleUserEdited = () => {
  emits('userEdited')
}

/* Delete User */
const selectedUserDelete = ref<User>()
const deleteUserModalVisible = ref(false)

const openDeleteUserModal = (user: User) => {
  selectedUserDelete.value = user
  deleteUserModalVisible.value = true
}

const handleUserDeleted = () => {
  emits('userDeleted')
}

/* Activate User */
const selectedUserActivate = ref<User | null>(null)
const activateUserModalVisible = ref(false)

const openActivateUserModal = (user: User) => {
  selectedUserActivate.value = user
  activateUserModalVisible.value = true
}

const handleUserActivated = () => {
  emits('userActivated')
}
/* Dectivate User */
const selectedUserDeactivate = ref<User | null>(null)
const deactivateUserModalVisible = ref(false)

const openDeactivateUserModal = (user: User) => {
  selectedUserDeactivate.value = user
  deactivateUserModalVisible.value = true
}

const handleUserDeactivated = () => {
  emits('userDeactivated')
}
</script>

<template>
  <div class="users-list-container">
    <div class="users-list">
      <div
        v-for="(user, index) in props.users"
        :key="user.id"
      >
        <UserCard
          v-motion-fade
          :data-testid="`bo-user-data-card-${index + 1}`"
          :delay="(index * 100)"
          :duration="400"
          :user="user"
          @delete-user="openDeleteUserModal(user)"
          @edit-user="openEditUserModal(user)"
          @activate-user="openActivateUserModal(user)"
          @deactivate-user="openDeactivateUserModal(user)"
        />
      </div>
    </div>

    <DeleteUserModalBackoffice
      v-model="deleteUserModalVisible"
      :selected-user="selectedUserDelete"
      @user-deleted="handleUserDeleted"
    />

    <EditUserModalBackoffice
      v-model="editUserModalVisible"
      :selected-user="selectedUserEdit"
      @user-edited="handleUserEdited"
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
  </div>
</template>

<style lang="scss" scoped>
.users-list-container {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.users-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>
