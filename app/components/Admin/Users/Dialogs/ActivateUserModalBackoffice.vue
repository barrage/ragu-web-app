<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { User } from '~/types/users'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'

const props = defineProps<{
  selectedUser: User | null
  isOpen: boolean
}>()

const emits = defineEmits<Emits>()
const { t } = useI18n()
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
        title: t('users.activate_user.notifications.error_title'),
        message: t('users.activate_user.notifications.error_description'),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
    else {
      emits('userActivated')
      ElNotification({
        title: t('users.activate_user.notifications.success_title'),
        message: t('users.activate_user.notifications.success_description'),
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
          <h5> {{ $t('users.activate_user.title') }}</h5>
        </div>
      </template>
      <div class="activate-user-modal-body">
        <p>
          {{ $t('users.activate_user.description') }}
        </p>
        <el-card class="is-primary">
          <UserProfileOverview :user="props.selectedUser" />
        </el-card>
      </div>

      <template #footer>
        <el-button
          type="primary"
          data-testid="close-activate-user-modal-button"
          @click="closeModal"
        >
          {{ $t('users.activate_user.cancel') }}
        </el-button>
        <el-button
          type="danger"
          data-testid="confirm-activate-user-modal-button"
          @click="submitActivateUser()"
        >
          {{ $t('users.activate_user.confirm') }}
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
.activate-user-modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
