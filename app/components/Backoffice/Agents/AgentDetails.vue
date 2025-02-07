<script lang="ts" setup>
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import type { Agent, Configuration } from '~/types/agent'
import { StatusType } from '~/types/statusTypes'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'
import FolderPersonIcon from '~/assets/icons/svg/folder-person.svg'
import LikeDislikeIcon from '~/assets/icons/svg/like_dislike.svg'
import PersonTagIcon from '~/assets/icons/svg/person-tag.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import PersonSettingsIcon from '~/assets/icons/svg/person-settings.svg'
import type { TabOption } from '~/types/tab'

const props = defineProps<{
  agent: Agent | null | undefined
}>()

const emits = defineEmits<{
  (event: 'refreshAgent'): void
  (event: 'agentVersionRollback', config: Configuration): Configuration
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
    languageInstruction: props.agent?.configuration?.agentInstructions?.languageInstruction || t('agents.agent_card.unknown_instruction'),
    summaryInstruction: props.agent?.configuration?.agentInstructions?.summaryInstruction || t('agents.agent_card.unknown_instruction'),
    titleInstruction: props.agent?.configuration?.agentInstructions?.titleInstruction || t('agents.agent_card.unknown_instruction'),
    promptInstruction: props.agent?.configuration?.agentInstructions?.promptInstruction || t('agents.agent_card.unknown_instruction'),
    createdAt: props.agent?.agent?.createdAt ? formatDate(props.agent?.agent?.createdAt, 'MMMM DD, YYYY') : t('agents.agent_card.unknown_date'),
    avatar: props.agent?.agent?.avatar || undefined,
    version: props.agent?.configuration?.version || '-',
  }
})

/* Activate Agent */
const activateAgentModalVisible = ref(false)

const openActivateAgentModal = () => {
  activateAgentModalVisible.value = true
}

/* Deactivate Agent */
const deactivateAgentModalVisible = ref(false)

const openDeactivateAgentModal = () => {
  deactivateAgentModalVisible.value = true
}

const handleGetSingleAgent = () => {
  emits('refreshAgent')
}

/* Profile Picture */

const isAgentModalVisible = defineModel<boolean>()
const openAgentModal = () => {
  isAgentModalVisible.value = true
}

const handleChangePicture = () => {
  isAgentModalVisible.value = false
  emits('refreshAgent')
}

const handleDeletePicture = () => {
  isAgentModalVisible.value = false
  emits('refreshAgent')
}

const tabOptions = computed((): TabOption[] => {
  return [
    {
      name: 'details',
      label: t('agents.titles.details'),
      icon: PersonInfoIcon,
      component: defineAsyncComponent(() =>
        import('~/components/Backoffice/Agents/AgentDetails/AgentOverall/AgentOverallDetails.vue'),
      ),
    },
    {
      name: 'configuration',
      label: t('agents.titles.configuration'),
      icon: PersonSettingsIcon,
      component: defineAsyncComponent(() =>
        import('~/components/Backoffice/Agents/AgentDetails/AgentConfiguration/AgentConfigurationDetails.vue'),
      ),
    },
    {
      name: 'collections',
      label: t('collections.title'),
      icon: FolderPersonIcon,
      component: defineAsyncComponent(() =>
        import('~/components/Backoffice/Agents/AgentDetails/AgentCollections/AgentCollections.vue'),
      ),
    },
    {
      name: 'evaluations',
      label: t('agents.titles.evaluations'),
      icon: LikeDislikeIcon,
      component: defineAsyncComponent(() =>
        import('~/components/Backoffice/Agents/AgentDetails/AgentEvaluations/AsyncAgentEvaluationList.vue'),
      ),
    },
    /* {
      name: 'statistic',
      label: t('agents.titles.statistic'),
      icon: ,
      component: defineAsyncComponent(() =>
        import('~/components/Backoffice/Agents/AgentDetails/AgentVersions/AgentStatistic.vue'),
      ),
    }, */
    {
      name: 'versions',
      label: t('agents.titles.versions'),
      icon: PersonTagIcon,
      component: defineAsyncComponent(() =>
        import('~/components/Backoffice/Agents/AgentDetails/AgentVersions/AsyncAgentVersionList.vue'),
      ),
    },
  ]
})
const { activeTab } = useTabQuery('details', tabOptions.value.map(tab => tab.name))

const handleAgentVersionRollback = (agentConfig: Configuration) => {
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
          editable
          @edit="openAgentModal"
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
      <CopyAddressButton />
      <el-button
        v-if="!agent?.agent?.active"
        size="small"
        type="primary"
        plain
        @click="openActivateAgentModal()"
      >
        <PersonPasskeyIcon size="20px" />   {{ t('users.user_card.activate_user_title') }}
      </el-button>

      <LlmLink :to="`/admin/agents/${agent?.agent?.id}/edit`">
        <template #default>
          <el-button size="small">
            <EditIcon size="20px" />  {{ t('agents.buttons.edit') }}
          </el-button>
        </template>
      </LlmLink>

      <el-button
        v-if="agent?.agent?.active"
        size="small"
        type="danger"
        plain
        @click="openDeactivateAgentModal()"
      >
        <PersonLockIcon size="20px" />   {{ t('users.user_card.deactivate_user_title') }}
      </el-button>
    </div>
  </div>

  <ElTabs
    v-model="activeTab"
    class="agent-details-tabs"
    data-testid="bo-agent-details-tabs"
  >
    <ElTabPane
      v-for="tab in tabOptions"
      :key="tab.name"
      :label="tab.label"
      :name="tab.name"
    >
      <template #label>
        <div class="custom-tab-label-wrapper">
          <component :is="tab.icon" size="24px" />
          <span>{{ tab.label }}</span>
        </div>
      </template>

      <component
        :is="tab.component"
        v-if="activeTab === tab.name"
        v-motion-slide-bottom
        :duration="400"
        :agent-collections="agent?.collections"
        :agent-id="agent?.agent?.id"
        :configuration-agent-id="agent?.configuration?.id"
        :agent="agent"
        @rollback-agent-version="handleAgentVersionRollback"
        @refresh-agent="handleGetSingleAgent"
      />
    </ElTabPane>
  </ElTabs>

  <ActivateAgentModalBackoffice
    v-model="activateAgentModalVisible"
    :selected-agent="agent"
    source="details"
    @agent-activated="handleGetSingleAgent"
  />

  <DeactivateAgentModalBackoffice
    v-model="deactivateAgentModalVisible"
    :selected-agent="agent"
    source="details"
    @agent-deactivated="handleGetSingleAgent"
  />
  <ChangeAgentPictureModal
    v-model="isAgentModalVisible"
    :agent="agent"
    @change-picture="handleChangePicture"
    @delete-picture="handleDeletePicture"
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

  & .custom-tab-label-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-fluid-5-xs);
  }
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
