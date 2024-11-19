<script lang="ts" setup>
import { nextTick } from 'vue'
import type { User } from '~/types/users'
import type { Pagination } from '~/types/pagination'

const props = defineProps<{
  users: User[] | null | undefined
  pagination: Pagination
}>()

const emits = defineEmits<{
  (event: 'pageChange', page: number): number
  (event: 'userDeleted'): void
  (event: 'userEdited'): void
  (event: 'userDeactivated'): void
  (event: 'userActivated'): void

}>()

const cardClasses = ref<string[]>([])

const applyCardClasses = () => {
  cardClasses.value = []
  props.users?.forEach((_, index) => {
    setTimeout(() => {
      cardClasses.value[index] = 'list-item-visible'
    }, index * 100)
  })
}

watch(
  () => props.users,
  () => {
    nextTick(applyCardClasses)
  },
  { immediate: true },
)

const changePage = (page: number) => {
  emits('pageChange', page)
}

/* Edit User */
const selectedUserEdit = ref<User | null>(null)
const editUserModalVisible = ref(false)

const openEditUserModal = (user: User) => {
  selectedUserEdit.value = user
  editUserModalVisible.value = true
}

const closeEditModal = () => {
  editUserModalVisible.value = false
}
const userEdited = () => {
  emits('userEdited')
}

/* Delete User */
const selectedUserDelete = ref<User>()
const deleteUserModalVisible = ref(false)

const openDeleteUserModal = (user: User) => {
  selectedUserDelete.value = user
  deleteUserModalVisible.value = true
}

const closeDeleteModal = () => {
  deleteUserModalVisible.value = false
}

const userDeleted = () => {
  emits('userDeleted')
}

/* Activate User */
const selectedUserActivate = ref<User | null>(null)
const activateUserModalVisible = ref(false)

const openActivateUserModal = (user: User) => {
  selectedUserActivate.value = user
  activateUserModalVisible.value = true
}

const closeActivateModal = () => {
  activateUserModalVisible.value = false
}
const userActivated = () => {
  emits('userActivated')
}
/* Dectivate User */
const selectedUserDeactivate = ref<User | null>(null)
const deactivateUserModalVisible = ref(false)

const openDeactivateUserModal = (user: User) => {
  selectedUserDeactivate.value = user
  deactivateUserModalVisible.value = true
}

const closeDeactivateModal = () => {
  deactivateUserModalVisible.value = false
}

const userDeactivated = () => {
  emits('userDeactivated')
}
</script>

<template>
  <div class="users-list-container">
    <div class="users-list">
      <div
        v-for="(user, index) in props.users"
        :key="user.id"
        class="list-item"
        :class="[cardClasses[index]]"
      >
        <UserCard
          :user="user"
          @delete-user="openDeleteUserModal(user)"
          @edit-user="openEditUserModal(user)"
          @activate-user="openActivateUserModal(user)"
          @deactivate-user="openDeactivateUserModal(user)"
        />
      </div>

      <Pagination
        :current-page="props.pagination.currentPage"
        :page-size="props.pagination.pageSize"
        :total="props.pagination.total"
        @page-change="(page:number) => changePage(page)"
      />
    </div>

    <DeleteUserModalBackoffice
      :is-open="deleteUserModalVisible"
      :selected-user="selectedUserDelete"
      @close-modal="closeDeleteModal"
      @user-deleted="userDeleted"
    />

    <EditUserModalBackoffice
      :is-open="editUserModalVisible"
      :selected-user="selectedUserEdit"
      @close-modal="closeEditModal"
      @user-edited="userEdited"
    />

    <ActivateUserModalBackoffice
      :is-open="activateUserModalVisible"
      :selected-user="selectedUserActivate"
      @close-modal="closeActivateModal"
      @user-activated="userActivated"
    />

    <DeactivateUserModalBackoffice
      :is-open="deactivateUserModalVisible"
      :selected-user="selectedUserDeactivate"
      @close-modal="closeDeactivateModal"
      @user-deactivated="userDeactivated"
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

.list-item {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.list-item-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
