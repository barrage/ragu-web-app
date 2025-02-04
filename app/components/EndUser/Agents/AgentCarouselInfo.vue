<script lang="ts" setup>
import type { SingleAgent } from '~/types/agent.ts'

const props = defineProps<{
  agent: SingleAgent | null
}>()

const agentStore = useAgentStore()
const { t } = useI18n()

const isAgentSelected = computed(() => {
  return props.agent?.id === agentStore.selectedAgent?.id
})
</script>

<template>
  <div
    v-if="agent?.active"
    class="agent-carousel-info"
    tabindex="0"
    :class="{ selected: isAgentSelected }"
  >
    <div class="agent-body-wrapper">
      <div class="agent-name-wrapper">
        <LlmAvatar
          :avatar="agent?.avatar"
          :alt="t('agents.agent_avatar')"
          :size="58"
          fit="cover"
          default-image="agent"
          :content-type="agent?.avatar?.contentType"
        />
        <p class="agent-name-text">
          {{ formatStringMaxLenght(agent?.name, 60) }}
        </p>
      </div>
      <span
        v-if="isAgentSelected"
        v-motion-fade
        class="agent-description"
      >
        {{ formatStringMaxLenght(agent?.description, 140) }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.agent-carousel-info {
  padding: 0.75rem;
  & .agent-body-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }

  & .agent-name-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    & .agent-name-text {
      font-size: var(--font-size-desktop-4);
      color: var(--color-primary-900);
    }
  }
  &.selected {
    & .agent-name-text {
      font-weight: var(--font-weight-bold);
    }
  }

  & .agent-description {
    color: var(--color-primary-700);
    font-size: var(--font-size-fluid-2);
    line-height: normal;
  }
}

.dark {
  & .agent-carousel-info {
    & .agent-name-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      & .agent-name-text {
        color: var(--color-primary-0);
      }
    }
    & .agent-description {
      color: var(--color-primary-200);
      font-size: var(--font-size-fluid-2);
      line-height: normal;
    }
  }
}
</style>
