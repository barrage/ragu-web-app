<script lang="ts" setup>
import ChatAgentIcon from '~/assets/icons/svg/chat-agent.svg'
import type { SingleAgent } from '~/types/agent.ts'

const props = defineProps<{
  agent: SingleAgent | null
}>()

const agentStore = useAgentStore()
</script>

<template>
  <el-card
    v-if="agent?.active"
    class="agent-select-card"
    :class="{ 'is-accent': agent?.id === agentStore.selectedAgent?.id, 'selected': agent?.id === agentStore.selectedAgent?.id }"
    @click="agentStore.setSelectedAgent(props.agent)"
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
  </el-card>
</template>

<style lang="scss" scoped>
.agent-select-card {
  padding: 0.75rem;
  padding-bottom: 1rem;

  min-height: 150px;
  display: flex;
  &.selected {
    & .agent-select-text {
      color: var(--color-primary-900);
      font-weight: var(--font-weight-medium);
    }
  }
  &:deep(.barrage-card__body) {
    min-height: 100%;
    max-width: 100%;
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
      gap: 0.5rem;

      & .chat-agent-icon {
        min-width: max-content;
      }
      & .agent-select-text {
        font-size: var(--font-size-desktop-3);
        gap: 1rem;
        text-align: left;
        line-height: 1.5rem;
        color: var(--color-primary-700);
      }
    }

    & .agent-description {
      font-size: var(--font-size-fluid-2);
      max-width: 30ch;
      line-height: normal;
      overflow: hidden;
    }
  }

  &:hover {
    border: 0.5px solid var(--color-primary-500);
    background: var(--color-primary-100);
    cursor: pointer;

    & .agent-select-text {
      color: var(--color-primary-900);
    }
  }
}

.dark {
  & .agent-select-card {
    &:hover {
      border: 0.5px solid var(--color-primary-500);
      background: var(--color-primary-800);

      & .agent-select-text {
        color: var(--color-primary-100);
      }
    }
    & .agent-body-wrapper {
      &.selected {
        & .agent-select-text {
          color: var(--color-primary-0);
          font-weight: var(--font-weight-medium);
        }
      }
      & .agent-select-text {
        color: var(--color-primary-100);
      }
    }
  }
}
</style>
