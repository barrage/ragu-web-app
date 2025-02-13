<script lang="ts" setup>
import type { CollectionResponse } from '~/types/collection'
import FileDetailsIcon from '~/assets/icons/svg/folder-icon.svg'
import DocumentIcon from '~/assets/icons/svg/document.svg'

const props = defineProps<{
  singleCollection: CollectionResponse | null | undefined
}>()

const { t } = useI18n()

const tabOptions = computed(() => {
  return ['details', 'documents']
})
const { activeTab } = useTabQuery(
  'details',
  tabOptions.value,
)
</script>

<template>
  <div>
    <CollectionDetailsHero :single-collection="props.singleCollection" />
    <ElTabs
      v-model="activeTab"
      class="collection-details-tabs"
      data-testid="bo-collection-details-tabs"
    >
      <ElTabPane
        label="details"
        name="details"
      >
        <template #label>
          <div class="custom-tab-label-wrapper">
            <FileDetailsIcon size="24px" />
            <span>{{ t('details') }}</span>
          </div>
        </template>
        <template v-if="activeTab === 'details'">
          <CollectionDetailsTab
            v-motion-slide-bottom
            :duration="400"
            :single-collection="props.singleCollection"
          />
        </template>
      </ElTabPane>

      <ElTabPane
        label="documents"
        name="documents"
      >
        <template #label>
          <div class="custom-tab-label-wrapper">
            <DocumentIcon size="24px" />
            <span>{{ t('documents.title') }}</span>
          </div>
        </template>
        <template v-if="activeTab === 'documents'">
          <CollectionDocumentsTab
            v-motion-slide-bottom
            :duration="400"
            :single-collection="props.singleCollection"
          />
        </template>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<style lang="scss" scoped>
.collection-details-tabs {
  margin-top: var(--spacing-fluid-xs);

  & .custom-tab-label-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-fluid-5-xs);
  }
}
</style>
