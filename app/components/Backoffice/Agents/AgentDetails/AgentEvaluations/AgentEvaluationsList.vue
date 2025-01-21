<script lang="ts" setup>
import type { EvaluationMessage } from '~/types/agent'

const props = defineProps<{
  evaluationMessages: EvaluationMessage[] | undefined | null
}>()

/* Delete User */
const selectedEvaluationData = ref<EvaluationMessage>()
const evaluationDataModalVisible = ref(false)

const openEvaluationMessageDetailsModal = (evaluation: EvaluationMessage) => {
  selectedEvaluationData.value = evaluation
  evaluationDataModalVisible.value = true
}
</script>

<template>
  <div class="agent-evaluations-list">
    <template v-for="(evaluation, index) in props.evaluationMessages" :key="evaluation.id">
      <AgentEvaluationCard
        v-motion-fade
        :evaluation="evaluation"
        :data-testid="`bo-agent-evaluation-message-card-${index + 1}`"
        :delay="(index * 100)"
        :duration="400"
        @open-evaluation-details="openEvaluationMessageDetailsModal"
      />
    </template>
  </div>
  <AgentEvaluationDetailsModal v-model="evaluationDataModalVisible" :evaluation-message="selectedEvaluationData" />
</template>

<style lang="scss" scoped>
.agent-evaluations-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>
