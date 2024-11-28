<script lang="ts" setup>
import DashboardIcon from '~/assets/icons/svg/dashboard-icon.svg'
import DashboardHeroOverview from '~/components/Admin/Dashboard/DashboardHeroOverview.vue'
import type { AgentStatistic, PieChartDataEntry, UserStatistic } from '~/types/statistic'

definePageMeta({
  layout: 'admin-layout',
})
const { t } = useI18n()
const statisticStore = useStatisticStore()
const userStore = useUsersStore()
const collectionsStore = useCollectionsStore()
const documentsStore = useDocumentsStore()
const currentPeriod = ref('WEEK')

const { execute: refreshChatHistory, error: chatHistoryError } = useAsyncData(() => statisticStore.GET_ChatHistoryStatistic(currentPeriod.value))

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

const usersData = computed<UserStatistic>(() => {
  return statisticStore.dashboardCount?.user || { active: 0, admin: 0, inactive: 0, total: 0, user: 0 }
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

// Recent users

const { data: recentUsers, error: recentUsersError, status } = useAsyncData('recentUsers', () =>
  userStore.GET_AllUsers(1, 5, 'createdAt', 'desc'))

const mostRecentUser = computed(() => recentUsers.value?.items || [])
const isLoading = computed(() => status.value === 'pending')
const hasError = computed(() => !!dashboardCountError.value || !!recentUsersError.value)

// Collections

const { data: collections } = useAsyncData('collections', () =>
  collectionsStore.GET_AllCollections(1, 1, 'updated_at', 'desc'))

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
            <DashboardIcon size="58px" />
          </template>
        </AdminPageTitleContainer>
      </template>
    </AdminPageHeadingTemplate>
    <div class="dashboard-templates-wrapper grid">
      <div class="dashboard-hero-section-template">
        <DashboardHeroOverview
          :agents-stats="agentsData"
          :users-stats="usersData"
          :collections-count="collectionsCount"
          :documents-count="documentsCount"
          :chat-history="chatHistory"
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
          :recent-users="mostRecentUser"
          :most-used-agent="mostUsedAgentData"
        />
      </div>
      <div class="dashboard-users-template">
        <DashboardUsers
          :count-data-user="usersData"
          :recent-users="mostRecentUser"
          :loading="isLoading"
          :error="hasError"
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

.dashboard-users-template {
  padding-top: 12px;
  grid-column: span 12;

  @include viewport-xl {
    grid-column: span 6;
  }
}
.dashboard-agents-template {
  padding-top: 12px;
  grid-column: span 12;

  @include viewport-xl {
    grid-column: span 6;
    padding-right: 32px;
  }
}
.dashboard-chats-template {
  grid-column: span 12;
  padding-top: 12px;
}
</style>
