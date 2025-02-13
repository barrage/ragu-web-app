<script lang="ts" setup>
import PersonMailIcon from '~/assets/icons/svg/person-mail.svg'
import PersonClockIcon from '~/assets/icons/svg/person-clock.svg'
import PersonCalendarIcon from '~/assets/icons/svg/person-calendar.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import { StatusType } from '~/types/statusTypes'
import type { User } from '~/types/users'

const props = defineProps<{
  user: User | undefined | null
  uploadType: 'users' | 'agents' | 'adminUsers'
  avatar?: string | null | undefined
}>()

const emits = defineEmits<{
  (e: 'changePicture'): void
  (e: 'deletePicture'): void
}>()
// CONSTANTS
const userAuth = useAuthStore()
const { t } = useI18n()
const { $api } = useNuxtApp()

const { execute: deleteProfilePicture, error, status: deleteProfilePictureStatus } = await useAsyncData(() => {
  if (props.uploadType === 'adminUsers') {
    return $api.user.DeleteAdminProfilePicture(props.user?.id as string)
  }
  return $api.user.DeleteProfilePicture()
}, { immediate: false })

const { execute: getCurrentUser, data: user } = await useAsyncData(() => $api.auth.GetCurrentUser(), { immediate: false })

const isDeleteModalOpen = ref(false)

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
}

const isUploadModalVisible = defineModel<boolean>()
const openUploadModal = () => {
  isUploadModalVisible.value = true
}

const refreshCurrentUser = async () => {
  isUploadModalVisible.value = false
  await getCurrentUser()
  userAuth.user = user.value
  emits('changePicture')
}

const handleChangePicture = () => {
  openUploadModal()
}

const handleDeletePicture = () => {
  isDeleteModalOpen.value = true
}

// HELPERS
const userProfileData = computed(() => {
  const userData = props.uploadType === 'adminUsers' ? props.user : userAuth.user

  return {
    name: userData?.fullName || t('users.user_card.username'),
    role: userData?.role === 'admin' ? t('users.user_card.adminRole') : t('users.user_card.userRole'),
    email: userData?.email || t('users.user_card.unknown_email'),
    statusType: userData?.active ? StatusType.Success : StatusType.Danger,
    status: userData?.active ? t('users.user_card.active_status') : t('users.user_card.inactive_status'),
    updatedAt: userData?.updatedAt ? formatDate(userData.updatedAt, 'MMMM DD, YYYY') : t('users.user_card.unknown_date'),
    createdAt: userData?.createdAt ? formatDate(userData.createdAt, 'MMMM DD, YYYY') : t('users.user_card.unknown_date'),
  }
})

const handleRemovePicture = async () => {
  await deleteProfilePicture()
  if (error.value) {
    ElNotification({
      title: t('profile.notifications.import.error_title'),
      message: t('profile.notifications.import.error_description'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
  }
  else {
    ElNotification({
      title: t('profile.notifications.import.success_title'),
      message: t('profile.notifications.import.success_delete_description'),
      type: 'success',
      customClass: 'success',
      duration: 2500,
    })

    emits('deletePicture')
  }

  await refreshCurrentUser()
  closeDeleteModal()
}
</script>

<template>
  <div class="profile-container">
    <div class="profile-top">
      <div class="profile-picture-container">
        <div class="profile-avatar-wrapper">
          <LlmAvatar
            :avatar="props.avatar"
            :alt="t('agents.user_avatar')"
            size="large"
            fit="cover"
            default-image="user"
          />
        </div>
      </div>
      <el-button
        class="edit-picture-button"
        type="primary"
        @click="handleChangePicture"
      >
        <EditIcon size="16px" />
        {{ t('profile.change_picture.title') }}
      </el-button>
      <el-button
        v-if="props.avatar"
        class="remove-picture-button"
        size="small"
        @click="handleDeletePicture"
      >
        <DeleteIcon size="16px" />
        {{ t('profile.change_picture.delete_title') }}
      </el-button>
    </div>
    <div class="profile-title">
      <p>{{ userProfileData.name }}</p>
      <div class="profile-avatar-wrapper">
        <el-tag :type="userProfileData.statusType" size="small">
          <span class="status-dot" />  {{ userProfileData?.status }}
        </el-tag>
      </div>
    </div>
    <div class="profile-informations-section">
      <LabelDescriptionItem
        :label="t('users.user_card.email')"
        :description="userProfileData.email"
        horizontal
      >
        <template #customLabel>
          <div class="profile-details-custom-label">
            <PersonMailIcon size="18px" />
            <span>  {{ t('users.user_card.email') }}:</span>
          </div>
        </template>
      </LabelDescriptionItem>

      <LabelDescriptionItem
        :label=" t('agents.labels.language')"
        :description="userProfileData.role"
        horizontal
      >
        <template #customLabel>
          <div class="profile-details-custom-label">
            <PersonInfoIcon size="18px" />
            <span>  {{ t('users.user_card.role') }}:</span>
          </div>
        </template>
      </LabelDescriptionItem>
      <LabelDescriptionItem
        :label="t('agents.labels.created_at') "
        :description="userProfileData.createdAt"
        horizontal
      >
        <template #customLabel>
          <div class="profile-details-custom-label">
            <PersonCalendarIcon size="18px" />
            <span>  {{ t('agents.labels.created_at') }}:</span>
          </div>
        </template>
      </LabelDescriptionItem>
      <LabelDescriptionItem
        :label="t('agents.labels.updated_at')"
        :description="userProfileData.updatedAt"
        horizontal
      >
        <template #customLabel>
          <div class="profile-details-custom-label">
            <PersonClockIcon size="18px" />
            <span>  {{ t('agents.labels.updated_at') }}:</span>
          </div>
        </template>
      </LabelDescriptionItem>
    </div>
  </div>

  <ConformationModal
    :is-visible="isDeleteModalOpen"
    :title="t('profile.delete_picture.title')"
    :message="t('profile.delete_picture.description')"
    :confirm-button-text="t('settings.delete') "
    confirm-button-type="danger"
    :confirm-button-loading="deleteProfilePictureStatus === 'pending'"
    :cancel-button-text="t('settings.cancel')"
    @confirm="handleRemovePicture"
    @cancel="closeDeleteModal"
  />

  <ChangePictureModal
    v-model="isUploadModalVisible"
    :upload-type="props.uploadType"
    :user-id="props.user?.id"
    @profile-picture-uploaded="refreshCurrentUser"
  />
</template>

<style lang="scss" scoped>
.profile-top {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-bottom: 10px;
}

.profile-picture-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-picture-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.edit-picture-button,
.remove-picture-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.profile-title {
  margin-bottom: 22px;
  p {
    font-weight: var(--font-weight-semibold);
    margin-bottom: 0.25rem;
  }
}

.profile-avatar-wrapper {
  display: flex;
  margin-right: 1rem;
}

.profile-informations-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  padding-block: 2rem;
  gap: 1.5rem;
  border-top: 1px solid var(--color-primary-300);
  border-bottom: 1px solid var(--color-primary-300);

  :deep(.description) {
    font-size: var(--font-size-fluid-2);
  }
}

.profile-details-custom-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-primary-900);
  font-size: var(--font-size-fluid-3);

  svg {
    flex-shrink: 0;
  }
}

.barrage-button {
  padding-block: 0;

  svg {
    flex-shrink: 0;
  }
}

.dark {
  & .profile-details-custom-label {
    color: var(--color-primary-100);
  }

  & .label,
  .agentname {
    color: var(--color-primary-100);
  }
  & .description {
    color: var(--color-primary-0);
  }
  .profile-title {
    h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
