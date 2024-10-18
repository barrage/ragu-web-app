<script setup lang="ts">
import { merge } from 'lodash-es'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'

import { SVGRenderer } from 'echarts/renderers'

interface DataEntry {
  name?: string
  value: number
  itemColor?: string
}

const props = defineProps<{
  data?: DataEntry[]
  titleText?: string
  titleSubtext?: string
  seriesName?: string
  small?: boolean
  noLegend?: boolean
}>()

use(SVGRenderer)
const chartWidth = computed(() => (props.small ? '128px' : '100%'))
const chartHeight = computed(() => (props.small ? '128px' : '348px'))
const radius = computed(() => (props.small ? ['50%', '80%'] : [80, 125]))

const predefinedColors = [
  '#00ADB5',
  '#9BEC00',
  '#F5004F',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc',
  '#b63d00',
  '#fb6a55',
  '#870000',
  '#fea75b',
  '#00774b',
  '#411c8c',
  '#794ae9',
  '#8ff0c1',
]

const isDark = useDark()
const { useRingChart, ringChartOptions } = useEChart()

const chartOptions = ref(merge({}, ringChartOptions))

const isMounted = ref(false)

const updateChartOptions = (data: DataEntry[]) => {
  const coloredData = data.map((entry, index) => ({
    ...entry,
    itemColor:
      entry.itemColor || predefinedColors[index % predefinedColors.length],
  }))

  chartOptions.value = merge({}, ringChartOptions, {
    renderer: 'svg',
    maintainAspectRatio: false,
    title: {
      text: props.small ? '' : props.titleText || '',
      textStyle: {
        color: isDark.value ? 'var(--color-primary-0)' : 'var(--color-primary-900)',
      },
      subtext: props.small ? '' : props.titleSubtext || '',
      subtextStyle: {
        color: isDark.value
          ? 'var(--color-primary-200)'
          : 'var(--color-primary-700)',
      },
    },
    legend: {
      data: props.noLegend
        ? []
        : data
          ? data.map(entry => entry.name || props.seriesName || '')
          : [],
      textStyle: {
        color: isDark.value ? 'var(--color-primary-0)' : 'var(--color-primary-900)',
        fontSize: 14.5,
      },
    },
    tooltip: {
      backgroundColor: isDark.value
        ? 'var(--color-primary-700)'
        : 'var(--color-primary-0)',
      borderColor: isDark.value
        ? 'var(--color-primary-500)'
        : 'var(--color-primary-800)',
      textStyle: {
        color: isDark.value ? 'var(--color-primary-0)' : 'var(--color-primary-900)',
        width: 500,
      },
    },
    series: [
      {
        name: props.seriesName || '',
        data: data || [],
        radius,
        emptyCircleStyle: {
          color: isDark.value
            ? 'var(--color-primary-800)'
            : 'var(--color-primary-300)',
        },
        itemStyle: {
          color: (param: any) => coloredData[param.dataIndex].itemColor,
        },
      },
    ],
  })
}
watch(
  () => props.data,
  (newValue) => {
    updateChartOptions(newValue || [])
  },
)
watch(
  () => isDark.value,
  () => {
    updateChartOptions(props.data || [])
  },
)

onMounted(() => {
  useRingChart()
  updateChartOptions(props.data || [])
  isMounted.value = true
})
</script>

<template>
  <ClientOnly>
    <div
      class="chart-container"
      :style="{ width: chartWidth, height: chartHeight }"
    >
      <VChart
        :option="chartOptions"
        :autoresize="true"
        :theme="isDark ? 'dark' : ''"
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
