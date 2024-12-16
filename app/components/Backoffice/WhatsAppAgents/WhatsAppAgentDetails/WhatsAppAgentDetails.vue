<script lang="ts" setup>
import AgentIcon from '~/assets/icons/svg/whatsapp-chat-agent.svg'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import PersonKeyIcon from '~/assets/icons/svg/person-key.svg'
import PersonClockIcon from '~/assets/icons/svg/person-clock.svg'
import PersonCalendarIcon from '~/assets/icons/svg/person-calendar.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import AccountWarningIcon from '~/assets/icons/svg/account-warning.svg'
import DeleteAgentIcon from '~/assets/icons/svg/delete-person.svg'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'
import PersonSettingsIcon from '~/assets/icons/svg/person-settings.svg'
import type { SingleWhatsAppAgentResponse, WhatsAppAgent } from '~/types/whatsapp'

// TYPES
type DialogType = 'delete' | 'setAsActive'

// PROPS & EMITS

const props = defineProps<{
  singleAgent: SingleWhatsAppAgentResponse | null | undefined
}>()
const emits = defineEmits<{
  (event: 'refreshAgent'): void
}>()

// CONSTANTS & STATES
const { $api } = useNuxtApp()
const whatsAppStore = useWhatsAppStore()
const localePath = useLocalePath()
const { t } = useI18n()
const dialog = ref<{
  isOpened: boolean
  type: DialogType | undefined
  agent: WhatsAppAgent | undefined
}>({
  isOpened: false,
  type: undefined,
  agent: undefined,
})

const agentData = computed(() => {
  return {
    id: props.singleAgent?.agent?.id || t('agents.agent_card.unknown_id'),
    name: props.singleAgent?.agent?.name || t('agents.agent_card.unknown_agentname'),
    context: props.singleAgent?.agent.context || t('agents.agent_card.unknown_agentcontext'),
    description: props.singleAgent?.agent?.description || t('agents.agent_card.unknown_description'),
    status: props.singleAgent?.agent?.active ? t('agents.agent_card.active_status') : t('agents.agent_card.inactive_status'),
    llmProvider: props.singleAgent?.agent.llmProvider || t('agents.agent_card.unknown_llmProvider'),
    model: props.singleAgent?.agent?.model || t('agents.agent_card.unknown_model'),
    language: props.singleAgent?.agent?.language || t('agents.agent_card.unknown_language'),
    temperature: props.singleAgent?.agent?.temperature || t('agents.agent_card.unknown_temperature'),
    updatedAt: props.singleAgent?.agent?.updatedAt ? formatDate(props.singleAgent?.agent?.updatedAt, 'MMMM DD, YYYY') : t('agents.agent_card.unknown_date'),
    languageInstruction: props.singleAgent?.agent.agentInstructions.languageInstruction || t('agents.agent_card.unknown_instruction'),
    summaryInstruction: props.singleAgent?.agent.agentInstructions.summaryInstruction || t('agents.agent_card.unknown_instruction'),
    promptInstruction: props.singleAgent?.agent.agentInstructions.promptInstruction || t('agents.agent_card.unknown_instruction'),
    createdAt: props.singleAgent?.agent?.createdAt ? formatDate(props.singleAgent?.agent?.createdAt, 'MMMM DD, YYYY') : t('agents.agent_card.unknown_date'),
  }
})

// API
const { execute: setAsActive, error: setAsActiveError, status: setAsActiveStatus } = await useAsyncData(() => $api.whatsApp.BoSetActiveAgent(props.singleAgent?.agent.id as string), { immediate: false })
const { execute: deleteAgent, error: deleteAgentError, status: deleteAgentStatus } = await useAsyncData(() => $api.whatsApp.BoDeleteWhatsAppAgent(props.singleAgent?.agent.id as string), { immediate: false })
errorHandler(setAsActiveError)
errorHandler(deleteAgentError)

// FUNCTIONS
const editClick = () => {
  whatsAppStore.setEditMode(true)
}

const openDialog = (type: DialogType, agent: WhatsAppAgent) => {
  dialog.value = { isOpened: true, type, agent }
}

const closeDialog = () => {
  dialog.value.isOpened = false
  setTimeout(() => dialog.value = { isOpened: false, type: undefined, agent: undefined }, 200)
}

const showSuccessNotification = (type: 'setAsActive' | 'delete') => {
  ElNotification({
    title: type === 'delete' ? t('whatsapp_agents.delete.success_notification_title') : t('whatsapp_agents.set_as_active.success_notification_title'),
    message: type === 'delete' ? t('whatsapp_agents.delete.success_notification_message') : t('whatsapp_agents.set_as_active.success_notification_message'),
    type: 'success',
    customClass: 'success',
    duration: 2500,
  })
}

const handleSetAsActive = async () => {
  await setAsActive()
  if (!setAsActiveError.value) {
    showSuccessNotification('setAsActive')
    emits('refreshAgent')
    closeDialog()
  }
}

