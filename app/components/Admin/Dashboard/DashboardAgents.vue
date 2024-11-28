<script lang="ts" setup>
import AgentsIcon from '~/assets/icons/svg/agents.svg'
import type { AgentStatistic, PieChartDataEntry } from '~/types/statistic'

const props = defineProps<{
  agentProvidersPieChartData: PieChartDataEntry[] | null
  countDataAgents: AgentStatistic
  mostUsedAgent: any
}>()
const { t } = useI18n()
</script>

<template>
  <section class="dashboard-count-section grid">
    <div class="section-heading-wrapper">
      <div class="title-wrapper">
        <AgentsIcon size="42px" />
        <h5 class="section-title">
          {{ t('agents.title') }}
        </h5>
      </div>

      <NuxtLink to="/admin/agents">
        <el-button size="small" type="primary">
          {{ t('agents.title') }}
        </el-button>
      </NuxtLink>
    </div>
    <el-card class="total-agents-widget is-primary">
      <span class="total-agents-title">{{ t('dashboard.agents.total_widget.active') }}</span>
      <p class="total-agents-count">
        {{ props?.countDataAgents?.active }}
      </p>
    </el-card>

    <el-card class="agent-most-used-card is-primary">
      <TitleDescription :title="t('dashboard.agents.most_used_agent.title')" :description="t('dashboard.agents.most_used_agent.description')" />
      <div class="chart-container">
        <HalfGaugeChart
          :data="mostUsedAgent?.stats"
          type="blue"
          :total-text="t('dashboard.agents.most_used_agent.chats')"
          :used-text="mostUsedAgent?.name || '-'"
        />
      </div>
    </el-card>
    <el-card class="agent-providers-widget-card is-primary">
      <TitleDescription :title="t('dashboard.agents.providers.title')" :description="t('dashboard.agents.providers.description')" />
      <PieChart
        :data="agentProvidersPieChartData"
        :series-name="t('dashboard.agents.providers.series_name')"
        small
      />
    </el-card>
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
        font-weight: var(--font-weight-bold);
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
      font-weight: var(--font-weight-bold);
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
      font-weight: var(--font-weight-bold);
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
