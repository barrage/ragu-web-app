<script lang="ts" setup>
import type { EvaluationMessage } from '~/types/agent'
import PersonFeedbackIcon from '~/assets/icons/svg/person_feedback.svg'
import LikeIcon from '~/assets/icons/svg/like.svg'
import DislikeIcon from '~/assets/icons/svg/dislike.svg'
import ChatIcon from '~/assets/icons/svg/chat-icon.svg'

const props = defineProps<{
  evaluation: EvaluationMessage
}>()

const emits = defineEmits<Emits>()
interface Emits {
  (event: 'openEvaluationDetails', evaluation: EvaluationMessage): void
}

const { t } = useI18n()

const evaluationData = computed(() => {
  return {
    chatId: props.evaluation?.chatId || '-',
    id: props.evaluation?.id || '-',
    configId: props.evaluation?.id || '-',
    agentId: props.evaluation?.id || '-',
    content: props.evaluation?.content || t('agents.agent_card.unknown_agentname'),
    sender: props.evaluation?.sender || '',
    evaluation: props.evaluation?.evaluation,
    evaluationText: props.evaluation?.evaluation ? t('agents.descriptions.evaluation_positive') : t('agents.descriptions.evaluation_negative'),
    feedback: props.evaluation?.evaluation || t('agents.agent_card.unknown_agentcontext'),
    createdAt: props.evaluation?.createdAt ? formatDate(props.evaluation.createdAt, 'DD/MM/YYYY HH:MM:ss') : t('agents.agent_card.created_at'),
    updatedAt: props.evaluation?.updatedAt ? formatDate(props.evaluation.updatedAt, 'DD/MM/YYYY HH:MM:ss') : t('agents.agent_card.created_at'),
  }
})
</script>

<template>
  <el-card class="agent-evaluation-card is-primary">
    <div class="agent-evaluation-card-body">
      <LikeIcon v-if="evaluationData.evaluation" size="36px" />
      <DislikeIcon v-else size="36px" />

      <LabelDescriptionItem
        :label="t('agents.labels.evaluation')"
        :description="evaluationData.evaluationText"
        size="small"
        class="agent-model"
      />
      <LabelDescriptionItem
        :label="t('agents.labels.created_at')"
        :description="evaluationData.createdAt"
        size="small"
      />
      <LabelDescriptionItem
        :label="t('agents.labels.updated_at')"
        :description="evaluationData.updatedAt"
        size="small"
      />

      <div class="agent-actions">
        <LlmTooltip :content="t('agents.tooltips.open_chat_details')">
          <LlmLink
            :to="`/admin/chats/${evaluationData?.chatId}`"
            type="plainButtonPrimary"
            data-testid="bo-agent-evaluation-card-chat-details-link"
          >
            <ChatIcon size="20px" />
          </LlmLink>
        </LlmTooltip>
        <LlmTooltip :content="t('agents.tooltips.open_evaluation_details')">
          <ElButton
            type="primary"
            data-testid="bo-agent-evaluation-card-open-details-button"
            @click="emits('openEvaluationDetails', props.evaluation)"
          >
            <PersonFeedbackIcon size="20px" />
          </ElButton>
        </LlmTooltip>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.agent-evaluation-card {
  padding-inline: 0.6rem;
  padding-block: 0.8rem;

  & .agent-evaluation-card-body {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    gap: 16px;

    @include viewport-s {
      grid-template-columns: repeat(3, 1fr);
    }

    @include viewport-m {
      grid-template-columns: repeat(5, 1fr);
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
  .agent-evaluation-card {
    & .agent-evaluation-card-body {
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
