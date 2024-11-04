<script lang="ts" setup>
import ChatAgentIcon from '~/assets/icons/svg/chat-agent.svg'

const agentStore = useAgentStore()
/* agentStore.GET_AllAgents() */

const { error } = await useAsyncData(() => agentStore.GET_AllAgents())

errorHandler(error)

const allAgents = computed(() => {
  return agentStore.agentsResponse?.items
})
const selectedAgent = ref(allAgents.value?.[0])
const selectAgent = (agent: any) => {
  return selectedAgent.value = agent
}

watch(
  () => allAgents.value,
  () => {
    selectAgent(allAgents.value?.[0])
  },
)
</script>

<template>
  <div class="agents-overview-container">
    <div class="agents-names-wrapper">
      <template v-for="agent in allAgents" :key="agent.id">
        <div
          v-if="agent?.active"
          class="agent-name"
          :class="{ selected: agent.id === selectedAgent?.id }"
          @click="selectAgent(agent)"
        >
          <ChatAgentIcon /> {{ agent.name }}
        </div>
      </template>
    </div>

    <div class="selected-agent-wrapper">
      <ChatAgentIcon size="52" />
      <h6>{{ selectedAgent?.name }}</h6>
      <span>Updated: {{ formatDate(selectedAgent?.createdAt) }}</span>
      <p>{{ selectedAgent?.context }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    gap: 1.25rem;
    & h6 {
      color: var(--color-primary-900);
      text-align: center;
    }
    & span {
      color: var(--color-primary-600);
    }
    & p {
      color: var(--color-primary-800);
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
