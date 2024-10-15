<script lang="ts" setup>
import ProfileIcon from '~/assets/icons/svg/account.svg'
import type { User } from '~/types/users'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import DeleteIcon from '~/assets/icons/svg/delete-person.svg'

const props = defineProps<{
  user: User | null | undefined
}>()
const { t } = useI18n()
enum StatusType {
  Primary = 'primary',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Danger = 'danger',
}

const userData = computed(() => {
  return {
    fullName: props.user?.fullName || t('users.user_card.unknown_name'),
    email: props.user?.email || t('users.user_card.unknown_email'),
    status: props.user?.active ? t('users.user_card.active_status') : t('users.user_card.inactive_status'),
    statusType: props.user?.active ? StatusType.Success : StatusType.Danger,
    role: props.user?.role === 'ADMIN' ? t('users.user_card.adminRole') : t('users.user_card.userRole'),
    updatedAt: props.user?.updatedAt ? formatDate(props.user.updatedAt, 'MMMM DD, YYYY') : t('users.user_card.unknown_date'),
    createdAt: props.user?.updatedAt ? formatDate(props.user.createdAt, 'MMMM DD, YYYY') : t('users.user_card.unknown_date'),
  }
})
</script>

<template>
  <section class="user-details-hero-section">
    <div class="profile-avatar-wrapper">
      <ProfileIcon size="80" />
      <div class="username-status-wrapper">
        <h6 class="username">
          {{ `${userData.fullName}` }}
        </h6>
        <el-tag :type="userData.statusType" size="small">
          <span class="status-dot" />  {{ userData?.status }}
        </el-tag>
      </div>
    </div>
    <div class="user-details-actions-wrapper">
      <el-button size="small" type="primary">
        <EditIcon />  Edit
      </el-button>
      <el-button
        plain
        type="danger"
        size="small"
      >
        <DeleteIcon /> Delete
      </el-button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.user-details-hero-section {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  padding-block: 1rem;

  & .profile-avatar-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-start;
    margin-right: 1rem;
    text-overflow: ellipsis;
  }

  & .user-details-actions-wrapper {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
}
</style>
