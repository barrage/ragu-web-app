<script lang="ts" setup>
import type { AgentCollection } from '~/types/agent'

const props = defineProps<{
  agentCollection: AgentCollection | undefined
}>()

const agentCollectionData = computed(() => {
  return {
    id: props.agentCollection?.id,
    name: props.agentCollection?.collection ? props.agentCollection?.collection : '-',
    amount: props.agentCollection?.amount ? props.agentCollection?.amount : 0,
    instruction: props.agentCollection?.instruction ? props.agentCollection?.instruction : '-',
    created_at: props.agentCollection?.createdAt ? useRelativeDate(props.agentCollection?.createdAt) : '-',
    updated_at: props.agentCollection?.updatedAt ? useRelativeDate(props.agentCollection?.updatedAt) : '-',
  }
})
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
        :description="agentCollectionData.created_at"
      />

      <LabelDescriptionItem
        class="agent-collection-instruction"
        :label="$t('collections.assign_collection.labels.instructions')"
        :description="agentCollectionData.instruction"
      >
        <template #customDescription>
          <div class="highlighted-text-area">
            <span class="highlighted-text"> <i>{{ agentCollectionData.instruction }}</i> </span>
          </div>
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
.highlighted-text-area {
  background: var(--color-primary-200);
  width: fit-content;
  border: 1px solid var(--color-primary-300);
  border-radius: 8px;
  padding-inline: 12px;
  padding-block: 4px;

  & .highlighted-text {
    font-size: var(--font-size-fluid-2);
    color: var(--color-primary-900);
  }
}

.dark {
  .highlighted-text-area {
    background: var(--color-primary-800);
    border: 1px solid var(--color-primary-700);

    & .highlighted-text {
      color: var(--color-primary-100);
    }
  }
}
</style>
