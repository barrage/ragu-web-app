<script lang="ts" setup>
import ProfileIcon from '~/assets/icons/svg/account.svg'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import type { Agent } from '~/types/agent'
import PersonKeyIcon from '~/assets/icons/svg/person-key.svg'
import PersonClockIcon from '~/assets/icons/svg/person-clock.svg'
import PersonCalendarIcon from '~/assets/icons/svg/person-calendar.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'

const props = defineProps<{
  agent: Agent | null | undefined
}>()

const agentStore = useAgentStore()

const { t } = useI18n()
enum StatusType {
  Primary = 'primary',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Danger = 'danger',
}

const agentData = computed(() => {
  return {
    id: props.agent?.id || t('agents.agent_card.unknown_id'),
    name: props.agent?.name || t('agents.agent_card.unknown_agentname'),
    context: props.agent?.context || t('agents.agent_card.unknown_agentcontext'),
    description: props.agent?.description || t('agents.agent_card.unknown_description'),
    statusType: props.agent?.active ? StatusType.Success : StatusType.Danger,
    status: props.agent?.active ? t('agents.agent_card.active_status') : t('agents.agent_card.inactive_status'),
    llmProvider: props.agent?.llmProvider || t('agents.agent_card.unknown_llmProvider'),
    model: props.agent?.model || t('agents.agent_card.unknown_model'),
    language: props.agent?.language || t('agents.agent_card.unknown_language'),
    temperature: props.agent?.temperature || t('agents.agent_card.unknown_temperature'),
    vectorProvider: props.agent?.vectorProvider || t('agents.agent_card.unknown_vectorProvider'),
    embeddingProvider: props.agent?.embeddingProvider || t('agents.agent_card.unknown_embeddingProvider'),
    embeddingModel: props.agent?.embeddingModel || t('agents.agent_card.unknown_embeddingModel'),
    updatedAt: props.agent?.updatedAt ? formatDate(props.agent.updatedAt, 'MMMM DD, YYYY') : t('agents.agent_card.unknown_date'),
    createdAt: props.agent?.updatedAt ? formatDate(props.agent.createdAt, 'MMMM DD, YYYY') : t('agents.agent_card.unknown_date'),
  }
})

const editClick = (): void => {
  agentStore.setEditMode(true)
}
</script>

<template>
  <div class="agent-details-hero-section">
    <div class="profile-avatar-wrapper">
      <ProfileIcon size="80" />
      <div class="agentname-status-wrapper">
        <h6 class="agentname">
          {{ `${agentData.name}` }}
        </h6>
        <el-tag :type="agentData.statusType" size="small">
          <span class="status-dot" />  {{ agentData?.status }}
        </el-tag>
      </div>
    </div>
    <div class="agent-details-actions-wrapper">
      <el-button
        size="small"
        type="primary"
        plain
        @click="editClick()"
      >
        <EditIcon />  Edit
      </el-button>
    </div>
  </div>
  <div class="agent-informations-section">
    <LabelDescriptionItem
      :label="t('agents.labels.id')"
      :description="agentData.id"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <PersonInfoIcon size="18px" />
          <span>  {{ t('agents.labels.id') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
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
      :label=" t('agents.labels.language')"
      :description="agentData.language"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <PersonInfoIcon size="18px" />
          <span>  {{ t('agents.labels.language') }}</span>
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
      :label="t('agents.labels.vectorProvider')"
      :description="agentData.vectorProvider"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <BrainIcon size="18px" />
          <span>  {{ t('agents.labels.vectorProvider') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('agents.labels.embeddingProvider')"
      :description="agentData.embeddingProvider"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <BrainIcon size="18px" />
          <span>  {{ t('agents.labels.embeddingProvider') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('agents.labels.embeddingModel') "
      :description="agentData.embeddingModel"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <BrainIcon size="18px" />
          <span>  {{ t('agents.labels.embeddingModel') }}</span>
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
          <PersonCalendarIcon size="18px" />
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
    <div class="context-container">
      <span class="label">
        <PersonKeyIcon size="18px" />
        {{ t('agents.labels.context') }}
      </span>
      <span class="description">

        {{ agentData.context }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.agent-details-hero-section {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  padding-block: 1rem;

  & .profile-avatar-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-start;
    margin-right: 1rem;
    text-overflow: ellipsis;
  }

  & .agent-details-actions-wrapper {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
}

.agent-informations-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  padding-block: 2rem;
  row-gap: 1.5rem;
  border-top: 1px solid var(--color-primary-300);
  border-bottom: 1px solid var(--color-primary-300);

  :deep(.description) {
    font-size: var(--font-size-fluid-2);
  }
}

.agent-details-custom-label {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 calc(30% - 0.5rem);
  color: var(--color-primary-900);
  font-size: var(--font-size-fluid-3);

  svg {
    flex-shrink: 0;
  }
}

.context-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & .label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--font-size-fluid-3);
    line-height: normal;
    color: var(--color-primary-900);
  }
  & .description {
    line-height: normal;
    color: var(--color-primary-800);
    font-size: var(--font-size-fluid-2);
    padding-left: 1.675rem;
  }
}

.agentname {
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-900);
}

.dark {
  & .agent-details-custom-label {
    color: var(--color-primary-100);
  }

  & .label,
  .agentname {
    color: var(--color-primary-100);
  }
  & .description {
    color: var(--color-primary-0);
  }
}
</style>
