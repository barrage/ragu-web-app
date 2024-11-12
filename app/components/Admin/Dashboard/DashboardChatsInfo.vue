<script lang="ts" setup>
import AgentIcon from '~/assets/icons/svg/chat-agent.svg'
import ChatsIcon from '~/assets/icons/svg/chat-multiple.svg'
import type { ChatStatistic, StatisticItem } from '~/types/statistic'
import type { Chat } from '~/types/chat'
import type { Agent } from '~/types/agent'
import ChatIcon from '~/assets/icons/svg/chat-icon.svg'

const props = defineProps<{
  chatCount: ChatStatistic | undefined
  recentChats: Array<Chat>
  activeAgents: Array<Agent>
}>()
const router = useRouter()
const { t } = useI18n()

const redirectToChatDetails = (id: string) => {
  return router.push(`/admin/chats/${id}`)
}

const redirectToAgentDetails = (id: string) => {
  return router.push(`/admin/agents/${id}`)
}
</script>

<template>
  <section class="dashboard-chats-info-section grid">
    <div class="section-heading-wrapper">
      <div class="title-wrapper">
        <ChatsIcon size="42" />
        <h4 class="section-title">
          {{ t('chat.admin.title') }}
        </h4>
      </div>

      <NuxtLink to="/admin/chats">
        <el-button size="small" type="primary">
          {{ t('chat.admin.title') }}
        </el-button>
      </NuxtLink>
    </div>

    <div class="recent-chats">
      <el-card class="is-primary recent-chats-card ">
        <TitleDescription :title="t('dashboard.chats.most_recent.title')" :description="t('dashboard.chats.most_recent.description')" />

        <div class="recent-chat-list">
          <template v-for="chat in props.recentChats" :key="chat.id">
            <div class="recent-chat-card">
              <div class="chat-profile-item" @click="redirectToChatDetails(chat.id)">
                <ChatIcon size="36" />
                <div class="chat-wrapper">
                  <p class="chat-name">
                    {{ `${chat?.title || '-'}` }}
                  </p>
                  <span class="chat-time-update">{{ chat?.updatedAt ? useRelativeDate(chat.updatedAt) : '' }}</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </el-card>
    </div>

    <div class="chats-information">
      <el-card class="is-primary all-chats-usage-card">
        <TitleDescription :title="t('dashboard.chats.all_chat_usage.title')" :description="t('dashboard.chats.all_chat_usage.description')" />
        <PieChart
          :data="chatCount?.agents"
          :series-name="t('dashboard.chats.all_chat_usage.series_name')"
          :title-text="chatCount?.total ? chatCount.total.toString() : '0'"
          :title-subtext="t('dashboard.chats.all_chat_usage.pie_chart_subtext')"
        />
      </el-card>
    </div>

    <div class="active-agents">
      <el-card class="active-agents-card is-primary">
        <TitleDescription :title="t('dashboard.chats.available_agents.title')" :description="t('dashboard.chats.available_agents.description')" />

        <div class="active-agents-list">
          <template v-for="agent in props.activeAgents" :key="agent.agent.id">
            <div class="agent-name-type-wrapper" @click="redirectToAgentDetails(agent?.agent?.id)">
              <AgentIcon size="36" />
              <div class="agent-name-wrapper">
                <p class="agent-name">
                  {{ agent?.agent?.name }}
                </p>
                <span class="agent-provider">{{ agent.configuration?.llmProvider }}</span>
              </div>
            </div>
          </template>
        </div>
      </el-card>
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
    overflow-y: auto;
  }
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
      font-weight: var(--font-weight-bold);
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
  overflow-y: auto;
}
.recent-chat-card {
  & .chat-profile-item {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    & .chat-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    & .chat-name {
      margin: 0;
      font-size: var(--font-size-fluid-2);
      line-height: normal;
      font-weight: var(--font-weight-bold);
      color: var(--color-primary-900);
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
        font-weight: var(--font-weight-bold);
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

    & .all-chats-usage-card {
      min-height: 100%;
    }
    & .active-agent-title {
      font-weight: var(--font-weight-bold);
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
      font-weight: var(--font-weight-bold);
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
      font-weight: var(--font-weight-bold);
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
