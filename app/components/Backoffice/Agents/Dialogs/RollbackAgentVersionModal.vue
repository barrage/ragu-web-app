<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { Configuration } from '~/types/agent'
import PersonSyncIcon from '~/assets/icons/svg/person-sync.svg'

const props = defineProps<{
  selectedAgentVersion: Configuration | undefined | null
}>()

const emits = defineEmits<Emits>()
const isOpen = defineModel<boolean>()

const { $api } = useNuxtApp()
const { t } = useI18n()

const closeModal = () => {
  isOpen.value = false
}

interface Emits {
  (event: 'agentVersionRollback', config: Configuration): Configuration
}

const { execute: executeRollbackAgentVersion, error: rollbackAgentVersionError, status: rollbackAgentVersionStatus } = await useAsyncData(() => $api.agent.RollbackAgentVersion(props.selectedAgentVersion!.agentId, props.selectedAgentVersion!.id), {
  immediate: false,
})

const submitRollbackAgentVersion = async () => {
  if (props.selectedAgentVersion?.id) {
    await executeRollbackAgentVersion()
    if (rollbackAgentVersionError.value) {
      ElNotification({
        title: t('agents.notifications.rollback_version_error_title'),
        message: t('agents.notifications.rollback_version_error_description'),
        type: 'error',
        customClass: 'error',
        duration: 3500,
      })
    }
    else {
      emits('agentVersionRollback', props.selectedAgentVersion)
      closeModal()
      ElNotification({
        title: t('agents.notifications.rollback_version_success_title'),
        message: t('agents.notifications.rollback_version_success_description'),
        type: 'success',
        customClass: 'success',
        duration: 3500,
      })
    }
  }
}

const isRollbackAgentVersionLoading = computed(() => {
  return rollbackAgentVersionStatus.value === 'pending'
})
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="isOpen"
      destroy-on-close
      data-testid="bo-rollback-agent-version-dialog"
      align-center
      class="barrage-dialog--small"
      :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
      @close="closeModal"
    >
      <template #header>
        <div class="rollback-agent-version-modal-header">
          <PersonSyncIcon size="42px" />
          <h5>     {{ t('agents.titles.rollback_version_modal') }}</h5>
        </div>
      </template>
      <div class="rollback-agent-version-modal-body">
        <p>
          {{ t('agents.descriptions.rollback_version_modal', { version: props.selectedAgentVersion?.version }) }}
        </p>
      </div>

      <template #footer>
        <el-button
          type="primary"
          data-testid="bo-rollback-agent-version-dialog-cancel-button"
          @click="closeModal()"
        >
          {{ t('agents.buttons.cancel') }}
        </el-button>
        <el-button
          data-testid="bo-rollback-agent-version-dialog-submit-button"
          type="danger"
          :disabled="isRollbackAgentVersionLoading"
          @click="submitRollbackAgentVersion()"
        >
          {{ t('agents.buttons.submit') }}
        </el-button>
      </template>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.rollback-agent-version-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.rollback-agent-version-modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
