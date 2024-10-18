<script setup lang="ts">
import VChart from 'vue-echarts'
import { merge } from 'lodash-es'

interface Data {
  name: string
  value: number
}

const props = defineProps<{
  data: Data[]
  titleText?: string
  titleSubtext?: string
  detailOptions?: any[]
  type: string
  small?: boolean
}>()
const isDark = useDark()
const { useGaugeEChart, gaugeChartOptions } = useEChart()
const isMounted = ref(false)

/* LCH */
onMounted(() => {
  useGaugeEChart()
  updateChartOptions(props.data || {})
  isMounted.value = true
})

useGaugeEChart()
const chartOptions = ref(merge({}, gaugeChartOptions))

type GaugeColorBreakpoint = [number, string]
const gaugeColorMapBlue: GaugeColorBreakpoint[] = [
  [0.8, '#1EADC6'],
  [0.9, '#0894B0'],
  [1, '#008099'],
]
const gaugeColorMapGreen: GaugeColorBreakpoint[] = [
  [0.8, '#8EB83A'],
  [0.9, '#749C25'],
  [1, '#5E8019'],
]

const gaugeTypeColor = computed(() => {
  const percentage = props?.data[0].value / 100
  const colorPalette
    = props.type === 'blue' ? gaugeColorMapBlue : gaugeColorMapGreen

  let color = ''

  if (percentage <= 0.8) {
    color = colorPalette[0][1]
  }
  else if (percentage <= 0.9) {
    color = colorPalette[1][1]
  }
  else {
    color = colorPalette[2][1]
  }

  return color
})

const chartWidth = computed(() => (props.small ? '100%' : '128px'))
const chartHeight = computed(() => (props.small ? '152px' : '128px'))

const updateChartOptions = (data: any) => {
  chartOptions.value = {
    backgroundColor: 'transparent',

    series: [
      {
        type: 'gauge',
        startAngle: 240,
        endAngle: -60,
        radius: `${(12 / 14) * 100}%`,
        center: ['50%', '50%'],
        axisLine: {
          lineStyle: {
            width: 5,
            color:
              props.type === 'blue'
                ? [...gaugeColorMapBlue]
                : [...gaugeColorMapGreen],
          },
        },

        pointer: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        title: {
          show: false,
        },
      },
      {
        type: 'gauge',
        startAngle: 240,
        endAngle: -60,
        radius: `${(108 / 149) * 100}%`,
        center: ['50%', '50%'],
        emphasis: {
          itemStyle: {
            opacity: 0.6,
          },
        },
        progress: {
          show: true,
          width: 18,
          itemStyle: {
            color: gaugeTypeColor.value,
          },
        },
        data: [...data],
        itemStyle: { color: gaugeTypeColor.value },
        axisLine: {
          lineStyle: {
            width: 18,
          },
        },

        detail: {
          offsetCenter: [0, 0],
          fontSize: 18,
          fontWeight: 'bold',
          color: isDark.value
            ? 'var(--t-ht-shade-0)'
            : 'var(--t-ht-shade-1000)',
          valueAnimation: true,
          formatter: `${props.data[0].value}%`,
        },
        pointer: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        title: {
          show: true,
          offsetCenter: [0, 60],
          fontSize: 11.5,
          color: isDark.value
            ? 'var(--t-ht-shade-0)'
            : 'var(--t-ht-shade-1000)',
        },
      },
    ],
    title: {
      text: props.small ? '' : props.titleText || '',
      subtext: props.small ? '' : props.titleSubtext || '',
      subtextStyle: {
        color: isDark.value ? 'var(--t-ht-shade-0)' : 'var(--t-ht-shade-1000)',
      },
      textStyle: {
        color: isDark.value ? 'var(--t-ht-shade-0)' : 'var(--t-ht-shade-1000)',
      },
    },

    tooltip: {
      ...gaugeChartOptions.tooltip,
      extraCssText: 'width:200px',
      backgroundColor: isDark
        ? 'var(--t-ht-shade-1000)'
        : 'var(--t-ht-shade-0)',
      borderColor: isDark ? 'var(--t-ht-shade-1000)' : 'var(--t-ht-shade-0)',
      textStyle: {
        color: isDark ? 'var(--t-ht-shade-0)' : 'var(--t-ht-shade-1000)',
      },
    },
  }
}

watch(
  () => props.data,
  (newValue) => {
    updateChartOptions(newValue || {})
  },
)
watch(
  () => isDark.value,
  () => {
    updateChartOptions(props.data || [])
  },
)
</script>

<template>
  <ClientOnly>
    <div
      v-if="isMounted"
      id="gauge-chart"
      class="chart-container"
      :style="{ width: chartWidth, height: chartHeight }"
    >
      <VChart
        :option="chartOptions"
        :autoresize="true"
        :theme="isDark ? 'dark' : ''"
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.chart-container {
  max-width: 100%;
  height: 100%;
}
</style>
