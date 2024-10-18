<script setup lang="ts">
import VChart from 'vue-echarts'
import { merge } from 'lodash-es'

interface Data {
  used: number
  total: number
}

const props = defineProps<{
  data: Data
  totalText?: string
  usedText?: string
  detailOptions?: any[]
  type: string
  small?: boolean
}>()

/* LCH */

const halfGaugeData = computed(() => {
  return {
    value: (props.data.used / props.data.total) * 100,
    name: props.usedText,
  }
})

const isDark = useDark()
const { useGaugeEChart, gaugeChartOptions } = useEChart()
useGaugeEChart()
const chartOptions = ref(merge({}, gaugeChartOptions))

const isMounted = ref(false)

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
  const percentage = (props.data.used / props.data.total) * 100
  const colorPalette
    = props.type === 'blue' ? gaugeColorMapBlue : gaugeColorMapGreen

  let colorIndex = 0

  if (percentage <= 80) {
    colorIndex = 0
  }
  else if (percentage <= 90) {
    colorIndex = 1
  }
  else {
    colorIndex = 2
  }

  return colorPalette[colorIndex][1]
})

const chartWidth = computed(() => (props.small ? '100%' : '100%'))
const chartHeight = computed(() => (props.small ? '152px' : '100%'))

const updateChartOptions = () => {
  chartOptions.value = {
    backgroundColor: 'transparent',

    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        radius: `100%`,
        center: ['50%', '50%'],
        axisLine: {
          lineStyle: {
            width: 12,
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
        data: [
          {
            name: 'Absolute used space',
            value: props.data.used,
          },
        ],
        detail: {
          show: true,
          offsetCenter: [0, -6.5],
          fontSize: 11.5,
          fontWeight: 'normal',
          color: isDark.value
            ? 'var(--t-ht-color-gray-400)'
            : 'var(--t-ht-color-gray-700)',
          formatter: _ => `${props.usedText}`,
        },
      },
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        radius: `88%`,
        center: ['50%', '50%'],
        emphasis: {
          itemStyle: {
            opacity: 0.6,
          },
        },
        progress: {
          show: true,
          width: 50,
          itemStyle: {
            color: gaugeTypeColor.value,
          },
        },
        data: [halfGaugeData.value],
        itemStyle: { color: gaugeTypeColor.value },
        axisLine: {
          lineStyle: {
            width: 50,
          },
        },

        detail: {
          fontSize: 22.5,
          offsetCenter: [0, -30],
          valueAnimation: true,
          color: isDark.value
            ? 'var(--t-ht-shade-0)'
            : 'var(--t-ht-shade-1000)',
          formatter: value => `${value.toFixed(0)}%`,
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
        silent: false,
        name: 'Absolute value of used space',
        type: 'gauge',
        radius: '100%',
        axisLine: {
          show: false,
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
        detail: {
          offsetCenter: ['-70%', 40],
          fontSize: 11.5,
          formatter: _ => `${props.usedText}`,
          color: isDark.value
            ? 'var(--t-ht-color-gray-400)'
            : 'var(--t-ht-color-gray-700)',
          fontWeight: 'normal',
        },
        data: [
          {
            name: 'Absolute used space',
            value: props.data.used,
          },
        ],
      },
      {
        silent: false,
        name: 'Absolute value of total space',
        type: 'gauge',
        radius: '100%',
        center: ['50%', '50%'],
        axisLine: {
          show: false,
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
        detail: {
          offsetCenter: ['-70%', 20],
          fontSize: 18,
          valueAnimation: true,
          formatter: value => `${value} GB`,
          color: isDark.value
            ? 'var(--t-ht-shade-0)'
            : 'var(--t-ht-shade-1000)',
        },
        data: [
          {
            name: 'Used',
            value: props.data.used,
          },
        ],
      },

      {
        silent: false,
        name: 'Total space text',
        type: 'gauge',
        radius: '100%',
        center: ['50%', '50%'],
        axisLine: {
          show: false,
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
        detail: {
          offsetCenter: ['70%', 20],
          fontSize: 18,
          valueAnimation: true,
          formatter: value => `${value} GB`,
          color: isDark.value
            ? 'var(--t-ht-shade-0)'
            : 'var(--t-ht-shade-1000)',
        },
        data: [
          {
            name: 'Absolute used space',
            value: props.data.total,
          },
        ],
      },
      {
        silent: false,
        name: 'Total space text',
        type: 'gauge',
        radius: '100%',
        center: ['50%', '50%'],
        axisLine: {
          show: false,
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
        detail: {
          offsetCenter: ['70%', 40],
          fontSize: 11.5,
          fontWeight: 'normal',
          formatter: _ => `${props.totalText}`,
          color: isDark.value
            ? 'var(--t-ht-color-gray-400)'
            : 'var(--t-ht-color-gray-700)',
        },
        data: [
          {
            name: 'Absolute used space',
            value: props.data.total,
          },
        ],
      },
    ],
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
  () => {
    updateChartOptions()
  },
)
watch(
  () => isDark.value,
  () => {
    updateChartOptions()
  },
)
onMounted(() => {
  useGaugeEChart()
  updateChartOptions()
  isMounted.value = true
})
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
