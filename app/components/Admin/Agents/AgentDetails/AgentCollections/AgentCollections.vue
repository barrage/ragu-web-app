<script lang="ts" setup>
import type { AgentCollection } from '~/types/agent'

const props = defineProps<{
  agentCollections: AgentCollection[] | undefined
}>()
</script>

<template>
  <section class="agent-collections-section grid">
    <!-- ------------- -->
    <div class="agent-collections-header-container">
      <h4>Agent Collections</h4>
    </div>
    <!-- ------------- -->
    <div class="agent-collection-list-container">
      <template v-if="props.agentCollections?.length && props.agentCollections?.length > 0">
        <template v-for="agentCollection in props.agentCollections" :key="agentCollection.id">
          <AgentCollectionCard :agent-collection="agentCollection" />
        </template>
      </template>
      <template v-else>
        <AgentCollectionsEmptyState />
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.agent-collections-section {
  & .agent-collections-header-container {
    grid-column: span 12;
  }

  & .agent-collection-list-container {
    grid-column: span 12;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
