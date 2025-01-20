<script lang="ts" setup>
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'
import AccountWarningIcon from '~/assets/icons/svg/account-warning.svg'
import type { Configuration } from '~/types/agent'

const { t } = useI18n()
const { $api } = useNuxtApp()
definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('agents.titles.details')),
})

const route = useRoute()
const selectedAgentId = ref(route.params.agentId as string)

const { execute: getAgentData, error: getSingleAgentError, status: getSingleAgentStatus, data: singleAgentData } = await useAsyncData(() => $api.agent.GetSingleAgent(selectedAgentId.value), { lazy: true })

errorHandler(getSingleAgentError)

const handleAgentVersionRollback = async (agentConfig: Configuration) => {
  if (agentConfig?.id) {
    await getAgentData()
  }
}
</script>

<template>
  <AdminPageContainer>
    <LlmLink to="/admin/agents" type="link">
      <ArrowLeftIcon size="20px" /> {{ t('agents.title') }}
    </LlmLink>

    <template v-if="getSingleAgentStatus === 'pending'">
      <div class="agent-details-loader">
        <MeetUpLoader />
      </div>
    </template>

    <template v-else-if="getSingleAgentStatus === 'success'">
      <AgentDetails
        :single-agent="singleAgentData"
        @refresh-agent="getAgentData"
        @agent-version-rollback="handleAgentVersionRollback"
      />
    </template>

    <template v-else>
      <EmptyState
        :title="t('agents.agent_card.empty_state_title')"
        :description="t('agents.agent_card.empty_state_desc')"
      >
        <template #icon>
          <AccountWarningIcon size="44px" />
        </template>
      </EmptyState>
    </template>
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
