<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { Configuration } from '~/types/agent'
import PersonTagIcon from '~/assets/icons/svg/person-tag.svg'

const props = defineProps<{
  selectedAgentVersion: Configuration | undefined | null
}>()

const isOpen = defineModel<boolean>()

const { t } = useI18n()

const closeModal = () => {
  isOpen.value = false
}

const agentVersionData = computed(() => {
  return {
    configId: props.selectedAgentVersion?.id || '-',
    agentId: props.selectedAgentVersion?.id || '-',
    agentInstructions: props.selectedAgentVersion?.agentInstructions || t('agents.agent_card.unknown_agentname'),
    languageInstruction: props.selectedAgentVersion?.agentInstructions.languageInstruction || '-',
    summaryInstruction: props.selectedAgentVersion?.agentInstructions.summaryInstruction || '-',
    titleInstruction: props.selectedAgentVersion?.agentInstructions.titleInstruction || '-',
    context: props.selectedAgentVersion?.context || t('agents.agent_card.unknown_agentcontext'),
    createdAt: props.selectedAgentVersion?.createdAt ? formatDate(props.selectedAgentVersion.createdAt, 'DD/MM/YYYY HH:MM:ss') : t('agents.agent_card.created_at'),
    updatedAt: props.selectedAgentVersion?.updatedAt ? formatDate(props.selectedAgentVersion.updatedAt, 'DD/MM/YYYY HH:MM:ss') : t('agents.agent_card.created_at'),
    llmProvider: props.selectedAgentVersion?.llmProvider || '-',
    model: props.selectedAgentVersion?.model || '-',
    temperature: props.selectedAgentVersion?.temperature || '-',
    version: props.selectedAgentVersion?.version || '-',
  }
})
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="isOpen"
      destroy-on-close
      data-testid="bo-rollback-agent-version-dialog"
      align-center
      class="barrage-dialog--small"
      :close-icon="CloseCircleIcon"
      @close="closeModal"
    >
      <template #header>
        <div class="rollback-agent-version-modal-header">
          <PersonTagIcon size="42px" />
          <h5>     v.{{ props.selectedAgentVersion?.version }}</h5>
        </div>
      </template>
      <div class="rollback-agent-version-modal-body">
        <LabelDescriptionItem
          :label="t('agents.labels.llmProvider')"
          :description="agentVersionData.llmProvider"
          size="small"
          class="agent-model"
        />
        <LabelDescriptionItem
          :label="t('agents.labels.model')"
          :description="agentVersionData.model"
          size="small"
          class="agent-model"
        />
        <LabelDescriptionItem
          :label="t('agents.labels.temperature')"
          :description="agentVersionData.temperature"
          size="small"
          class="agent-model"
        />

        <LabelDescriptionItem
          :label="t('agents.labels.created_at')"
          :description="agentVersionData.createdAt"
          size="small"
        />
        <LabelDescriptionItem
          :label="t('agents.labels.updated_at')"
          :description="agentVersionData.updatedAt"
          size="small"
        />
        <LabelDescriptionItem
          :label="t('agents.labels.context')"
          :description="agentVersionData.context"
          size="small"
        />
        <LabelDescriptionItem
          :label="t('agents.labels.languageInstruction')"
          :description="agentVersionData.languageInstruction"
          size="small"
        />
        <LabelDescriptionItem
          :label="t('agents.labels.summaryInstruction')"
          :description="agentVersionData.summaryInstruction"
          size="small"
        />
        <LabelDescriptionItem
          :label="t('agents.labels.titleInstruction')"
          :description="agentVersionData.titleInstruction"
          size="small"
        />
      </div>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.rollback-agent-version-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.rollback-agent-version-modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
