<script lang="ts" setup>
import ProfileIcon from '~/assets/icons/svg/account.svg'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import type { Agent, Agents } from '~/types/agent'
import PersonKeyIcon from '~/assets/icons/svg/person-key.svg'
import PersonClockIcon from '~/assets/icons/svg/person-clock.svg'
import PersonCalendarIcon from '~/assets/icons/svg/person-calendar.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import CollectionIcon from '~/assets/icons/svg/folder-icon.svg'
import { StatusType } from '~/types/statusTypes'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'

const props = defineProps<{
  singleAgent: Agent | null | undefined
}>()

const emits = defineEmits<{

  (event: 'agentDeactivated'): void
  (event: 'agentActivated'): void
}>()

const agentStore = useAgentStore()
const assignCollectionModalVisible = ref(false)
const deleteCollectionModalVisible = ref(false)

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
    vectorProvider: props.singleAgent?.agent?.vectorProvider || t('agents.agent_card.unknown_vectorProvider'),
    embeddingProvider: props.singleAgent?.agent?.embeddingProvider || t('agents.agent_card.unknown_embeddingProvider'),
    embeddingModel: props.singleAgent?.agent?.embeddingModel || t('agents.agent_card.unknown_embeddingModel'),
    updatedAt: props.singleAgent?.agent?.updatedAt ? formatDate(props.singleAgent?.agent?.updatedAt, 'MMMM DD, YYYY') : t('agents.agent_card.unknown_date'),
    languageInstruction: props.singleAgent?.configuration?.agentInstructions?.languageInstruction || t('agents.agent_card.unknown_instruction'),
    summaryInstruction: props.singleAgent?.configuration?.agentInstructions?.summaryInstruction || t('agents.agent_card.unknown_instruction'),
    titleInstruction: props.singleAgent?.configuration?.agentInstructions?.titleInstruction || t('agents.agent_card.unknown_instruction'),
    createdAt: props.singleAgent?.agent?.createdAt ? formatDate(props.singleAgent?.agent?.createdAt, 'MMMM DD, YYYY') : t('agents.agent_card.unknown_date'),
  }
})

const { execute: getAgent } = await useAsyncData(() => agentStore.GET_SingleAgent(props.singleAgent?.agent?.id), { immediate: false })

const editClick = (): void => {
  agentStore.setEditMode(true)
}

const openAssignCollectionModal = () => {
  assignCollectionModalVisible.value = true
}

const closeAssignCollectionModal = () => {
  assignCollectionModalVisible.value = false
}

const openDeleteCollectionModal = () => {
  deleteCollectionModalVisible.value = true
}

const closeDeleteCollectionModal = () => {
  deleteCollectionModalVisible.value = false
}

/* Activate Agent */
const activateAgentModalVisible = ref(false)

const openActivateAgentModal = () => {
  activateAgentModalVisible.value = true
}

const closeActivateModal = () => {
  activateAgentModalVisible.value = false
}

const agentActivated = () => {
  emits('agentActivated')
  getAgent()
}

/* Deactivate Agent */
const deactivateAgentModalVisible = ref(false)

const openDeactivateAgentModal = () => {
  deactivateAgentModalVisible.value = true
}

const closeDeactivateModal = () => {
  deactivateAgentModalVisible.value = false
}

const agentDeactivated = () => {
  emits('agentDeactivated')
  getAgent()
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
        @click="openAssignCollectionModal()"
      >
        <CollectionIcon /> {{ t('collections.assign_collection.title') }}
      </el-button>
      <ElTooltip
        :disabled="!(agentStore.singleAgent?.collections?.length === 0)"
        :content="t('collections.assign_collection.notification.delete_collection')"
        :enterable="false"
        placement="top"
      >
        <el-button
          size="small"
          type="primary"
          plain
          :disabled="agentStore.singleAgent?.collections?.length === 0"
          @click="openDeleteCollectionModal()"
        >
          <CollectionIcon />  {{ t('collections.deleteModal.title') }}
        </el-button>
      </ElTooltip>
      <el-button
        v-if="!props.singleAgent?.agent?.active"
        size="small"
        type="primary"
        plain
        @click="openActivateAgentModal()"
      >
        <PersonPasskeyIcon />   {{ t('users.user_card.activate_user_title') }}
      </el-button>
      <el-button
        v-if="props.singleAgent?.agent?.active"
        size="small"
        type="primary"
        plain
        @click="openDeactivateAgentModal()"
      >
        <PersonLockIcon />   {{ t('users.user_card.deactivate_user_title') }}
      </el-button>
      <el-button
        size="small"
        type="primary"
        plain
        @click="editClick()"
      >
        <EditIcon />  {{ t('agents.buttons.edit') }}
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
    <LabelDescriptionItem
      v-if="props.singleAgent?.configuration?.agentInstructions?.languageInstruction"
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
      v-if="props.singleAgent?.configuration?.agentInstructions?.summaryInstruction"
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
    <LabelDescriptionItem
      v-if="props.singleAgent?.configuration?.agentInstructions?.titleInstruction"
      :label="t('agents.labels.titleInstruction')"
      :description="agentData.titleInstruction"
      horizontal
    >
      <template #customLabel>
        <div class="agent-details-custom-label">
          <PersonClockIcon size="18px" />
          <span>  {{ t('agents.labels.titleInstruction') }}</span>
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
  <AssignCollectionModal
    :is-open="assignCollectionModalVisible"
    @close-modal="closeAssignCollectionModal"
  />
  <DeleteAgentCollectionModal
    :is-open="deleteCollectionModalVisible"
    @close-modal="closeDeleteCollectionModal"
  />
  <ActivateAgentModalBackoffice
    :is-open="activateAgentModalVisible"
    :selected-agent="props.singleAgent"
    source="details"
    @close-modal="closeActivateModal"
    @agent-activated="agentActivated"
  />

  <DeactivateAgentModalBackoffice
    :is-open="deactivateAgentModalVisible"
    :selected-agent="props.singleAgent"
    source="details"
    @close-modal="closeDeactivateModal"
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
