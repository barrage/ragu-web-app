<script lang="ts" setup>
import EyeIcon from '~/assets/icons/svg/eye.svg'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import type { User } from '~/types/users'
import { StatusType } from '~/types/statusTypes'

const props = defineProps<{
  user: User
}>()

const emits = defineEmits<Emits>()

interface Emits {
  (event: 'deleteUser', user: User): void
  (event: 'editUser', user: User): void
  (event: 'activateUser', user: User): void
  (event: 'deactivateUser', user: User): void
}

const { t } = useI18n()

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
</script>

<template>
  <el-card class="user-card is-primary">
    <div class="user-card-body">
      <LlmLink
        :to="`/admin/users/${user?.id}`"
        type="link"
        class="user-profile-item-wrapper"
        data-testid="bo-user-card-profile-overview-link"
      >
        <UserProfileOverview :user="props.user" />
      </LlmLink>

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
        <LlmTooltip :content="$t('users.user_card.view_more')">
          <LlmLink
            :to="`/admin/users/${user?.id}`"
            type="plainButtonPrimary"
          >
            <EyeIcon size="20px" />
          </LlmLink>
        </LlmTooltip>

        <LlmTooltip :content="$t('users.user_card.edit_user')">
          <el-button
            plain
            data-testid="bo-user-card-edit-button"
            @click="emits('editUser', props.user)"
          >
            <EditIcon size="20px" />
          </el-button>
        </LlmTooltip>

        <LlmTooltip
          v-if="props.user.active"
          :content="t('users.user_card.deactivate_user')"
        >
          <el-button
            plain
            data-testid="bo-user-card-deactivate-button"
            @click="emits('deactivateUser', props.user)"
          >
            <PersonLockIcon size="20px" />
          </el-button>
        </LlmTooltip>
        <LlmTooltip
          v-if="!props.user.active"
          :content="t('users.user_card.activate_user')"
        >
          <el-button
            plain
            data-testid="bo-user-card-activate-button"
            @click="emits('activateUser', props.user)"
          >
            <PersonPasskeyIcon size="20px" />
          </el-button>
        </LlmTooltip>

        <LlmTooltip :content="$t('users.user_card.delete_user')">
          <el-button
            plain
            type="danger"
            data-testid="bo-user-card-delete-button"
            class="delete-action"
            @click="emits('deleteUser', props.user)"
          >
            <DeleteIcon size="20px" />
          </el-button>
        </LlmTooltip>
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
