<script lang="ts" setup>
import type { AgentCollection } from '~/types/agent'

// PROPS

const props = defineProps<{
  agentCollection: AgentCollection | undefined
}>()

// COMPUTED

const agentCollectionData = computed(() => {
  return {
    id: props.agentCollection?.id,
    collection: props.agentCollection?.collection ? props.agentCollection?.collection : '-',
    amount: props.agentCollection?.amount ? props.agentCollection?.amount : 0,
    instruction: props.agentCollection?.instruction ? props.agentCollection?.instruction : '-',
    embeddingProvider: props.agentCollection?.embeddingProvider ? props.agentCollection?.embeddingProvider : '-',
    embeddingModel: props.agentCollection?.embeddingModel ? props.agentCollection?.embeddingModel : '-',
    vectorProvider: props.agentCollection?.vectorProvider ? props.agentCollection?.vectorProvider : '-',
    created_at: props.agentCollection?.createdAt ? props.agentCollection?.createdAt : null,
    updated_at: props.agentCollection?.updatedAt ? props.agentCollection?.updatedAt : null,
  }
})

const createdAtRelativeDate = agentCollectionData.value.created_at
  ? useRelativeDate(agentCollectionData.value.created_at)
  : '-'

const updatedAtRelativeDate = agentCollectionData.value.updated_at
  ? useRelativeDate(agentCollectionData.value.updated_at)
  : '-'
</script>

<template>
  <el-card class="agent-collection-card is-primary">
    <div class="agent-collection-card-body">
      <CollectionProfileSnippet class="agent-collection-name" :collection-name="agentCollectionData.collection" />

      <LabelDescriptionItem
        :label="$t('collections.assign_collection.labels.amount')"
        :description="agentCollectionData.amount"
      />
      <LabelDescriptionItem
        :label="$t('agents.labels.embeddingProvider')"
        :description="agentCollectionData.embeddingProvider"
      />
      <LabelDescriptionItem
        :label="$t('agents.labels.embeddingModel')"
        :description="agentCollectionData.embeddingModel"
      />
      <LabelDescriptionItem
        :label="$t('agents.labels.vectorProvider')"
        :description="agentCollectionData.vectorProvider"
        class="vector-provider"
      />

      <LabelDescriptionItem
        :label="$t('collections.labels.created_at')"
        :description="createdAtRelativeDate"
      />
      <LabelDescriptionItem
        :label="$t('collections.labels.updated_at')"
        :description="updatedAtRelativeDate"
      />
      <div class="horizontal-divider" />
      <LabelDescriptionItem
        class="agent-collection-instruction"
        :label="$t('collections.assign_collection.labels.instructions')"
        :description="agentCollectionData.instruction"
      >
        <template #customDescription>
          <HighlightedText :text="agentCollectionData.instruction" />
        </template>
      </LabelDescriptionItem>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.agent-collection-card {
  .agent-collection-card-body {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: var(--spacing-fluid-m);

    @include viewport-m {
      grid-template-columns: repeat(4, 1fr);
    }

    &:deep(.vector-provider) {
      grid-column: 2 / 3;
    }

    .agent-collection-name {
      grid-column: 1/-1;
      @include viewport-m {
        grid-column: span 1;
        grid-row: span 2;
        margin-right: 50px;
      }
    }

    & .agent-collection-instruction {
      grid-column: 1/-1;
      align-items: center;
    }

    .label-description-item-container {
      grid-column: 1/-1;

      @include viewport-xs {
        grid-column: span 1;
      }
    }
  }

  .horizontal-divider {
    grid-column: 1/-1;
  }
}
</style>
