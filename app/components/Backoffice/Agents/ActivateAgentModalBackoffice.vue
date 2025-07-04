<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { Agent, Agents } from '~/types/agent'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'

// PROPS & EMITS

interface Emits {
  (event: 'closeModal'): void
  (event: 'agentActivated'): void
}

const props = defineProps<{
  selectedAgent: Agents | Agent | null | undefined

}>()

const emits = defineEmits<Emits>()
const isOpen = defineModel<boolean>()
// CONSTANTS & STATES

const { t } = useI18n()
const { $api } = useNuxtApp()

const closeModal = () => {
  isOpen.value = false
}

// API CALLS

const { execute: activateAgent, error, status: activateAgentStatus } = await useAsyncData(() => $api.agent.PutActiveAgent(props.selectedAgent!.agent.id), { immediate: false })

// FUNCTIONS

const submitActivateAgent = async () => {
  if (props.selectedAgent?.agent?.id) {
    await activateAgent()

    if (error.value) {
      ElNotification({
        title: t('agents.activate_agent.notifications.error_title'),
        message: t('agents.activate_agent.notifications.error_description'),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
    else {
      emits('agentActivated')
      closeModal()
      ElNotification({
        title: t('agents.activate_agent.notifications.success_title'),
        message: t('agents.activate_agent.notifications.success_description'),
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
          <PersonPasskeyIcon size="42px" />
          <h5>{{ $t('agents.activate_agent.title') }}</h5>
        </div>
      </template>
      <div class="activate-agent-modal-body">
        <p>
          {{ $t('agents.activate_agent.description') }}
        </p>
        <el-card class="is-primary">
          <AgentProfileOverview :agent="props.selectedAgent" />
        </el-card>
      </div>

      <template #footer>
        <el-button
          type="primary"
          data-testid="close-activate-agent-modal-button"
          @click="closeModal()"
        >
          {{ $t('agents.activate_agent.cancel') }}
        </el-button>
        <el-button
          data-testid="confirm-activate-agent-modal-button"
          type="success"
          :disabled="activateAgentStatus === 'pending'"
          @click="submitActivateAgent"
        >
          {{ $t('agents.activate_agent.confirm') }}
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
