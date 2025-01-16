<script lang="ts" setup>
import TeamIcon from '~/assets/icons/svg/team.svg'

const props = withDefaults(defineProps<{
  size?: string | number
  direction?: 'ttb' | 'btt' | 'ltr' | 'rtl'
}>(), {
  size: '70%',
  direction: 'btt',
})

const isOpen = defineModel<boolean>()

const { t } = useI18n()

const userInfoContent = computed(() => {
  return {
    title: t('users.info.title'),
    description: t('users.info.description'),
    sections: [{
      title: t('users.info.what_can_you_do_here.title'),
      list: [{ label: t('users.info.what_can_you_do_here.items.labels.create_users'), description: t('users.info.what_can_you_do_here.items.descriptions.create_users') }, { label: t('users.info.what_can_you_do_here.items.labels.manage_status'), description: t('users.info.what_can_you_do_here.items.descriptions.manage_status') }, { label: t('users.info.what_can_you_do_here.items.labels.delete_edit'), description: t('users.info.what_can_you_do_here.items.descriptions.delete_edit') }],
    }, {
      title: t('users.info.how_to_find.title'),
      list: [{ label: t('users.info.how_to_find.items.labels.search_users'), description: t('users.info.how_to_find.items.descriptions.search_users') }, { label: t('users.info.how_to_find.items.labels.filter_sort_users'), description: t('users.info.how_to_find.items.descriptions.filter_sort_users') }],
    }, {
      title: t('users.info.important_notes.title'),
      list: [{ label: t('users.info.important_notes.items.labels.user_roles'), description: t('users.info.important_notes.items.descriptions.user_roles') }, { label: t('users.info.important_notes.items.labels.access_security'), description: t('users.info.important_notes.items.descriptions.access_security') }],
    }],
  }
})
</script>

<template>
  <el-drawer
    v-model="isOpen"
    :direction="props.direction"
    :size="props.size"
  >
    <template #header>
      <div class="users-help-info-header">
        <TeamIcon size="48px" />
        <h5 class="title">
          {{ userInfoContent.title }}
        </h5>
      </div>
    </template>
    <div class="users-help-info-body">
      <span class="description"> {{ userInfoContent.description }} </span>

      <template v-for="section in userInfoContent.sections" :key="section.title">
        <el-divider />

        <div>
          <h6>{{ section.title }}</h6>
          <ol v-if="section.list.length > 0">
            <template v-for="item in section.list" :key="item">
              <li>
                <p class="li-label">
                  {{ item.label }}
                </p> <span class="li-description">{{ item.description }}</span>
              </li>
            </template>
          </ol>
        </div>
      </template>
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped>
.users-help-info-header {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-primary-900);

  & .title {
    color: var(--color-primary-900);
  }
}

.users-help-info-body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-fluid-m);

  & h6 {
    color: var(--color-primary-900);
    font-weight: var(--font-weight-semibold);
  }

  & .description {
    color: var(--color-primary-800);
  }

  & ol {
    color: var(--color-primary-900);
  }

  & .li-label {
    color: var(--color-primary-800);
    font-weight: var(--font-weight-semibold);
  }
  & .li-description {
    color: var(--color-primary-800);
  }
}

.dark {
  & .users-help-info-header {
    color: var(--color-primary-0);
    & .title {
      color: var(--color-primary-0);
    }
  }

  & .users-help-info-body {
    & h6 {
      color: var(--color-primary-0);
    }

    & .description {
      color: var(--color-primary-100);
    }

    & ol {
      color: var(--color-primary-0);
    }

    & .li-label {
      color: var(--color-primary-100);
    }
    & .li-description {
      color: var(--color-primary-100);
    }
  }
}
</style>
