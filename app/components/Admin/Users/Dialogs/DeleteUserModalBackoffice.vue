<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import DeletePersonIcon from '~/assets/icons/svg/delete-person.svg'
import type { User } from '~/types/users'

const props = defineProps<{
  selectedUser: User | null | undefined
}>()

const emits = defineEmits<Emits>()

const isOpen = defineModel<boolean>()

const { $api } = useNuxtApp()
const { t } = useI18n()

const closeModal = () => {
  isOpen.value = false
}

interface Emits {
  (event: 'userDeleted'): void
}

const { execute: executeDeleteUser, error: deleteUserError, status: deleteUserStatus } = await useAsyncData(() => $api.user.DeleteUser(props.selectedUser!.id), {
  immediate: false,
})

const submitDeleteUser = async () => {
  if (props.selectedUser?.id) {
    await executeDeleteUser()

    if (deleteUserError.value) {
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
      closeModal()

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

const isDeleteUserLoading = computed(() => {
  return deleteUserStatus.value === 'pending'
})
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="isOpen"
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
          <el-card class="is-primary">
            <UserProfileOverview :user="props.selectedUser" />
          </el-card>
        </template>
      </div>

      <template #footer>
        <el-button @click="closeModal">
          {{ $t('users.delete_user.cancel') }}
        </el-button>

        <el-button
          type="danger"
          :disabled="isDeleteUserLoading"
          @click="submitDeleteUser()"
        >
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
}
.dark {
  .delete-user-description {
    color: var(--color-primary-100);
    font-size: var(--font-size-fluid-3);
    line-height: normal;
  }
}
</style>
