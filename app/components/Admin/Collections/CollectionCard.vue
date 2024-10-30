<script lang="ts" setup>
import CollectionIcon from '~/assets/icons/svg/folder-icon.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import type { Collection } from '~/types/collection'
import EyeIcon from '~/assets/icons/svg/eye.svg'

// PROPS
const props = defineProps<{
  collection: Collection | null
}>()

const emit = defineEmits(['openDeleteModal'])
// CONSTANTS
const router = useRouter()
const { t } = useI18n()
// HELPERS
const collectionData = computed(() => {
  return {

    name: props.collection?.name || 'Unknown name',
    updatedAt: props.collection?.updatedAt || 'Unknown date',
    createdAt: props.collection?.createdAt || 'Unknown date',
    embedder: props.collection?.embedder || '-',
    provider: props.collection?.provider || '-',

  }
})

const openDeleteModal = () => {
  emit('openDeleteModal', props.collection)
}

const redirectToCollectionDetails = () => {
  return router.push(`/admin/collections/${props.collection?.id}`)
}
</script>

<template>
  <div class="collection-card grid">
    <div class="collection-profile-item" @click="redirectToCollectionDetails">
      <CollectionIcon size="36" />
      <div class="collection-wrapper">
        <p class="collection-name">
          {{ `${collectionData.name}` }}
        </p>
        <span class="collection-embedder">{{ collectionData.embedder }}</span>
      </div>
    </div>
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
      <ElTooltip
        :content="t('collections.collection_card.view_more')"
        :enterable="false"
        placement="top"
      >
        <el-button
          plain
          type="primary"
          @click="redirectToCollectionDetails()"
        >
          <EyeIcon />
        </el-button>
      </ElTooltip>
      <ElButton
        type="danger"
        plain
        @click.stop="openDeleteModal"
      >
        <DeleteIcon />
      </ElButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collection-card {
  border: 0.5px solid var(--color-primary-300);
  background: var(--color-primary-0);
  box-shadow: 0 0.2rem 0.3rem var(--color-primary-200);
  border-radius: 16px;
  padding: 1rem;
}

.collection-informations-wrapper {
  grid-column: span 5;
  display: flex;
  gap: 3rem;
  justify-content: space-around;
}

.action-links {
  grid-column: span 3;
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
    font-weight: var(--font-weight-bold);
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
  .collection-card {
    border: 0.5px solid var(--color-primary-500);
    background: var(--color-primary-900);
    box-shadow: 0 0.25rem 0.5rem var(--color-primary-800);
  }
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
