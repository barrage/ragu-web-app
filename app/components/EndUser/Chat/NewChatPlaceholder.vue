<script lang="ts" setup>
import BrainIcon from '~/assets/icons/svg/brain.svg'
import AccountWarningIcon from '~/assets/icons/svg/account-warning.svg'
import PersonAddIcon from '~/assets/icons/svg/person-add.svg'

const agentStore = useAgentStore()
const { selectedRole } = storeToRefs(useAuthStore())
const { error, status } = await useAsyncData(() => agentStore.GET_AllAppAgents())

errorHandler(error)

const activeAgentLength = computed(() => {
  return agentStore.appAgents.filter(agent => agent.active).length
})
</script>

<template>
  <div class="new-chat-placeholder-container">
    <BrainIcon
      width="64px"
      height="64px"
      class="ai-logo"
    />
    <h5
      v-motion-fade
      :delay="100"
      :duration="800"
    >
      {{ $t('chat.llm_chat') }}
    </h5>
    <p
      class="description typing-effect"
    >
      {{ $t('chat.newChat.description') }}
    </p>
    <div class="about-container">
      <p
        v-motion-fade
        :delay="1100"
        class="chose-from-label"
      >
        {{ $t('chat.newChat.choseFrom') }}
      </p>
      <div
        class="suggestions-container scrollable-element"
        :class="

          { 'centered-content': activeAgentLength > 3 }
        "
      >
        <template v-if="status === 'pending'">
          <div>
            <LlmLoader />
          </div>
        </template>
        <template v-else-if="agentStore.appAgents.length">
          <template v-for="(agent) in agentStore.appAgents" :key="agent.id">
            <ChatAgentSelectCard
              v-motion-slide-left
              :delay="1300"
              :agent="agent"
            />
          </template>
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
              <PersonAddIcon /> {{ $t('chat.newChat.empty_cta') }}
            </LlmLink>
          </template>
        </EmptyState>
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
  min-height: 64px;
}

.description {
  text-align: center;
  font-weight: 300;
  margin-bottom: 1rem;
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
    color: var(--color-primary-700);
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
  scroll-snap-type: x mandatory;

  & .agent-select-card {
    flex: 0 0 calc(25% - 1rem);
    min-width: 200px;
    min-height: 175px;
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
      color: var(--color-primary-100);
    }
  }
  .suggestions-container {
    color: var(--color-primary-100);
  }
}
</style>
