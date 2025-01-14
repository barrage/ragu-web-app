<script lang="ts" setup>
import ChatAgentIcon from '~/assets/icons/svg/chat-agent.svg'
import type { SingleAgent } from '~/types/agent.ts'

defineProps<{
  agent: SingleAgent | null
}>()

const agentStore = useAgentStore()
const { t } = useI18n()
</script>

<template>
  <ElCard
    v-if="agent?.active"
    class="agent-select-card"
    tabindex="0"
    :class="{ 'is-accent': agent?.id === agentStore.selectedAgent?.id, 'selected': agent?.id === agentStore.selectedAgent?.id }"
    @keyup.enter="agentStore.setSelectedAgent(agent)"
    @keyup.space="agentStore.setSelectedAgent(agent)"
    @click="agentStore.setSelectedAgent(agent)"
  >
    <div class="agent-body-wrapper">
      <LlmTooltip
        delayed
        :disabled="agent?.name.length <= 60"
      >
        <template #content>
          <div class="tooltip-content-wrapper">
            {{ agent?.name }}
          </div>
        </template>
        <div class="agent-name-wrapper">
          <LlmAvatar
            :avatar="agent?.avatar"
            :alt="t('agents.agent_avatar')"
            :size="32"
            fit="cover"
            default-image="agent"
            :content-type="agent?.avatar?.contentType"
          />
          <p class="agent-select-text">
            {{ formatStringMaxLenght(agent?.name, 60) }}
          </p>
        </div>
      </LlmTooltip>

      <LlmTooltip
        delayed
        :disabled="agent?.description.length <= 140"
      >
        <template #content>
          <div class="tooltip-content-wrapper">
            {{ agent?.description }}
          </div>
        </template>
        <span class="agent-description">
          {{ formatStringMaxLenght(agent?.description, 140) }}
        </span>
        <LlmTooltip />
      </llmtooltip>
    </div>
  </ElCard>
</template>

<style lang="scss" scoped>
.agent-select-card {
  padding: 0.75rem;
  padding-bottom: 1rem;
  display: flex;
  scroll-snap-align: start;

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
    height: 100%;

    & .agent-name-wrapper {
      display: flex;
      gap: 0.5rem;

      & .chat-agent-icon {
        align-self: baseline;
        min-width: max-content;
      }
      & .agent-select-text {
        align-self: center;
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
      height: 100%;
      line-height: 1.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -line-clamp: 4;
      white-space: normal;
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

.tooltip-content-wrapper {
  width: max-content;
  max-width: 200px;
  text-wrap: wrap;
  line-height: 18px;
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
