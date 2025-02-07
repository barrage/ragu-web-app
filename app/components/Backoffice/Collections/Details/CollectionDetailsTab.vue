<script lang="ts" setup>
import type { CollectionResponse } from '~/types/collection'
import PersonClockIcon from '~/assets/icons/svg/person-clock.svg'
import PersonCalendarIcon from '~/assets/icons/svg/person-calendar.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'

const props = defineProps<{
  singleCollection: CollectionResponse | null | undefined
}>()

const { t } = useI18n()

const collectionData = computed(() => {
  return {
    id: props.singleCollection?.collection?.id || t('collections.collection_card.unknown_id'),
    name: props.singleCollection?.collection?.name || t('collections.collection_card.unknown_collectin_name'),
    provider: props.singleCollection?.collection?.provider || t('collections.collection_card.unknown_llmProvider'),
    embedder: props.singleCollection?.collection?.embedder || t('collections.collection_card.unknown_llmProvider'),
    model: props.singleCollection?.collection?.model || t('collections.collection_card.unknown_model'),
    updatedAt: props.singleCollection?.collection?.updatedAt ? formatDate(props.singleCollection?.collection.updatedAt, 'MMMM DD, YYYY') : t('collections.collection_card.unknown_date'),
    createdAt: props.singleCollection?.collection?.createdAt ? formatDate(props.singleCollection?.collection.createdAt, 'MMMM DD, YYYY') : t('collections.collection_card.unknown_date'),
  }
})
</script>

<template>
  <section class="collection-informations-section">
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
  </section>
</template>

<style lang="scss" scoped>
.collection-informations-section {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  padding-block: 2rem;
  row-gap: 1.5rem;

  :deep(.description) {
    font-size: var(--font-size-fluid-2);
  }

  @include viewport-m {
    grid-template-columns: repeat(2, 1fr);
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
