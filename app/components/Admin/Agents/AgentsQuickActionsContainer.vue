<script lang="ts" setup>
import AgentIcon from '~/assets/icons/svg/chat-agent.svg'

const { t } = useI18n()
</script>

<template>
  <div class="agents-quick-actions-container">
    <NuxtLink to="/admin/agents/create" class="barrage-button create-user-redirect">
      <AgentIcon size="24px" />  {{ t('agents.buttons.create') }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.agents-quick-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.5rem;

  .create-user-redirect {
    display: flex;
    gap: 8px;
  }
}
.dark {
  .agents-quick-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
