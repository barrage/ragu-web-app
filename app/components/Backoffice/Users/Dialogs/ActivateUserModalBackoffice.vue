<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { User } from '~/types/users'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'

const props = defineProps<{
  selectedUser: User | undefined | null
}>()

const emits = defineEmits<Emits>()
const isOpen = defineModel<boolean>()
const { $api } = useNuxtApp()
const { t } = useI18n()

const closeModal = () => {
  isOpen.value = false
}

interface Emits {
  (event: 'userActivated'): void
}
const { execute: executeActivateUser, error: activateUserError, status: activateUserStatus } = await useAsyncData(() => $api.user.PutActivateUser(props.selectedUser!.id), {
  immediate: false,
})
const submitActivateUser = async () => {
  if (props.selectedUser?.id) {
    await executeActivateUser()
    if (activateUserError.value) {
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
      closeModal()

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

const isActivateUserLoading = computed(() => {
  return activateUserStatus.value === 'pending'
})
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="isOpen"
      data-testid="bo-activate-user-dialog"
      destroy-on-close
      align-center
      class="barrage-dialog--small"
      :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
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
          :disabled="isActivateUserLoading"
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
