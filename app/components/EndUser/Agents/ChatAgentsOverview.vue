<script lang="ts" setup>
import ChatAgentIcon from '~/assets/icons/svg/chat-agent.svg'

const agentStore = useAgentStore()

const { t } = useI18n()

const selectedAgent = ref(agentStore.appAgents?.[0])
const selectAgent = (agent: any) => {
  return selectedAgent.value = agent
}

const { error, status } = await useAsyncData(() => agentStore.GET_AllAppAgents())

errorHandler(error)

watch(
  () => agentStore.appAgents,
  () => {
    selectAgent(agentStore.appAgents?.[0])
  },
  { immediate: true },
)
</script>

<template>
  <template v-if="status === 'pending'">
    <div class="agent-details-loader">
      <MeetUpLoader />
    </div>
  </template>
  <template v-else-if="agentStore.appAgents.length !== 0">
    <div class="agents-overview-container">
      <div class="agents-names-wrapper">
        <template v-for="agent in agentStore.appAgents" :key="agent.id">
          <div
            class="agent-name"
            :class="{ selected: agent.id === selectedAgent?.id }"
            @click="selectAgent(agent)"
          >
            <ChatAgentIcon size="20px" /> {{ agent.name }}
          </div>
        </template>
      </div>

      <div class="selected-agent-wrapper">
        <ChatAgentIcon size="52px" />
        <h6>{{ selectedAgent?.name }}</h6>
        <div class="agent-info">
          <span>{{ t('agents.labels.language') }}: {{ selectedAgent?.language }}</span>
          <span>{{ t('agents.labels.updated_at') }}: {{ formatDate(selectedAgent?.updatedAt) }}</span>
          <p>{{ t('agents.labels.description') }}: {{ selectedAgent?.description }}</p>
        </div>
      </div>
    </div>
  </template>
  <EmptyState
    v-else
    :title="t('agents.agent_card.empty_state_title')"
    :description="t('agents.agent_card.empty_state_desc')"
  >
    <template #icon>
      <ChatAgentIcon size="44px" />
    </template>
  </EmptyState>
</template>

<style lang="scss" scoped>
.agent-details-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--spacing-fluid-3-xl);
}

.agents-overview-container {
  display: flex;

  & .agents-names-wrapper {
    flex: 0 0 calc(50%);
    & .agent-name {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 16px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      color: var(--color-primary-900);
      &:hover {
        background: var(--color-primary-100);
        cursor: pointer;
      }

      &.selected {
        background: var(--color-primary-100);
      }
    }
  }
  & .selected-agent-wrapper {
    flex: 0 0 calc(50%);
    background: var(--color-primary-100);
    padding: 1.5rem;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.625rem;

    & h6 {
      color: var(--color-primary-900);
      text-align: center;
      margin-bottom: 30px;
    }

    .agent-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
      & span {
        color: var(--color-primary-600);
      }
      & p {
        color: var(--color-primary-800);
      }
    }
  }
}

.dark {
  .agents-overview-container {
    & .agents-names-wrapper {
      & .agent-name {
        color: var(--color-primary-100);
        &:hover {
          background: var(--color-primary-600);
        }

        &.selected {
          background: var(--color-primary-800);
        }
      }
    }
    & .selected-agent-wrapper {
      background: var(--color-primary-800);
      & h6 {
        color: var(--color-primary-0);
      }
      & span {
        color: var(--color-primary-300);
      }
      & p {
        color: var(--color-primary-100);
      }
    }
  }
}
</style>
