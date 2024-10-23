<script lang="ts" setup>
// IMPORTS
import type { Agent } from '~/types/agent'

import { useAgentStore } from '~/stores/agents'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import EyeIcon from '~/assets/icons/svg/eye.svg'

// PROPS
const props = defineProps<{
  agent: Agent | null
}>()

// CONSTANTS
const agentStore = useAgentStore()
const { t } = useI18n()
const router = useRouter()

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
    status: props.agent?.active ? t('agents.agent_card.active_status') : t('agents.agent_card.inactive_status'),
    statusType: props.agent?.active ? StatusType.Success : StatusType.Danger,
    createdAt: props.agent?.createdAt || t('agents.agent_card.created_at'),
  }
})

const editClick = (): void => {
  agentStore.setEditMode(true)

  router.push(`/admin/agents/${props.agent?.id}`)
}

const redirectToAgentDetails = () => {
  return router.push(`/admin/agents/${props.agent?.id}`)
}
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
        :content="t('agents.agent_card.view_more')"
        :enterable="false"
        placement="top"
      >
        <el-button
          plain
          type="primary"
          @click="redirectToAgentDetails()"
        >
          <EyeIcon />
        </el-button>
      </ElTooltip>
      <ElTooltip
        :content="t('agents.agent_card.edit_agent')"
        :enterable="false"
        placement="top"
      >
        <ElButton
          type="primary"
          plain
          @click="editClick"
        >
          <EditIcon />
        </ElButton>
      </ElTooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.agent-card {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  border: 0.5px solid var(--color-primary-300);
  background: var(--color-primary-0);
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
    background: var(--color-primary-900);
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
