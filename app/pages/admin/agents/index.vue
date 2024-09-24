<script lang="ts" setup>
// IMPORTS
import { useAgentStore } from '~/stores/agents'
import AddIcon from '~/assets/icons/svg/add.svg'

// CONSTANTS
const agentStore = useAgentStore()
const localePath = useLocalePath()
const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

// API CALLS
const { error } = await useAsyncData(() => agentStore.GET_AllAgents())

// ERROR HANDLERS
errorHandler(error)
</script>

<template>
  <section class="agents-section ">
    <h4 class="page-title">
      {{ t('agents.titles.mainTitle') }}
    </h4>
    <p class="description">
      {{ t('agents.titles.description') }}
    </p>
    <ElButton
      type="primary"
      class="create-button"
      @click="navigateTo({ path: localePath('/admin/agents/create') })"
    >
      <AddIcon original /> {{ t('agents.buttons.create') }}
    </ElButton>

    <div class="agents-container">
      <AgentCard
        v-for="agent in agentStore.getMappedAgents"
        :key="agent.id"
        :agent="agent"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.agents-section {
  grid-column: content-start;
  padding-block: var(--spacing-fluid-l);

  & .page-title {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--color-primary-900);
  }
  & .description {
    color: var(--color-primary-700);
  }

  button {
    margin-left: auto;
    margin-bottom: 1.5rem;
  }
}

.link {
  text-decoration: underline;
  cursor: pointer;
}

.agents-container {
  grid-column: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.dark {
  & .page-title {
    color: var(--color-primary-100);
  }
  & .description {
    color: var(--color-primary-300);
  }
  & .users-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
