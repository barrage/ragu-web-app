<script lang="ts" setup>
import type { Configuration } from '~/types/agent'
import EyeIcon from '~/assets/icons/svg/eye.svg'
import PersonSyncIcon from '~/assets/icons/svg/person-sync.svg'

const props = defineProps<{
  agentConfiguration: Configuration
}>()

const emits = defineEmits<Emits>()
interface Emits {
  (event: 'rollbackAgentVersion', agent: Configuration): void
  (event: 'openAgentDetails', agent: Configuration): void
}

const { t } = useI18n()

const agentVersionData = computed(() => {
  return {
    configId: props.agentConfiguration?.id || '-',
    agentId: props.agentConfiguration?.id || '-',
    agentInstructions: props.agentConfiguration?.agentInstructions || t('agents.agent_card.unknown_agentname'),
    context: props.agentConfiguration?.context || t('agents.agent_card.unknown_agentcontext'),
    createdAt: props.agentConfiguration?.createdAt ? formatDate(props.agentConfiguration.createdAt, 'DD/MM/YYYY HH:MM:ss') : t('agents.agent_card.created_at'),
    updatedAt: props.agentConfiguration?.updatedAt ? formatDate(props.agentConfiguration.updatedAt, 'DD/MM/YYYY HH:MM:ss') : t('agents.agent_card.created_at'),
    llmProvider: props.agentConfiguration?.llmProvider || '-',
    model: props.agentConfiguration?.model || '-',
    temperature: props.agentConfiguration?.temperature || '-',
    version: props.agentConfiguration?.version || '-',
  }
})
</script>

<template>
  <el-card class="agent-version-card is-primary">
    <div class="agent-version-card-body">
      <div>
        <h6>v.{{ agentVersionData.version }}</h6>
      </div>

      <LabelDescriptionItem
        :label="t('agents.labels.llmProvider')"
        :description="agentVersionData.llmProvider"
        size="small"
        class="agent-model"
      />
      <LabelDescriptionItem
        :label="t('agents.labels.model')"
        :description="agentVersionData.model"
        size="small"
        class="agent-model"
      />
      <LabelDescriptionItem
        :label="t('agents.labels.temperature')"
        :description="agentVersionData.temperature"
        size="small"
        class="agent-model"
      />

      <LabelDescriptionItem
        :label="t('agents.labels.created_at')"
        :description="agentVersionData.createdAt"
        size="small"
      />
      <LabelDescriptionItem
        :label="t('agents.labels.updated_at')"
        :description="agentVersionData.updatedAt"
        size="small"
      />

      <div class="agent-actions">
        <LlmTooltip :content="t('agents.tooltips.version_details')">
          <ElButton
            plain
            type="primary"
            data-testid="bo-agent-version-card-rollback-button"
            class="delete-action"
            @click="emits('openAgentDetails', props.agentConfiguration)"
          >
            <EyeIcon size="20px" />
          </ElButton>
        </LlmTooltip>
        <LlmTooltip :content="t('agents.tooltips.rollback_version')">
          <ElButton
            plain
            type="primary"
            data-testid="bo-agent-version-card-rollback-button"
            class="delete-action"
            @click="emits('rollbackAgentVersion', props.agentConfiguration)"
          >
            <PersonSyncIcon size="20px" />
          </ElButton>
        </LlmTooltip>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.agent-version-card {
  padding-inline: 0.6rem;
  padding-block: 0.8rem;

  & .agent-version-card-body {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
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
  }

  &.agent-model {
    grid-column: 4/6;
  }

  & .agent-actions {
    grid-column: span 1;
    display: flex;
    gap: 12px;
    justify-content: flex-start;

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
  .agent-version-card {
    & .agent-version-card-body {
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
