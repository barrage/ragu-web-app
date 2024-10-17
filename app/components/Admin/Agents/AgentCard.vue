<script lang="ts" setup>
// IMPORTS
import type { Agent } from '~/types/agent'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import { useAgentStore } from '~/stores/agents'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'

// PROPS
const props = defineProps<{
  agent: Agent | null
}>()

// CONSTANTS
const agentStore = useAgentStore()
const { t } = useI18n()
const localePath = useLocalePath()

// STATE
const agentToDeleteId = ref<number | string | null >(null)
const isDeleteModalVisible = ref(false)

// API CALLS
const { execute: deleteExecute, error: deleteError, status: deleteStatus } = await useAsyncData(() => agentStore.DELETE_DeleteAgent(agentToDeleteId.value as number), {

  immediate: false,
})

enum StatusType {
  Primary = 'primary',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Danger = 'danger',
}

// HELPERS
const agentData = computed(() => {
  return {
    id: props.agent?.id,
    name: props.agent?.name || t('agents.agent_card.unknown_agentname'),
    context: props.agent?.context || t('agents.agent_card.unknown_agentcontext'),
    status: props.agent?.active ? t('agents.agent_card.active_status') : t('users.agent_card.inactive_status'),
    statusType: props.agent?.active ? StatusType.Success : StatusType.Danger,
    createdAt: props.agent?.createdAt || t('agents.agent_card.created_at'),
  }
})

const editClick = (agent: Agent | null): void => {
  if (!agent) {
    return
  }
  agentStore.setEditMode(true)

  navigateTo({ path: localePath(`/admin/agents/${agent?.id}`) })
}

const confirmDelete = async (agent: Agent | null | undefined): Promise<void> => {
  if (!agent || !agent.id) {
    ElNotification({
      title: 'Error',
      message: t('agents.notifications.invalid_agent'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
    return
  }
  agentToDeleteId.value = agent.id

  if (agentToDeleteId.value !== null) {
    await deleteExecute()
    if (deleteStatus.value === 'success') {
      ElNotification({
        title: t('agents.notifications.delete_title'),
        message: t('agents.notifications.delete_message', { name: props?.agent?.name }),
        type: 'success',
        customClass: 'success',
        duration: 2500,
      })
    }

    agentToDeleteId.value = null
  }
  else {
    ElNotification({
      title: 'Agent se nafufurio',
      message: t('agents.notifications.invalid_agent'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
  }
}

const openDeleteAgentModal = () => {
  isDeleteModalVisible.value = true
}

// ERROR HANDLERS
errorHandler(deleteError)
</script>

<template>
  <div class="agent-card">
    <LabelDescriptionItem
      :label="t('agents.labels.name')"
      size="small"
      :description="agentData?.name"
      class="agent-name"
    />

    <LabelDescriptionItem
      :label="t('agents.labels.status')"
      size="small"
      :description="agentData?.status"
    >
      <template #customDescription>
        <el-tag :type="agentData.statusType" size="small">
          <span class="status-dot" />  {{ agentData?.status }}
        </el-tag>
      </template>
    </LabelDescriptionItem>
    <LabelDescriptionItem
      :label="t('agents.labels.created_at')"
      :description="agentData.createdAt"
      size="small"
    />
    <LabelDescriptionItem
      :label="t('agents.labels.context')"
      :description="agentData?.context"
      size="small"
    />
    <div class="action-links">
      <ElTooltip
        :content="t('agents.agent_card.edit_agent')"
        :enterable="false"
        placement="top"
      >
        <ElButton
          type="primary"
          plain
          @click="editClick(agent)"
        >
          <EditIcon />
        </ElButton>
      </ElTooltip>
      <ElTooltip
        :content="t('agents.agent_card.delete_agent')"
        :enterable="false"
        placement="top"
      >
        <ElButton
          type="danger"
          plain
          :loading="deleteStatus === 'pending'"
          @click.stop
          @click="openDeleteAgentModal"
        >
          <DeleteIcon />
        </ElButton>
      </ElTooltip>
    </div>
  </div>
  <ElDialog
    v-model="isDeleteModalVisible"
    align-center
    class="barrage-dialog--small"
    :close-icon="CloseCircleIcon"
  >
    <template #header>
      <h5>  {{ t('agents.titles.deleteTitle') }} </h5>
    </template>
    <p> {{ t('agents.titles.deleteDescription') }}</p>
    <template #footer>
      <el-button @click="isDeleteModalVisible = false">
        {{ t('agents.buttons.cancel') }}
      </el-button>
      <el-button
        type="primary"
        :loading="deleteStatus === 'pending'"
        @click.stop="confirmDelete(agent)"
      >
        {{ t('agents.buttons.delete') }}
      </el-button>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.agent-card {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  border: 0.5px solid var(--color-primary-300);
  background: var(--color-primary-100);
  box-shadow: 0 0.2rem 0.3rem var(--color-primary-200);
  border-radius: 16px;
  padding: 1rem;
}

.action-links {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: end;

  button {
    font-size: var(--font-size-fluid-3);
    line-height: normal;
  }
}

.agent-name {
  grid-column: span 2;
}
.dark {
  .agent-card {
    border: 0.5px solid var(--color-primary-500);
    background: var(--color-primary-800);
    box-shadow: 0 0.25rem 0.5rem var(--color-primary-800);
  }
  .agentname-title-wrapper {
    color: var(--color-primary-0);
    & .agentname {
      color: var(--color-primary-0);
    }
  }
}
</style>
