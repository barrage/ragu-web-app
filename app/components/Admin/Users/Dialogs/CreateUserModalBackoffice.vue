<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import AddPersonIcon from '~/assets/icons/svg/person-add.svg'

const emits = defineEmits<Emits>()
interface Emits {
  (event: 'userInvited'): void
}

const isOpen = defineModel<boolean>()

const resetFormTrigger = ref(false)
const closeModal = () => {
  isOpen.value = false
  resetFormTrigger.value = true
  resetFormTrigger.value = false
}
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="isOpen"
      align-center
      destroy-on-close
      class="barrage-dialog--medium"
      :close-icon="CloseCircleIcon"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="closeModal()"
    >
      <template #header>
        <div class="add-user-modal-header">
          <AddPersonIcon size="42px" />
          <h5 class="invite-user-modal-title">
            {{ $t('users.invite_user') }}
          </h5>
        </div>
      </template>

      <CreateUserForm
        :reset-form-trigger="resetFormTrigger"
        @user-created="emits('userInvited')"
        @user-creation-canceled="closeModal"
      />
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.add-user-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
  color: var(--color-primary-900);

  & .invite-user-modal-title {
    color: var(--color-primary-900);
  }
}

.dark {
  .add-user-modal-header {
    color: var(--color-primary-0);

    & .invite-user-modal-title {
      color: var(--color-primary-0);
    }
  }
}
</style>
