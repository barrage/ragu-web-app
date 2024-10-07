<script lang="ts" setup>
import ProfileIcon from '~/assets/icons/svg/account.svg'
import type { User } from '~/types/users'

const props = defineProps<{
  user: User | null
}>()

const userData = computed(() => {
  return {
    name: props.user?.name || 'Unknown name',
    phone: props.user?.phone || 'Missing phone nubmer',
    updatedAt: props.user?.updatedAt ? formatDate(props.user?.updatedAt) : 'Unknown date',
    createdAt: props.user?.createdAt ? formatDate(props.user?.createdAt) : 'Unknown date',
  }
})
</script>

<template>
  <div class="user-card">
    <div class="username-title-wrapper">
      <ProfileIcon size="34" />
      <p class="username">
        {{ userData.name }}
      </p>
    </div>

    <div class="user-informations">
      <LabelDescriptionItem
        label="Phone"
        :description="userData?.phone"
      />
      <LabelDescriptionItem
        label="Updated at"
        :description="userData.updatedAt "
      />
      <LabelDescriptionItem
        label="Created at"
        :description="userData.createdAt"
      />
      <LabelDescriptionItem
        label="Role"
        description="Member"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-card {
  display: flex;
  flex-direction: row;

  gap: 16px;
  border: 0.5px solid var(--color-primary-300);
  background: var(--color-primary-0);
  box-shadow: 0 0.2rem 0.3rem var(--color-primary-100);
  border-radius: 16px;
  padding: 1rem;

  .username-title-wrapper {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--color-primary-900);
    min-width: max-content;
    margin-right: 32px;
    & .username {
      color: var(--color-primary-900);
    }
  }

  & .user-informations {
    display: flex;
    gap: 2.5rem;
    justify-content: space-between;
    width: 100%;
    margin-right: 1.5rem;
  }
}

.dark {
  .user-card {
    border: 0.5px solid var(--color-primary-600);
    background: var(--color-primary-800);
    box-shadow: 0 0.25rem 0.5rem var(--color-primary-800);
  }
  .username-title-wrapper {
    color: var(--color-primary-0);
    & .username {
      color: var(--color-primary-0);
    }
  }
}
</style>
