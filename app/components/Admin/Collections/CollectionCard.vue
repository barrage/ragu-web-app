<script lang="ts" setup>
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
  <div class="collection-card">
    <LabelDescriptionItem
      :label="t('collections.labels.name')"
      :description="collectionData?.name"
      size="small"
    />

    <LabelDescriptionItem
      :label="t('collections.labels.updated_at')"
      :description="formatDate(collectionData.updatedAt)"
      size="small"
      centered
    />
    <LabelDescriptionItem
      :label="t('collections.labels.created_at')"
      :description="formatDate(collectionData.createdAt)"
      size="small"
      centered
    />

    <div class="action-links">
      <ElTooltip
        :content="t('agents.agent_card.view_more')"
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  border: 0.5px solid var(--color-primary-300);
  background: var(--color-primary-0);
  box-shadow: 0 0.2rem 0.3rem var(--color-primary-200);
  border-radius: 16px;
  padding: 1rem;
}

.action-links {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: end;

  button {
    font-size: var(--font-size-fluid-3);
  }
}

.dark {
  .collection-card {
    border: 0.5px solid var(--color-primary-500);
    background: var(--color-primary-900);
    box-shadow: 0 0.25rem 0.5rem var(--color-primary-800);
  }
}
</style>
