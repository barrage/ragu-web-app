<script lang="ts" setup>
import { nextTick } from 'vue'
import type { User } from '~/types/users'
import type { Pagination } from '~/types/pagination'

const props = defineProps<{
  users: User[] | null | undefined
}>()

const emits = defineEmits<{
  (event: 'pageChange', page: number): number
}>()

const usersStore = useUsersStore()
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

const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
  total: usersStore.usersResponse?.total || 0,
  disabled: false,
})

const changePage = (page: number) => {
  pagination.value.currentPage = page
  emits('pageChange', pagination.value.currentPage)
}

watch(
  () => usersStore.usersResponse?.total,
  (newTotal) => {
    if (newTotal !== undefined) {
      pagination.value.total = newTotal
    }
  },
)
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

/* Delete User */
const selectedUserDelete = ref<User | null>(null)
const deleteUserModalVisible = ref(false)

const openDeleteUserModal = (user: User) => {
  selectedUserDelete.value = user
  deleteUserModalVisible.value = true
}

const closeDeleteModal = () => {
  deleteUserModalVisible.value = false
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
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @page-change="(page:number) => changePage(page)"
      />
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
