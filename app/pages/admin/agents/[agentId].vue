<script lang="ts" setup>
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'
import AccountWarningIcon from '~/assets/icons/svg/account-warning.svg'

const { t } = useI18n()
definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('agents.titles.details')),
})

// CONSTATNS

const route = useRoute()
const agentStore = useAgentStore()

const selectedAgentId = ref(route.params.agentId as string)

// API CALLS
const { error, status } = await useAsyncData(() => agentStore.GET_SingleAgent(selectedAgentId.value), { lazy: true })

errorHandler(error)
</script>

<template>
  <AdminPageContainer>
    <LlmLink to="/admin/agents" type="link">
      <ArrowLeftIcon size="20px" /> {{ t('agents.title') }}
    </LlmLink>

    <template v-if="status === 'pending'">
      <div class="agent-details-loader">
        <MeetUpLoader />
      </div>
    </template>

    <template v-else-if="status === 'success'">
      <AgentDetails v-if="!agentStore.editMode" :single-agent="agentStore.singleAgent" />
      <AgentEdit v-else :agent="agentStore.singleAgent" />
    </template>

    <EmptyState
      v-else
      :title="t('agents.agent_card.empty_state_title')"
      :description="t('agents.agent_card.empty_state_desc')"
    >
      <template #icon>
        <AccountWarningIcon size="44px" />
      </template>
    </EmptyState>
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.agent-details-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--spacing-fluid-3-xl);
}
</style>
