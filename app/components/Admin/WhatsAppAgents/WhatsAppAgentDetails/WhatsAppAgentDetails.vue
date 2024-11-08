<script lang="ts" setup>
import AgentIcon from '~/assets/icons/svg/whatsapp-chat-agent.svg'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import PersonKeyIcon from '~/assets/icons/svg/person-key.svg'
import PersonClockIcon from '~/assets/icons/svg/person-clock.svg'
import PersonCalendarIcon from '~/assets/icons/svg/person-calendar.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import CollectionIcon from '~/assets/icons/svg/folder-icon.svg'
import CheckIcon from '~/assets/icons/svg/check.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import AccountWarningIcon from '~/assets/icons/svg/account-warning.svg'
import type { SingleWhatsAppAgentResponse } from '~/types/whatsapp'

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
const assignCollectionModalVisible = ref(false)
const deleteCollectionModalVisible = ref(false)
const { t } = useI18n()
const isDeleteDialogOpen = ref(false)
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
    vectorProvider: props.singleAgent?.agent?.vectorProvider || t('agents.agent_card.unknown_vectorProvider'),
    embeddingProvider: props.singleAgent?.agent?.embeddingProvider || t('agents.agent_card.unknown_embeddingProvider'),
    embeddingModel: props.singleAgent?.agent?.embeddingModel || t('agents.agent_card.unknown_embeddingModel'),
    updatedAt: props.singleAgent?.agent?.updatedAt ? formatDate(props.singleAgent?.agent?.updatedAt, 'MMMM DD, YYYY') : t('agents.agent_card.unknown_date'),
    languageInstruction: props.singleAgent?.agent.languageInstruction || t('agents.agent_card.unknown_instruction'),
    summaryInstruction: props.singleAgent?.agent.summaryInstruction || t('agents.agent_card.unknown_instruction'),
    createdAt: props.singleAgent?.agent?.createdAt ? formatDate(props.singleAgent?.agent?.createdAt, 'MMMM DD, YYYY') : t('agents.agent_card.unknown_date'),
  }
})

// API
const { execute: setAsActive, error: setAsActiveError } = await useAsyncData(() => $api.whatsApp.BoSetActiveAgent(props.singleAgent?.agent.id as string), { immediate: false })
const { execute: deleteAgent, error: deleteAgentError, status: deleteAgentStatus } = await useAsyncData(() => $api.whatsApp.BoDeleteWhatsAppAgent(props.singleAgent?.agent.id as string), { immediate: false })
errorHandler(setAsActiveError)
errorHandler(deleteAgentError)

// FUNCTIONS
function editClick() {
  whatsAppStore.setEditMode(true)
}

async function handleSetAsActive() {
  await setAsActive()
  if (!setAsActiveError.value) {
    showSuccessNotification('setAsActive')
    emits('refreshAgent')
  }
}

async function handleDeleteAgent() {
  await deleteAgent()
  if (!setAsActiveError.value) {
    showSuccessNotification('delete')
    isDeleteDialogOpen.value = false
    navigateTo({ path: localePath(`/admin/whatsapp-agents`) })
  }
}

function showSuccessNotification(type: 'setAsActive' | 'delete') {
  ElNotification({
    title: type === 'delete' ? t('whatsapp_agents.delete.success_notification_title') : t('whatsapp_agents.set_as_active.success_notification_title'),
    message: type === 'delete' ? t('whatsapp_agents.delete.success_notification_message') : t('whatsapp_agents.set_as_active.success_notification_message'),
    type: 'success',
    customClass: 'success',
    duration: 2500,
  })
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
        type="success"
        plain
        class="set-as-active-btn"
        @click="handleSetAsActive"
      >
        <CheckIcon /> {{ $t('whatsapp_agents.set_as_active.label') }}
      </ElButton>
      <ElButton
        size="small"
        type="primary"
        plain
        @click="assignCollectionModalVisible = true"
      >
        <CollectionIcon /> {{ t('collections.assign_collection.title') }}
      </ElButton>
      <LlmTooltip
        :disabled="!(!singleAgent?.collections?.length)"
        :content="t('collections.assign_collection.notification.delete_collection')"
      >
        <ElButton
          size="small"
          type="danger"
          plain
          :disabled="!singleAgent?.collections?.length"
          @click="deleteCollectionModalVisible = true"
        >
          <CollectionIcon />  {{ t('collections.deleteModal.title') }}
        </ElButton>
      </LlmTooltip>
      <ElButton
        size="small"
        type="primary"
        plain
        @click="editClick"
      >
        <EditIcon />  {{ t('agents.buttons.edit') }}
      </ElButton>
      <LlmTooltip
        :content="agentData.status === 'Active' ? $t('whatsapp_agents.delete.active_agent_tooltip') : $t('whatsapp_agents.delete.label')"
        :placement="agentData.status === 'Active' ? 'left' : 'top'"
      >
        <ElButton
          plain
          type="danger"
          class="delete-action"
          :disabled="agentData.status === 'Active'"
          @click="isDeleteDialogOpen = true"
        >
          <DeleteIcon size="20px" />
          {{ $t('whatsapp_agents.delete.label') }}
        </ElButton>
      </LlmTooltip>
    </div>
  </div>
  <div v-if="singleAgent" class="agent-informations-section">
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
    <LabelDescriptionItem
      v-if="agentData.languageInstruction"
      :label="t('agents.labels.languageInstruction')"
      :description="agentData.languageInstruction"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <PersonClockIcon size="18px" />
          <span>  {{ t('agents.labels.languageInstruction') }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      v-if="agentData.summaryInstruction"
      :label="t('agents.labels.summaryInstruction')"
      :description="agentData.summaryInstruction"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <PersonClockIcon size="18px" />
          <span>  {{ t('agents.labels.summaryInstruction') }}</span>
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
  <EmptyState
    v-else
    :title="$t('whatsapp_agents.empty_state_title_details')"
    :description="$t('whatsapp_agents.empty_state_desc_details')"
  >
    <template #icon>
      <AccountWarningIcon size="44px" />
    </template>
  </EmptyState>

  <WhatsAppAssignCollectionModal
    v-model="assignCollectionModalVisible"
    :single-agent="singleAgent"
    @refresh-agent="emits('refreshAgent')"
  />
  <WhatsAppDeleteAgentCollectionModal
    v-model="deleteCollectionModalVisible"
    :single-agent="singleAgent"
    @refresh-agent="emits('refreshAgent')"
  />

  <ElDialog
    v-model="isDeleteDialogOpen"
    destroy-on-close
    align-center
    class="barrage-dialog--small"
    :close-on-click-modal="false"
    :close-icon="CloseCircleIcon"
  >
    <template #header>
      <div class="dialog-title-wrapper">
        <DeleteIcon size="42px" />
        <h5> {{ $t('whatsapp_agents.delete.dialog_title') }}</h5>
      </div>
    </template>
    <div>
      <p> {{ $t('whatsapp_agents.delete.dialog_description') }}</p>
      <div class="dialog-agent-name-wrapper">
        <AgentIcon size="24px" />
        <p>{{ singleAgent.agent.name }}</p>
      </div>
    </div>
    <template #footer>
      <ElButton @click="isDeleteDialogOpen = false">
        {{ $t('whatsapp_agents.close') }}
      </ElButton>
      <ElButton
        type="danger"
        :loading="deleteAgentStatus === 'pending' "
        @click="handleDeleteAgent()"
      >
        {{ $t('whatsapp_agents.delete.label') }}
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

.dialog-title-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.dialog-agent-name-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 1rem;
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
