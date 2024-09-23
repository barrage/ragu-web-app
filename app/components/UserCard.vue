<script lang="ts" setup>
import ProfileIcon from '~/assets/icons/svg/account.svg'
import type { User } from '~/types/users'

const props = defineProps<{
  user: User | null
}>()
</script>

<template>
  <div class="user-card">
    <div class="username-title-wrapper">
      <ProfileIcon size="36" />
      <h6>
        {{ props.user?.name }}
      </h6>
    </div>

    <div class="user-informations">
      <LabelDescriptionItem label="Phone:" :description="props.user?.phone" />
      <LabelDescriptionItem label="Updated at:" :description="props.user?.updatedAt" />
      <LabelDescriptionItem label="Created at:" :description="props.user?.createdAt" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-card {
  display: flex;
  flex-direction: column;
  gap: 32px;
  border: 1px solid var(--color-primary-400);
  box-shadow: 0 0.25rem 0.5rem var(--color-primary-200);
  border-radius: 16px;
  padding: 1rem;

  .username-title-wrapper {
    display: flex;
    gap: 0.6rem;
    color: var(--color-primary-800);
  }

  & .user-informations {
    display: flex;
    gap: 33px;
  }
}

.dark {
  .user-card {
    border: 1px solid var(--color-primary-500);
    box-shadow: 0 0.25rem 0.5rem var(--color-primary-800);
  }
  .username-title-wrapper {
    color: var(--color-primary-0);
  }
}
</style>
