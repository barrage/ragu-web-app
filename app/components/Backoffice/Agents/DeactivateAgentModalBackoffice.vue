<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { Agent, Agents } from '~/types/agent'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'

// PROPS & EMITS

const props = defineProps<{
  selectedAgent: Agents | Agent | null | undefined

}>()

const emits = defineEmits<Emits>()

interface Emits {
  (event: 'agentDeactivated'): void
}

// CONSTANTS & STATES

const { t } = useI18n()
const { $api } = useNuxtApp()
const isOpen = defineModel<boolean>()

// API CALLS

const { execute: deactivateAgent, error, status: deactivateAgentStatus } = await useAsyncData(() => $api.agent.PutDeactivateAgent(props.selectedAgent!.agent.id), { immediate: false })

// FUNCTIONS

const closeModal = () => {
  isOpen.value = false
}

const submitDeactivateAgent = async () => {
  if (props.selectedAgent?.agent?.id) {
    await deactivateAgent()

    if (error.value) {
      ElNotification({
        title: t('agents.deactivate_agent.notifications.error_title'),
        message: t('agents.deactivate_agent.notifications.error_description'),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
    else {
      emits('agentDeactivated')
      closeModal()
      ElNotification({
        title: t('agents.deactivate_agent.notifications.success_title'),
        message: t('agents.deactivate_agent.notifications.success_description'),
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
      :close-icon="CloseCircleIcon"
      @close="closeModal"
    >
      <template #header>
        <div class="deactivate-agent-modal-header">
          <PersonLockIcon size="42px" />
          <h5>{{ $t('agents.deactivate_agent.title') }}</h5>
        </div>
      </template>
      <div class="deactivate-agent-modal-body">
        <p>
          {{ $t('agents.deactivate_agent.description') }}
        </p>
        <el-card class="is-primary">
          <AgentProfileOverview :agent="props.selectedAgent" />
        </el-card>
      </div>

      <template #footer>
        <el-button
          type="primary"
          data-testid="close-deactivate-agent-modal-button"
          @click="closeModal()"
        >
          {{ $t('agents.deactivate_agent.cancel') }}
        </el-button>
        <el-button
          data-testid="confirm-deactivate-agent-modal-button"
          :disabled="deactivateAgentStatus === 'pending'"
          type="danger"
          @click="submitDeactivateAgent()"
        >
          {{ $t('agents.deactivate_agent.confirm') }}
        </el-button>
      </template>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.deactivate-agent-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.deactivate-agent-modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
