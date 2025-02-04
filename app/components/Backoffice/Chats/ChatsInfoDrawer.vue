<script lang="ts" setup>
import ChatIcon from '~/assets/icons/svg/chat-multiple.svg'

const props = withDefaults(defineProps<{
  size?: string | number
  direction?: 'ttb' | 'btt' | 'ltr' | 'rtl'
}>(), {
  size: '60%',
  direction: 'btt',
})

const isOpen = defineModel<boolean>()

const { t } = useI18n()

const chatInfoContent = computed(() => {
  return {
    title: t('chat.info.title'),
    description: t('chat.info.description'),
    sections: [{
      title: t('chat.info.what_can_you_do_here.title'),
      list: [
        {
          label: t('chat.info.what_can_you_do_here.items.labels.monitor_chats'),
          description: t('chat.info.what_can_you_do_here.items.descriptions.monitor_chats'),
        },
        {
          label: t('chat.info.what_can_you_do_here.items.labels.view_details'),
          description: t('chat.info.what_can_you_do_here.items.descriptions.view_details'),
        },
        {
          label: t('chat.info.what_can_you_do_here.items.labels.manage_conversations'),
          description: t('chat.info.what_can_you_do_here.items.descriptions.manage_conversations'),
        },
        {
          label: t('chat.info.what_can_you_do_here.items.labels.manage_chats'),
          description: t('chat.info.what_can_you_do_here.items.descriptions.search_filter'),
        },
      ],
    }, {
      title: t('chat.info.how_to_manage.title'),
      list: [
        {
          label: t('chat.info.how_to_manage.items.labels.search_filter'),
          description: t('chat.info.how_to_manage.items.descriptions.search_filter'),
        },
        {
          label: t('chat.info.how_to_manage.items.labels.analyze_interactions'),
          description: t('chat.info.how_to_manage.items.descriptions.analyze_interactions'),
        },
        {
          label: t('chat.info.how_to_manage.items.labels.search_filter'),
          description: t('chat.info.how_to_manage.items.descriptions.search_filter'),
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
      <div class="chats-help-info-header">
        <ChatIcon size="48px" />
        <h5 class="title">
          {{ chatInfoContent.title }}
        </h5>
      </div>
    </template>
    <div class="chats-help-info-body">
      <span class="description"> {{ chatInfoContent.description }} </span>

      <template v-for="section in chatInfoContent.sections" :key="section.title">
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
.chats-help-info-header {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-primary-900);

  & .title {
    color: var(--color-primary-900);
  }
}

.chats-help-info-body {
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
  & .chats-help-info-header {
    color: var(--color-primary-0);
    & .title {
      color: var(--color-primary-0);
    }
  }

  & .chats-help-info-body {
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
