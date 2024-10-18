<script setup lang="ts">
import { merge } from 'lodash-es'
import VChart from 'vue-echarts'

interface SeriesData {
  name?: string
  data: DataEntry[]
  color?: string
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

watch(
  () => props.seriesData,
  (newValue) => {
    updateChartOptions(newValue || [])
  }
)
const isMounted = ref(false)
onMounted(() => {
  updateChartOptions(props.seriesData || [])
  isMounted.value = true
})

const chartWidth = computed(() => (props.small ? '100%' : '100%'))
const chartHeight = computed(() => (props.small ? '222px' : '328px'))

const predefinedColors = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc',
]

const updateChartOptions = (seriesData: SeriesData[]) => {
  const xAxisData: string[] = []
  const series: any[] = []

  seriesData.forEach((seriesItem, index) => {
    const dataWithColor = seriesItem.data.map((entry) => ({
      ...entry,
      itemColor:
        seriesItem.color || predefinedColors[index % predefinedColors.length],
    }))

    xAxisData.push(...seriesItem.data.map((entry) => entry.name ?? ''))
    series.push({
      name: seriesItem.name,
      type: 'line',
      data: seriesItem.data.map((entry) => entry.value),
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
      data: props.small ? [] : seriesData.map((item) => item.name || ''),
      textStyle: {
        fontSize: '11.5',
      },
    },
    tooltip: {
      backgroundColor: isDark
        ? 'var(--t-ht-shade-1000)'
        : 'var(--t-ht-shade-0)',
      borderColor: isDark ? 'var(--t-ht-shade-1000)' : 'var(--t-ht-shade-0)',
      textStyle: {
        color: isDark ? 'var(--t-ht-shade-0)' : 'var(--t-ht-shade-1000)',
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
      },
    },
    yAxis: {
      type: 'value',
      name: props.yAxisName,
    },
    series,
  })
}
</script>

<template>
  <ClientOnly>
    <div
      class="chart-container"
      :style="{ width: chartWidth, height: chartHeight }"
      v-if="isMounted"
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
