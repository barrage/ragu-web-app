<script lang="ts" setup>
import { errorMessages } from 'vue/compiler-sfc'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import type { Agent } from '~/types/agent'
import { StatusType } from '~/types/statusTypes'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import PersonClockIcon from '~/assets/icons/svg/person-clock.svg'

const props = defineProps<{
  agent: Agent | null | undefined
}>()

const { t } = useI18n()

const agentData = computed(() => {
  return {
    id: props.agent?.agent?.id || t('agents.agent_card.unknown_id'),
    name: props.agent?.agent?.name || t('agents.agent_card.unknown_agentname'),
    context: props.agent?.configuration?.context || t('agents.agent_card.unknown_agentcontext'),
    description: props.agent?.agent?.description || t('agents.agent_card.unknown_description'),
    statusType: props.agent?.agent?.active ? StatusType.Success : StatusType.Danger,
    status: props.agent?.agent?.active ? t('agents.agent_card.active_status') : t('agents.agent_card.inactive_status'),
    llmProvider: props.agent?.configuration?.llmProvider || t('agents.agent_card.unknown_llmProvider'),
    model: props.agent?.configuration?.model || t('agents.agent_card.unknown_model'),
    language: props.agent?.agent?.language || t('agents.agent_card.unknown_language'),
    temperature: props.agent?.configuration?.temperature || t('agents.agent_card.unknown_temperature'),
    updatedAt: props.agent?.agent?.updatedAt ? formatDate(props.agent?.agent?.updatedAt, 'MMMM DD, YYYY') : t('agents.agent_card.unknown_date'),
    summaryInstruction: props.agent?.configuration?.agentInstructions?.summaryInstruction || t('agents.agent_card.unknown_instruction'),
    titleInstruction: props.agent?.configuration?.agentInstructions?.titleInstruction || t('agents.agent_card.unknown_instruction'),
    createdAt: props.agent?.agent?.createdAt ? formatDate(props.agent?.agent?.createdAt, 'MMMM DD, YYYY') : t('agents.agent_card.unknown_date'),
    avatar: props.agent?.agent?.avatar || undefined,
    version: props.agent?.configuration?.version || '-',
    errorMessages: props.agent?.configuration?.agentInstructions?.errorMessage || t('agents.agent_card.unknown_instruction'),
    presencePenalty: props.agent?.configuration?.presencePenalty != null
      ? props.agent.configuration.presencePenalty
      : t('agents.agent_card.unknown_instruction'),
    maxCompletionTokens: props.agent?.configuration?.maxCompletionTokens != null
      ? props.agent.configuration.maxCompletionTokens
      : t('agents.agent_card.unknown_instruction'),
  }
})
</script>

<template>
  <div class="agent-informations-section">
    <div class="configuration-title-wrapper">
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

    <LabelDescriptionItem
      :label="t('agents.labels.presencePenalty')"
      :description="agentData.presencePenalty?.toString()"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <BrainIcon size="18px" />
          <span>  {{ t('agents.labels.presencePenalty') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>

    <LabelDescriptionItem
      :label="t('agents.labels.configuration_max_completion_tokens')"
      :description="agentData.maxCompletionTokens?.toString()"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <BrainIcon size="18px" />
          <span>  {{ t('agents.labels.configuration_max_completion_tokens') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <div class="instructions-title-wrapper">
      <h6 class="instructions-title">
        {{ t('agents.titles.instructions') }}
      </h6>
    </div>

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
    <LabelDescriptionItem
      :label="t('agents.labels.errorMessage')"
      :description="agentData.errorMessages"
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <PersonInfoIcon size="18px" />
          <span>  {{ t('agents.labels.errorMessage') }}</span>
        </div>
      </template>
      <template #customDescription>
        <HighlightedText :text="agentData.errorMessages" />
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
  padding-inline: 0.8rem;
  & .agent-configuration-title {
    color: var(--color-primary-900);
    font-size: var(--font-size-fluid-4);
  }
}

.instructions-title-wrapper {
  grid-column: span 2;
  margin-top: var(--spacing-fluid-l);
  padding-inline: 0.8rem;

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
      color: var(--color-primary-0);
    }
  }

  & .instructions-title-wrapper {
    & .instructions-title {
      color: var(--color-primary-0);
    }
  }
}
.label-description-item-container {
  grid-column: span 2;
  padding-inline: var(--spacing-fluid-m);

  @include viewport-ml {
    grid-column: span 1;
  }
}
</style>
