<script lang="ts" setup>
import PersonMailIcon from '~/assets/icons/svg/person-mail.svg'
import PersonClockIcon from '~/assets/icons/svg/person-clock.svg'
import PersonCalendarIcon from '~/assets/icons/svg/person-calendar.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'

// CONSTANTS
const userAuth = useAuthStore()
const { t } = useI18n()

// TYPES
enum StatusType {
  Primary = 'primary',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Danger = 'danger',
}

// HELPERS
const userProfileData = computed(() => {
  return {
    name: userAuth.user?.fullName || t('users.user_card.username'),
    role: userAuth.user?.role === 'admin' ? t('users.user_card.adminRole') : t('users.user_card.userRole'),
    email: userAuth.user?.email,
    statusType: userAuth.user?.active ? StatusType.Success : StatusType.Danger,
    status: userAuth.user?.active ? t('users.user_card.active_status') : t('users.user_card.inactive_status'),
    updatedAt: userAuth.user?.updatedAt ? formatDate(userAuth.user?.updatedAt, 'MMMM DD, YYYY') : t('users.user_card.unknown_date'),
    createdAt: userAuth.user?.updatedAt ? formatDate(userAuth.user?.createdAt, 'MMMM DD, YYYY') : t('users.user_card.unknown_date'),
  }
})
</script>

<template>
  <div class="profile-container">
    <div class="profile-top">
      <div class="avatar" />
      <div class="profile-title">
        <h6>{{ userProfileData.name }}</h6>
        <div class="profile-avatar-wrapper">
          <el-tag :type="userProfileData.statusType" size="small">
            <span class="status-dot" />  {{ userProfileData?.status }}
          </el-tag>
        </div>
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
</template>

<style lang="scss" scoped>
.profile-top {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 3rem;
}

.avatar {
  width: 80px;
  height: 80px;
  /*   background-image: url('../assets/images/login-img.jpg'); */
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  border: 3px solid var(--color-primary-300);
}

.profile-title {
  h6 {
    font-weight: var(--font-weight-semibold);
    margin-bottom: 0.25rem;
  }
}

.profile-avatar-wrapper {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  margin-right: 1rem;
  text-overflow: ellipsis;
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
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-fluid-3);

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
