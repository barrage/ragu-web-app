<script lang="ts" setup>
import CollectionIcon from '~/assets/icons/svg/folder-icon.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import type { Collection } from '~/types/collection'
import EyeIcon from '~/assets/icons/svg/eye.svg'

// PROPS & EMITS
const props = defineProps<{
  collection: Collection | null
}>()

const emit = defineEmits(['openDeleteModal'])

// CONSTANTS

const { t } = useI18n()

// COMPUTEDS

const collectionData = computed(() => {
  return {

    name: props.collection?.name || 'Unknown name',
    updatedAt: props.collection?.updatedAt || 'Unknown date',
    createdAt: props.collection?.createdAt || 'Unknown date',
    embedder: props.collection?.embedder || '-',
    provider: props.collection?.provider || '-',

  }
})

// FUNCTIONS

const openDeleteModal = () => {
  emit('openDeleteModal', props.collection)
}
</script>

<template>
  <el-card class="collection-card is-primary">
    <div class=" grid">
      <LlmLink
        :to="`/admin/collections/${collection?.id}`"
        type="link"
        class="collection-profile-item"
      >
        <CollectionIcon size="36px" />
        <div class="collection-wrapper">
          <p class="collection-name">
            {{ `${collectionData.name}` }}
          </p>
          <span class="collection-embedder">{{ collectionData.embedder }}</span>
        </div>
      </LlmLink>
      <div class="collection-informations-wrapper">
        <LabelDescriptionItem
          :label="t('collections.labels.updated_at')"
          :description="formatDate(collectionData.updatedAt)"
          size="small"
        />
        <LabelDescriptionItem
          :label="t('collections.labels.created_at')"
          :description="formatDate(collectionData.createdAt)"
          size="small"
        />
        <LabelDescriptionItem
          :label="t('collections.labels.provider')"
          :description="collectionData.provider"
          size="small"
        />
      </div>

      <div class="action-links">
        <LlmTooltip :content="$t('collections.collection_card.view_more')">
          <LlmLink
            :to="`/admin/collections/${collection?.id}`"
            type="plainButtonPrimary"
          >
            <EyeIcon size="20px" />
          </LlmLink>
        </LlmTooltip>
        <LlmTooltip :content="$t('collections.collection_card.delete_collection')">
          <ElButton
            type="danger"
            plain
            @click.stop="openDeleteModal"
          >
            <DeleteIcon size="20px" />
          </ElButton>
        </LlmTooltip>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.collection-card {
  padding-inline: 0.6rem;
  padding-block: 0.8rem;
}

.collection-informations-wrapper {
  grid-column: 5/9;
  display: flex;
  gap: 3rem;
  justify-content: space-around;
}

.action-links {
  grid-column: 9/-1;
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: end;

  button {
    font-size: var(--font-size-fluid-3);
  }
}

.collection-profile-item {
  grid-column: span 4;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  margin-right: 1rem;
  text-overflow: ellipsis;
  flex: 0 0 calc(30% - 22px);
  color: var(--color-primary-900);

  svg {
    flex-shrink: 0;
  }

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}

.collection-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .collection-name {
    margin: 0;
    font-size: var(--font-size-fluid-2);
    line-height: normal;
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary-900);
  }
  & .collection-embedder {
    margin: 0;
    line-height: normal;
    font-size: var(--font-size-fluid-1);
    color: var(--color-primary-800);
  }
}

.dark {
  .collection-wrapper {
    color: var(--color-primary-0);
    & .collection-name {
      color: var(--color-primary-0);
    }
  }
  .collection-profile-item {
    color: var(--color-primary-0);
  }
  .collection-wrapper {
    & .collection-name {
      color: var(--color-primary-0);
    }
    & .collection-embedder {
      color: var(--color-primary-100);
    }
  }
}
</style>
