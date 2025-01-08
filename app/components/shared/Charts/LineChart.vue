<script setup lang="ts">
import { merge } from 'lodash-es'
import VChart from 'vue-echarts'

interface SeriesData {
  name?: string
  data: DataEntry[]
}

interface DataEntry {
  name?: string
  value: number
}

const props = defineProps<{
  seriesData?: SeriesData[]
  titleText?: string
  titleSubtext?: string
  xAxisName?: string
  yAxisName?: string
  small?: boolean
}>()

const isDark = useDark()
const { useLineEChart, lineChartOptions } = useEChart()
useLineEChart()

const chartOptions = ref(merge({}, lineChartOptions))

const chartWidth = computed(() => (props.small ? '100%' : '100%'))
const chartHeight = computed(() => (props.small ? '222px' : '328px'))

const predefinedColors = [
  '#17B794',
  '#ED5107',
  '#FF0000',
  '#133E87',
  '#31511E',
  '#3ba272',
  '#fc8452',
  '#AF1740',
  '#ea7ccc',
]

const updateChartOptions = (seriesData: SeriesData[]) => {
  const xAxisData: string[] = []
  const series: any[] = []

  seriesData.forEach((seriesItem, index) => {
    const dataWithColor = seriesItem.data.map(entry => ({
      ...entry,
      itemColor:
        seriesItem?.color || predefinedColors[index % predefinedColors.length],
    }))

    xAxisData.push(...seriesItem.data.map(entry => entry.name ?? ''))
    series.push({
      name: seriesItem.name,
      type: 'line',
      data: seriesItem.data.map(entry => entry.value),
      color: seriesItem.color ? [seriesItem.color] : undefined,
      smooth: true,
    })
  })

  chartOptions.value = merge({}, lineChartOptions, {
    title: {
      text: props.small ? '' : props.titleText || '',
      subtext: props.small ? '' : props.titleSubtext || '',
    },
    legend: {
      data: props.small ? [] : seriesData.map(item => item.name || ''),
      textStyle: {
        fontSize: '11.5',
      },
      pageIconColor: isDark.value
        ? 'var(--color-primary-100)'
        : 'var(--color-primary-800)',
      pageIconInactiveColor: isDark.value
        ? 'var(--color-primary-200)'
        : 'var(--color-primary-700)',
      pageTextStyle: {
        color: isDark.value
          ? 'var(--color-primary-200)'
          : 'var(--color-primary-700)',
      },
    },
    tooltip: {
      backgroundColor: isDark.value
        ? 'var(--color-primary-1000)'
        : 'var(--color-primary-subtle)',
      borderColor: isDark.value ? 'var(--color-primary-1000)' : 'var(--color-primary-0)',
      textStyle: {
        color: isDark.value ? 'var(--color-primary-0)' : 'var(--color-primary-1000)',
      },
    },
    grid: {
      left: '9%',
      right: '9%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: Array.from(new Set(xAxisData)),
      name: props.xAxisName,
      axisLabel: {
        formatter: (val: string) => val,
        color: isDark.value ? 'var(--color-primary-200)' : 'var(--color-primary-700)',
      },
      lineStyle: {
        color: isDark.value ? 'var(--color-primary-700)' : 'var(--color-primary-200)',
      },
    },
    yAxis: {
      type: 'value',
      name: props.yAxisName,
      splitLine: {
        lineStyle: {
          color: isDark.value ? 'var(--color-primary-700)' : 'var(--color-primary-200)',
        },
      },
      axisLabel: {
        formatter: (val: string) => val,
        color: isDark.value ? 'var(--color-primary-200)' : 'var(--color-primary-700)',
      },
    },
    series,
  })
}
watch(
  () => isDark.value,
  () => {
    updateChartOptions(props.seriesData || [])
  },
)
watch(
  () => props.seriesData,
  (newValue) => {
    updateChartOptions(newValue || [])
  },
)
const isMounted = ref(false)
onMounted(() => {
  updateChartOptions(props.seriesData || [])
  isMounted.value = true
})
</script>

<template>
  <ClientOnly>
    <div
      v-if="isMounted"
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
