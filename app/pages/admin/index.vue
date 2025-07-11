<script lang="ts" setup>
import DashboardIcon from '~/assets/icons/svg/dashboard-icon.svg'
import type { AgentStatistic, PieChartDataEntry } from '~/types/statistic'

definePageMeta({
  layout: 'admin-layout',
})
const { t } = useI18n()

useHead({
  title: computed(() => t('dashboard.title')),
})

const { $api } = useNuxtApp()
const statisticStore = useStatisticStore()
const documentsStore = useDocumentsStore()
const currentPeriod = ref('WEEK')

const { execute: refreshChatHistory, error: chatHistoryError, status: chatHistoryStatus } = useAsyncData(() => statisticStore.GET_ChatHistoryStatistic(currentPeriod.value), { lazy: true })

const { error: dashboardCountError } = useAsyncData(() => statisticStore.GET_DashboardCount())

errorHandler(chatHistoryError)
errorHandler(dashboardCountError)

const updatePeriod = async (newPeriod: string) => {
  currentPeriod.value = newPeriod
  await refreshChatHistory()
}

// Computed
const chatHistory = computed(() => {
  return statisticStore?.chatHistoryStats ? formatLineChartData(statisticStore.chatHistoryStats) : null
})

const agentsData = computed<AgentStatistic>(() => {
  return statisticStore.dashboardCount?.agent || { active: 0, inactive: 0, providers: [], total: 0 }
})

const agentsProviders = computed<PieChartDataEntry[] | null>(() => {
  return statisticStore.dashboardCount?.agent?.providers ? formatPieChartDataFromObjects(statisticStore.dashboardCount?.agent?.providers) : null
})

const mostUsedAgentData = computed(() => {
  return findMostUsedAgent()
})

// Tokens

const { data: tokenTotalUsage } = useAsyncData(() => $api.provider.GetTokenTotalUsage())

const tokenCount = computed(() => tokenTotalUsage.value || 0)

// Collections

const { data: collections } = useAsyncData('collections', () =>
  $api.collection.GetAllCollections(1, 1, 'updated_at', 'desc'))

const collectionsCount = computed(() => collections.value?.total || 0)

// Documents

const { data: documents } = useAsyncData('documents', () =>
  documentsStore.GET_AllDocuments(1, 1, 'updated_at', 'desc'))

const documentsCount = computed(() => documents.value?.total || 0)

// Helpers

function findMostUsedAgent(): { name: string, stats: { used: number, total: number } } {
  const chatData = statisticStore.dashboardCount?.chat || { chats: [], total: 0 }

  if (chatData?.chats.length === 0) {
    return { name: 'None', stats: { used: 0, total: chatData?.total || 0 } }
  }

  const mostUsedAgent = chatData.chats.reduce((max, agent) => {
    return agent.count > max.count ? agent : max
  }, { agentName: 'Unknown', count: 0 })

  return {
    name: mostUsedAgent.agentName || 'Unknown',
    stats: {
      used: mostUsedAgent.count || 0,
      total: chatData.total || 0,
    },
  }
}
</script>

<template>
  <AdminPageContainer>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('dashboard.title')"
          :description="t('dashboard.description')"
        >
          <template #icon>
            <DashboardIcon size="48px" />
          </template>
        </AdminPageTitleContainer>
      </template>
    </AdminPageHeadingTemplate>
    <div class="dashboard-templates-wrapper grid">
      <div class="dashboard-hero-section-template">
        <DashboardHeroOverview
          :agents-stats="agentsData"
          :collections-count="collectionsCount"
          :documents-count="documentsCount"
          :token-total-usage="tokenCount"
          :chat-history="chatHistory"
          :status="chatHistoryStatus"
          @change-period="updatePeriod"
        />
      </div>
      <div class="dashboard-chats-template">
        <DashboardChatsInfo />
      </div>
      <div class="dashboard-agents-template">
        <DashboardAgents
          :agent-providers-pie-chart-data="agentsProviders"
          :count-data-agents="agentsData"
          :most-used-agent="mostUsedAgentData"
        />
      </div>
    </div>
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.dashboard-templates-wrapper {
  grid-row-gap: var(--spacing-fluid-xl);
}
.dashboard-hero-section-template {
  grid-column: span 12;
}

.dashboard-agents-template {
  padding-top: 12px;
  grid-column: span 12;
}
.dashboard-chats-template {
  grid-column: span 12;
  padding-top: 12px;
}
</style>
