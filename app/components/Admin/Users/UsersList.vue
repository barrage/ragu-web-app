<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import type { User } from '~/types/users'
import type { Pagination } from '~/types/pagination'

const props = defineProps<{
  users: User[] | null | undefined
}>()

const emits = defineEmits<{
  (event: 'pageChange', page: number): number
}>()

const cardClasses = ref<string[]>([])

onMounted(() => {
  nextTick(() => {
    props.users?.forEach((_, index) => {
      setTimeout(() => {
        cardClasses.value[index] = 'list-item-visible'
      }, index * 100)
    })
  })
})

const selectedUser = ref<User | null>(null)
const deleteUserModalVisible = ref(false)

const openDeleteUserModal = (user: User) => {
  selectedUser.value = user
  deleteUserModalVisible.value = true
}

const toggleModal = () => {
  deleteUserModalVisible.value = !deleteUserModalVisible.value
}

const usersStore = useUsersStore()
const handleDeleteUser = async (user: User) => {
  try {
    await usersStore.DELETE_User(user.id)
    deleteUserModalVisible.value = false
  }
  catch (error) {
    console.error('Error deleting user:', error)
  }
}

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
        <UserCard :user="user" @delete-user="openDeleteUserModal(user)" />
      </div>
      <Pagination
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @page-change="(page) => changePage(page)"
      />
    </div>

    <DeleteUserModal
      :is-open="deleteUserModalVisible"
      :selected-user="selectedUser"
      @toggle-modal="toggleModal"
      @delete-user-confirm="handleDeleteUser"
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
