<script lang="ts" setup>
import AgentIcon from '~/assets/icons/svg/chat-agent.svg'
import { useAgentStore } from '~/stores/agents'

const agentStore = useAgentStore()

const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

const currentPage = ref(1)
const itemsPerPage = ref(10)

const { error, execute } = await useAsyncData(() => agentStore.GET_AllAgents(currentPage.value, itemsPerPage.value))

const handlePageChange = async (page: number) => {
  currentPage.value = page
  execute()
}

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
    <AgentsList :agents="agentStore.getMappedAgents" @page-change="handlePageChange" />
  </AdminPageContainer>
</template>

<style scoped lang="scss" />
