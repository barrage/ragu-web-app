<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import EyeIcon from '~/assets/icons/svg/eye.svg'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import type { User } from '~/types/users'
import { StatusType } from '~/types/statusTypes'

/* Props & Emits */
const props = defineProps<{
  user: User
}>()

const emits = defineEmits<Emits>()

interface Emits {
  (event: 'delete-user', user: User): void
  (event: 'edit-user', user: User): void
  (event: 'activate-user', user: User): void
  (event: 'deactivate-user', user: User): void
}

/* Setup */
const { t } = useI18n()
const router = useRouter()

const userData = computed(() => {
  return {
    fullname: props.user?.fullName || t('users.user_card.unknown_name'),
    email: props.user?.email || t('users.user_card.unknown_email'),
    status: props.user?.active ? t('users.user_card.active_status') : t('users.user_card.inactive_status'),
    statusType: props.user?.active ? StatusType.Success : StatusType.Danger,
    role: props.user?.role === 'admin' ? t('users.user_card.adminRole') : t('users.user_card.userRole'),
    updatedAt: props.user?.updatedAt ? useRelativeDate(props.user.updatedAt) : t('users.user_card.unknown_date'),
    createdAt: props.user?.createdAt ? useRelativeDate(props.user.createdAt) : t('users.user_card.unknown_date'),
  }
})

const redirectToUserDetails = () => {
  return router.push(`/admin/users/${props.user?.id}`)
}
</script>

<template>
  <el-card class="user-card is-primary">
    <div class="user-card-body">
      <div class="user-profile-item-wrapper" @click="redirectToUserDetails">
        <UserProfileOverview :user="props.user" />
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
            <EyeIcon size="20px" />
          </el-button>
        </ElTooltip>

        <ElTooltip
          :content="t('users.user_card.edit_user')"
          :enterable="false"
          placement="top"
        >
          <el-button plain @click="emits('edit-user', props.user)">
            <EditIcon size="20px" />
          </el-button>
        </ElTooltip>

        <ElTooltip
          v-if="props.user.active"
          :content="t('users.user_card.deactivate_user')"
          :enterable="false"
          placement="top"
        >
          <el-button plain @click="emits('deactivate-user', props.user)">
            <PersonLockIcon size="20px" />
          </el-button>
        </ElTooltip>
        <ElTooltip
          v-if="!props.user.active"
          :content="t('users.user_card.activate_user')"
          :enterable="false"
          placement="top"
        >
          <el-button plain @click="emits('activate-user', props.user)">
            <PersonPasskeyIcon size="20px" />
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
            <DeleteIcon size="20px" />
          </el-button>
        </ElTooltip>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.user-card {
  padding-inline: 0.6rem;
  padding-block: 0.8rem;

  & .user-card-body {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;

    & .label-description-item-container {
      grid-column: span 2;
      @include viewport-s {
        grid-column: span 1;
      }
      @include viewport-ml {
        grid-column: span 1;
      }
    }
  }
}

.user-actions {
  grid-column: span 6;
  justify-self: flex-end;
  display: flex;
  gap: 12px;
  @include viewport-s {
    grid-column: span 3;
  }
  @include viewport-ml {
    grid-column: span 1;
  }

  & .delete-action {
    margin-left: 2rem;
  }
}

.user-profile-item-wrapper {
  grid-column: span 6;

  @include viewport-ml {
    grid-column: span 2;
  }
}

.dark {
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
