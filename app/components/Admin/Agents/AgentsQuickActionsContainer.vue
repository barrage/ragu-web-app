<script lang="ts" setup>
import AgentIcon from '~/assets/icons/svg/chat-agent.svg'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <div class="agents-quick-actions-container">
    <ElButton
      type="primary"
      class="create-button"
      @click="navigateTo({ path: localePath('/admin/agents/create') })"
    >
      <AgentIcon size="24" />  {{ t('agents.buttons.create') }}
    </ElButton>
  </div>
</template>

<style lang="scss" scoped>
.agents-quick-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.5rem;
}
.dark {
  .agents-quick-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
