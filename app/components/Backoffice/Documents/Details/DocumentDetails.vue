<script lang="ts" setup>
import DocumentConfigurationTab from './DocumentConfigurationTab.vue'
import DocumentConfigurationIcon from '~/assets/icons/svg/document-configuration.svg'

import DocumentIcon from '~/assets/icons/svg/document.svg'
import type { Document } from '~/types/document'

const props = defineProps<{
  document: Document
}>()

const { t } = useI18n()
const tabOptions = computed(() => {
  return ['details', 'configuration']
})
const { activeTab } = useTabQuery(
  'details',
  tabOptions.value,
)
</script>

<template>
  <div class="admin-document-page-container">
    <DocumentDetailsHeroSection :document="props.document" />
    <ElTabs
      v-model="activeTab"
      class="document-details-tabs"
      data-testid="bo-document-details-tabs"
    >
      <ElTabPane
        label="details"
        name="details"
      >
        <template #label>
          <div class="custom-tab-label-wrapper">
            <DocumentIcon size="24px" />
            <span>{{ t('details') }}</span>
          </div>
        </template>
        <template v-if="activeTab === 'details'">
          <DocumentDetailsInformationsSection :document="props.document" />
        </template>
      </ElTabPane>

      <ElTabPane
        :label="t('documents.configuration')"
        name="configuration"
      >
        <template #label>
          <div class="custom-tab-label-wrapper">
            <DocumentConfigurationIcon size="24px" />
            <span>{{ t('documents.configuration') }}</span>
          </div>
        </template>
        <template v-if="activeTab === 'configuration'">
          <DocumentConfigurationTab :document="props.document" />
        </template>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<style lang="scss" scoped>
.document-details-tabs {
  margin-top: var(--spacing-fluid-xs);

  & .custom-tab-label-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-fluid-5-xs);
  }
}

.admin-document-page-header {
  display: flex;
  gap: 22px;
  justify-content: space-between;
}
.admin-document-page-container {
  padding: 1rem 2rem;
}
</style>
