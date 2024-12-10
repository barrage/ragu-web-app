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
    name: props.agentCollection?.collection ? props.agentCollection?.collection : '-',
    amount: props.agentCollection?.amount ? props.agentCollection?.amount : 0,
    instruction: props.agentCollection?.instruction ? props.agentCollection?.instruction : '-',
    created_at: props.agentCollection?.createdAt ? props.agentCollection?.createdAt : null,
    updated_at: props.agentCollection?.updatedAt ? props.agentCollection?.updatedAt : null,
  }
})

const createdAtRelativeDate = agentCollectionData.value.created_at
  ? useRelativeDate(agentCollectionData.value.created_at)
  : '-'
</script>

<template>
  <el-card class="agent-collection-card is-primary">
    <div class="agent-collection-card-body">
      <CollectionProfileSnippet class="agent-collection-name" :collection-name="agentCollectionData.name" />

      <LabelDescriptionItem
        :label="$t('collections.assign_collection.labels.amount')"
        :description="agentCollectionData.amount"
      />

      <LabelDescriptionItem
        :label="$t('collections.labels.created_at')"
        :description="createdAtRelativeDate"
      />

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
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: var(--spacing-fluid-m);

    & .agent-collection-name {
      grid-column: span 2;
    }

    & .agent-collection-instruction {
      grid-column: span 4;
    }
  }
}
</style>
