<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { User } from '~/types/users'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'

const props = defineProps<{
  selectedUser: User | null
  isOpen: boolean
}>()

const emits = defineEmits<Emits>()
const activateUserModalVisible = ref(props.isOpen)
const usersStore = useUsersStore()
const closeModal = () => {
  activateUserModalVisible.value = false
  emits('closeModal')
}

watch(() => props.isOpen, (newVal) => {
  activateUserModalVisible.value = newVal
})
interface Emits {
  (event: 'closeModal'): void
  (event: 'userActivated'): void
}
const { execute: activateUser, error } = await useAsyncData(() => usersStore.PUT_ActivateUser(props.selectedUser!.id), { immediate: false })

const submitActivateUser = async () => {
  if (props.selectedUser?.id) {
    await activateUser()
    activateUserModalVisible.value = false
    if (error.value) {
      ElNotification({
        title: 'Error',
        message: 'Failed to activate the user.',
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
    else {
      emits('userActivated')
      ElNotification({
        title: 'Success',
        message: `User ${props.selectedUser?.fullName} activated successfully!`,
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
      v-model="activateUserModalVisible"
      destroy-on-close
      align-center
      class="barrage-dialog--small"
      :close-icon="CloseCircleIcon"
      @close="closeModal"
    >
      <template #header>
        <div class="activate-user-modal-header">
          <PersonPasskeyIcon size="42px" />
          <h5> {{ $t('users.user_card.activate_user') }}</h5>
        </div>
      </template>
      <div>
        <p>
          Are you sure you want to activate user:  <br> <b>{{ props.selectedUser?.fullName }}</b>
        </p>
      </div>

      <template #footer>
        <el-button @click="closeModal">
          Cancel
        </el-button>
        <el-button type="danger" @click="submitActivateUser()">
          Activate
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
