<script lang="ts" setup>
import AgentsIcon from '~/assets/icons/svg/agents.svg'
import AccountWarningIcon from '~/assets/icons/svg/account-warning.svg'
import FolderWarningIcon from '~/assets/icons/svg/folder-warning.svg'
import type { AgentStatistic, PieChartDataEntry } from '~/types/statistic'

defineProps<{
  agentProvidersPieChartData: PieChartDataEntry[] | null
  countDataAgents: AgentStatistic
  mostUsedAgent: any
}>()
const { t } = useI18n()
const { dashboardCountLoading } = storeToRefs(useStatisticStore())
</script>

<template>
  <section class="dashboard-count-section grid">
    <div class="section-heading-wrapper">
      <div v-motion-pop-visible-once class="title-wrapper">
        <AgentsIcon size="36px" />
        <h4 class="section-title">
          {{ t('agents.title') }}
        </h4>
      </div>

      <LlmLink to="/admin/agents" type="buttonPrimary">
        {{ t('agents.title') }}
      </LlmLink>
    </div>

    <ElCard
      v-motion
      class="total-agents-widget is-primary"
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1 }"
      :duration="400"
      :delay="1200"
    >
      <span class="total-agents-title">{{ t('dashboard.agents.total_widget.active') }}</span>
      <p class="total-agents-count">
        {{ countDataAgents?.active || 0 }}
      </p>
    </ElCard>

    <ElCard
      v-motion
      class="agent-most-used-card is-primary"
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1 }"
      :duration="400"
      :delay="1400"
    >
      <TitleDescription :title="t('dashboard.agents.most_used_agent.title')" :description="t('dashboard.agents.most_used_agent.description')" />
      <div v-if="dashboardCountLoading" class="most-used-agents-loader-container">
        <MeetUpLoader />
      </div>
      <div v-else-if="mostUsedAgent" class="chart-container">
        <HalfGaugeChart
          :data="mostUsedAgent?.stats"
          type="blue"
          :total-text="t('dashboard.agents.most_used_agent.chats')"
          :used-text="mostUsedAgent?.name || '-'"
        />
      </div>
      <EmptyState
        v-else
        :title="$t('dashboard.service_widgets.agents.most_used_empty_title')"
        :description="$t('dashboard.service_widgets.agents.most_used_empty_description')"
      >
        <template #icon>
          <AccountWarningIcon size="44px" />
        </template>
      </EmptyState>
    </ElCard>

    <ElCard
      v-motion
      class="agent-providers-widget-card is-primary"
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1 }"
      :duration="400"
      :delay="1500"
    >
      <TitleDescription :title="t('dashboard.agents.providers.title')" :description="t('dashboard.agents.providers.description')" />
      <div v-if="dashboardCountLoading" class="providers-loader-container">
        <MeetUpLoader />
      </div>
      <PieChart
        v-else-if="agentProvidersPieChartData?.length"
        :data="agentProvidersPieChartData"
        :series-name="t('dashboard.agents.providers.series_name')"
        small
      />
      <EmptyState
        v-else
        :title="$t('dashboard.service_widgets.agents.providers_empty_title')"
        :description="$t('dashboard.service_widgets.agents.providers_empty_description')"
      >
        <template #icon>
          <FolderWarningIcon size="44px" />
        </template>
      </EmptyState>
    </ElCard>
  </section>
</template>

<style lang="scss" scoped>
.dashboard-count-section {
  .section-heading-wrapper {
    grid-column: span 12;
    display: flex;
    justify-content: space-between;
    align-items: center;

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
  .total-agents-widget {
    grid-column: span 4;

    & .total-agents-title {
      color: var(--color-primary-700);
    }

    & .total-agents-count {
      color: var(--color-primary-800);
      font-weight: var(--font-weight-semibold);
      font-size: var(--font-size-fluid-5);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 6px;
    }
  }

  & .agent-providers-widget-card {
    grid-column: span 4;
  }
  & .agent-most-used-card {
    grid-column: span 8;
    grid-row: span 2;

    & .agent-usage-title {
      font-weight: var(--font-weight-semibold);
      color: var(--color-primary-700);
      font-size: var(--font-size-fluid-4);
    }
    & .agent-usage-description {
      color: var(--color-primary-600);
      margin-bottom: var(--spacing-fluid-m);
      font-size: var(--font-size-fluid-2);
    }
  }
}
.most-used-agents-loader-container,
.providers-loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.most-used-agents-loader-container {
  height: 250px;
}
.providers-loader-container {
  height: 148px;
}

.chart-container {
  margin-top: 22px;
  max-width: 100%;
  height: 251px;
}

.dark {
  .total-agents-widget {
    .total-agents-title {
      color: var(--color-primary-100);
    }

    .total-agents-count {
      color: var(--color-primary-200);
    }
  }
  .section-heading-wrapper {
    & .title-wrapper {
      & .section-title {
        color: var(--color-primary-0);
      }
    }
  }
}
</style>
