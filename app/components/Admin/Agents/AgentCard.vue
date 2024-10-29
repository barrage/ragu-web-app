<script lang="ts" setup>
// IMPORTS
import type { Agent } from '~/types/agent'

import { useAgentStore } from '~/stores/agents'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import EyeIcon from '~/assets/icons/svg/eye.svg'
import AgentIcon from '~/assets/icons/svg/chat-agent.svg'
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
  <div class="agent-card grid">
    <div class="agent-name-type-wrapper" @click="redirectToAgentDetails()">
      <AgentIcon size="36" />
      <div class="agent-name-wrapper">
        <h6>{{ agentData.name }}</h6>
      </div>
    </div>
    <div class="agent-informations">
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
    </div>

    <div class="agent-actions">
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
  border: 0.5px solid var(--color-primary-300);
  background: var(--color-primary-0);
  box-shadow: 0 0.2rem 0.3rem var(--color-primary-100);
  border-radius: 16px;
  padding: 1rem;
  & .agent-name-type-wrapper {
    grid-column: span 5;
    align-items: center;
    text-overflow: ellipsis;
    display: flex;
    min-width: fit-content;
    gap: 6px;
    color: var(--color-primary-800);

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }

    & .agent-name-wrapper {
      h6 {
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-fluid-3);
        color: var(--color-primary-800);
        line-height: normal;
        margin-bottom: 0;
      }
      & span {
        line-height: normal;
        font-size: var(--font-size-fluid-2);
        color: var(--color-primary-700);
      }
    }
  }
  & .agent-informations {
    grid-column: span 5;
    display: flex;
    gap: 42px;
    justify-content: space-around;
    width: 100%;
    align-items: center;
  }
  & .agent-actions {
    grid-column: span 2;
    display: flex;
    gap: 12px;
  }
}

.context {
  &:deep(.description) {
    display: inline-block;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.dark {
  .agent-card {
    border: 0.5px solid var(--color-primary-700);
    background-color: var(--color-primary-900);
    box-shadow: 0px 2px 6px 0px var(--color-primary-800);
    & .agent-name-type-wrapper {
      color: var(--color-primary-100);
    }
    & .agent-name-wrapper {
      h6 {
        color: var(--color-primary-0);
      }
      & span {
        color: var(--color-primary-200);
      }
    }
  }
}
</style>
