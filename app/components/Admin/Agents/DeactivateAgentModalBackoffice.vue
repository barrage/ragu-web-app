<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { Agent, Agents } from '~/types/agent'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'

// PROPS & EMITS

const props = defineProps<{
  selectedAgent: Agents | Agent | null | undefined
  isOpen: boolean
}>()

const emits = defineEmits<Emits>()

interface Emits {
  (event: 'closeModal'): void
  (event: 'agentDeactivated'): void
}

// CONSTANTS & STATES

const { t } = useI18n()
const deactivateAgentModalVisible = ref(props.isOpen)
const { $api } = useNuxtApp()

// API CALLS

const { execute: deactivateAgent, error } = await useAsyncData(() => $api.agent.PutDeactivateAgent(props.selectedAgent!.agent.id), { immediate: false })

// FUNCTIONS

const submitDeactivateAgent = async () => {
  if (props.selectedAgent?.agent?.id) {
    await deactivateAgent()
    deactivateAgentModalVisible.value = false
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

const closeModal = () => {
  deactivateAgentModalVisible.value = false
  emits('closeModal')
}

// WATCHERS

watch(() => props.isOpen, (newVal) => {
  deactivateAgentModalVisible.value = newVal
})
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="deactivateAgentModalVisible"
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
