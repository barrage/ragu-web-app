<script lang="ts" setup>
import CollectionIcon from '~/assets/icons/svg/folder-multiple.svg'

const props = withDefaults(defineProps<{
  size?: string | number
  direction?: 'ttb' | 'btt' | 'ltr' | 'rtl'
}>(), {
  size: '65%',
  direction: 'btt',
})

const isOpen = defineModel<boolean>()

const { t } = useI18n()

const collectionInfoContent = computed(() => {
  return {
    title: t('collections.info.title'),
    description: t('collections.info.description'),
    sections: [{
      title: t('collections.info.what_can_you_do_here.title'),
      list: [
        {
          label: t('collections.info.what_can_you_do_here.items.labels.create_collections'),
          description: t('collections.info.what_can_you_do_here.items.descriptions.create_collections'),
        },
        {
          label: t('collections.info.what_can_you_do_here.items.labels.manage_documents'),
          description: t('collections.info.what_can_you_do_here.items.descriptions.manage_documents'),
        },
        {
          label: t('collections.info.what_can_you_do_here.items.labels.view_details'),
          description: t('collections.info.what_can_you_do_here.items.descriptions.view_details'),
        },
      ],
    }, {
      title: t('collections.info.how_to_manage.title'),
      list: [
        {
          label: t('collections.info.how_to_manage.items.labels.add_documents'),
          description: t('collections.info.how_to_manage.items.descriptions.add_documents'),
        },
        {
          label: t('collections.info.how_to_manage.items.labels.assign_agents'),
          description: t('collections.info.how_to_manage.items.descriptions.assign_agents'),
        },
        {
          label: t('collections.info.how_to_manage.items.labels.embeddings'),
          description: t('collections.info.how_to_manage.items.descriptions.embeddings'),
        },
      ],
    }, {
      title: t('collections.info.important_notes.title'),
      list: [
        {
          label: t('collections.info.important_notes.items.labels.performance'),
          description: t('collections.info.important_notes.items.descriptions.performance'),
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
      <div class="collections-help-info-header">
        <CollectionIcon size="48px" />
        <h5 class="title">
          {{ collectionInfoContent.title }}
        </h5>
      </div>
    </template>
    <div class="collections-help-info-body">
      <span class="description">{{ collectionInfoContent.description }}</span>

      <template v-for="section in collectionInfoContent.sections" :key="section.title">
        <el-divider />

        <div>
          <h6>{{ section.title }}</h6>
          <ol v-if="section.list.length > 0">
            <template v-for="item in section.list" :key="item.label">
              <li>
                <p class="li-label">
                  {{ item.label }}
                </p>
                <span class="li-description">{{ item.description }}</span>
              </li>
            </template>
          </ol>
        </div>
      </template>
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped>
.collections-help-info-header {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-primary-900);

  & .title {
    color: var(--color-primary-900);
  }
}

.collections-help-info-body {
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
  & .collections-help-info-header {
    color: var(--color-primary-0);
    & .title {
      color: var(--color-primary-0);
    }
  }

  & .collections-help-info-body {
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
