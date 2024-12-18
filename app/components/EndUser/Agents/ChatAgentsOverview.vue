<script lang="ts" setup>
import ChatAgentIcon from '~/assets/icons/svg/chat-agent.svg'
import AccountWarningIcon from '~/assets/icons/svg/account-warning.svg'
import AddPersonIcon from '~/assets/icons/svg/person-add.svg'

const agentStore = useAgentStore()
const { selectedRole } = storeToRefs(useAuthStore())

const { t } = useI18n()

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
</script>

<template>
  <div>
    <template v-if="status === 'pending'">
      <div class="agent-details-loader">
        <MeetUpLoader />
      </div>
    </template>
    <template v-else-if="agentStore.appAgents.length">
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
      :title="$t('chat.newChat.empty_title')"
      :description="$t('chat.newChat.empty')"
    >
      <template #icon>
        <AccountWarningIcon size="44px" />
      </template>
      <template v-if="selectedRole === 'admin'" #cta>
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
          background: var(--color-primary-700);
        }

        &.selected {
          background: var(--color-primary-700);
        }
      }
    }
    & .selected-agent-wrapper {
      background: var(--color-primary-700);
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
