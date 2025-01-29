<script lang="ts" setup>
import WhatsAppAgentIcon from '~/assets/icons/svg/whatsapp-chat-agent.svg'
import type { WhatsAppAgentData } from '~/components/Backoffice/WhatsAppAgents/WhatsAppAgentDetails/WhatsAppAgentDetails.vue'
import type { WhatsAppAgent } from '~/types/whatsapp'

// PROPS

const props = withDefaults(defineProps<{
  whatsAppAgent: WhatsAppAgentData | WhatsAppAgent | undefined
  size?: 'small' | 'medium' | 'large'
}>(), {
  size: 'small',
})

// CONSTANTS

const { t } = useI18n()

// COMPUTEDS

const whatsAppData = computed(() => {
  return {
    id: props.whatsAppAgent?.id || t('agents.agent_card.unknown_id'),
    fullname: props.whatsAppAgent?.name || t('agents.agent_card.unknown_agentname'),
    llmProvider: props.whatsAppAgent?.llmProvider || t('agents.agent_card.unknown_llmProvider'),
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
    :to="`/admin/whatsapp-agents/${whatsAppData.id}`"
    type="link"
    class="whatsapp-agent-profile-item"
  >
    <WhatsAppAgentIcon :size="iconSize" />
    <div class="whatsapp-agent-wrapper">
      <p class="whatsapp-agent-name" :style="{ fontSize: textSize.username }">
        {{ `${whatsAppData.fullname}` }}
      </p>
      <span class="whatsapp-agent-provider" :style="{ fontSize: textSize.email }">{{ whatsAppData.llmProvider }}</span>
    </div>
  </LlmLink>
</template>

<style lang="scss" scoped>
.whatsapp-agent-profile-item {
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

  & .whatsapp-agent-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & .whatsapp-agent-name {
      margin: 0;
      line-height: normal;
      font-weight: var(--font-weight-semibold);
      color: var(--color-primary-900);
    }

    & .whatsapp-agent-provider {
      margin: 0;
      line-height: normal;
      color: var(--color-primary-800);
    }
  }
}

.dark {
  .whatsapp-agent-profile-item {
    color: var(--color-primary-0);
  }
  .whatsapp-agent-wrapper {
    & .whatsapp-agent-name {
      color: var(--color-primary-0);
    }
    & .whatsapp-agent-provider {
      color: var(--color-primary-100);
    }
  }
}
</style>
