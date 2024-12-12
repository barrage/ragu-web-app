<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { WhatsAppAgent } from '~/types/whatsapp'
import type { Pagination } from '~/types/pagination'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'

// TYPES

type DialogType = 'delete' | 'setAsActive'

// PROPS & EMITS

const props = defineProps<{
  agents: WhatsAppAgent[] | null | undefined
  pagination: Pagination
}>()
const emits = defineEmits<{
  (event: 'pageChange', page: number): number
  (event: 'refreshAgents'): void
}>()

// CONSTANTS & STATES

const { $api } = useNuxtApp()
const { t } = useI18n()
const cardClasses = ref<string[]>([])
const dialog = ref<{
  isOpened: boolean
  type: DialogType | undefined
  agent: WhatsAppAgent | undefined
}>({
  isOpened: false,
  type: undefined,
  agent: undefined,
})

// API

const { execute: setAsActive, error: setAsActiveError, status: setAsActiveStatus } = await useAsyncData(() => $api.whatsApp.BoSetActiveAgent(dialog.value.agent!.id), { immediate: false })
const { execute: deleteAgent, error: deleteAgentError, status: deleteAgentStatus } = await useAsyncData(() => $api.whatsApp.BoDeleteWhatsAppAgent(dialog.value.agent!.id), { immediate: false })
errorHandler(setAsActiveError)
errorHandler(deleteAgentError)

// FUNCTIONS

const applyCardClasses = () => {
  cardClasses.value = []
  props.agents?.forEach((_, index) => {
    setTimeout(() => {
      cardClasses.value[index] = 'list-item-visible'
    }, index * 100)
  })
}

const changePage = (page: number) => {
  emits('pageChange', page)
}

const openDialog = (type: DialogType, agent: WhatsAppAgent) => {
  dialog.value = { isOpened: true, type, agent }
}

const closeDialog = () => {
  dialog.value.isOpened = false
  setTimeout(() => dialog.value = { isOpened: false, type: undefined, agent: undefined }, 200)
}

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
    emits('refreshAgents')
    closeDialog()
  }
}

const handleDeleteAgent = async () => {
  await deleteAgent()
  if (!setAsActiveError.value) {
    showSuccessNotification('delete')
    emits('refreshAgents')
    closeDialog()
  }
}

// WATCHERS

watch(
  () => props.agents,
  () => {
    nextTick(applyCardClasses)
  },
  { immediate: true },
)
</script>

<template>
  <div class="agents-list-container">
    <div
      v-for="(agent, index) in props.agents"
      :key="agent.id"
      class="list-item"
      :class="[cardClasses[index]]"
    >
      <WhatsAppAgentCard
        :single-whats-app-agent="agent"
        @refresh-agents="emits('refreshAgents')"
        @open-delete-dialog="agent => openDialog('delete', agent)"
        @open-set-as-active-dialog="agent => openDialog('setAsActive', agent)"
      />
    </div>

    <Pagination
      :current-page="props.pagination.currentPage"
      :page-size="props.pagination.pageSize"
      :total="props.pagination.total"
      @page-change="(page) => changePage(page)"
    />
  </div>

  <ElDialog
    v-model="dialog.isOpened"
    destroy-on-close
    align-center
    class="barrage-dialog--small"
    :close-on-click-modal="false"
    :close-icon="CloseCircleIcon"
    @close="closeDialog"
  >
    <template #header>
      <div class="activate-agent-modal-header">
        <PersonLockIcon v-if="dialog.type === 'delete'" size="42px" />
        <PersonPasskeyIcon v-else size="42px" />
        <h5>{{ dialog.type === 'delete' ? $t('whatsapp_agents.delete.dialog_title') : $t('whatsapp_agents.set_as_active.dialog_title') }}</h5>
      </div>
    </template>
    <div class="activate-agent-modal-body">
      <p>
        {{ dialog.type === 'delete' ? $t('whatsapp_agents.delete.dialog_description') : $t('agents.activate_agent.description') }}
      </p>
      <el-card class="is-primary">
        <WhatsAppAgentProfileOverview :agent="dialog.agent" />
      </el-card>
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
        {{ dialog.type === 'delete' ? $t('whatsapp_agents.delete.label') : $t('agents.activate_agent.title') }}
      </ElButton>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.agents-list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.list-item {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.list-item-visible {
  opacity: 1;
  transform: translateY(0);
}

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
