<script lang="ts" setup>
import ProfileIcon from '~/assets/icons/svg/account.svg'
import type { User } from '~/types/users'

const props = withDefaults(defineProps<{
  user: User | undefined | null
  size?: 'small' | 'medium' | 'large'
}>(), {
  size: 'small',
})

const { t } = useI18n()

const userData = computed(() => {
  return {
    fullname: props.user?.fullName || t('users.user_card.unknown_name'),
    email: props.user?.email || t('users.user_card.unknown_email'),
  }
})

const textSize = computed(() => {
  switch (props.size) {
    case 'medium':
      return { username: 'var(--font-size-fluid-3)', email: 'var(--font-size-fluid-2)' }
    case 'large':
      return { username: 'var(--font-size-fluid-4)', email: 'var(--font-size-fluid-3)' }
    default:
      return { username: 'var(--font-size-fluid-2)', email: 'var(--font-size-fluid-1)' }
  }
})
</script>

<template>
  <LlmLink
    :to="`/admin/users/${user?.id}`"
    type="link"
    class="user-profile-item"
  >
    <LlmAvatar
      :avatar="props.user?.avatar"
      :alt="t('agents.user_avatar')"
      fit="cover"
      default-image="user"
    />
    <div class="username-mail-wrapper">
      <p class="username" :style="{ fontSize: textSize.username }">
        {{ `${userData.fullname}` }}
      </p>
      <span class="user-mail" :style="{ fontSize: textSize.email }">{{ userData.email }}</span>
    </div>
  </LlmLink>
</template>

<style lang="scss" scoped>
.user-profile-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  margin-right: 1rem;
  text-overflow: ellipsis;
  color: var(--color-primary-900);

  svg {
    flex-shrink: 0;
  }

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  & .username-mail-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & .username {
      margin: 0;
      line-height: normal;
      font-weight: var(--font-weight-semibold);
      color: var(--color-primary-900);
    }

    & .user-mail {
      margin: 0;
      line-height: normal;
      color: var(--color-primary-800);
    }
  }
}

.dark {
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
