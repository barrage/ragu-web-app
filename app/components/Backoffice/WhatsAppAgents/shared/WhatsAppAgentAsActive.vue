<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'
import type { Agent } from '~/types/agent'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'

// PROPS & EMITS
const props = defineProps<{
  whatsAppAgent: Agent | null | undefined
  isActive: boolean | null | undefined
}>()
const emits = defineEmits<{
  (event: 'dataChange'): void
}>()
const isOpen = defineModel<boolean>()

// CONSTANTS & STATES
const { t } = useI18n()
const { $api } = useNuxtApp()

const { execute: updateWhatsAppSettings, error: updateError, status: updateStatus } = await useAsyncData(
  () => $api.settings.UpdateAdminSettings({
    updates: !props.isActive
      ? [
          {
            key: 'WHATSAPP_AGENT_ID',
            value: props.whatsAppAgent?.agent?.id || '',
          },
        ]
      : [],
    removals: props.isActive
      ? ['WHATSAPP_AGENT_ID']
      : [],
  }),
  { immediate: false },
)
errorHandler(updateError)

// FUNCTIONS
const showSuccessNotification = () => {
  ElNotification({
    title: t(props.isActive
      ? 'whatsapp_agents.deactivate.success_notification_title'
      : 'whatsapp_agents.set_as_active.success_notification_title',
    ),
    message: t(props.isActive
      ? 'whatsapp_agents.deactivate.success_notification_message'
      : 'whatsapp_agents.set_as_active.success_notification_message',
    ),
    type: 'success',
    customClass: 'success',
    duration: 2500,
  })
}

const handleUpdate = async () => {
  await updateWhatsAppSettings()
  if (!updateError.value) {
    showSuccessNotification()
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
      <div class="whatsapp-agent-modal-header">
        <component
          :is="isActive ? PersonLockIcon : PersonPasskeyIcon"
          size="42px"
        />
        <h5>
          {{ $t(isActive
            ? 'whatsapp_agents.deactivate.dialog_title'
            : 'whatsapp_agents.set_as_active.dialog_title',
          ) }}
        </h5>
      </div>
    </template>
    <div class="whatsapp-agent-modal-body">
      <p>
        {{ $t(isActive
          ? 'whatsapp_agents.deactivate.description'
          : 'whatsapp_agents.set_as_active.description',
        ) }}
      </p>
      <ElCard class="is-primary">
        <AgentProfileOverview :agent="whatsAppAgent" />
      </ElCard>
    </div>
    <template #footer>
      <ElButton @click="isOpen = false">
        {{ $t('whatsapp_agents.close') }}
      </ElButton>
      <ElButton
        :type="isActive ? 'danger' : 'primary'"
        :loading="updateStatus === 'pending'"
        @click="handleUpdate"
      >
        {{ $t(isActive
          ? 'whatsapp_agents.deactivate.action'
          : 'whatsapp_agents.set_as_active.action',
        ) }}
      </ElButton>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.whatsapp-agent-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.whatsapp-agent-modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
