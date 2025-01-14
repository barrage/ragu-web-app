<script lang="ts" setup>
import type { WhatsAppAgent } from '~/types/whatsapp'
import { StatusType } from '~/types/statusTypes'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import EyeIcon from '~/assets/icons/svg/eye.svg'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import WhatsAppAgentIcon from '~/assets/icons/svg/whatsapp-chat-agent.svg'
import InfoIcon from '~/assets/icons/svg/info.svg'

// PROPS & EMITS

const props = defineProps<{
  singleWhatsAppAgent: WhatsAppAgent
}>()
const emits = defineEmits<Emits>()

interface Emits {
  (event: 'refreshAgents'): void
  (event: 'openDeleteDialog', agent: WhatsAppAgent): void
  (event: 'openSetAsActiveDialog', agent: WhatsAppAgent): void
}

// CONSTANTS & STATES

const whatsAppStore = useWhatsAppStore()
const { t } = useI18n()
const agentData = computed(() => {
  return {
    id: props.singleWhatsAppAgent?.id,
    name: props.singleWhatsAppAgent?.name || t('agents.agent_card.unknown_agentname'),
    context: props.singleWhatsAppAgent?.context || t('agents.agent_card.unknown_agentcontext'),
    status: props.singleWhatsAppAgent?.active ? t('agents.agent_card.active_status') : t('agents.agent_card.inactive_status'),
    statusType: props.singleWhatsAppAgent?.active ? StatusType.Success : StatusType.Danger,
    createdAt: props.singleWhatsAppAgent?.createdAt ? formatDate(props.singleWhatsAppAgent.createdAt, 'MMMM DD, YYYY') : t('agents.agent_card.created_at'),
    model: props.singleWhatsAppAgent?.model || '-',
    llmProvider: props.singleWhatsAppAgent?.llmProvider || '-',
    embeddingModel: props.singleWhatsAppAgent?.embeddingModel || '-',
    temperature: props.singleWhatsAppAgent?.temperature || '-',
    language: props.singleWhatsAppAgent?.language || '-',
  }
})

// FUNCTIONS

const editClick = () => {
  whatsAppStore.setEditMode(true)
}
</script>

<template>
  <ElCard class="agent-card is-primary">
    <div class="agent-card-body">
      <LlmLink
        :to="`/admin/whatsapp-agents/${singleWhatsAppAgent?.id}`"
        type="link"
        class="agent-name-type-wrapper"
      >
        <WhatsAppAgentIcon size="40px" />
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
          <ElTag :type="agentData.statusType" size="small">
            <span class="status-dot" />  {{ agentData?.status }}
          </ElTag>
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
        <LlmTooltip :content="t('agents.agent_card.view_more')">
          <LlmLink
            :to="`/admin/whatsapp-agents/${singleWhatsAppAgent?.id}`"
            type="plainButtonPrimary"
          >
            <EyeIcon size="20px" />
          </LlmLink>
        </LlmTooltip>
        <LlmTooltip :content="t('agents.agent_card.edit_agent')">
          <LlmLink
            :to="`/admin/whatsapp-agents/${singleWhatsAppAgent?.id}`"
            type="plainButtonPrimary"
            @click="editClick"
          >
            <EditIcon size="20px" />
          </LlmLink>
        </LlmTooltip>
        <LlmTooltip
          :content="agentData.statusType === 'danger' ? $t('whatsapp_agents.set_as_active.label') : $t('whatsapp_agents.set_as_active.already_active_message')"
        >
          <ElButton
            v-if="agentData.statusType === 'danger'"
            plain
            @click="emits('openSetAsActiveDialog', singleWhatsAppAgent)"
          >
            <PersonPasskeyIcon size="20px" />
          </ElButton>
          <ElButton
            v-else

            :disabled="agentData.statusType === 'success'"
          >
            <InfoIcon size="20px" />
          </ElButton>
        </LlmTooltip>
        <LlmTooltip
          :content="agentData.status === 'Active' ? $t('whatsapp_agents.delete.active_agent_tooltip') : $t('whatsapp_agents.delete.label')"
        >
          <ElButton
            plain
            type="danger"
            class="delete-action"
            :disabled="agentData.status === 'Active'"
            @click="emits('openDeleteDialog', singleWhatsAppAgent)"
          >
            <DeleteIcon size="20px" />
          </ElButton>
        </LlmTooltip>
      </div>
    </div>
  </ElCard>
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
          font-weight: var(--font-weight-semibold);
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

    .set-as-active-icon {
      color: var(--color-green-400);
    }

    .delete-action {
      margin-left: 2rem;
    }
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
    & .agent-card-body {
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
    .set-as-active-icon {
      color: var(--color-green-700);
    }
  }
}
</style>
