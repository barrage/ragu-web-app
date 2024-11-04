<script lang="ts" setup>
import ChatAgentIcon from '~/assets/icons/svg/chat-agent.svg'
import type { Agent } from '~/types/agent.ts'

const props = defineProps<{
  agent: Agent | null
}>()

const agentStore = useAgentStore()
</script>

<template>
  <div
    v-if="agent?.active"
    class="agent-select-card"
    :class="{ selected: agent?.id === agentStore.selectedAgent?.id }"
    @click="agentStore.setSelectedAgent(props.agent?.id)"
  >
    <div class="agent-body-wrapper">
      <div class="agent-name-wrapper">
        <ChatAgentIcon size="32" class="chat-agent-icon" />
        <p class="agent-select-text">
          {{ props.agent?.name }}
        </p>
      </div>
      <span class="agent-description">{{ props.agent?.description }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.agent-select-card {
  border: 1px solid var(--color-primary-400);
  padding: 0.75rem;
  padding-bottom: 1rem;
  border-radius: 1rem;
  min-height: 100px;
  display: flex;
  &.selected {
    background: var(--color-primary-100);
    border: 1.5px solid var(--color-primary-500);
    & .agent-select-text {
      color: var(--color-primary-900);
      font-weight: var(--font-weight-medium);
    }
  }

  & .agent-body-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: left;
    overflow: hidden;

    & .agent-name-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;

      & .chat-agent-icon {
        min-width: max-content;
      }
      & .agent-select-text {
        font-size: var(--font-size-desktop-3);
        gap: 1rem;
        font-weight: var(--font-weight-bold);
        text-align: left;
        line-height: 1.5rem;
        color: var(--color-primary-700);
      }
    }

    & .agent-description {
      font-size: var(--font-size-fluid-2);
      max-width: 30ch;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  &:hover {
    border: 1.5px solid var(--color-primary-500);
    background: var(--color-primary-100);
    cursor: pointer;

    & .agent-select-text {
      color: var(--color-primary-900);
    }
  }
}

.dark {
  & .agent-select-card {
    &.selected {
      border: 1.5px solid var(--color-primary-300);
      background: var(--color-primary-800);
      & .agent-select-text {
        color: var(--color-primary-0);
        font-weight: var(--font-weight-medium);
      }
    }

    & .agent-select-text {
      color: var(--color-primary-200);
    }

    &:hover {
      border: 1.5px solid var(--color-primary-300);
      background: var(--color-primary-800);

      & .agent-select-text {
        color: var(--color-primary-0);
      }
    }
  }
}
</style>
