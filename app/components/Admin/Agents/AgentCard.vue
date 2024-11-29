<script lang="ts" setup>
// IMPORTS
import type { Agents } from '~/types/agent'
import { StatusType } from '~/types/statusTypes'
import { useAgentStore } from '~/stores/agents'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import EyeIcon from '~/assets/icons/svg/eye.svg'
import AgentIcon from '~/assets/icons/svg/chat-agent.svg'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'


// PROPS
const props = defineProps<{
  singleAgent: Agents | null | undefined
}>()

// CONSTANTS
const agentStore = useAgentStore()
const { t } = useI18n()
const emits = defineEmits<Emits>()

interface Emits {

  (event: 'activate-agent', agent: Agents): void
  (event: 'deactivate-agent', agent: Agents): void
}

// HELPERS
const agentData = computed(() => {
  return {
    id: props.singleAgent?.agent?.id,
    name: props.singleAgent?.agent?.name || t('agents.agent_card.unknown_agentname'),
    context: props.singleAgent?.configuration?.context || t('agents.agent_card.unknown_agentcontext'),
    status: props.singleAgent?.agent?.active ? t('agents.agent_card.active_status') : t('agents.agent_card.inactive_status'),
    statusType: props.singleAgent?.agent?.active ? StatusType.Success : StatusType.Danger,
    createdAt: props.singleAgent?.agent?.createdAt ? formatDate(props.singleAgent?.agent.createdAt, 'MMMM DD, YYYY') : t('agents.agent_card.created_at'),
    model: props.singleAgent?.configuration?.model || '-',
    llmProvider: props.singleAgent?.configuration?.llmProvider || '-',
    embeddingModel: props.singleAgent?.agent?.embeddingModel || '-',
    temperature: props.singleAgent?.configuration?.temperature || '-',
    language: props.singleAgent?.agent?.language || '-',
  }
})

const editClick = (): void => {
  agentStore.setEditMode(true)
}
</script>

<template>
  <el-card class="agent-card is-primary">
    <div class="agent-card-body">
      <LlmLink 
      :to="`/admin/agents/${singleAgent?.agent?.id}`" 
      type="link" 
      class="agent-name-type-wrapper"
    >
        <AgentIcon size="40px" />
        <div class="agent-name-wrapper">
          <p class="agent-name">
            {{ agentData.name }}
          </p>
          <span class="agent-provider">{{ agentData.llmProvider }}</span>
        </div>
      </LlmLink>
      <LabelDescriptionItem
        :label="t('agents.labels.model')"
        :description="agentData.model"
        size="small"
        class="agent-model"
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
          :label="t('agents.labels.language')"
          :description="agentData?.language.toString()"
          size="small"
        />


      <div class="agent-actions">
        <ElTooltip
          :content="t('agents.agent_card.view_more')"
          :enterable="false"
          placement="top"
        >
          <LlmLink
            :to="`/admin/agents/${singleAgent?.agent?.id}`"
            type="plainButtonPrimary"
          >
            <EyeIcon size="20px" />
          </LlmLink>
        </ElTooltip>
        <ElTooltip
          :content="t('agents.agent_card.edit_agent')"
          :enterable="false"
          placement="top"
        >
          <LlmLink
            :to="`/admin/agents/${singleAgent?.agent?.id}`"
            type="plainButtonPrimary"
            @click="editClick"
          >
            <EditIcon size="20px" />
          </LlmLink>
        </ElTooltip>
        <ElTooltip
          v-if="props.singleAgent?.agent.active"
          :content="t('agents.agent_card.deactivate_agent')"
          :enterable="false"
          placement="top"
        >
          <el-button plain @click="emits('deactivate-agent', props.singleAgent)">
            <PersonLockIcon size="20px" />
          </el-button>
        </ElTooltip>
        <ElTooltip
          v-if="!props.singleAgent?.agent.active"
          :content="t('agents.agent_card.activate_agent')"
          :enterable="false"
          placement="top"
        >
          <el-button plain @click="emits('activate-agent', props.singleAgent)">
            <PersonPasskeyIcon size="20px" />
          </el-button>
        </ElTooltip>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.agent-card {
  padding-inline: 0.6rem;
  padding-block: 0.8rem;
  & .agent-card-body {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 16px;
    & .agent-name-type-wrapper {
      grid-column: span 2;
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
    & .label-description-item-container {
      grid-column: span 2;
      @include viewport-s {
        grid-column: span 1;
      }
      @include viewport-ml {
        grid-column: span 1;
      }
    }
  }

  &.agent-model {
    grid-column: 4/6;
  }

 
  & .agent-actions {
    grid-column: span 1;
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
    & .agent-card-body { & .agent-name-type-wrapper {
      color: var(--color-primary-100);
    }
    & .agent-name-wrapper {
      & .agent-name {
        color: var(--color-primary-0);
      }
      & .agent-provider {
        color: var(--color-primary-100);
      }
    }}
   
  }
}
</style>
