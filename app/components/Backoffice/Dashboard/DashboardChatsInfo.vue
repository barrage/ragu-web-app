<script lang="ts" setup>
import AgentIcon from '~/assets/icons/svg/chat-agent.svg'
import AccountWarningIcon from '~/assets/icons/svg/account-warning.svg'
import ChatsIcon from '~/assets/icons/svg/chat-multiple.svg'
import type { PieChartDataEntry } from '~/types/statistic'
import ChatIcon from '~/assets/icons/svg/chat-icon.svg'
import ChatWarningIcon from '~/assets/icons/svg/chat-warning.svg'

const { t } = useI18n()
const statisticStore = useStatisticStore()
const chatStore = useChatStore()
const { $api } = useNuxtApp()

const chatCount = computed<number>(() => {
  return statisticStore.dashboardCount?.chat.total || 0
})

const chatPieChartData = computed<PieChartDataEntry[] | null>(() => {
  return statisticStore.dashboardCount?.chat?.chats ? formatPieChartData(statisticStore.dashboardCount?.chat.chats) : null
})

// Recent chats
const { data: recentChats, status: recentChatsStatus } = useAsyncData('recentChats', () =>
  chatStore.GET_AllAdminChats(1, 10, 'updatedAt', 'desc'), { lazy: true })

const mostRecentChats = computed(() => recentChats.value?.items || [])

// Active agents
const { data: activeAgents, status: activeAgentsStatus } = useAsyncData('activeAgents', () =>
  $api.agent.GetAllAgents(1, 20, 'updatedAt', 'desc', false), { lazy: true })

const allActiveAgents = computed(() => activeAgents.value?.items || [])
</script>

