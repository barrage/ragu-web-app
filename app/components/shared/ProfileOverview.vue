<script lang="ts" setup>
import PersonMailIcon from '~/assets/icons/svg/person-mail.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import PersonKeyIcon from '~/assets/icons/svg/person-key.svg'

import type { User } from '~/types/auth'

const props = defineProps<{
  user: User | undefined | null
  avatar?: string | null | undefined
}>()

// CONSTANTS
const userAuth = useAuthStore()
const { t } = useI18n()

// HELPERS
const userProfileData = computed(() => {
  return {
    name: props.user?.fullName || t('users.user_card.username'),
    role: userAuth.isAdmin ? t('users.user_card.adminRole') : t('users.user_card.userRole'),
    email: props.user?.email || t('users.user_card.unknown_email'),
    id: props.user?.id || t('users.user_card.unknown_id'),
  }
})
</script>

<template>
  <div class="profile-container">
    <div class="profile-top">
      <div class="profile-picture-container">
        <LlmAvatar
          :avatar="props.avatar"
          :alt="t('agents.user_avatar')"
          size="large"
          fit="cover"
          default-image="user"
        />
      </div>

      <p>{{ userProfileData.name }}</p>
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
        :label="t('users.user_card.user_id')"
        :description="userProfileData.id"
        horizontal
      >
        <template #customLabel>
          <div class="profile-details-custom-label">
            <PersonKeyIcon size="18px" />
            <span>  {{ t('users.user_card.user_id') }}:</span>
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
  gap: 22px;
  margin-bottom: 22px;
}

.profile-picture-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
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
