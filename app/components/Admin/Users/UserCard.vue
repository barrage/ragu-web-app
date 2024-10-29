<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import ProfileIcon from '~/assets/icons/svg/account.svg'
import EyeIcon from '~/assets/icons/svg/eye.svg'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import type { User } from '~/types/users'

const props = defineProps<{
  user: User
}>()

const emits = defineEmits<Emits>()

const { t } = useI18n()
const router = useRouter()

const relativeCreatedDate = ref(props.user?.createdAt ? useRelativeDate(props.user.createdAt) : t('users.user_card.unknown_date'))

enum StatusType {
  Primary = 'primary',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Danger = 'danger',
}

const userData = computed(() => {
  return {
    fullname: props.user?.fullName || t('users.user_card.unknown_name'),
    email: props.user?.email || t('users.user_card.unknown_email'),
    status: props.user?.active ? t('users.user_card.active_status') : t('users.user_card.inactive_status'),
    statusType: props.user?.active ? StatusType.Success : StatusType.Danger,
    role: props.user?.role === 'admin' ? t('users.user_card.adminRole') : t('users.user_card.userRole'),
    updatedAt: props.user?.updatedAt ? useRelativeDate(props.user.updatedAt) : t('users.user_card.unknown_date'),
    createdAt: relativeCreatedDate.value,
  }
})

const redirectToUserDetails = () => {
  return router.push(`/admin/users/${props.user?.id}`)
}

interface Emits {
  (event: 'delete-user', user: User): void
}
</script>

<template>
  <div>
    <div class="user-card">
      <div class="user-profile-item" @click="redirectToUserDetails">
        <ProfileIcon size="36" />
        <div class="username-mail-wrapper">
          <p class="username">
            {{ `${userData.fullname}` }}
          </p>
          <span class="user-mail">{{ userData.email }}</span>
        </div>
      </div>

      <LabelDescriptionItem
        :label="t('users.user_card.role')"
        size="small"
        :description="userData.role"
      />
      <LabelDescriptionItem
        :label="t('users.user_card.status')"
        size="small"
        :description="userData?.status"
      >
        <template #customDescription>
          <el-tag :type="userData.statusType" size="small">
            <span class="status-dot" />  {{ userData?.status }}
          </el-tag>
        </template>
      </LabelDescriptionItem>

      <LabelDescriptionItem
        :label="t('users.user_card.created_at')"
        size="small"
        :description="userData.createdAt"
      />
      <div class="user-actions">
        <ElTooltip
          :content="t('users.user_card.view_more')"
          :enterable="false"
          placement="top"
        >
          <el-button
            plain
            type="primary"
            @click="redirectToUserDetails()"
          >
            <EyeIcon />
          </el-button>
        </ElTooltip>

        <ElTooltip
          :content="t('users.user_card.edit_user')"
          :enterable="false"
          placement="top"
        >
          <el-button plain>
            <EditIcon />
          </el-button>
        </ElTooltip>

        <ElTooltip
          :content="t('users.user_card.delete_user')"
          :enterable="false"
          placement="top"
        >
          <el-button
            plain
            type="danger"
            class="delete-action"
            @click="emits('delete-user', props.user)"
          >
            <DeleteIcon />
          </el-button>
        </ElTooltip>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-card {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  border: 0.5px solid var(--color-primary-300);
  background: var(--color-primary-0);
  box-shadow: 0 0.2rem 0.3rem var(--color-primary-100);
  border-radius: 16px;
  padding: 1rem;

  & .user-informations {
    grid-column: span 2;
    display: flex;
    gap: 2.5rem;
    flex: 1 0 calc(70% - 22px);
    justify-content: space-around;
    width: 100%;
    margin-right: 1.5rem;
  }
}

.user-actions {
  display: flex;
  gap: 12px;
  justify-self: flex-end;

  & .delete-action {
    margin-left: 2rem;
  }
}

.user-profile-item {
  grid-column: span 2;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  margin-right: 1rem;
  text-overflow: ellipsis;
  flex: 0 0 calc(30% - 22px);
  color: var(--color-primary-900);

  svg {
    flex-shrink: 0;
  }

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}

.username-mail-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .username {
    margin: 0;
    font-size: var(--font-size-fluid-2);
    line-height: normal;
    font-weight: var(--font-weight-bold);
    color: var(--color-primary-900);
  }
  & .user-mail {
    margin: 0;
    line-height: normal;
    font-size: var(--font-size-fluid-1);
    color: var(--color-primary-800);
  }
}

.dark {
  .user-card {
    border: 0.5px solid var(--color-primary-700);
    background: var(--color-primary-900);
    box-shadow: 0 0.2rem 0.3rem var(--color-primary-800);
  }
  .username-title-wrapper {
    color: var(--color-primary-0);
    & .username {
      color: var(--color-primary-0);
    }
  }
  .user-profile-item {
    color: var(--color-primary-0);
  }
  .username-mail-wrapper {
    & .username {
      color: var(--color-primary-0);
    }
    & .user-mail {
      color: var(--color-primary-100);
    }
  }
}
</style>
