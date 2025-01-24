<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import type { Agent, Configuration } from '~/types/agent'
import { StatusType } from '~/types/statusTypes'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'
import DeleteIcon from '~/assets/icons/svg/delete-person.svg'

const props = defineProps<{
  singleAgent: Agent | null | undefined
}>()

const emits = defineEmits<{
  (event: 'refreshAgent'): void
  (event: 'agentVersionRollback', config: Configuration): Configuration
}>()

const agentStore = useAgentStore()
const { t } = useI18n()
const { $api } = useNuxtApp()

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

const { execute: deleteProfilePicture, error } = await useAsyncData(() => $api.agent.DeleteAgentAvatar(props.singleAgent?.agent?.id as string), { immediate: false })

/* Activate Agent */
const activateAgentModalVisible = ref(false)

const openActivateAgentModal = () => {
  activateAgentModalVisible.value = true
}

const agentActivated = () => {
  emits('refreshAgent')
}

/* Deactivate Agent */
const deactivateAgentModalVisible = ref(false)

const openDeactivateAgentModal = () => {
  deactivateAgentModalVisible.value = true
}

const agentDeactivated = () => {
  emits('refreshAgent')
}
const handleGetSingleAgent = () => {
  emits('refreshAgent')
}

/* Profile Picture */
const isDeleteModalOpen = ref(false)

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
}

const isUploadModalVisible = defineModel<boolean>()
const openUploadModal = () => {
  isUploadModalVisible.value = true
}

const refreshAgent = async () => {
  emits('refreshAgent')
  await agentStore.GET_AllAppAgents()
}

const handleRemovePicture = async () => {
  await deleteProfilePicture()
  if (error.value) {
    ElNotification({
      title: t('profile.notifications.import.error_title'),
      message: t('profile.notifications.import.error_description'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
  }
  else {
    ElNotification({
      title: t('profile.notifications.import.success_title'),
      message: t('profile.notifications.import.success_delete_description'),
      type: 'success',
      customClass: 'success',
      duration: 2500,
    })
  }

  refreshAgent()
  closeDeleteModal()
}
const activeName = ref('details')

const handleTabClick = (tab: TabsPaneContext, event: Event) => {
  console.warn(tab, event)
}

const handleAgentVersionRollback = async (agentConfig: Configuration) => {
  emits('agentVersionRollback', agentConfig)
}
</script>

<template>
  <div class="agent-details-hero-section">
    <div class="profile-avatar-wrapper">
      <div class="avatar-wrapper">
        <LlmAvatar
          :avatar="agentData?.avatar"
          :alt="t('agents.agent_avatar')"
          fit="cover"
          default-image="agent"
          :size="112"
        />
        <div>
          <h1 class="agentname">
            {{ `${agentData.name}` }}
          </h1>
          <div class="agent-tags-wrapper">
            <ElTag :type="agentData.statusType" size="small">
              <span class="status-dot" />  {{ agentData?.status }}
            </ElTag>
            <ElTag type="primary" size="small">
              v.{{ agentData?.version }}
            </ElTag>
          </div>
        </div>
      </div>
    </div>
    <div class="agent-details-actions-wrapper">
      <div class="change-picture">
        <el-button
          class="edit-picture-button"
          size="small"
          @click="openUploadModal"
        >
          <EditIcon size="16px" />
          {{ t('profile.change_picture.title') }}
        </el-button>
        <el-button
          v-if="agentData.avatar"
          class="remove-picture-button"
          size="small"
          @click="isDeleteModalOpen = true"
        >
          <DeleteIcon size="16px" />
          {{ t('profile.change_picture.delete_title') }}
        </el-button>
      </div>
      <el-button
        v-if="!props.singleAgent?.agent?.active"
        size="small"
        type="primary"
        plain
        @click="openActivateAgentModal()"
      >
        <PersonPasskeyIcon size="20px" />   {{ t('users.user_card.activate_user_title') }}
      </el-button>

      <LlmLink :to="`/admin/agents/${props.singleAgent?.agent?.id}/edit`">
        <template #default>
          <el-button size="small">
            <EditIcon size="20px" />  {{ t('agents.buttons.edit') }}
          </el-button>
        </template>
      </LlmLink>

      <el-button
        v-if="props.singleAgent?.agent?.active"
        size="small"
        type="danger"
        plain
        @click="openDeactivateAgentModal()"
      >
        <PersonLockIcon size="20px" />   {{ t('users.user_card.deactivate_user_title') }}
      </el-button>
    </div>
  </div>

  <el-tabs
    v-model="activeName"
    class="agent-details-tabs"
    data-testid="bo-agent-details-tabs"
    @tab-click="handleTabClick"
  >
    <el-tab-pane :label="t('agents.titles.details')" name="details">
      <template v-if="activeName === 'details'">
        <AgentOverallDetails :single-agent="props.singleAgent" />
      </template>
    </el-tab-pane>
    <el-tab-pane :label="t('agents.titles.configuration')" name="configuration">
      <template v-if="activeName === 'configuration'" />
      <AgentConfigurationDetails :single-agent="props.singleAgent" />
    </el-tab-pane>
    <el-tab-pane :label="t('collections.title')" name="collections">
      <template v-if="activeName === 'collections'">
        <AgentCollections :agent-collections="props.singleAgent?.collections" @refresh-agent="handleGetSingleAgent" />
      </template>
    </el-tab-pane>

    <el-tab-pane :label="t('agents.titles.evaluations')" name="evaluations">
      <template v-if="activeName === 'evaluations'">
        <AsyncAgentEvaluationList :agent="props.singleAgent" />
      </template>
    </el-tab-pane>
    <!--  <el-tab-pane :label="t('agents.titles.statistic')" name="statistics">
        <template v-if="activeName === 'statistics'">
          <AgentStatistic />
        </template>
      </el-tab-pane> -->
    <el-tab-pane :label="t('agents.titles.versions')" name="versions">
      <template v-if="activeName === 'versions'">
        <AsyncAgentVersionList :agent="props.singleAgent" @rollback-agent-version="handleAgentVersionRollback" />
      </template>
    </el-tab-pane>
  </el-tabs>

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
  <ConformationModal
    :is-visible="isDeleteModalOpen"
    :title="t('profile.delete_picture.title')"
    :message="t('profile.delete_picture.description')"
    :confirm-button-text="t('settings.delete') "
    :cancel-button-text="t('settings.cancel')"
    @confirm="handleRemovePicture"
    @cancel="closeDeleteModal"
  />

  <ChangePictureModal
    v-model="isUploadModalVisible"
    upload-type="agents"
    :agent-id="agentData.id"
    @profile-picture-uploaded="refreshAgent"
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
    flex-direction: column;
    gap: 0.5rem;
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

.agent-details-tabs {
  margin-top: var(--spacing-fluid-xs);
}

.agentname {
  font-size: var(--font-size-fluid-6);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-900);
}

.agent-tags-wrapper {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding-top: 8px;
}

.avatar-wrapper {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.change-picture {
  display: flex;
  gap: 0.5rem;
}

.edit-picture-button,
.remove-picture-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
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
    color: var(--color-primary-0);
  }
  & .description {
    color: var(--color-primary-0);
  }
}
</style>
