<script lang="ts" setup>
import { TransitionPresets, useTransition } from '@vueuse/core'
import ServiceOverviewWidget from '../shared/ServiceOverviewWidget.vue'
import TeamIcon from '~/assets/icons/svg/team.svg'
import AgentsIcon from '~/assets/icons/svg/agents.svg'
import DocumentIcon from '~/assets/icons/svg/document.svg'
import CollectionIcon from '~/assets/icons/svg/folder-multiple.svg'
import TokensIcon from '~/assets/icons/svg/tokens.svg'
import ChatWarningIcon from '~/assets/icons/svg/chat-warning.svg'
import type { AgentStatistic, LineChartSeriesData } from '~/types/statistic'
import TitleDescription from '~/components/shared/TitleDescription.vue'

const props = defineProps<{
  agentsStats: AgentStatistic
  documentsCount: number
  collectionsCount: number
  tokenTotalUsage: number
  chatHistory: LineChartSeriesData[] | null
  status: string
}>()

const emits = defineEmits<Emits>()

const { t } = useI18n()
const agentTotal = ref(props.agentsStats?.total || 0)
const documentTotal = ref(props.documentsCount || 0)
const collectionTotal = ref(props.collectionsCount || 0)
const tokenTotal = ref(props.tokenTotalUsage || 0)

const agentTotalTransition = useTransition(agentTotal, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
})

const documentsTotalTransition = useTransition(documentTotal, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
})

const collectionsTotalTransition = useTransition(collectionTotal, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
})

const tokenTotalTransition = useTransition(tokenTotal, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
})

const roundedAgentTotal = computed(() => Math.round(agentTotalTransition.value))
const roundedDocumentsTotal = computed(() => Math.round(documentsTotalTransition.value))
const roundedCollectionsTotal = computed(() => Math.round(collectionsTotalTransition.value))
const roundedTokenTotal = computed(() => Math.round(tokenTotalTransition.value))

watch(() => props.agentsStats?.total, (newVal) => {
  if (newVal !== undefined) { agentTotal.value = newVal }
})

watch(() => props.documentsCount, (newVal) => {
  if (newVal !== undefined) { documentTotal.value = newVal }
})
watch(() => props.collectionsCount, (newVal) => {
  if (newVal !== undefined) { collectionTotal.value = newVal }
})
watch(() => props.tokenTotalUsage, (newVal) => {
  if (newVal !== undefined) { tokenTotal.value = newVal }
})

const overviewWidgetsData = computed(() => {
  return [
    {
      name: t('dashboard.service_widgets.tokens.title'),
      value: roundedTokenTotal.value,
      description: t('dashboard.service_widgets.tokens.description'),
      redirectUrl: '/admin',
      redirectText: t('dashboard.service_widgets.tokens.view_more'),
      icon: TokensIcon,
    },
    {
      name: t('dashboard.service_widgets.agents.title'),
      value: roundedAgentTotal.value,
      description: `${props.agentsStats?.active || 0} ${t('dashboard.service_widgets.agents.description')}`,
      redirectUrl: '/admin/agents',
      redirectText: t('dashboard.service_widgets.agents.view_more'),
      icon: AgentsIcon,
    },
    {
      name: t('dashboard.service_widgets.documents.title'),
      value: roundedDocumentsTotal.value,
      description: t('dashboard.service_widgets.documents.description'),
      redirectUrl: '/admin/documents',
      redirectText: t('dashboard.service_widgets.documents.view_more'),
      icon: DocumentIcon,
    },
    {
      name: t('dashboard.service_widgets.collections.title'),
      value: roundedCollectionsTotal.value,
      description: t('dashboard.service_widgets.collections.description'),
      redirectUrl: '/admin/collections',
      redirectText: t('dashboard.service_widgets.collections.view_more'),
      icon: CollectionIcon,
    },
  ]
})

interface Emits {
  (event: 'changePeriod', period: string): void
}

