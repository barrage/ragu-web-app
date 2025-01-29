<script lang="ts" setup>
import type { Document } from '~/types/document'
import DocumentMentionIcon from '~/assets/icons/svg/document-mention.svg'
import DocumentKeyIcon from '~/assets/icons/svg/document-key.svg'
import DocumentDataLink from '~/assets/icons/svg/document-data-link.svg'
import DocumentFormatIcon from '~/assets/icons/svg/document-format.svg'

const props = defineProps<{
  document: Document | null | undefined
}>()
const { t } = useI18n()

const documentData = computed(() => {
  return {
    name: props.document?.name ? props.document?.name : t('documents.document_card.unknown_name'),
    extension: props.document?.ext || t('documents.document_card.unknown_email'),
    path: props.document?.path ? props.document?.path : t('documents.document_card.path'),
    id: props.document?.id || t('documents.document_card.id'),
    hash: props.document?.hash ? props.document?.hash : t('documents.document_card.hash'),
    source: props.document?.src || t('documents.document_card.src'),
  }
})
</script>

<template>
  <section class="document-informations-section">
    <LabelDescriptionItem
      :label="t('documents.name')"
      :description="documentData.name"
      :truncate-description="35"
      horizontal
      can-copy
    >
      <template #customLabel>
        <div class="document-details-custom-label">
          <DocumentMentionIcon size="18px" />
          <span>  {{ t('documents.name') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('documents.id')"
      :description="documentData.id"
      can-copy
      horizontal
    >
      <template #customLabel>
        <div class="document-details-custom-label">
          <DocumentKeyIcon size="18px" />
          <span>  {{ t('documents.id') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>

    <LabelDescriptionItem
      :label="t('documents.extension')"
      :description="documentData.extension"
      horizontal
    >
      <template #customLabel>
        <div class="document-details-custom-label">
          <DocumentFormatIcon size="18px" />
          <span>  {{ t('documents.extension') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>

    <LabelDescriptionItem
      :label="t('documents.path')"
      :description="documentData.path"
      :truncate-description="35"
      horizontal
      can-copy
    >
      <template #customLabel>
        <div class="document-details-custom-label">
          <DocumentDataLink size="18px" />
          <span>  {{ t('documents.path') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>

    <LabelDescriptionItem
      :label="t('documents.source')"
      :description="documentData.source"
      horizontal
    >
      <template #customLabel>
        <div class="document-details-custom-label">
          <DocumentDataLink size="18px" />
          <span>  {{ t('documents.source') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('documents.hash')"
      :description="documentData.hash"
      :truncate-description="40"
      horizontal
      can-copy
    >
      <template #customLabel>
        <div class="document-details-custom-label">
          <DocumentKeyIcon size="18px" />
          <span>  {{ t('documents.hash') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
  </section>
</template>

<style lang="scss" scoped>
.document-informations-section {
  display: flex;
  padding-block: 2rem;
  padding-inline: 1.5rem;
  row-gap: 0.5rem;
  max-width: 100%;
  flex-wrap: wrap;
  & .label-description-item-container {
    flex: 1 0 calc(50% - 1rem);

    & :deep(.label) {
      flex: 0 0 calc(20% - 0.5rem);
    }
    & :deep(.description) {
      flex: 0 0 calc(70% - 0.5rem);
      font-size: var(--font-size-fluid-2);
    }
  }
}
.document-details-custom-label {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 calc(30% - 0.5rem);
  color: var(--color-primary-900);
  font-weight: var(--fon-weight-bold);
  font-size: var(--font-size-fluid-3);
}
.dark {
  & .document-details-custom-label {
    color: var(--color-primary-100);
  }
}
</style>
