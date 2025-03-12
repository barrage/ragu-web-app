<script lang="ts" setup>
import AgentsIcon from '~/assets/icons/svg/agents.svg'

const props = withDefaults(defineProps<{
  size?: string | number
  direction?: 'ttb' | 'btt' | 'ltr' | 'rtl'
}>(), {
  size: '75%',
  direction: 'btt',
})

const isOpen = defineModel<boolean>()

const { t } = useI18n()

const agentInfoContent = computed(() => {
  return {
    title: t('agents.info.title'),
    description: t('agents.info.description'),
    sections: [{
      title: t('agents.info.what_can_you_do_here.title'),
      list: [
        {
          label: t('agents.info.what_can_you_do_here.items.labels.create_agents'),
          description: t('agents.info.what_can_you_do_here.items.descriptions.create_agents'),
        },
        {
          label: t('agents.info.what_can_you_do_here.items.labels.manage_models'),
          description: t('agents.info.what_can_you_do_here.items.descriptions.manage_models'),
        },
        {
          label: t('agents.info.what_can_you_do_here.items.labels.configure_settings'),
          description: t('agents.info.what_can_you_do_here.items.descriptions.configure_settings'),
        },
        {
          label: t('agents.info.what_can_you_do_here.items.labels.assign_collections'),
          description: t('agents.info.what_can_you_do_here.items.descriptions.assign_collections'),
        },
        {
          label: t('agents.info.what_can_you_do_here.items.labels.wap'),
          description: t('agents.info.what_can_you_do_here.items.descriptions.activate_wap_agent'),
        },

      ],
    }, {
      title: t('agents.info.how_to_manage.title'),
      list: [
        {
          label: t('agents.info.how_to_manage.items.labels.search_agents'),
          description: t('agents.info.how_to_manage.items.descriptions.search_agents'),
        },
        {
          label: t('agents.info.how_to_manage.items.labels.customize_behavior'),
          description: t('agents.info.how_to_manage.items.descriptions.customize_behavior'),
        },
      ],
    }, {
      title: t('agents.info.important_notes.title'),
      list: [
        {
          label: t('agents.info.important_notes.items.labels.performance'),
          description: t('agents.info.important_notes.items.descriptions.performance'),
        },
        {
          label: t('agents.info.important_notes.items.labels.security'),
          description: t('agents.info.important_notes.items.descriptions.security'),
        },
      ],
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
      <div class="agents-help-info-header">
        <AgentsIcon size="48px" />
        <h5 class="title">
          {{ agentInfoContent.title }}
        </h5>
      </div>
    </template>
    <div class="agents-help-info-body">
      <span class="description"> {{ agentInfoContent.description }} </span>

      <template v-for="section in agentInfoContent.sections" :key="section.title">
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
.agents-help-info-header {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-primary-900);

  & .title {
    color: var(--color-primary-900);
  }
}

.agents-help-info-body {
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
  & .agents-help-info-header {
    color: var(--color-primary-0);
    & .title {
      color: var(--color-primary-0);
    }
  }

  & .agents-help-info-body {
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
