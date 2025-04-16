<script lang="ts" setup>
import AgentIcon from '~/assets/icons/svg/chat-agent.svg'
import type { Agent } from '~/types/agent'

// PROPS

const props = withDefaults(defineProps<{
  agent: Agent | null | undefined
  size?: 'small' | 'medium' | 'large'
}>(), {
  size: 'small',
})

// CONSTANTS

const { t } = useI18n()

// COMPUTEDS

const agentData = computed(() => {
  return {
    fullname: props.agent?.name || t('agents.agent_card.unknown_name'),
  }
})

const iconSize = computed(() => {
  switch (props.size) {
    case 'medium':
      return '46px'
    case 'large':
      return '84px'
    default:
      return '40px'
  }
})

const textSize = computed(() => {
  switch (props.size) {
    case 'medium':
      return { username: 'var(--font-size-fluid-3)', email: 'var(--font-size-fluid-2)' }
    case 'large':
      return { username: 'var(--font-size-fluid-4)', email: 'var(--font-size-fluid-3)' }
    default:
      return { username: 'var(--font-size-fluid-2)', email: 'var(--font-size-fluid-1)' }
  }
})
</script>

<template>
  <LlmLink
    :to="`/admin/agents/${agent?.agent?.id}`"
    type="link"
    class="agent-profile-item"
  >
    <AgentIcon :size="iconSize" />
    <div class="agent-wrapper">
      <p class="agent-name" :style="{ fontSize: textSize.username }">
        {{ `${agentData.fullname}` }}
      </p>
      <span class="agent-provider" :style="{ fontSize: textSize.email }">{{ agent?.configuration?.llmProvider }}</span>
    </div>
  </LlmLink>
</template>

<style lang="scss" scoped>
.agent-profile-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  margin-right: 1rem;
  text-overflow: ellipsis;
  color: var(--color-primary-900);

  svg {
    flex-shrink: 0;
  }

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  & .agent-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & .agent-name {
      margin: 0;
      line-height: normal;
      font-weight: var(--font-weight-semibold);
      color: var(--color-primary-900);
    }

    & .agent-provider {
      margin: 0;
      line-height: normal;
      color: var(--color-primary-800);
    }
  }
}

.dark {
  .agent-profile-item {
    color: var(--color-primary-0);
  }
  .agent-wrapper {
    & .agent-name {
      color: var(--color-primary-0);
    }
    & .agent-provider {
      color: var(--color-primary-100);
    }
  }
}
</style>
