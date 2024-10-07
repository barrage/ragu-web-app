<script lang="ts" setup>
// IMPORTS
import type { Agent } from '~/types/agent'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import { useAgentStore } from '~/stores/agents'

// PROPS
const props = defineProps<{
  agent: Agent | null
}>()

// CONSTANTS
const agentStore = useAgentStore()
const { t } = useI18n()
const localePath = useLocalePath()

// STATE
const agentToDeleteId = ref<number | null>(null)
const isDeleteModalVisible = ref(false)

// API CALLS
const { execute: deleteExecute, error: deleteError, status: deleteStatus } = await useAsyncData(() => agentStore.DeleteAgent(agentToDeleteId.value as number), {

  immediate: false,
})

// HELPERS
const agentData = computed(() => {
  return {
    id: props.agent?.id,
    name: props.agent?.name || 'Unknown name',
    context: props.agent?.context || 'Missing agent context',
    updatedAt: props.agent?.updatedAt || 'Unknown date',
    createdAt: props.agent?.createdAt || 'Unknown date',
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
      message: 'nistas od agenta',
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
      label="Agent Name"
      :description="agentData?.name"
    />
    <LabelDescriptionItem
      label="Updated at"
      :description="agentData.updatedAt "
    />
    <LabelDescriptionItem
      label="Created at"
      :description="agentData.createdAt"
    />
    <LabelDescriptionItem
      label="Context"
      :description="agentData?.context"
    />

    <div class="action-links">
      <ElButton
        type="primary"
        @click="editClick(agent)"
      >
        {{ t('agents.buttons.edit') }}
      </ElButton>
      <ElButton
        type="primary"
        :loading="deleteStatus === 'pending'"
        @click.stop
        @click=" openDeleteAgentModal"
      >
        {{ t('agents.buttons.delete') }}
      </ElButton>
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
  grid-template-columns: repeat(5, 1fr);
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
    color: var(--color-primary-700);
  }
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

  .action-links {
    button {
      color: var(--color-primary-100);
    }
  }
}
</style>
