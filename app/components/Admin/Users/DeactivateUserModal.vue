<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { User } from '~/types/users'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'

const props = defineProps<{
  selectedUser: User | null
  isOpen: boolean
}>()

const emits = defineEmits<Emits>()
const deactivateUserModalVisible = ref(props.isOpen)
const usersStore = useUsersStore()
const closeModal = () => {
  deactivateUserModalVisible.value = false
  emits('closeModal')
}

watch(() => props.isOpen, (newVal) => {
  deactivateUserModalVisible.value = newVal
})
interface Emits {
  (event: 'closeModal'): void
}
const { execute: deactivateUser, error } = await useAsyncData(() => usersStore.PUT_DectivateUser(props.selectedUser!.id), { immediate: false })

const submitDeactivateUser = async () => {
  if (props.selectedUser?.id) {
    deactivateUser()
    deactivateUserModalVisible.value = false
    if (error.value) {
      ElNotification({
        title: 'Error',
        message: 'Failed to deactivate the user.',
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
    else {
      usersStore.GET_AllUsers()
      ElNotification({
        title: 'Success',
        message: `User ${props.selectedUser?.fullName} deactivated successfully!`,
        type: 'success',
        customClass: 'success',
        duration: 2500,
      })
    }
  }
}
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="deactivateUserModalVisible"
      destroy-on-close
      align-center
      class="barrage-dialog--small"
      :close-icon="CloseCircleIcon"
      @close="closeModal"
    >
      <template #header>
        <div class="activate-user-modal-header">
          <PersonLockIcon size="42px" />
          <h5> {{ $t('users.user_card.deactivate_user') }}</h5>
        </div>
      </template>
      <div>
        <p>
          Are you sure you want to deactivate user:  <br> <b>{{ props.selectedUser?.fullName }}</b>
        </p>
      </div>

      <template #footer>
        <el-button @click="closeModal()">
          Cancel
        </el-button>
        <el-button type="danger" @click="submitDeactivateUser()">
          Deactivate
        </el-button>
      </template>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.activate-user-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