const periodOptions = computed(() => {
  return [{ name: t('dashboard.chat_usage_line_chart.period.week'), value: 'WEEK' }, { name: t('dashboard.chat_usage_line_chart.period.month'), value: 'MONTH' }, { name: t('dashboard.chat_usage_line_chart.period.year'), value: 'YEAR' }]
})
const selectedPeriod = ref({ name: t('dashboard.chat_usage_line_chart.period.week'), value: 'WEEK' })

const selectPeriod = (newPeriod: any) => {
  selectedPeriod.value = newPeriod
  emits('changePeriod', selectedPeriod.value.value)
}
</script>

<template>
  <section class="dashboard-hero-overview-section grid">
    <div class="service-overview-widgets-wrapper grid">
      <template v-for="(item, index) in overviewWidgetsData" :key="item.name">
        <ServiceOverviewWidget
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="150 * index "
          :duration="400"
          :title="item.name"
          :value="item.value"
          :description="item.description"
          :redirect-url="item.redirectUrl"
          :redirect-text="item.redirectText"
          class="service-widget"
        >
          <template #customIcon>
            <component :is="item.icon" size="28px" />
          </template>
        </ServiceOverviewWidget>
      </template>
    </div>
    <div class="chat-usage-by-period-line-chart-wrapper ">
      <el-card
        v-motion
        class="is-primary chats-usage-widget-card"
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1 }"
        :duration="400"
        :delay="600"
      >
        <div class="chat-usage-widget-header">
          <TitleDescription :title="t('dashboard.chat_usage_line_chart.title')" />
          <ClientOnly>
            <ElDropdown
              trigger="click"
              role="navigation"
              class="card-dropdown"
              data-testid="sort-by-dropdown"
            >
              <ElButton
                size="small"
                type="primary"
                plain
                data-testid="filter-chat-usage-by-time-period"
              >
                {{
                  selectedPeriod.name
                }}
              </ElButton>
              <template #dropdown>
                <ElDropdownMenu>
                  <ElDropdownItem
                    v-for="option in periodOptions"
                    :key="option.value"
                    :data-testid="`filter-by-${option.value}`"
                    @click="selectPeriod(option)"
                  >
                    {{ option.name }}
                  </ElDropdownItem>
                </ElDropdownMenu>
              </template>
            </ElDropdown>
          </ClientOnly>
        </div>

        <div v-if="status === 'pending'" class="loader-container">
          <MeetUpLoader />
        </div>
        <LineChart
          v-else-if="chatHistory"
          :series-data="chatHistory"
          title-text=""
          title-subtext=""
          x-axis-name=""
          y-axis-name=""
          :small="false"
        />
        <EmptyState
          v-else
          :title="$t('chat.admin.chat_card.empty_state_title')"
          :description="$t('chat.admin.chat_card.empty_state_desc')"
        >
          <template #icon>
            <ChatWarningIcon size="44px" />
          </template>
        </EmptyState>
      </el-card>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.dashboard-hero-overview-section {
  & .service-overview-widgets-wrapper {
    grid-column: span 4;
    grid-auto-rows: 1fr;
    @include viewport-s {
      grid-column: span 8;
    }

    @include viewport-m {
      grid-column: span 5;
    }
    @include viewport-xl {
      grid-column: span 4;
    }

    & .service-widget {
      height: 100%;
      grid-column: span 4;

      @include viewport-m {
        grid-column: span 6;
      }
    }
  }

  & .chat-usage-by-period-line-chart-wrapper {
    grid-column: span 4;

    @include viewport-s {
      grid-column: span 8;
    }

    @include viewport-m {
      grid-column: span 7;
    }

    @include viewport-xl {
      grid-column: span 8;
    }

    & .chats-usage-widget-card {
      min-height: 100%;

      & .chat-usage-widget-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 22px;
      }
    }
  }
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 328px;
}
</style>
