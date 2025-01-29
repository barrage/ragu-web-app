<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { WhatsAppAgent } from '~/types/whatsapp'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'

// TYPES

export type DialogType = 'delete' | 'setAsActive'
export interface Dialog {
  isOpen: boolean
  type: DialogType
  whatsAppAgent: WhatsAppAgent
}

// MODELS, PROPS & EMITS

const props = defineProps<{
  dialog: Dialog | null | undefined
}>()
const emits = defineEmits<{
  (event: 'dataChange'): void
}>()
const isOpen = defineModel<boolean>()

// CONSTANTS & STATES

const { t } = useI18n()
const { $api } = useNuxtApp()

// API CALLS

const { execute: setAsActive, error: setAsActiveError, status: setAsActiveStatus } = await useAsyncData(() => $api.whatsApp.BoSetActiveAgent(props.dialog?.whatsAppAgent.id as string), { immediate: false })
const { execute: deleteAgent, error: deleteAgentError, status: deleteAgentStatus } = await useAsyncData(() => $api.whatsApp.BoDeleteWhatsAppAgent(props.dialog?.whatsAppAgent.id as string), { immediate: false })
errorHandler(setAsActiveError)
errorHandler(deleteAgentError)

// FUNCTIONS

const showSuccessNotification = (type: DialogType) => {
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
    emits('dataChange')
    isOpen.value = false
  }
}

const handleDeleteAgent = async () => {
  await deleteAgent()
  if (!setAsActiveError.value) {
    showSuccessNotification('delete')
    emits('dataChange')
    isOpen.value = false
  }
}
</script>

<template>
  <ElDialog
    v-model="isOpen"
    destroy-on-close
    align-center
    class="barrage-dialog--small"
    :close-on-click-modal="false"
    :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
  >
    <template #header>
      <div class="activate-whatsapp-agent-modal-header">
        <PersonLockIcon v-if="dialog?.type === 'delete'" size="42px" />
        <PersonPasskeyIcon v-else size="42px" />
        <h5>{{ dialog?.type === 'delete' ? $t('whatsapp_agents.delete.dialog_title') : $t('whatsapp_agents.set_as_active.dialog_title') }}</h5>
      </div>
    </template>
    <div class="activate-whatsapp-agent-modal-body">
      <p>
        {{ dialog?.type === 'delete' ? $t('whatsapp_agents.delete.dialog_description') : $t('agents.activate_agent.description') }}
      </p>
      <ElCard class="is-primary">
        <WhatsAppAgentProfileOverview :whats-app-agent="dialog?.whatsAppAgent" />
      </ElCard>
    </div>
    <template #footer>
      <ElButton @click="isOpen = false">
        {{ $t('whatsapp_agents.close') }}
      </ElButton>
      <ElButton
        :type="dialog?.type === 'delete' ? 'danger' : 'primary'"
        :loading="setAsActiveStatus === 'pending' || deleteAgentStatus === 'pending' "
        @click="dialog.type === 'delete' ? handleDeleteAgent() : handleSetAsActive()"
      >
        {{ dialog?.type === 'delete' ? $t('whatsapp_agents.delete.label') : $t('agents.activate_agent.title') }}
      </ElButton>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.activate-whatsapp-agent-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.activate-whatsapp-agent-modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
