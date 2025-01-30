<script lang="ts" setup>
import type { Configuration } from '~/types/agent'

const props = defineProps<{
  agentId: string
}>()
const emits = defineEmits<Emits>()
const { t } = useI18n()
const { $api } = useNuxtApp()
const { error: getAgentVersionsError, status: getAgentVersionsStatus, data: agentVersionsData } = await useAsyncData(() => $api.agent.GetAgentVersions(props.agentId), { lazy: true })

errorHandler(getAgentVersionsError)

const emptyChatData = computed(() => {
  const items = agentVersionsData.value?.items
  return !Array.isArray(items) || items.length === 0
})

const agentVersionsDataItems = computed(() => agentVersionsData.value?.items)

interface Emits {
  (event: 'rollbackAgentVersion', agent: Configuration): void
}

const handleAgentVersionRollback = async (agentConfig: Configuration) => {
  emits('rollbackAgentVersion', agentConfig)
}
</script>

<template>
  <div>
    <div class="agent-versions-list-title-wrapper">
      <h5 class="agent-versions-list-title">
        {{ t('agents.titles.versions') }}
      </h5>
    </div>

    <GlobalCardListLoader
      v-if="(getAgentVersionsStatus === 'pending') || (getAgentVersionsStatus === 'idle')"
      type="agentVersion"
      :skeleton-count="10"
    />

    <AgentVersionsList
      v-else-if="!emptyChatData"
      :agent-versions="agentVersionsDataItems"
      @agent-version-rollback="handleAgentVersionRollback"
    />
    <EmptyState
      v-else
    />
  </div>
</template>

<style lang="scss" scoped>
.agent-versions-list-title-wrapper {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-fluid-5);
  color: var(--color-primary-900);
  margin-block: var(--spacing-fluid-m);
  padding-inline: 0.8rem;

  & .agent-versions-list-title {
    color: var(--color-primary-900);
    font-size: var(--font-size-fluid-4);
  }
}
.dark {
  .agent-versions-list-title-wrapper {
    color: var(--color-primary-0);
  }
  & .agent-versions-list-title {
    color: var(--color-primary-0);
  }
}
</style>
