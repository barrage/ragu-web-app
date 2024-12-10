<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { User } from '~/types/users'
import EditIcon from '~/assets/icons/svg/edit-user.svg'

const props = defineProps<{
  selectedUser: User | null
}>()

const emits = defineEmits<Emits>()
interface Emits {
  (event: 'userEdited'): void
}

const { t } = useI18n()

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
      :destroy-on-close="true"
      align-center
      class="edit-user-modal-backoffice barrage-dialog--medium"
      :close-icon="CloseCircleIcon"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="closeModal"
    >
      <template #header>
        <div class="edit-user-modal-header">
          <EditIcon size="42px" />
          <h1> {{ $t('users.edit_user.title') }}</h1>
        </div>
      </template>

      <div class="edit-user-modal-body">
        <p>{{ t('users.edit_user.description') }}</p>
        <EditUserForm
          :selected-user="props.selectedUser"
          :reset-form-trigger="resetFormTrigger"
          @user-edited="emits('userEdited')"
          @user-edit-canceled="closeModal"
        />
      </div>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.edit-user-modal-header {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;

  & h1 {
    font-size: var(--font-size-fluid-5);
    color: var(--color-primary-900);
  }
}

.edit-user-modal-body {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.dark {
  .edit-user-modal-header {
    & h1 {
      color: var(--color-primary-0);
    }
  }
}
</style>