const handleDeleteAgent = async () => {
  await deleteAgent()
  if (!setAsActiveError.value) {
    showSuccessNotification('delete')
    closeDialog()
    navigateTo({ path: localePath(`/admin/whatsapp-agents`) })
  }
}

const handleRefreshAgent = () => {
  emits('refreshAgent')
}
</script>

<template>
  <div class="agent-details-hero-section">
    <div class="profile-avatar-wrapper">
      <AgentIcon size="80" class="agent-icon" />
      <div>
        <h6 class="agentname">
          {{ `${agentData.name}` }}
        </h6>
        <ElTag
          v-if="singleAgent"
          :type="singleAgent?.agent.active ? 'success' : 'danger'"
          size="small"
        >
          <span class="status-dot" />  {{ agentData?.status }}
        </ElTag>
      </div>
    </div>
    <div v-if="singleAgent" class="agent-details-actions-wrapper">
      <ElButton
        v-if="!singleAgent?.agent.active"
        size="small"
        type="primary"
        plain
        @click="openDialog('setAsActive', singleAgent?.agent)"
      >
        <PersonPasskeyIcon size="20px" />   {{ t('users.user_card.activate_user_title') }}
      </ElButton>
      <ElButton
        size="small"
        type="primary"
        plain
        @click="editClick"
      >
        <EditIcon />  {{ t('agents.buttons.edit') }}
      </ElButton>
      <LlmTooltip
        :content="agentData.status === 'Active' ? $t('whatsapp_agents.delete.active_agent_tooltip') : $t('whatsapp_agents.delete.dialog_title')"
      >
        <ElButton
          plain
          type="danger"
          class="delete-action"
          :disabled="agentData.status === 'Active'"
          @click="openDialog('delete', singleAgent?.agent)"
        >
          <DeleteIcon size="20px" />
          {{ $t('whatsapp_agents.delete.label') }}
        </ElButton>
      </LlmTooltip>
    </div>
  </div>
  <div v-if="singleAgent" class="agent-informations-section">
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
          <PersonInfoIcon size="18px" />
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
      v-if="agentData.languageInstruction"
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
      v-if="agentData.summaryInstruction"
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
  <EmptyState
    v-else
    :title="$t('whatsapp_agents.empty_state_title_details')"
    :description="$t('whatsapp_agents.empty_state_desc_details')"
  >
    <template #icon>
      <AccountWarningIcon size="44px" />
    </template>
  </EmptyState>
  <WhatsAppAgentCollections
    :agent-collections="singleAgent?.collections"
    :single-agent="singleAgent?.agent"
    @refresh-agent="handleRefreshAgent"
  />
  <ElDialog
    v-model="dialog.isOpened"
    destroy-on-close
    align-center
    class="barrage-dialog--small"
    :close-on-click-modal="false"
    :close-icon="CloseCircleIcon"
    @close="closeDialog"
  >
    <template #header>
      <div class="dialog-title-wrapper">
        <DeleteAgentIcon v-if="dialog.type === 'delete'" size="42px" />
        <PersonPasskeyIcon v-else size="42px" />
        <h5> {{ dialog.type === 'delete' ? $t('whatsapp_agents.delete.dialog_title') : $t('whatsapp_agents.set_as_active.dialog_title') }}</h5>
      </div>
    </template>
    <div class="dialog-agent-name-wrapper">
      <p>
        {{ dialog.type === 'delete' ? $t('whatsapp_agents.delete.dialog_description') : $t('whatsapp_agents.set_as_active.dialog_description') }}
      </p>
      <el-card class="is-primary">
        <WhatsAppAgentProfileOverview :agent="singleAgent?.agent" />
      </el-card>
    </div>
    <template #footer>
      <ElButton @click="dialog.isOpened = false">
        {{ $t('whatsapp_agents.close') }}
      </ElButton>
      <ElButton
        :type="dialog.type === 'delete' ? 'danger' : 'primary'"
        :loading="setAsActiveStatus === 'pending' || deleteAgentStatus === 'pending' "
        @click="dialog.type === 'delete' ? handleDeleteAgent() : handleSetAsActive()"
      >
        {{ dialog.type === 'delete' ? $t('whatsapp_agents.delete.label') : $t('whatsapp_agents.set_as_active.label') }}
      </ElButton>
    </template>
  </ElDialog>
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
    }
  }

  & .agent-details-actions-wrapper {
    display: flex;
    align-items: center;
    gap: 2rem;

    .set-as-active-btn {
      color: var(--color-green-400);
    }
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

.dialog-title-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.dialog-agent-name-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.dark {
  .agent-details-hero-section {
    .profile-avatar-wrapper {
      .agent-icon {
        color: var(--color-primary-0);
      }

      .set-as-active-icon {
        color: var(--color-green-700);
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
}
</style>
