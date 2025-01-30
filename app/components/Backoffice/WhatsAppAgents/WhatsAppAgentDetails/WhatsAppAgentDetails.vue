<script lang="ts" setup>
import AgentIcon from '~/assets/icons/svg/whatsapp-chat-agent.svg'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import DeleteAgentIcon from '~/assets/icons/svg/delete-person.svg'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'
import PersonSettingsIcon from '~/assets/icons/svg/person-settings.svg'
import FolderPersonIcon from '~/assets/icons/svg/folder-person.svg'
import type { SingleWhatsAppAgentResponse, WhatsAppAgent } from '~/types/whatsapp'
import type { AgentCollection } from '~/types/agent'
import type { TabOption } from '~/types/tab'

// TYPES
type DialogType = 'delete' | 'setAsActive'
export interface WhatsAppAgentData {
  id: string
  name: string
  description: string
  status: string
  llmProvider: string
  model: string
  language: string
  temperature: string | number
  updatedAt: string
  titleInstruction: string
  summaryInstruction: string
  context: string
  createdAt: string
  collections: AgentCollection[] | undefined
}

// PROPS & EMITS
const props = defineProps<{
  whatsAppAgent: SingleWhatsAppAgentResponse | null | undefined
}>()
const emits = defineEmits<{
  (event: 'refreshWhatsAppAgent'): void
}>()

// STATES & CONSTANTS
const { $api } = useNuxtApp()
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

const tabOptions = computed((): TabOption[] => {
  return [
    {
      name: 'details',
      label: t('agents.titles.details'),
      icon: PersonInfoIcon,
      component: defineAsyncComponent(() =>
        import('~/components/Backoffice/WhatsAppAgents/WhatsAppAgentDetails/WhatsAppAgentOverallDetails.vue'),
      ),
    },
    {
      name: 'configuration',
      label: t('agents.titles.configuration'),
      icon: PersonSettingsIcon,
      component: defineAsyncComponent(() =>
        import('~/components/Backoffice/WhatsAppAgents/WhatsAppAgentDetails/WhatsAppAgentConfigurationDetails.vue'),
      ),
    },
    {
      name: 'collections',
      label: t('collections.title'),
      icon: FolderPersonIcon,
      component: defineAsyncComponent(() =>
        import('~/components/Backoffice/WhatsAppAgents/WhatsAppAgentDetails/WhatsAppAgentCollections.vue'),
      ),
    },
  ]
})
const { activeTab } = useTabQuery('details', tabOptions.value.map(tab => tab.name))

const whatsAppAgentData = computed((): WhatsAppAgentData => {
  return {
    id: props.whatsAppAgent?.agent?.id || t('agents.agent_card.unknown_id'),
    name: props.whatsAppAgent?.agent?.name || t('agents.agent_card.unknown_agentname'),
    description: props.whatsAppAgent?.agent?.description || t('agents.agent_card.unknown_description'),
    status: props.whatsAppAgent?.agent?.active ? t('agents.agent_card.active_status') : t('agents.agent_card.inactive_status'),
    llmProvider: props.whatsAppAgent?.agent.llmProvider || t('agents.agent_card.unknown_llmProvider'),
    model: props.whatsAppAgent?.agent?.model || t('agents.agent_card.unknown_model'),
    language: props.whatsAppAgent?.agent?.language || t('agents.agent_card.unknown_language'),
    temperature: props.whatsAppAgent?.agent?.temperature || t('agents.agent_card.unknown_temperature'),
    updatedAt: props.whatsAppAgent?.agent?.updatedAt ? formatDate(props.whatsAppAgent?.agent?.updatedAt, 'MMMM DD, YYYY') : t('agents.agent_card.unknown_date'),
    titleInstruction: props.whatsAppAgent?.agent.agentInstructions.titleInstruction || t('agents.agent_card.unknown_instruction'),
    summaryInstruction: props.whatsAppAgent?.agent.agentInstructions.summaryInstruction || t('agents.agent_card.unknown_instruction'),
    context: props.whatsAppAgent?.agent.context || t('agents.agent_card.unknown_agentcontext'),
    createdAt: props.whatsAppAgent?.agent?.createdAt ? formatDate(props.whatsAppAgent?.agent?.createdAt, 'MMMM DD, YYYY') : t('agents.agent_card.unknown_date'),
    collections: props.whatsAppAgent?.collections,
  }
})

