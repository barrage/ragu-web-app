<script lang="ts" setup>
import DocumentIcon from '~/assets/icons/svg/document.svg'

const props = withDefaults(defineProps<{
  size?: string | number
  direction?: 'ttb' | 'btt' | 'ltr' | 'rtl'
}>(), {
  size: '75%',
  direction: 'btt',
})

const emits = defineEmits<{
  (event: 'close'): void
}>()

const isOpen = defineModel<boolean>()

watch(isOpen, (newValue) => {
  if (!newValue) {
    emits('close')
  }
})

const { t } = useI18n()

const documentInfoContent = computed(() => {
  return {
    title: t('documents.info.title'),
    description: t('documents.info.description'),
    sections: [{
      title: t('documents.info.what_can_you_do_here.title'),
      list: [
        {
          label: t('documents.info.what_can_you_do_here.items.labels.upload_documents'),
          description: t('documents.info.what_can_you_do_here.items.descriptions.upload_documents'),
        },
        {
          label: t('documents.info.what_can_you_do_here.items.labels.manage_documents'),
          description: t('documents.info.what_can_you_do_here.items.descriptions.manage_documents'),
        },
        {
          label: t('documents.info.what_can_you_do_here.items.labels.view_details'),
          description: t('documents.info.what_can_you_do_here.items.descriptions.view_details'),
        },
      ],
    }, {
      title: t('documents.info.document_types.title'),
      list: [
        {
          label: t('documents.info.document_types.items.labels.supported_formats'),
          description: t('documents.info.document_types.items.descriptions.supported_formats'),
        },
        {
          label: t('documents.info.document_types.items.labels.size_limits'),
          description: t('documents.info.document_types.items.descriptions.size_limits'),
        },
        {
          label: t('documents.info.document_types.items.labels.parsing_options'),
          description: t('documents.info.document_types.items.descriptions.parsing_options'),
        },
      ],
    }, {
      title: t('documents.info.management_features.title'),
      list: [
        {
          label: t('documents.info.management_features.items.labels.collections'),
          description: t('documents.info.management_features.items.descriptions.collections'),
        },
        {
          label: t('documents.info.management_features.items.labels.metadata'),
          description: t('documents.info.management_features.items.descriptions.metadata'),
        },
        {
          label: t('documents.info.management_features.items.labels.search'),
          description: t('documents.info.management_features.items.descriptions.search'),
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
    @close="emits('close')"
  >
    <template #header>
      <div class="documents-help-info-header">
        <DocumentIcon size="48px" />
        <h5 class="title">
          {{ documentInfoContent.title }}
        </h5>
      </div>
    </template>
    <div class="documents-help-info-body">
      <span class="description">{{ documentInfoContent.description }}</span>

      <template v-for="section in documentInfoContent.sections" :key="section.title">
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
.documents-help-info-header {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-primary-900);

  & .title {
    color: var(--color-primary-900);
  }
}

.documents-help-info-body {
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
  & .documents-help-info-header {
    color: var(--color-primary-0);
    & .title {
      color: var(--color-primary-0);
    }
  }

  & .documents-help-info-body {
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
