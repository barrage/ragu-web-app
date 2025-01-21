<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { User } from '~/types/users'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'

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
  (event: 'userDeactivated'): void
}

const { execute: executeDeactivateUser, error: deactivateUserError, status: deactivateUserStatus } = await useAsyncData(() => $api.user.PutDeactivateUser(props.selectedUser!.id), {
  immediate: false,
})

const submitDeactivateUser = async () => {
  if (props.selectedUser?.id) {
    await executeDeactivateUser()
    if (deactivateUserError.value) {
      ElNotification({
        title: t('users.deactivate_user.notifications.error_title'),
        message: t('users.deactivate_user.notifications.error_description'),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
    else {
      emits('userDeactivated')
      ElNotification({
        title: t('users.deactivate_user.notifications.success_title'),
        message: t('users.deactivate_user.notifications.success_description'),
        type: 'success',
        customClass: 'success',
        duration: 2500,
      })
    }
  }
}

const isDeactivateUserLoading = computed(() => {
  return deactivateUserStatus.value === 'pending'
})
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="isOpen"
      destroy-on-close
      data-testid="bo-deactivate-user-dialog"
      align-center
      class="barrage-dialog--small"
      :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
      @close="closeModal"
    >
      <template #header>
        <div class="deactivate-user-modal-header">
          <PersonLockIcon size="42px" />
          <h5> {{ $t('users.deactivate_user.title') }}</h5>
        </div>
      </template>
      <div class="deactivate-user-modal-body">
        <p>
          {{ $t('users.deactivate_user.description') }}
        </p>
        <el-card class="is-primary">
          <UserProfileOverview :user="props.selectedUser" />
        </el-card>
      </div>

      <template #footer>
        <el-button
          type="primary"
          data-testid="close-deactivate-user-modal-button"
          @click="closeModal()"
        >
          {{ $t('users.deactivate_user.cancel') }}
        </el-button>
        <el-button
          data-testid="confirm-deactivate-user-modal-button"
          type="danger"
          :disabled="isDeactivateUserLoading"
          @click="submitDeactivateUser()"
        >
          {{ $t('users.deactivate_user.confirm') }}
        </el-button>
      </template>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.deactivate-user-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.deactivate-user-modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
