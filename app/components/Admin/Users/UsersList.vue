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
    usersStore.GET_AllUsers()
    ElNotification({
      title: 'Success',
      message: `User ${selectedUser.value?.fullName} deleted successfully!`,
      type: 'success',
      customClass: 'success',
      duration: 2500,
    })
  }
  catch {
    ElNotification({
      title: 'Error',
      message: 'Failed to delete the user.',
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
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

watch(
  () => usersStore.usersResponse?.total,
  (newTotal) => {
    if (newTotal !== undefined) {
      pagination.value.total = newTotal
    }
  },
)
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
        @page-change="(page:number) => changePage(page)"
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
