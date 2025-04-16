<script lang="ts" setup>
// IMPORTS
import type { Agents } from '~/types/agent'
import { StatusType } from '~/types/statusTypes'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import EyeIcon from '~/assets/icons/svg/eye.svg'
import PersonLockIcon from '~/assets/icons/svg/person-lock.svg'
import PersonPasskeyIcon from '~/assets/icons/svg/person-passkey.svg'
import WhatAppAgent from '~/assets/icons/svg/whatsapp-agents.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
// PROPS
const props = defineProps<{
  singleAgent: Agents | null | undefined
}>()

const emits = defineEmits<Emits>()
// CONSTANTS
const { t } = useI18n()
interface Emits {
  (event: 'deleteAgent', agent: Agents): void
  (event: 'activateAgent', agent: Agents): void
  (event: 'deactivateAgent', agent: Agents): void
}

// HELPERS
const agentData = computed(() => {
  return {
    id: props.singleAgent?.agent?.id,
    name: props.singleAgent?.agent?.name || t('agents.agent_card.unknown_agentname'),
    context: props.singleAgent?.configuration?.context || t('agents.agent_card.unknown_agentcontext'),
    status: props.singleAgent?.agent?.active ? t('agents.agent_card.active_status') : t('agents.agent_card.inactive_status'),
    statusType: props.singleAgent?.agent?.active ? StatusType.Success : StatusType.Danger,
    createdAt: props.singleAgent?.agent?.createdAt ? useRelativeDate(props.singleAgent?.agent.createdAt) : t('agents.agent_card.created_at'),
    model: props.singleAgent?.configuration?.model || '-',
    llmProvider: props.singleAgent?.configuration?.llmProvider || '-',
    embeddingModel: props.singleAgent?.agent?.embeddingModel || '-',
    temperature: props.singleAgent?.configuration?.temperature || '-',
    language: props.singleAgent?.agent?.language || '-',
    avatar: props.singleAgent?.agent?.avatar || undefined,
  }
})
const router = useRouter()
const editClick = (): void => {
  router.push(`/admin/agents/${props.singleAgent?.agent.id}/edit`)
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
        <LlmAvatar
          :avatar="agentData?.avatar"
          :alt="t('agents.agent_avatar')"
          fit="cover"
          default-image="agent"
          :size="40"
        />

        <div class="agent-name-wrapper">
          <p class="agent-name">
            {{ agentData.name }}
          </p>
          <span class="agent-provider">{{ agentData.llmProvider }}</span>
        </div>
        <WhatAppAgent
          v-if="props.singleAgent?.whatsapp"
          size="15px"
          class="whatsapp-agent-icon"
        />
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
            <span class="status-dot" /> {{ agentData?.status }}
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
        <LlmTooltip :content="$t('agents.agent_card.view_more')">
          <LlmLink :to="`/admin/agents/${singleAgent?.agent?.id}`" type="plainButtonPrimary">
            <EyeIcon size="20px" />
          </LlmLink>
        </LlmTooltip>
        <LlmTooltip :content="$t('agents.agent_card.edit_agent')">
          <LlmLink
            :to="`/admin/agents/${singleAgent?.agent?.id}`"
            type="plainButtonPrimary"
            @click="editClick"
          >
            <EditIcon size="20px" />
          </LlmLink>
        </LlmTooltip>
        <LlmTooltip v-if="props.singleAgent?.agent.active" :content="$t('agents.agent_card.deactivate_agent')">
          <el-button plain @click="emits('deactivateAgent', props.singleAgent)">
            <PersonLockIcon size="20px" />
          </el-button>
        </LlmTooltip>
        <LlmTooltip v-if="!props.singleAgent?.agent.active" :content="$t('agents.agent_card.activate_agent')">
          <el-button plain @click="emits('activateAgent', props.singleAgent as Agents)">
            <PersonPasskeyIcon size="20px" />
          </el-button>
        </LlmTooltip>
        <LlmTooltip :content="$t('agents.agent_card.delete_agent')">
          <el-button
            plain
            type="danger"
            class="delete-action"
            @click="emits('deleteAgent', props.singleAgent as Agents)"
          >
            <DeleteIcon size="20px" />
          </el-button>
        </LlmTooltip>
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
    grid-template-columns: 1fr;
    gap: 16px;
    align-items: center;

    @include viewport-xs {
      grid-template-columns: repeat(3, 1fr);
    }

    @include viewport-m {
      grid-template-columns: repeat(6, 1fr);
    }

    @include viewport-ml {
      grid-template-columns: repeat(7, 1fr);
    }

    & .agent-name-type-wrapper {
      grid-column: span 1;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      justify-content: flex-start;
      overflow: hidden;
      color: var(--color-primary-900);

      @include viewport-xs {
        grid-column: span 2;
      }

      & .agent-icon {
        min-width: fit-content;
      }

      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }

      & .agent-name-wrapper {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        justify-content: space-between;
        text-overflow: ellipsis;
        max-width: 100%;
        overflow: hidden;

        .agent-name {
          margin: 0;
          font-size: var(--font-size-fluid-2);
          line-height: normal;
          font-weight: var(--font-weight-semibold);
          color: var(--color-primary-900);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        & .agent-provider {
          margin: 0;
          line-height: normal;
          font-size: var(--font-size-fluid-1);
          color: var(--color-primary-800);
        }
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

.whatsapp-agent-icon {
  margin-top: auto;
}

html.dark {
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
  }
}
</style>
