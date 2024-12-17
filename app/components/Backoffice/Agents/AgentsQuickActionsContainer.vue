<script lang="ts" setup>
import AddAgentIcon from '~/assets/icons/svg/person-add.svg'

// CONSTANTS
const { t } = useI18n()
</script>

<template>
  <div class="agents-quick-actions-container">
    <LlmLink to="/admin/agents/create" type="button">
      <AddAgentIcon size="24px" />  {{ t('agents.buttons.create') }}
    </LlmLink>
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
