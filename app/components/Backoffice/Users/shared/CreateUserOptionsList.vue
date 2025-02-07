<script lang="ts" setup>
import type { CreateUserOption } from '~/types/users'
import PersonIcon from '~/assets/icons/svg/person.svg'
import TeamIcon from '~/assets/icons/svg/team.svg'

const { t } = useI18n()

const createUserOptions: ComputedRef<Array<CreateUserOption>> = computed(() => {
  return [
    { name: t('users.titles.single_user'), href: '/admin/users/create/user', description: t('users.descriptions.invite_single_user'), icon: PersonIcon, id: 'single_basic' },
    { name: t('users.titles.multiple_users_csv'), href: '/admin/users/create/users', description: t('users.descriptions.invite_multiple_users_csv'), icon: TeamIcon, id: 'multiple_csv' },
  ]
})
</script>

<template>
  <section class="create-user-options-list-section">
    <h6>{{ $t('users.titles.invite_users_options') }}</h6>

    <div class="invite-user-options-card-wrapper grid">
      <template v-for="(option, index) in createUserOptions" :key="option.id">
        <CreateUserOptionCard
          v-motion-slide-left
          class="create-user-card-option"
          :delay="(400 + index * 100)"
          :duration="400"
          :create-user-option="option"
        >
          <template v-if="option.icon" #customIcon>
            <component :is="option.icon" size="84px" />
          </template>
        </CreateUserOptionCard>
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.create-user-options-list-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-fluid-l);

  & .invite-user-options-card-wrapper {
    & .create-user-card-option {
      grid-column: span 4;
      @include viewport-m {
        grid-column: span 6;
      }

      @include viewport-xl {
        grid-column: span 4;
      }
    }
  }
}
</style>
