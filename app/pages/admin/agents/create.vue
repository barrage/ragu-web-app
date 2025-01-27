<script lang="ts" setup>
import AddPersonIcon from '~/assets/icons/svg/person-add.svg'
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'

const { t } = useI18n()
const router = useRouter()

const handleAgentCreated = (id: string) => {
  router.push(`/admin/agents/${id}`)
}
</script>

<template>
  <AdminPageContainer>
    <LlmLink to="/admin/agents" type="link">
      <ArrowLeftIcon size="20px" /> {{ t('agents.title') }}
    </LlmLink>
    <section class="create-agent-section">
      <div class="create-agent-title-wrapper">
        <AddPersonIcon size="48px" />
        <h1 class="create-agent-section-title">
          {{ t('agents.titles.create') }}
        </h1>
      </div>

      <CreateAgentForm @agent-created="handleAgentCreated" />
    </section>
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.create-agent-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-fluid-l);

  & .create-agent-title-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  & .create-agent-section-title {
    font-size: var(--font-size-fluid-7);
    line-height: normal;
  }
}
</style>