<template>
  <section class="dashboard-chats-info-section grid">
    <div class="section-heading-wrapper">
      <div v-motion-pop-visible-once class="title-wrapper">
        <ChatsIcon size="36px" />
        <h4 class="section-title">
          {{ t('chat.admin.title') }}
        </h4>
      </div>

      <LlmLink to="/admin/chats" type="buttonPrimary">
        {{ t('chat.admin.title') }}
      </LlmLink>
    </div>

    <div class="recent-chats">
      <ElCard
        v-motion
        class="is-primary recent-chats-card "
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1 }"
        :duration="600"
        :delay="600"
      >
        <TitleDescription :title="t('dashboard.chats.most_recent.title')" :description="t('dashboard.chats.most_recent.description')" />

        <div class="recent-chat-list">
          <template v-if="recentChatsStatus === 'pending'">
            <div class="loader-container">
              <MeetUpLoader />
            </div>
          </template>
          <template v-else-if="recentChatsStatus === 'success'">
            <template v-for="chat in mostRecentChats" :key="chat.id">
              <div class="recent-chat-card">
                <LlmLink
                  :to="`/admin/chats/${chat.chat.id}`"
                  type="link"
                  class="chat-profile-item"
                >
                  <ChatIcon size="36px" class="chat-icon" />
                  <div class="chat-wrapper">
                    <p class="chat-name">
                      {{ `${chat?.chat.title || t('chat.admin.chat_card.unknown_title')}` }}
                    </p>
                    <span class="chat-time-update">{{ chat?.chat?.updatedAt ? useRelativeDate(chat.chat.updatedAt) : '' }}</span>
                  </div>
                </LlmLink>
              </div>
            </template>
          </template>
          <EmptyState
            v-else
            :title="$t('chat.admin.chat_card.empty_state_title')"
            :description="$t('chat.admin.chat_card.empty_state_desc')"
          >
            <template #icon>
              <ChatWarningIcon size="44px" />
            </template>
          </EmptyState>
        </div>
      </ElCard>
    </div>

    <div class="chats-information">
      <ElCard
        v-motion
        class="is-primary all-chats-usage-card"
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1 }"
        :duration="600"
        :delay="800"
      >
        <TitleDescription :title="t('dashboard.chats.all_chat_usage.title')" :description="t('dashboard.chats.all_chat_usage.description')" />
        <div v-if="statisticStore.dashboardCountLoading" class="loader-container">
          <MeetUpLoader />
        </div>
        <PieChart
          v-else-if="chatPieChartData?.length"
          :data="chatPieChartData || []"
          :series-name="t('dashboard.chats.all_chat_usage.series_name')"
          :title-text="chatCount ? chatCount.toString() : '0'"
          :title-subtext="t('dashboard.chats.all_chat_usage.pie_chart_subtext')"
        />
        <div
          v-else
          class="recent-chat-list"
        >
          <EmptyState
            :title="$t('chat.admin.chat_card.empty_state_title')"
            :description="$t('chat.admin.chat_card.empty_state_desc')"
          >
            <template #icon>
              <ChatWarningIcon size="44px" />
            </template>
          </EmptyState>
        </div>
      </ElCard>
    </div>

    <div class="active-agents">
      <ElCard
        v-motion
        class="active-agents-card is-primary"
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1 }"
        :duration="600"
        :delay="1000"
      >
        <TitleDescription :title="t('dashboard.chats.available_agents.title')" :description="t('dashboard.chats.available_agents.description')" />

        <div class="active-agents-list">
          <template v-if="activeAgentsStatus === 'pending'">
            <div class="loader-container">
              <MeetUpLoader />
            </div>
          </template>
          <template v-else-if="activeAgentsStatus === 'success'">
            <template v-for="agent in allActiveAgents" :key="agent.agent.id">
              <LlmLink
                :to="`/admin/agents/${agent?.agent?.id}`"
                type="link"
                class="agent-name-type-wrapper"
              >
                <LlmAvatar
                  :avatar="agent.agent?.avatar"
                  :alt="t('agents.agent_avatar')"
                  fit="cover"
                  default-image="agent"
                  :size="36"
                />
                <div class="agent-name-wrapper">
                  <p class="agent-name">
                    {{ agent?.agent?.name }}
                  </p>
                  <span class="agent-provider">{{ agent.configuration?.llmProvider }}</span>
                </div>
              </LlmLink>
            </template>
          </template>
          <EmptyState
            v-else
            :title="$t('chat.newChat.empty_title')"
            :description="$t('chat.newChat.empty')"
            class="agents-empty-state"
          >
            <template #icon>
              <AccountWarningIcon size="44px" />
            </template>
            <template #cta>
              <LlmLink to="/admin/agents" type="button">
                <AgentIcon /> {{ $t('agents.title') }}
              </LlmLink>
            </template>
          </EmptyState>
        </div>
      </ElCard>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.active-agents-card {
  min-height: 100%;

  & .active-agents-list {
    display: flex;
    flex-direction: column;
    max-height: 100%;
    gap: 1.2rem;
    max-height: 300px;
    padding-top: var(--font-size-fluid-1);
    overflow-y: auto;

    .agents-empty-state {
      margin-top: 5rem;
    }
  }
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
.agent-name-type-wrapper {
  grid-column: span 3;
  align-items: center;
  text-overflow: ellipsis;
  display: flex;
  min-width: fit-content;
  gap: 6px;
  color: var(--color-primary-800);

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  & .agent-name-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .agent-name {
      margin: 0;
      font-size: var(--font-size-fluid-2);
      line-height: normal;
      font-weight: var(--font-weight-semibold);
      color: var(--color-primary-900);
    }
    & .agent-provider {
      margin: 0;
      line-height: normal;
      font-size: var(--font-size-fluid-1);
      color: var(--color-primary-800);
    }
  }
}
.recent-chat-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 300px;
  padding-top: var(--font-size-fluid-1);
  overflow-y: auto;
  overflow-x: hidden;
}
.recent-chat-card {
  & .chat-profile-item {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    & .chat-icon {
      min-width: fit-content;
    }

    & .chat-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    & .chat-name {
      margin: 0;
      font-size: var(--font-size-fluid-2);
      line-height: normal;
      font-weight: var(--font-weight-semibold);
      color: var(--color-primary-900);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    & .chat-time-update {
      line-height: normal;
      color: var(--color-primary-800);
      font-size: var(--font-size-fluid-1);
    }
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
}
.dashboard-chats-info-section {
  .section-heading-wrapper {
    grid-column: span 4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include viewport-s {
      grid-column: span 8;
    }

    @include viewport-ml {
      grid-column: span 12;
    }

    @include viewport-m {
      grid-column: span 12;
    }

    & .title-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      & .section-title {
        font-weight: var(--font-weight-semibold);
        color: var(--color-primary-800);
      }
    }
  }
  .recent-chats {
    grid-column: span 4;
    min-height: 100%;
    @include viewport-s {
      grid-column: span 8;
    }
    @include viewport-m {
      grid-column: span 4;
    }

    & .recent-chats-card {
      min-height: 100%;
      padding-right: var(--font-size-fluid-1);
    }
  }
  .active-agents {
    grid-column: span 4;
  }

  & .chats-information {
    grid-column: span 4;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-fluid-m);

    @include viewport-s {
      grid-column: span 8;
    }
    @include viewport-m {
      grid-column: span 4;
    }

    & .all-chats-usage-card {
      min-height: 100%;
    }
    & .active-agent-title {
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--spacing-fluid-m);
      color: var(--color-primary-700);
    }

    & .chats-total-widget {
      display: flex;
      flex-direction: column;
      & .total-count-info {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        margin-bottom: 22px;
        color: var(--color-primary-900);
      }
    }

    & .chat-usage-title {
      font-weight: var(--font-weight-semibold);
      color: var(--color-primary-700);
      font-size: var(--font-size-fluid-4);
    }
    & .chat-usage-description {
      color: var(--color-primary-600);
      margin-bottom: var(--spacing-fluid-m);
      font-size: var(--font-size-fluid-2);
    }
  }
}

.dark {
  .dashboard-chats-info-section {
    .section-heading-wrapper {
      & .title-wrapper {
        & .section-title {
          color: var(--color-primary-0);
        }
      }
    }
  }
  & .chats-information {
    & .active-agent-title {
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--spacing-fluid-m);
      color: var(--color-primary-100);
    }
    & .chats-total-widget {
      & .total-count-info {
        color: var(--color-primary-100);
      }
    }

    & .chat-usage-title {
      color: var(--color-primary-100);
    }
    & .chat-usage-description {
      color: var(--color-primary-200);
    }
  }
  .agent-name-type-wrapper {
    color: var(--color-primary-100);

    & .agent-name-wrapper {
      .agent-name {
        color: var(--color-primary-0);
      }
      & .agent-provider {
        color: var(--color-primary-200);
      }
    }
  }
  .recent-chat-card {
    & .chat-profile-item {
      & .chat-name {
        color: var(--color-primary-0);
      }
      & .chat-time-update {
        color: var(--color-primary-200);
      }
    }
  }
}
</style>
