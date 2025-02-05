<script lang="ts" setup>
import AccountWarningIcon from '~/assets/icons/svg/account-warning.svg'
import AddPersonIcon from '~/assets/icons/svg/person-add.svg'
import type { SingleAgent } from '~/types/agent.ts'

const emits = defineEmits<Emits>()
const agentStore = useAgentStore()
const oAuthStore = useAuthStore()

interface Emits {
  (event: 'agentSelectedForChat', agent: SingleAgent): void
}

const selectedAgent = ref(agentStore.appAgents?.[0])
const selectAgent = (agent: any) => {
  return selectedAgent.value = agent
}

const { error, status } = useAsyncData(() => agentStore.GET_AllAppAgents(), { lazy: true })

errorHandler(error)

watch(
  () => agentStore.appAgents,
  () => {
    selectAgent(agentStore.appAgents?.[0])
  },
  { immediate: true },
)

const handleAgentSelectedForChat = (agent: SingleAgent) => {
  emits('agentSelectedForChat', agent)
}
</script>

<template>
  <div>
    <template v-if="status === 'pending'">
      <div class="agent-details-loader">
        <MeetUpLoader />
      </div>
    </template>
    <template v-else-if="agentStore.appAgents.length">
      <div class="agents-overview-container grid">
        <template v-for="agent in agentStore.appAgents" :key="agent.id">
          <AgentOverviewCard
            class="agent-card"
            :agent="agent"
            @agent-selected-for-chat="handleAgentSelectedForChat"
          />
        </template>
      </div>
    </template>
    <EmptyState
      v-else
      :title="$t('chat.newChat.empty_title')"
      :description="$t('chat.newChat.empty')"
    >
      <template #icon>
        <AccountWarningIcon size="44px" />
      </template>
      <template v-if="oAuthStore.isAdmin" #cta>
        <LlmLink to="/admin/agents" type="button">
          <AddPersonIcon /> {{ $t('chat.newChat.empty_cta') }}
        </LlmLink>
      </template>
    </EmptyState>
  </div>
</template>

<style lang="scss" scoped>
.agent-details-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--spacing-fluid-3-xl);
  padding-bottom: 100px;
}

.agents-overview-container {
  & .agent-card {
    grid-column: span 4;
  }
}

.dark {
  .agents-overview-container {
  }
}
</style>
