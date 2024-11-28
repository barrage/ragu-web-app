<script lang="ts" setup>
import TeamIcon from '~/assets/icons/svg/team.svg'
import PersonQuestionMarkIcon from '~/assets/icons/svg/person-question-mark.svg'
import type { UserStatistic } from '~/types/statistic'
import type { User } from '~/types/users'

const props = defineProps<{
  countDataUser: UserStatistic
  recentUsers: Array<User>
  loading: boolean
  error: any
}>()

const { t } = useI18n()

const isRecentUsersEmpty = computed(() => !props.recentUsers || props.recentUsers.length === 0)
const hasError = computed(() => !!props.error)
</script>

<template>
  <section class="dashboard-count-section grid">
    <div class="section-heading-wrapper">
      <div class="title-wrapper">
        <TeamIcon size="42px" />
        <h5 class="section-title">
          {{ t('users.title') }}
        </h5>
      </div>

      <NuxtLink to="/admin/users">
        <el-button size="small" type="primary">
          {{ t('users.title') }}
        </el-button>
      </NuxtLink>
    </div>

    <el-card class="total-user-widget is-primary">
      <span class="total-users-title">{{ t('dashboard.users.total_widget.total') }}</span>
      <p class="total-users-count">
        {{ props?.countDataUser?.total }}
      </p>
    </el-card>

    <el-card class="most-recent-users-widget is-primary" size="small">
      <TitleDescription :title="t('dashboard.users.most_recent_users.title')" :description="t('dashboard.users.most_recent_users.description')" />

      <div class="most-recent-users-list">
        <template v-if="props.loading">
          <div class="loader-container">
            <MeetUpLoader />
          </div>
        </template>
        <template v-else-if="hasError">
          <EmptyState
            :title="t('users.empty_title')"
            :description="t('users.empty_description')"
          >
            <template #icon>
              <PersonQuestionMarkIcon size="44px" />
            </template>
          </EmptyState>
        </template>
        <template v-else-if="isRecentUsersEmpty">
          <EmptyState
            :title="t('users.empty_title')"
            :description="t('users.empty_description')"
          >
            <template #icon>
              <PersonQuestionMarkIcon size="44px" />
            </template>
          </EmptyState>
        </template>
        <template v-else>
          <template v-for="user in props.recentUsers" :key="user.id">
            <UserProfileOverview :user="user" />
          </template>
        </template>
      </div>
    </el-card>

    <el-card class="users-roles-widget-card is-primary">
      <div class="users-roles-widget-body">
        <LabelDescriptionItem
          :label="t('dashboard.users.user_roles.admins')"
          :description="props.countDataUser?.admin.toString()"
          horizontal
        />
        <div class="horizontal-divider" />
        <LabelDescriptionItem
          :label="t('dashboard.users.user_roles.users')"
          :description="props.countDataUser?.user.toString()"
          horizontal
        />
        <div class="horizontal-divider" />
        <LabelDescriptionItem
          :label="t('dashboard.users.user_roles.active')"
          :description="props.countDataUser?.active.toString()"
          horizontal
        />
        <div class="horizontal-divider" />
        <LabelDescriptionItem
          :label="t('dashboard.users.user_roles.inactive')"
          :description="props.countDataUser?.inactive.toString()"
          horizontal
        />
      </div>
    </el-card>
  </section>
</template>

<style lang="scss" scoped>
.dashboard-count-section {
  min-height: 100%;
  .section-heading-wrapper {
    grid-column: span 12;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: fit-content;
    align-self: start;

    & .title-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      & .section-title {
        font-weight: var(--font-weight-bold);
        color: var(--color-primary-800);
      }
    }
  }

  .total-user-widget {
    grid-column: span 4;

    & .total-users-title {
      color: var(--color-primary-700);
    }

    & .total-users-count {
      color: var(--color-primary-800);
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-fluid-5);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 6px;
    }
  }

  & .most-recent-users-widget {
    min-height: 100%;
    grid-column: span 8;
    grid-row: span 2;

    & .most-recent-users-heading {
      margin-bottom: 12px;

      & .most-recent-users-title {
        color: var(--color-primary-700);
      }
    }

    & .most-recent-users-list {
      display: flex;
      padding: 12px;
      flex-direction: column;
      min-height: 250px;
      gap: 12px;
    }
  }

  & .users-roles-widget-card {
    grid-column: span 4;
    grid-row: span 1;

    & .users-roles-widget-body {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
  }
}
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.dark {
  .dashboard-count-section {
    .total-users-title {
      color: var(--color-primary-100);
    }

    .total-users-count {
      color: var(--color-primary-200);
    }
  }
  .section-heading-wrapper {
    & .title-wrapper {
      & .section-title {
        color: var(--color-primary-0);
      }
    }
  }
}
</style>
