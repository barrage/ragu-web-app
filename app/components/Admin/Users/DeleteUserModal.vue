<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { User } from '~/types/users'

const props = defineProps<{
  selectedUser: User | null
  isOpen: boolean
}>()

const emits = defineEmits<Emits>()
const deleteUserModalVisible = ref(props.isOpen)

const closeModal = () => {
  deleteUserModalVisible.value = false
  emits('toggleModal')
}

const submitDeleteUser = async () => {
  if (props.selectedUser) {
    emits('deleteUserConfirm', props.selectedUser)
  }
}

watch(() => props.isOpen, (newVal) => {
  deleteUserModalVisible.value = newVal
})
interface Emits {
  (event: 'toggleModal'): void
  (event: 'deleteUserConfirm', user: User): void
}
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="deleteUserModalVisible"
      destroy-on-close
      align-center
      class="barrage-dialog--small"
      :close-icon="CloseCircleIcon"
      @close="'closeModal'"
    >
      <template #header>
        <h6>Delete User</h6>
      </template>
      <div>
        <p>
          Are you sure you want to delete user:  <br> <b>{{ props.selectedUser?.fullName }}</b>
        </p>
      </div>

      <template #footer>
        <el-button @click="closeModal">
          Cancel
        </el-button>
        <el-button type="danger" @click="submitDeleteUser()">
          Delete
        </el-button>
      </template>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped />
