<script lang="ts" setup>
import AddAgentIcon from '~/assets/icons/svg/person-add.svg'

const { t } = useI18n()
</script>

<template>
  <div class="whatsapp-agents-quick-actions-container">
    <LlmLink to="/admin/whatsapp-agents/create" type="button">
      <AddAgentIcon size="24px" />  {{ t('whatsapp_agents.buttons.create') }}
    </LlmLink>
  </div>
</template>

<style lang="scss" scoped>
.whatsapp-agents-quick-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.5rem;
}
.dark {
  .whatsapp-agents-quick-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
