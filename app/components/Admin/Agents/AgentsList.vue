<script lang="ts" setup>
import type { Agent } from '~/types/agent'

const props = defineProps<{
  agents: Agent[] | null | undefined
}>()
</script>

<template>
  <div class="agents-list-container">
    <template v-for="agent in props.agents" :key="agent.id">
      <AgentCard :agent="agent" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.agents-list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}
</style>
