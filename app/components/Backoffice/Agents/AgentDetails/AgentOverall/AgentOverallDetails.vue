<script lang="ts" setup>
import PersonKeyIcon from '~/assets/icons/svg/person-key.svg'
import PersonClockIcon from '~/assets/icons/svg/clock.svg'
import LocaleIcon from '~/assets/icons/svg/locale.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import { StatusType } from '~/types/statusTypes'
import type { Agent } from '~/types/agent'

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
  }
})
</script>

<template>
  <div class="agent-informations-section">
    <div class="agent-informations-title-wrapper">
      <h5 class="agent-informations-title">
        {{ t('agents.titles.details') }}
      </h5>
    </div>
    <LabelDescriptionItem
      :label="t('agents.labels.name')"
      :description="agentData.name"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <PersonInfoIcon size="18px" />
          <span>  {{ t('agents.labels.name') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>

    <LabelDescriptionItem
      :label="t('agents.labels.description') "
      :description="agentData.description"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <PersonInfoIcon size="18px" />
          <span>  {{ t('agents.labels.description') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>

    <LabelDescriptionItem
      :label="t('agents.labels.id')"
      :description="agentData.id"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <PersonKeyIcon size="18px" />
          <span>  {{ t('agents.labels.id') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label=" t('agents.labels.language')"
      :description="agentData.language"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <LocaleIcon size="18px" />
          <span>  {{ t('agents.labels.language') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('agents.labels.created_at') "
      :description="agentData.createdAt"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <PersonClockIcon size="18px" />
          <span>  {{ t('agents.labels.created_at') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('agents.labels.updated_at')"
      :description="agentData.updatedAt"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <PersonClockIcon size="18px" />
          <span>  {{ t('agents.labels.updated_at') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
  </div>
</template>

<style lang="scss" scoped>
.agent-informations-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  row-gap: 1.5rem;
  column-gap: 32px;
  margin-top: 22px;

  :deep(.description) {
    font-size: var(--font-size-fluid-2);
  }
}

.agent-informations-title-wrapper {
  grid-column: span 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary-800);
  padding-inline: 0.8rem;
  & .agent-informations-title {
    color: var(--color-primary-900);
    font-size: var(--font-size-fluid-4);
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

  & .label {
    color: var(--color-primary-100);
  }
  & .agent-informations-title-wrapper {
    color: var(--color-primary-100);
    & .agent-informations-title {
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
