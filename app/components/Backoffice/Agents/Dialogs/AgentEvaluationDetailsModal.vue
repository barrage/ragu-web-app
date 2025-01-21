<script lang="ts" setup>
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { EvaluationMessage } from '~/types/agent'
import LikeIcon from '~/assets/icons/svg/like.svg'
import DislikeIcon from '~/assets/icons/svg/dislike.svg'

const props = defineProps<{
  evaluationMessage: EvaluationMessage | undefined | null
}>()

const isOpen = defineModel<boolean>()

const { t } = useI18n()

const closeModal = () => {
  isOpen.value = false
}

const evaluationMessageData = computed(() => {
  return {
    createdAt: props.evaluationMessage?.createdAt ? formatDate(props.evaluationMessage.createdAt, 'DD/MM/YYYY HH:MM:ss') : t('agents.agent_card.created_at'),
    updatedAt: props.evaluationMessage?.updatedAt ? formatDate(props.evaluationMessage.updatedAt, 'DD/MM/YYYY HH:MM:ss') : t('agents.agent_card.created_at'),
    chatId: props.evaluationMessage?.chatId || '-',
    messageContent: props.evaluationMessage?.content || '-',
    evaluation: props.evaluationMessage?.evaluation,
    evaluationText: props.evaluationMessage?.evaluation ? t('agents.descriptions.evaluation_positive') : t('agents.descriptions.evaluation_negative'),
    feedback: props.evaluationMessage?.feedback || '-',
  }
})
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="isOpen"
      destroy-on-close
      data-testid="bo-agent-evaluation-details-dialog"
      align-center
      class="barrage-dialog--small"
      :close-icon="CloseCircleIcon"
      @close="closeModal"
    >
      <template #header>
        <div class="agent-evaluation-details-header">
          <LikeIcon v-if="evaluationMessageData.evaluation" size="36px" />
          <DislikeIcon v-else size="36px" />
          <h5> {{ evaluationMessageData.evaluationText }} </h5>
        </div>
      </template>
      <div class="agent-evaluation-details-body">
        <LabelDescriptionItem
          :label="t('agents.labels.message')"
          :description="evaluationMessageData.messageContent"
          size="small"
          class="agent-model"
        />
        <el-divider class="is-weak" />
        <LabelDescriptionItem
          :label="t('agents.labels.feedback')"
          :description="evaluationMessageData.feedback"
          size="small"
          class="agent-model"
        />
      </div>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.agent-evaluation-details-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.agent-evaluation-details-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
