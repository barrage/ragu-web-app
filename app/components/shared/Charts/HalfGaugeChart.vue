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
    value: Number(((props.data.used / props.data.total) * 100).toFixed(2)),
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
  [0.5, 'var(--color-primary-400)'],
  [0.9, 'var(--color-primary-500)'],
  [1, 'var(--color-primary-600)'],
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
            name: '',
            value: props.data.used,
          },
        ],
        detail: {
          show: true,
          offsetCenter: [0, -6.5],
          fontSize: 11.5,
          fontWeight: 'normal',
          color: isDark.value
            ? 'var(--color-primary-300)'
            : 'var(--color-primary-900)',
          formatter: (_) => {
            const text = props.usedText || ''
            return text.length > 12 ? `${text.slice(0, 12)}...` : text
          },
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
            color: isDark.value
              ? 'var(--color-primary-300)'
              : 'var(--color-primary-500)',
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
            ? 'var(--color-primary-100)'
            : 'var(--color-primary-900)',
          formatter: value => `${value ? value.toFixed(0) : 0}%`,
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
        name: '',
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
          formatter: (_) => {
            const text = props.usedText || ''
            return text.length > 12 ? `${text.slice(0, 22)}...` : text
          },
          color: isDark.value
            ? 'var(--color-primary-200)'
            : 'var(--color-primary-800)',
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
          formatter: value => `${value}`,
          color: isDark.value
            ? 'var(--color-primary-100)'
            : 'var(--color-primary-800)',
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
          formatter: value => `${value}`,
          color: isDark.value
            ? 'var(--color-primary-100)'
            : 'var(--color-primary-800)',
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
            ? 'var(--color-primary-200)'
            : 'var(--color-primary-800)',
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
      extraCssText: 'width:fit-content',
      backgroundColor: isDark.value
        ? 'var(--color-primary-800)'
        : 'var(--color-primary-0)',
      borderColor: isDark.value
        ? 'var(--color-primary-1000)'
        : 'var(--color-primary-100)',
      textStyle: {
        color: isDark.value
          ? 'var(--color-primary-0)'
          : 'var(--color-primary-900)',
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
