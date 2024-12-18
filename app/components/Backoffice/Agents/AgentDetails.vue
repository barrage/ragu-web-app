<script lang="ts" setup>
import ChatAgentIcon from '~/assets/icons/svg/chat-agent.svg'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import type { Agent } from '~/types/agent'
import PersonKeyIcon from '~/assets/icons/svg/person-key.svg'
import PersonClockIcon from '~/assets/icons/svg/person-clock.svg'
import PersonCalendarIcon from '~/assets/icons/svg/person-calendar.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import PersonSettingsIcon from '~/assets/icons/svg/person-settings.svg'
import { StatusType } from '~/types/statusTypes'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'

// PROPS & EMITS

const props = defineProps<{
  singleAgent: Agent | null | undefined
}>()

const emits = defineEmits<{
  (event: 'refreshAgent'): void
  (event: 'agentDeactivated'): void
  (event: 'agentActivated'): void
}>()

// STATES

const agentStore = useAgentStore()
const { t } = useI18n()
const handleAgentUpdated = () => {
  emits('refreshAgent')
  agentStore.setEditMode(false)
}

// COMPUTED

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
  }
})

// FUNCTIONS

const editClick = (): void => {
  agentStore.setEditMode(true)
}

/* Activate Agent */
const activateAgentModalVisible = ref(false)

const openActivateAgentModal = () => {
  activateAgentModalVisible.value = true
}

const agentActivated = () => {
  emits('agentActivated')
  emits('refreshAgent')
}

/* Deactivate Agent */
const deactivateAgentModalVisible = ref(false)

const openDeactivateAgentModal = () => {
  deactivateAgentModalVisible.value = true
}

const agentDeactivated = () => {
  emits('agentDeactivated')
  emits('refreshAgent')
}
const handleGetSingleAgent = () => {
  emits('refreshAgent')
}
</script>

<template>
  <template v-if="!agentStore.editMode">
    <div class="agent-details-hero-section">
      <div class="profile-avatar-wrapper">
        <ChatAgentIcon size="80px" class="agent-icon" />
        <div>
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
          v-if="!props.singleAgent?.agent?.active"
          size="small"
          type="primary"
          plain
          @click="openActivateAgentModal()"
        >
          <PersonPasskeyIcon size="20px" />   {{ t('users.user_card.activate_user_title') }}
        </el-button>
        <el-button
          v-if="props.singleAgent?.agent?.active"
          size="small"
          type="primary"
          plain
          @click="openDeactivateAgentModal()"
        >
          <PersonLockIcon size="20px" />   {{ t('users.user_card.deactivate_user_title') }}
        </el-button>
        <el-button
          size="small"
          type="primary"
          plain
          @click="editClick()"
        >
          <EditIcon size="20px" />  {{ t('agents.buttons.edit') }}
        </el-button>
      </div>
    </div>
    <div class="agent-informations-section">
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

      <div class="configuration-title-wrapper">
        <PersonSettingsIcon size="32px" /> <h6 class="agent-configuration-title">
          {{ t('agents.titles.configuration') }}
        </h6>
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
    </div>
    <AgentCollections :agent-collections="props.singleAgent?.collections" @refresh-agent="handleGetSingleAgent" />
  </template>

  <AgentEdit
    v-else
    :single-agent="singleAgent"
    @agent-updated="handleAgentUpdated"
  />

  <ActivateAgentModalBackoffice
    v-model="activateAgentModalVisible"
    :selected-agent="props.singleAgent"
    source="details"
    @agent-activated="agentActivated"
  />

  <DeactivateAgentModalBackoffice
    v-model="deactivateAgentModalVisible"
    :selected-agent="props.singleAgent"
    source="details"
    @agent-deactivated="agentDeactivated"
  />
</template>

<style lang="scss" scoped>
.agent-details-hero-section {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  padding-block: 1rem;
  flex-wrap: wrap;

  & .profile-avatar-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-start;
    margin-right: 1rem;
    text-overflow: ellipsis;
    .agent-icon {
      color: var(--color-primary-900);
      flex-shrink: 0;
    }
  }

  & .agent-details-actions-wrapper {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
}
.configuration-title-wrapper {
  grid-column: span 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 22px 0px 0px;
  color: var(--color-primary-800);
  & .agent-configuration-title {
    color: var(--color-primary-800);
    font-weight: var(--font-weight-bold);
  }
}
.agent-informations-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  padding-block: 2rem;
  row-gap: 1.5rem;
  column-gap: 32px;
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
  max-height: fit-content;

  svg {
    flex-shrink: 0;
  }
}

.agentname {
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-900);
}

.dark {
  .agent-details-hero-section {
    .profile-avatar-wrapper {
      .agent-icon {
        color: var(--color-primary-0);
      }
    }
  }

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
  & .configuration-title-wrapper {
    color: var(--color-primary-100);
    & .agent-configuration-title {
      color: var(--color-primary-100);
    }
  }
}
</style>