// API
const { execute: setAsActive, error: setAsActiveError, status: setAsActiveStatus } = await useAsyncData(() => $api.whatsApp.BoSetActiveAgent(props.whatsAppAgent?.agent.id as string), { immediate: false })
const { execute: deleteAgent, error: deleteAgentError, status: deleteAgentStatus } = await useAsyncData(() => $api.whatsApp.BoDeleteWhatsAppAgent(props.whatsAppAgent?.agent.id as string), { immediate: false })
errorHandler(setAsActiveError)
errorHandler(deleteAgentError)

// FUNCTIONS

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
    emits('refreshWhatsAppAgent')
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
</script>

<template>
  <div class="whatsapp-agent-details-hero-section">
    <div class="profile-avatar-wrapper">
      <AgentIcon size="80" class="agent-icon" />
      <div>
        <h6 class="agentname">
          {{ `${whatsAppAgentData.name}` }}
        </h6>
        <ElTag
          v-if="whatsAppAgent"
          :type="whatsAppAgentData.status === 'Active' ? 'success' : 'danger'"
          size="small"
        >
          <span class="status-dot" />  {{ whatsAppAgentData?.status }}
        </ElTag>
      </div>
    </div>
    <div class="whatsapp-agent-details-actions-wrapper">
      <LlmTooltip
        :content="whatsAppAgentData.status === 'Active' ? $t('whatsapp_agents.delete.active_agent_tooltip') : $t('whatsapp_agents.delete.dialog_title')"
      >
        <ElButton
          plain
          size="small"
          type="danger"
          :disabled="whatsAppAgentData.status === 'Active'"
          @click="openDialog('delete', whatsAppAgent?.agent as WhatsAppAgent)"
        >
          <DeleteIcon size="20px" />
          {{ $t('whatsapp_agents.delete.label') }}
        </ElButton>
      </LlmTooltip>
      <ElButton
        v-if="!whatsAppAgent?.agent.active"
        size="small"
        type="primary"
        plain
        @click="openDialog('setAsActive', whatsAppAgent?.agent as WhatsAppAgent)"
      >
        <PersonPasskeyIcon size="20px" />   {{ $t('users.user_card.activate_user_title') }}
      </ElButton>
      <LlmLink :to="`/admin/whatsapp-agents/${whatsAppAgent?.agent?.id}/edit`">
        <template #default>
          <ElButton size="small">
            <EditIcon size="20px" />  {{ $t('agents.buttons.edit') }}
          </ElButton>
        </template>
      </LlmLink>
    </div>
  </div>

  <ElTabs
    v-model="activeTab"
    class="whatsapp-agent-details-tabs"
    data-testid="bo-whatsapp-agent-details-tabs"
  >
    <ElTabPane
      v-for="tab in tabOptions"
      :key="tab.name"
      :label="tab.label"
      :name="tab.name"
    >
      <template #label>
        <div class="custom-tab-label-wrapper">
          <component :is="tab.icon" size="22px" />
          <span>{{ tab.label }}</span>
        </div>
      </template>
      <div
        v-if="activeTab === tab.name"
        v-motion-slide-bottom
        :duration="400"
      >
        <component
          :is="tab.component"
          v-if="activeTab === tab.name"

          :whats-app-agent="whatsAppAgentData"
          @refresh-whats-app-agent="emits('refreshWhatsAppAgent')"
        />
      </div>
    </ElTabPane>
  </ElTabs>

  <ElDialog
    v-model="dialog.isOpened"
    destroy-on-close
    align-center
    class="barrage-dialog--small"
    :close-on-click-modal="false"
    :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
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
      <ElCard class="is-primary">
        <WhatsAppAgentProfileOverview :whats-app-agent="whatsAppAgentData" />
      </ElCard>
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
.whatsapp-agent-details-hero-section {
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

  & .whatsapp-agent-details-actions-wrapper {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
}

.whatsapp-agent-details-tabs {
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

.whatsapp-agent-tags-wrapper {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding-top: 8px;
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
  .whatsapp-agent-details-hero-section {
    .profile-avatar-wrapper {
      .agent-icon {
        color: var(--color-primary-0);
      }
    }
  }

  & .whatsapp-agent-details-custom-label {
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
