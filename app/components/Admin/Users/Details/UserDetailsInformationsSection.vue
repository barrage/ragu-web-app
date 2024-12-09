<script lang="ts" setup>
import type { User } from '~/types/users'
import PersonMailIcon from '~/assets/icons/svg/person-mail.svg'
import PersonKeyIcon from '~/assets/icons/svg/person-key.svg'
import PersonClockIcon from '~/assets/icons/svg/person-clock.svg'
import PersonCalendarIcon from '~/assets/icons/svg/person-calendar.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'

const props = defineProps<{
  user: User | null | undefined
}>()

const { t } = useI18n()

const userData = computed(() => {
  return {
    id: props.user?.id || '',
    firstName: props.user?.firstName || '',
    lastName: props.user?.lastName || '',
    fullName: props.user?.fullName || t('users.user_card.unknown_name'),
    email: props.user?.email || t('users.user_card.unknown_email'),
    status: props.user?.active ? t('users.user_card.active_status') : t('users.user_card.inactive_status'),
    role: props.user?.role === 'admin' ? t('users.user_card.adminRole') : t('users.user_card.userRole'),
    updatedAt: props.user?.updatedAt ? formatDate(props.user.updatedAt, 'dddd, MMMM D, YYYY h:mm A') : t('users.user_card.unknown_date'),
    createdAt: props.user?.updatedAt ? formatDate(props.user.createdAt, 'dddd, MMMM D, YYYY h:mm A') : t('users.user_card.unknown_date'),
  }
})
</script>

<template>
  <section class="user-informations-section grid">
    <LabelDescriptionItem
      :label="t('users.user_card.first_name')"
      :description="userData.firstName"
      horizontal
    >
      <template #customLabel>
        <div class="user-details-custom-label">
          <PersonInfoIcon size="18px" />
          <span>  {{ t('users.user_card.first_name') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('users.user_card.user_id')"
      :description="userData.id"
      horizontal
    >
      <template #customLabel>
        <div class="user-details-custom-label">
          <PersonKeyIcon size="18px" />
          <span>  {{ t('users.user_card.user_id') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>

    <LabelDescriptionItem
      :label="t('users.user_card.last_name')"
      :description="userData.lastName"
      horizontal
    >
      <template #customLabel>
        <div class="user-details-custom-label">
          <PersonInfoIcon size="18px" />
          <span>  {{ t('users.user_card.last_name') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>

    <LabelDescriptionItem
      :label="t('users.user_card.role')"
      :description="userData.role"
      horizontal
    >
      <template #customLabel>
        <div class="user-details-custom-label">
          <PersonInfoIcon size="18px" />
          <span>  {{ t('users.user_card.role') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('users.user_card.username')"
      :description="userData.fullName"
      horizontal
    >
      <template #customLabel>
        <div class="user-details-custom-label">
          <PersonInfoIcon size="18px" />
          <span>  {{ t('users.user_card.username') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('users.user_card.created_at')"
      :description="userData.createdAt"
      horizontal
    >
      <template #customLabel>
        <div class="user-details-custom-label">
          <PersonCalendarIcon size="18px" />
          <span>  {{ t('users.user_card.created_at') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('users.user_card.email')"
      :description="userData.email"
      horizontal
    >
      <template #customLabel>
        <div class="user-details-custom-label">
          <PersonMailIcon size="18px" />
          <span>  {{ t('users.user_card.email') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('users.user_card.updated_at')"
      :description="userData.updatedAt"
      horizontal
    >
      <template #customLabel>
        <div class="user-details-custom-label">
          <PersonClockIcon size="18px" />
          <span>  {{ t('users.user_card.updated_at') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
  </section>
</template>

<style lang="scss" scoped>
.user-informations-section {
  max-width: 100%;
  padding-inline: var(--spacing-fluid-m);
  padding-block: var(--spacing-fluid-m);
  & .label-description-item-container {
    grid-column: span 6;

    & :deep(.label) {
      flex: 0 0 calc(20% - 0.5rem);
    }
    & :deep(.description) {
      flex: 0 0 calc(70% - 0.5rem);
      font-size: var(--font-size-fluid-2);
    }
  }
}
.user-details-custom-label {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 calc(30% - 0.5rem);
  color: var(--color-primary-900);
  font-weight: var(--fon-weight-bold);
  font-size: var(--font-size-fluid-3);
}
.dark {
  & .user-details-custom-label {
    color: var(--color-primary-100);
  }
}
</style>
