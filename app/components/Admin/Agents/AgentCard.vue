<script lang="ts" setup>
// IMPORTS
import type { SingleAgent } from '~/types/agent'

import { useAgentStore } from '~/stores/agents'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import EyeIcon from '~/assets/icons/svg/eye.svg'
import AgentIcon from '~/assets/icons/svg/chat-agent.svg'
// PROPS
const props = defineProps<{
  singleAgent: SingleAgent | null
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
    id: props.singleAgent?.id,
    name: props.singleAgent?.name || t('agents.agent_card.unknown_agentname'),
    context: props.singleAgent?.context || t('agents.agent_card.unknown_agentcontext'),
    status: props.singleAgent?.active ? t('agents.agent_card.active_status') : t('agents.agent_card.inactive_status'),
    statusType: props.singleAgent?.active ? StatusType.Success : StatusType.Danger,
    createdAt: props.singleAgent?.createdAt || t('agents.agent_card.created_at'),
    model: props.singleAgent?.model || '-',
    llmProvider: props.singleAgent?.llmProvider || '-',
    embeddingModel: props.singleAgent?.embeddingModel || '-',
    temperature: props.singleAgent?.temperature || '-',
  }
})

const editClick = (): void => {
  agentStore.setEditMode(true)

  router.push(`/admin/agents/${props.singleAgent?.id}`)
}

const redirectToAgentDetails = () => {
  return router.push(`/admin/agents/${props.singleAgent?.id}`)
}
</script>

<template>
  <div class="agent-card grid">
    <div class="agent-name-type-wrapper" @click="redirectToAgentDetails()">
      <AgentIcon size="36" />
      <div class="agent-name-wrapper">
        <p class="agent-name">
          {{ agentData.name }}
        </p>
        <span class="agent-provider">{{ agentData.llmProvider }}</span>
      </div>
    </div>
    <LabelDescriptionItem
      :label="t('agents.labels.model')"
      :description="agentData.model"
      size="small"
      class="agent-model"
    />
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

      <LabelDescriptionItem
        :label="t('agents.labels.temperature')"
        :description="agentData?.temperature.toString()"
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
    grid-column: span 3;
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
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .agent-name {
        margin: 0;
        font-size: var(--font-size-fluid-2);
        line-height: normal;
        font-weight: var(--font-weight-bold);
        color: var(--color-primary-900);
      }
      & .agent-provider {
        margin: 0;
        line-height: normal;
        font-size: var(--font-size-fluid-1);
        color: var(--color-primary-800);
      }
    }
  }
  &.agent-model {
    grid-column: 4/6;
  }

  & .agent-informations {
    grid-column: 6/11;
    display: flex;
    justify-content: space-around;
    width: 100%;
    align-items: center;
  }
  & .agent-actions {
    grid-column: 11/-1;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
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
      & .agent-name {
        color: var(--color-primary-0);
      }
      & .agent-provider {
        color: var(--color-primary-100);
      }
    }
  }
}
</style>
