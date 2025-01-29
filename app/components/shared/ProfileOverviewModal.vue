<script lang="ts" setup>
import { h } from 'vue'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'

defineProps<{
  userId: string | undefined
  uploadType?: 'users' | 'agents' | 'adminUsers'
  avatar?: object
}>()

const emits = defineEmits<Emits>()
interface Emits {
  (e: 'changePicture'): void
  (e: 'deletePicture'): void
}
const { t } = useI18n()
const isOpen = defineModel<boolean>()
const handleChangePicture = () => {
  emits('changePicture')
}

const handleDeletePicture = () => {
  emits('deletePicture')
}

const closeModal = () => {
  isOpen.value = false
}
</script>

<template>
  <ElDialog
    v-model="isOpen"
    align-center
    class="barrage-dialog--medium"
    :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
    @close="closeModal"
  >
    <template #header>
      <h5>{{ t('profileDropdown.profile_settings') }}</h5>
    </template>
    <ProfileOverview
      :avatar="avatar"
      :user-id="userId"
      upload-type="adminUsers"
      @change-picture="handleChangePicture"
      @delete-picture="handleDeletePicture"
    />
  </ElDialog>
</template>
