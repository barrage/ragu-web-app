<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { User } from '~/types/users'
import DeletePersonIcon from '~/assets/icons/svg/delete-person.svg'

const props = defineProps<{
  selectedUser: User | null
  isOpen: boolean
}>()

const emits = defineEmits<Emits>()
const { t } = useI18n()
const deleteUserModalVisible = ref(props.isOpen)
const usersStore = useUsersStore()
const closeModal = () => {
  deleteUserModalVisible.value = false
  emits('closeModal')
}

watch(() => props.isOpen, (newVal) => {
  deleteUserModalVisible.value = newVal
})
interface Emits {
  (event: 'closeModal'): void
  (event: 'userDeleted'): void
}
const { execute: deleteUser, error } = await useAsyncData(() => usersStore.DELETE_User(props.selectedUser!.id), { immediate: false })

const submitDeleteUser = async () => {
  if (props.selectedUser?.id) {
    await deleteUser()
    deleteUserModalVisible.value = false
    if (error.value) {
      ElNotification({
        title: t('users.delete_user.notifications.error_title'),
        message: t('users.delete_user.notifications.error_description'),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
    else {
      emits('userDeleted')
      ElNotification({
        title: t('users.delete_user.notifications.success_title'),
        message: t('users.delete_user.notifications.success_description'),
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
      v-model="deleteUserModalVisible"
      destroy-on-close
      align-center
      class="barrage-dialog--small"
      :close-icon="CloseCircleIcon"
      @close="closeModal"
    >
      <template #header>
        <div class="delete-user-modal-header">
          <DeletePersonIcon size="42px" />
          <h5> {{ $t('users.delete_user.title') }}</h5>
        </div>
      </template>
      <div class="delete-user-modal-body">
        <span class="delete-user-description">
          {{ $t('users.delete_user.description') }}
        </span>
        <template v-if="props.selectedUser">
          <UserProfileOverview :user="props.selectedUser" />
        </template>
      </div>

      <template #footer>
        <el-button @click="closeModal">
          {{ $t('users.delete_user.cancel') }}
        </el-button>
        <el-button type="danger" @click="submitDeleteUser()">
          {{ $t('users.delete_user.confirm') }}
        </el-button>
      </template>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.delete-user-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.delete-user-modal-body {
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-bottom: 12px;

  & .delete-user-description {
    color: var(--color-primary-800);
    font-size: var(--font-size-fluid-3);
    line-height: normal;
  }

  & .user-profile-item {
    border: 0.5px solid var(--color-primary-300);
    border-radius: 16px;
    padding: 1rem;
  }
}
.dark {
  .delete-user-description {
    color: var(--color-primary-100);
    font-size: var(--font-size-fluid-3);
    line-height: normal;
  }
}
</style>
