<script lang="ts" setup>
import DashboardIcon from '~/assets/icons/svg/dashboard-icon.svg'
import DashboardHeroOverview from '~/components/Admin/Dashboard/DashboardHeroOverview.vue'
import type { AgentStatistic, ChatStatistic, StatisticItem, UserStatistic } from '~/types/statistic'

definePageMeta({
  layout: 'admin-layout',
})
const { t } = useI18n()
const statisticStore = useStatisticStore()

const currentPeriod = ref('WEEK')

statisticStore.GET_ChatHistoryStatistic(currentPeriod.value)
statisticStore.GET_DashboardCount()

const updatePeriod = (newPeriod: string) => {
  currentPeriod.value = newPeriod
  statisticStore.GET_ChatHistoryStatistic(currentPeriod.value)
}

const chatHistory = computed(() => {
  return statisticStore.chatHistoryStats
})
const chatCount = computed<ChatStatistic>(() => {
  return statisticStore.dashboardCount?.chat || { agents: [], total: 0 }
})

const usersData = computed<UserStatistic>(() => {
  return statisticStore.dashboardCount?.user || { active: 0, admin: 0, inactive: 0, total: 0, user: 0 }
})

const agentsData = computed<AgentStatistic>(() => {
  return statisticStore.dashboardCount?.agent || { active: 0, inactive: 0, providers: [], total: 0 }
})

const userStore = useUsersStore()

const recentUsers = ref()
const getRecentUsers = async () => {
  recentUsers.value = await userStore.GET_AllUsers(1, 5, 'createdAt', 'desc')
  return recentUsers.value
}

const mostRecentUser = computed(() => {
  return recentUsers.value?.items ? recentUsers.value.items : []
})

const chatStore = useChatStore()
const recentChats = ref()
const getRecentChats = async () => {
  recentChats.value = await chatStore.GET_AllAdminChats(1, 10, 'updatedAt', 'desc')
  return recentChats.value
}
const mostRecentChats = computed(() => {
  return recentChats.value?.items ? recentChats.value.items : []
})

const agentsStore = useAgentStore()
const activeAgents = ref()
const getRecentAgents = async () => {
  activeAgents.value = await agentsStore.GET_AllAgents(1, 20, 'updatedAt', 'desc', false)
  return activeAgents.value
}
const allActiveAgents = computed(() => {
  return activeAgents.value?.items ? activeAgents.value.items : []
})

const collectionsStore = useCollectionsStore()
const collections = ref()
const getCollectionsTotal = async () => {
  collections.value = await collectionsStore.GET_AllCollections(1, 1, 'updated_at', 'desc')
  return collections.value
}
const collectionsCount = computed(() => {
  return collections.value?.total ? collections.value.total : 0
})

const documentsStore = useDocumentsStore()
const documents = ref()
const getDocumentsTotal = async () => {
  documents.value = await documentsStore.GET_AllDocuments(1, 1, 'updated_at', 'desc')
  return documents.value
}
const documentsCount = computed(() => {
  return documents.value?.total ? documents.value.total : 0
})

onMounted(() => {
  getRecentUsers()
  getRecentChats()
  getRecentAgents()
  getDocumentsTotal()
  getCollectionsTotal()
})

function findMostUsedAgent(chatData: ChatStatistic) {
  const agents = chatData?.agents || []

  if (agents.length === 0) {
    return { name: 'None', stats: { used: 0, total: chatData?.total || 0 } }
  }

  const mostUsedAgent = agents.reduce((max, agent) => {
    return agent.value > max.value ? agent : max
  }, { name: '-', value: 0 })

  const result = {
    name: mostUsedAgent?.name || 'Unknown',
    stats: {
      used: mostUsedAgent?.value || 0,
      total: chatData?.total || 0,
    },
  }

  return result
}

const mostUsedAgentData = computed(() => {
  return findMostUsedAgent(chatCount?.value)
})
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
            <DashboardIcon size="52" />
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
        <DashboardChatsInfo
          :chat-history="chatHistory"
          :chat-count="chatCount"
          :recent-chats="mostRecentChats"
          :active-agents="allActiveAgents"
        />
      </div>
      <div class="dashboard-agents-template">
        <DashboardAgents
          :count-data-agents="agentsData"
          :recent-users="mostRecentUser"
          :most-used-agent="mostUsedAgentData"
        />
      </div>
      <div class="dashboard-users-template">
        <DashboardUsers :count-data-user="usersData" :recent-users="mostRecentUser" />
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
