<script lang="ts" setup>
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import type { Agent } from '~/types/agent'

const props = defineProps<{
  singleAgent: Agent | null | undefined
}>()

const emits = defineEmits<{
  (event: 'agentUpdated'): void
  (event: 'agentPictureChganged'): void
}>()

const { t } = useI18n()

const handleAgentUpdate = () => {
  emits('agentUpdated')
}

const handleAgentPictureChange = () => {
  emits('agentPictureChganged')
}
</script>

<template>
  <section class="edit-agent-section">
    <div class="edit-agent-title-wrapper">
      <EditIcon size="42px" />
      <h1 class="edit-agent-section-title">
        {{ t('agents.titles.edit') }}
      </h1>
    </div>

    <EditAgentForm
      :single-agent="props.singleAgent"
      @agent-updated="handleAgentUpdate"
      @agent-picture-chganged="handleAgentPictureChange"
    />
  </section>
</template>

<style lang="scss" scoped>
.edit-agent-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-fluid-l);

  & .edit-agent-title-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  & .edit-agent-section-title {
    font-size: var(--font-size-fluid-7);
    line-height: normal;
  }
}
</style>
