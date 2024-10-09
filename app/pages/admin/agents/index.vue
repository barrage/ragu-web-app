<script lang="ts" setup>
import AgentIcon from '~/assets/icons/svg/chat-agent.svg'
import { useAgentStore } from '~/stores/agents'

const agentStore = useAgentStore()

const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

const { error } = await useAsyncData(() => agentStore.GET_AllAgents())

errorHandler(error)
</script>

<template>
  <AdminPageContainer>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('agents.titles.mainTitle')"
          :description="t('agents.titles.description')"
        >
          <template #icon>
            <AgentIcon size="52" />
          </template>
        </AdminPageTitleContainer>
      </template>
      <template #actions>
        <AgentsQuickActionsContainer />
      </template>
    </AdminPageHeadingTemplate>
    <AgentsListActions />
    <AgentsList :agents="agentStore.getMappedAgents" />
  </AdminPageContainer>
</template>

<style scoped lang="scss" />
