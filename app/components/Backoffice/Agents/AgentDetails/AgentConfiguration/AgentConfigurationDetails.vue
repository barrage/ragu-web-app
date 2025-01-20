<script lang="ts" setup>
import BrainIcon from '~/assets/icons/svg/brain.svg'
import PersonSettingsIcon from '~/assets/icons/svg/person-settings.svg'
import type { Agent } from '~/types/agent'
import { StatusType } from '~/types/statusTypes'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import PersonClockIcon from '~/assets/icons/svg/person-clock.svg'

const props = defineProps<{
  singleAgent: Agent | null | undefined
}>()

const { t } = useI18n()

const agentData = computed(() => {
  return {
    id: props.singleAgent?.agent?.id || t('agents.agent_card.unknown_id'),
    name: props.singleAgent?.agent?.name || t('agents.agent_card.unknown_agentname'),
    context: props.singleAgent?.configuration?.context || t('agents.agent_card.unknown_agentcontext'),
    description: props.singleAgent?.agent?.description || t('agents.agent_card.unknown_description'),
    statusType: props.singleAgent?.agent?.active ? StatusType.Success : StatusType.Danger,
    status: props.singleAgent?.agent?.active ? t('agents.agent_card.active_status') : t('agents.agent_card.inactive_status'),
    llmProvider: props.singleAgent?.configuration?.llmProvider || t('agents.agent_card.unknown_llmProvider'),
    model: props.singleAgent?.configuration?.model || t('agents.agent_card.unknown_model'),
    language: props.singleAgent?.agent?.language || t('agents.agent_card.unknown_language'),
    temperature: props.singleAgent?.configuration?.temperature || t('agents.agent_card.unknown_temperature'),
    updatedAt: props.singleAgent?.agent?.updatedAt ? formatDate(props.singleAgent?.agent?.updatedAt, 'MMMM DD, YYYY') : t('agents.agent_card.unknown_date'),
    languageInstruction: props.singleAgent?.configuration?.agentInstructions?.languageInstruction || t('agents.agent_card.unknown_instruction'),
    summaryInstruction: props.singleAgent?.configuration?.agentInstructions?.summaryInstruction || t('agents.agent_card.unknown_instruction'),
    titleInstruction: props.singleAgent?.configuration?.agentInstructions?.titleInstruction || t('agents.agent_card.unknown_instruction'),
    promptInstruction: props.singleAgent?.configuration?.agentInstructions?.promptInstruction || t('agents.agent_card.unknown_instruction'),
    createdAt: props.singleAgent?.agent?.createdAt ? formatDate(props.singleAgent?.agent?.createdAt, 'MMMM DD, YYYY') : t('agents.agent_card.unknown_date'),
    avatar: props.singleAgent?.agent?.avatar || undefined,
    version: props.singleAgent?.configuration?.version || '-',
  }
})
</script>

<template>
  <div class="agent-informations-section">
    <div class="configuration-title-wrapper">
      <PersonSettingsIcon size="38px" />
      <h5 class="agent-configuration-title">
        {{ t('agents.titles.configuration') }}
      </h5>
    </div>
    <LabelDescriptionItem
      :label=" t('agents.labels.llmProvider')"
      :description="agentData.llmProvider"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <BrainIcon size="18px" />
          <span>  {{ t('agents.labels.llmProvider') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('agents.labels.model')"
      :description="agentData.model"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <BrainIcon size="18px" />
          <span>  {{ t('agents.labels.model') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>

    <LabelDescriptionItem
      :label="t('agents.labels.temperature')"
      :description="agentData.temperature?.toString()"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <BrainIcon size="18px" />
          <span>  {{ t('agents.labels.temperature') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>

    <LabelDescriptionItem
      :label="t('agents.labels.version')"
      :description="agentData.version?.toString()"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <BrainIcon size="18px" />
          <span>  {{ t('agents.labels.version') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <div class="instructions-title-wrapper">
      <h6 class="instructions-title">
        {{ t('agents.titles.instructions') }}
      </h6>
    </div>

    <LabelDescriptionItem
      :label="t('agents.labels.languageInstruction')"
      :description="agentData.languageInstruction"
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <PersonClockIcon size="18px" />
          <span>  {{ t('agents.labels.languageInstruction') }}</span>
        </div>
      </template>
      <template #customDescription>
        <HighlightedText :text="agentData.languageInstruction" />
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('agents.labels.summaryInstruction')"
      :description="agentData.summaryInstruction"
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <PersonClockIcon size="18px" />
          <span>  {{ t('agents.labels.summaryInstruction') }}</span>
        </div>
      </template>
      <template #customDescription>
        <HighlightedText :text="agentData.summaryInstruction" />
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('agents.labels.titleInstruction')"
      :description="agentData.titleInstruction"
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <PersonClockIcon size="18px" />
          <span>  {{ t('agents.labels.titleInstruction') }}</span>
        </div>
      </template>
      <template #customDescription>
        <HighlightedText :text="agentData.titleInstruction" />
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('agents.labels.promptInstruction')"
      :description="agentData.promptInstruction"
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <PersonInfoIcon size="18px" />
          <span>  {{ t('agents.labels.promptInstruction') }}</span>
        </div>
      </template>
      <template #customDescription>
        <HighlightedText :text="agentData.promptInstruction" />
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('agents.labels.context')"
      :description="agentData.context"
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <PersonInfoIcon size="18px" />
          <span>  {{ t('agents.labels.context') }}</span>
        </div>
      </template>
      <template #customDescription>
        <HighlightedText :text="agentData.context" />
      </template>
    </LabelDescriptionItem>
  </div>
</template>

<style lang="scss" scoped>
.agent-informations-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  padding-block: 2rem;
  padding-top: 22px;
  row-gap: 1.5rem;
  column-gap: 32px;

  :deep(.description) {
    font-size: var(--font-size-fluid-2);
  }
}

.configuration-title-wrapper {
  grid-column: span 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary-800);
  & .agent-configuration-title {
    color: var(--color-primary-800);
    font-weight: var(--font-weight-semibold);
  }
}

.instructions-title-wrapper {
  grid-column: span 2;

  & .instructions-title {
    color: var(--color-primary-900);
  }
}
.agent-details-custom-label {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 calc(30% - 0.5rem);
  color: var(--color-primary-900);
  font-size: var(--font-size-fluid-3);
  max-height: fit-content;

  svg {
    flex-shrink: 0;
  }
}

.dark {
  & .agent-details-custom-label {
    color: var(--color-primary-100);
  }

  & .configuration-title-wrapper {
    color: var(--color-primary-100);
    & .agent-configuration-title {
      color: var(--color-primary-100);
    }
  }

  & .instructions-title-wrapper {
    & .instructions-title {
      color: var(--color-primary-0);
    }
  }
}
</style>
