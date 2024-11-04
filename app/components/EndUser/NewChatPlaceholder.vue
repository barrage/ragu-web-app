<script lang="ts" setup>
// IMPORTS

import BrainIcon from '~/assets/icons/svg/brain.svg'

const agentStore = useAgentStore()

const { error } = await useAsyncData(() => agentStore.GET_AllAgents())

errorHandler(error)

const activeAgentLength = computed(() => {
  return agentStore.agents.filter(agent => agent.active).length
})
</script>

<template>
  <div class="new-chat-placeholder-container">
    <BrainIcon
      width="64"
      height="64"
      class="ai-logo"
    />
    <h5>LLM Chat</h5>
    <p class="description">
      {{ $t('chat.newChat.description') }}
    </p>
    <div class="about-container">
      <p> {{ $t('chat.newChat.choseFrom') }}</p>
      <div
        class="suggestions-container scrollable-element"
        :class="

          { 'centered-content': activeAgentLength > 3 }
        "
      >
        <template v-for="(agent, index) in agentStore.agents" :key="index">
          <ChatAgentSelectCard :agent="agent" />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.new-chat-placeholder-container {
  height: 100%;
  max-width: 48rem;
  margin-inline: auto;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  h5 {
    margin-bottom: 0.9375rem;
    font-weight: bold;
    color: var(--color-primary-800);
  }
}

.ai-logo {
  color: var(--color-primary-600);
  padding: 0.5rem;
  border: 0.0625rem solid var(--color-primary-200);
  border-radius: 0.625rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  margin-block: 9.375rem 1rem;
}

.description {
  text-align: center;
  font-weight: 300;
  margin-bottom: 1rem;
  max-width: 21.875rem;
  overflow-wrap: break-word;
  word-break: break-word;
  color: var(--color-primary-700);
}

.about-container {
  text-align: center;
  max-width: 100%;

  p {
    margin-bottom: 1.25rem;
    font-size: 1rem;
    opacity: 0.7;
    color: var(--color-primary-600);
  }
}
.suggestions-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  justify-content: center;
  padding-bottom: 2rem;
  color: var(--color-primary-800);
  & .agent-select-card {
    flex: 0 0 calc(25% - 1rem);
    min-width: 180px;
  }
}

.centered-content {
  justify-content: start;
}

.dark {
  .new-chat-placeholder-container {
    & h5 {
      color: var(--color-primary-0);
    }
  }
  .ai-logo {
    color: var(--color-primary-200);
  }
  .description {
    color: var(--color-primary-100);
  }
  .about-container {
    text-align: center;

    p {
      color: var(--color-primary-200);
    }
  }
  .suggestions-container {
    color: var(--color-primary-100);
  }
}
</style>
