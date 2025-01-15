<script lang="ts" setup>
import type { WhatsAppAgent } from '~/types/whatsapp'
import { StatusType } from '~/types/statusTypes'
import { useAgentStore } from '~/stores/agents'
import type { Dialog, DialogType } from '~/components/Backoffice/WhatsAppAgents/shared/WhatsAppAgentSetAsActiveAndDelete.vue'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import EyeIcon from '~/assets/icons/svg/eye.svg'
import WhatsAppAgentIcon from '~/assets/icons/svg/whatsapp-chat-agent.svg'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'
import InfoIcon from '~/assets/icons/svg/info.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'

// PROPS & EMITS

const props = defineProps<{
  singleWhatsAppAgent: WhatsAppAgent | null | undefined
}>()
const emits = defineEmits<{
  (event: 'refreshWhatsAppAgents'): void
}>()

// CONSTANTS

const whatsAppStore = useWhatsAppStore()
const { t } = useI18n()
const dialog = ref<Dialog>({
  isOpen: false,
  type: undefined,
  whatsAppAgent: undefined,
})

// HELPERS
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

const editClick = () => {
  whatsAppStore.setEditMode(true)
}

const openDialog = (type: DialogType, whatsAppAgent: WhatsAppAgent) => {
  dialog.value = {
    isOpen: true,
    type,
    whatsAppAgent
  }
}
</script>

<template>
  <ElCard class="whatsapp-agent-card is-primary">
    <div class="whatsapp-agent-card-body">
      <LlmLink 
      :to="`/admin/whatsapp-agents/${singleWhatsAppAgent?.id}`" 
      type="link" 
      class="whatsapp-agent-name-type-wrapper"
    >
        <WhatsAppAgentIcon size="40px" />
        <div class="whatsapp-agent-name-wrapper">
          <p class="whatsapp-agent-name">
            {{ agentData.name }}
          </p>
          <span class="whatsapp-agent-provider">{{ agentData.llmProvider }}</span>
        </div>
      </LlmLink>
      <LabelDescriptionItem
        :label="t('agents.labels.model')"
        :description="agentData.model"
        size="small"
        class="whatsapp-agent-model"
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


      <div class="whatsapp-agent-actions">
        <LlmTooltip :content="$t('agents.agent_card.view_more')">
          <LlmLink
            :to="`/admin/whatsapp-agents/${singleWhatsAppAgent?.id}`"
            type="plainButtonPrimary"
          >
            <EyeIcon size="20px" />
          </LlmLink>
        </LlmTooltip>
        <LlmTooltip :content="$t('agents.agent_card.edit_agent')">
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
          trigger="hover"
        >
          <ElButton
            v-if="!singleWhatsAppAgent?.active"
            @click="openDialog('setAsActive', singleWhatsAppAgent)"
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
          :content="agentData.statusType === 'success' ? $t('whatsapp_agents.delete.active_agent_tooltip') : $t('whatsapp_agents.delete.label')"
        >
          <ElButton
            :type="agentData.statusType === 'success' ? undefined : 'danger'"
            class="delete-action"
            :disabled="agentData.statusType === 'success'"
            @click="openDialog('delete', singleWhatsAppAgent)"
          >
            <DeleteIcon size="20px" />
          </ElButton>
        </LlmTooltip>
      </div>
    </div>
  </ElCard>

  <WhatsAppAgentSetAsActiveAndDelete
    v-model="dialog.isOpen"
    :dialog="dialog"
    @data-change="emits('refreshWhatsAppAgents')"
  />
</template>

<style lang="scss" scoped>
.whatsapp-agent-card {
  padding-inline: 0.6rem;
  padding-block: 0.8rem;
  & .whatsapp-agent-card-body {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    @include viewport-s {
      grid-template-columns: repeat(3, 1fr);
    }
    @include viewport-m {
      grid-template-columns: repeat(6, 1fr);
    }
    
    @include viewport-ml {
      grid-template-columns: repeat(7, 1fr);
    }
    & .whatsapp-agent-name-type-wrapper {
      grid-column: span 2;
      align-items: center;
      text-overflow: ellipsis;
      display: flex;
      min-width: fit-content;
      gap: 6px;
      color: var(--color-primary-800);

      & svg {
        flex-shrink: 0;
      }

      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }

      & .whatsapp-agent-name-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .whatsapp-agent-name {
          margin: 0;
          font-size: var(--font-size-fluid-2);
          line-height: normal;
          font-weight: var(--font-weight-semibold);
          color: var(--color-primary-900);
        }
        & .whatsapp-agent-provider {
          margin: 0;
          line-height: normal;
          font-size: var(--font-size-fluid-1);
          color: var(--color-primary-800);
        }
      }
    }

  }

  &.whatsapp-agent-model {
    grid-column: 4/6;
  }

 
  & .whatsapp-agent-actions {
    grid-column: span 1;
    display: flex;
    gap: 12px;
    justify-content: flex-start;

    & .delete-action {
      margin-left: 2rem;
    }

    @include viewport-m {
      justify-content: flex-end;
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
  .whatsapp-agent-card {
    & .whatsapp-agent-card-body { & .whatsapp-agent-name-type-wrapper {
      color: var(--color-primary-100);
    }
    & .whatsapp-agent-name-wrapper {
      & .whatsapp-agent-name {
        color: var(--color-primary-0);
      }
      & .whatsapp-agent-provider {
        color: var(--color-primary-100);
      }
    }}
   
  }
}
</style>
