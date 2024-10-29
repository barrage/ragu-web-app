<script lang="ts" setup>
import CollectionIcon from '~/assets/icons/svg/folder-icon.svg'
import PersonClockIcon from '~/assets/icons/svg/person-clock.svg'
import PersonCalendarIcon from '~/assets/icons/svg/person-calendar.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import type { Collection } from '~/types/collection'

const props = defineProps<{
  collection: Collection | null | undefined
}>()

const { t } = useI18n()

const collectionData = computed(() => {
  return {
    id: props.collection?.id || t('collections.collection_card.unknown_id'),
    name: props.collection?.name || t('collections.collection_card.unknown_collectin_name'),
    provider: props.collection?.provider || t('collections.collection_card.unknown_llmProvider'),
    embedder: props.collection?.embedder || t('collections.collection_card.unknown_llmProvider'),
    model: props.collection?.model || t('collections.collection_card.unknown_model'),
    updatedAt: props.collection?.updatedAt ? formatDate(props.collection.updatedAt, 'MMMM DD, YYYY') : t('collections.collection_card.unknown_date'),
    createdAt: props.collection?.createdAt ? formatDate(props.collection.createdAt, 'MMMM DD, YYYY') : t('collections.collection_card.unknown_date'),
  }
})
</script>

<template>
  <div class="collection-details-hero-section">
    <div class="profile-avatar-wrapper">
      <CollectionIcon size="80" />
      <div class="collectionname-status-wrapper">
        <h6 class="collectionname">
          {{ `${collectionData.name}` }}
        </h6>
      </div>
    </div>
    <div class="collection-details-actions-wrapper" />
  </div>
  <div class="collection-informations-section">
    <LabelDescriptionItem
      :label="t('collections.labels.id')"
      :description="collectionData.id"
      horizontal
    >
      <template #customLabel>
        <div class="collection-details-custom-label">
          <PersonInfoIcon size="18px" />
          <span>  {{ t('collections.labels.id') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('collections.labels.name')"
      :description="collectionData.name"
      horizontal
    >
      <template #customLabel>
        <div class="collection-details-custom-label">
          <PersonInfoIcon size="18px" />
          <span>  {{ t('collections.labels.name') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>

    <LabelDescriptionItem
      :label=" t('collections.labels.provider')"
      :description="collectionData.provider"
      horizontal
    >
      <template #customLabel>
        <div class="collection-details-custom-label">
          <BrainIcon size="18px" />
          <span>  {{ t('collections.labels.provider') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>

    <LabelDescriptionItem
      :label="t('collections.labels.embedder')"
      :description="collectionData.embedder"
      horizontal
    >
      <template #customLabel>
        <div class="collection-details-custom-label">
          <BrainIcon size="18px" />
          <span>  {{ t('collections.labels.embedder') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('collections.labels.model')"
      :description="collectionData.model"
      horizontal
    >
      <template #customLabel>
        <div class="collection-details-custom-label">
          <BrainIcon size="18px" />
          <span>  {{ t('collections.labels.model') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('collections.labels.created_at') "
      :description="collectionData.createdAt"
      horizontal
    >
      <template #customLabel>
        <div class="collection-details-custom-label">
          <PersonCalendarIcon size="18px" />
          <span>  {{ t('collections.labels.created_at') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('collections.labels.updated_at')"
      :description="collectionData.updatedAt"
      horizontal
    >
      <template #customLabel>
        <div class="collection-details-custom-label">
          <PersonClockIcon size="18px" />
          <span>  {{ t('collections.labels.updated_at') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
  </div>
</template>

<style lang="scss" scoped>
.collection-details-hero-section {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  padding-block: 1rem;

  & .profile-avatar-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-start;
    margin-right: 1rem;
    text-overflow: ellipsis;
  }

  & .collection-details-actions-wrapper {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
}

.collection-informations-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  padding-block: 2rem;
  row-gap: 1.5rem;
  border-top: 1px solid var(--color-primary-300);
  border-bottom: 1px solid var(--color-primary-300);

  :deep(.description) {
    font-size: var(--font-size-fluid-2);
  }
}

.collection-details-custom-label {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 calc(30% - 0.5rem);
  color: var(--color-primary-900);
  font-size: var(--font-size-fluid-3);

  svg {
    flex-shrink: 0;
  }
}

.context-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & .label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--font-size-fluid-3);
    line-height: normal;
    color: var(--color-primary-900);
  }
  & .description {
    line-height: normal;
    color: var(--color-primary-800);
    font-size: var(--font-size-fluid-2);
    padding-left: 1.675rem;
  }
}

.collectionname {
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-900);
}

.dark {
  & .collection-details-custom-label {
    color: var(--color-primary-100);
  }

  & .label,
  .collectionname {
    color: var(--color-primary-100);
  }
  & .description {
    color: var(--color-primary-0);
  }
}
</style>
