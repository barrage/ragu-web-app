<script lang="ts" setup>
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import type { SingleWhatsAppAgentResponse } from '~/types/whatsapp'

defineProps<{ whatsAppAgent: SingleWhatsAppAgentResponse | null | undefined }>()
const emits = defineEmits<{ (event: 'agentUpdated', id: string): void }>()

const { t } = useI18n()

function handleAgentUpdate(id: string) {
  emits('agentUpdated', id)
}
</script>

<template>
  <section class="edit-whatsapp-agent-section">
    <div class="edit-whatsapp-agent-title-wrapper">
      <EditIcon size="42px" />
      <h1 class="edit-whatsapp-agent-section-title">
        {{ t('whatsapp_agents.edit.title') }}
      </h1>
    </div>

    <EditWhatsAppAgentForm :whats-app-agent="whatsAppAgent" @update="handleAgentUpdate" />
  </section>
</template>

<style lang="scss" scoped>
.edit-whatsapp-agent-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-fluid-l);

  & .edit-whatsapp-agent-title-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  & .edit-whatsapp-agent-section-title {
    font-size: var(--font-size-fluid-7);
    line-height: normal;
  }
}
</style>
