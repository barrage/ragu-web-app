<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import DeleteAgentIcon from '~/assets/icons/svg/delete-person.svg'
import type { Agent, Agents } from '~/types/agent'

// PROPS & EMITS
interface Emits {
  (event: 'closeModal'): void
  (event: 'agentDeleted'): void
}

const props = defineProps<{
  selectedAgent: Agents | Agent | null | undefined

}>()
const emits = defineEmits<Emits>()
const isOpen = defineModel<boolean>()
// CONSTANTS & STATES

const { t } = useI18n()
const { $api } = useNuxtApp()

// FUNCTIONS

const closeModal = () => {
  isOpen.value = false
}

const { execute: deleteAgent, error: deleteAgentError, status: deleteAgentStatus } = await useAsyncData(() => $api.agent.DeleteAgent(props.selectedAgent!.agent.id), { immediate: false })

const submitDeleteAgent = async () => {
  if (props.selectedAgent?.agent?.id) {
    await deleteAgent()

    if (deleteAgentError.value) {
      ElNotification({
        title: t('agents.delete_agent.notifications.error_title'),
        message: t('agents.delete_agent.notifications.error_description'),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
    else {
      emits('agentDeleted')
      closeModal()
      ElNotification({
        title: t('agents.delete_agent.notifications.success_title'),
        message: t('agents.delete_agent.notifications.success_description'),
        type: 'success',
        customClass: 'success',
        duration: 2500,
      })
    }
  }
}
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="isOpen"
      destroy-on-close
      align-center
      class="barrage-dialog--small"
      :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
      @close="closeModal"
    >
      <template #header>
        <div class="activate-agent-modal-header">
          <DeleteAgentIcon size="42px" />
          <h5>{{ $t('agents.delete_agent.title') }}</h5>
        </div>
      </template>
      <div class="activate-agent-modal-body">
        <p>
          {{ $t('agents.delete_agent.description') }}
        </p>
        <el-card class="is-primary">
          <AgentProfileOverview :agent="props.selectedAgent?.agent" />
        </el-card>
      </div>

      <template #footer>
        <el-button
          type="primary"
          data-testid="close-activate-agent-modal-button"
          @click="closeModal()"
        >
          {{ $t('agents.delete_agent.cancel') }}
        </el-button>
        <el-button
          data-testid="confirm-activate-agent-modal-button"
          type="success"
          :disabled="deleteAgentStatus === 'pending'"
          @click="submitDeleteAgent"
        >
          {{ $t('agents.delete_agent.confirm') }}
        </el-button>
      </template>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.activate-agent-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.activate-agent-modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
