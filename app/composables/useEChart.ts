import type {
  ComposeOption,
  DatasetComponentOption,
  GaugeSeriesOption,
  GridComponentOption,
  LegendComponentOption,
  LineSeriesOption,
  PieSeriesOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts'
import { GaugeChart, LineChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import { use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'

  type EChartRingOption = ComposeOption<
    | PieSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
    | LegendComponentOption
  >

  type EChartGaugeOption = ComposeOption<
    | GaugeSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
    | LegendComponentOption
  >

  type EChartLineOption = ComposeOption<
    | LineSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
    | LegendComponentOption
  >

interface EChartTheme {
  chartColors: Array<string>
}

export const useEChart = () => {
  const theme: EChartTheme = {
    chartColors: [
      '#2238DF',
      '#7D94F9',
      '#E82010',
      '#FB6A55',
      '#1EADC6',
      '#75DBE8',
      '#8EB83A',
      '#C3E385',
      '#B17F38',
      '#E0B983',
      '#F1B125',
      '#E67300',
      '#E20074',
      '#F080BA',
    ],
  }

  const useRingChart = () => {
    use([
      SVGRenderer,
      TitleComponent,
      LegendComponent,
      TooltipComponent,
      PieChart,
    ])
  }
  const ringChartOptions: EChartRingOption = {
    color: [...theme.chartColors],
    backgroundColor: 'transparent',
    title: {
      textStyle: {
        fontSize: 22,
      },
      subtextStyle: {
        fontSize: 11,
      },
      top: '39%',
      right: 'center',
    },
    legend: {
      orient: 'horizontal',
      left: 0,
      bottom: 0,
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      type: 'scroll',
      textStyle: {
        fontSize: 10,
      },
    },
    tooltip: {
      borderRadius: 12,
      padding: 12,
    },
    series: [
      {
        type: 'pie',
        top: '-10%',
        label: {
          show: false,
        },
        emptyCircleStyle: {
          color: '#411c8c',
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          scale: true,
          itemStyle: {
            color: 'inherit',
          },
        },
      },
    ],
  }

  const useGaugeEChart = () => {
    use([SVGRenderer, GaugeChart])
  }
  const gaugeChartOptions: EChartGaugeOption = {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        radius: '100%',
        progress: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            color: 'inherit',
          },
        },
        axisLine: {
          lineStyle: {
            width: 12,
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
        detail: {
          show: true,
          offsetCenter: [0, -6.5],
          fontSize: 11.5,
          fontWeight: 'normal',
        },
      },
      {
        silent: true,
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        radius: '88%',
        progress: {
          show: true,
          width: 50,
        },
        emphasis: {
          itemStyle: {
            color: 'inherit',
          },
        },
        axisLine: {
          lineStyle: {
            width: 50,
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
        detail: {
          fontSize: 22.5,
          offsetCenter: [0, -30],
          valueAnimation: true,
        },
      },
      {
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
          offsetCenter: ['-72%', 20],
          fontSize: 18,
          valueAnimation: true,
          formatter: value => `${value} GB`,
        },
      },
      {
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
          offsetCenter: ['-72%', 40],
          fontSize: 11.5,
          formatter: _ => 'Used space',
          fontWeight: 'normal',
        },
      },
      {
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
          offsetCenter: ['72%', 20],
          fontSize: 18,
          valueAnimation: true,
          formatter: value => `${value} GB`,
        },
      },
      {
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
          offsetCenter: ['72%', 40],
          fontSize: 11.5,
          fontWeight: 'normal',
        },
      },
    ],
  }

  const useLineEChart = () => {
    use([
      SVGRenderer,
      LineChart,
      LegendComponent,
      GridComponent,
      TooltipComponent,
      TitleComponent,
    ])
  }
  const lineChartOptions: EChartLineOption = {
    color: [...theme.chartColors],
    backgroundColor: 'transparent',
    symbolSize: 8,
    xAxis: {
      type: 'time',
      nameTextStyle: {
        align: 'left',
        fontSize: 11.5,
        fontFamily: 'sans-serif',
        lineHeight: 13.8,
        fontWeight: 400,
      },
      axisLabel: {
        hideOverlap: true,
        fontSize: 11.5,
        fontFamily: 'sans-serif',
        lineHeight: 13.8,
        fontWeight: 400,
        color: 'var(--color-primary-800)',
        showMaxLabel: true,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      axisPointer: {
        snap: true,
      },
      splitLine: {
        lineStyle: {
          color: 'var(--color-primary-300)',
        },
      },
      axisLine: {
        lineStyle: {
          color: 'red',
        },

      },
      axisLabel: {
        hideOverlap: true,
        fontSize: 11.5,
        fontFamily: 'sans-serif',
        lineHeight: 13.8,
        fontWeight: 400,
        color: 'var(--color-primary-800)',
        showMaxLabel: true,
      },
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: {
        align: 'left',
        fontSize: 11.5,
        fontFamily: 'TeleNeo',
        lineHeight: 13.8,
        fontWeight: 400,
        color: 'var(--color-primary-900)',
      },
    },
    legend: {
      icon: 'circle',
      width: '100%',
      itemWidth: 8,
      itemHeight: 8,
      type: 'scroll',
      textStyle: {
        fontSize: 11.5,
        fontFamily: 'sans-serif',
        lineHeight: 13.8,
        fontWeight: 500,
      },
      left: 0,
    },

    tooltip: {
      className: 'barrage-chart',
      formatter: '{a0} <br /> {b0}: <br /> {c0}<br />',
      axisPointer: {
        type: 'cross',
      },
      borderRadius: 12,
      padding: 12,
    },
  }

  const doubleGaugeChartOptions: EChartGaugeOption = {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        startAngle: 240,
        endAngle: -60,
        radius: `${(128 / 149) * 100}%`,
        center: [`${(73 / 321) * 100}%`, 64],
        emphasis: {
          itemStyle: {
            color: 'inherit',
          },
        },
        axisLine: {
          lineStyle: {
            width: 5,
          },
        },
        detail: {
          offsetCenter: [0, 0],
          fontSize: 16,
          fontWeight: 'bold',
          valueAnimation: true,
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
        center: [`${(73 / 321) * 100}%`, 64],
        emphasis: {
          itemStyle: {
            color: 'inherit',
          },
        },
        progress: {
          show: true,
          width: 20,
        },
        axisLine: {
          lineStyle: {
            width: 20,
          },
        },
        detail: {
          offsetCenter: [0, 74],
          fontSize: 10,
          fontWeight: 'normal',
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
        radius: `${(128 / 149) * 100}%`,
        center: [`${(248 / 321) * 100}%`, 64],
        emphasis: {
          itemStyle: {
            color: 'inherit',
          },
        },
        axisLine: {
          lineStyle: {
            width: 5,
          },
        },
        detail: {
          offsetCenter: [0, 0],
          fontSize: 16,
          fontWeight: 'bold',
          valueAnimation: true,
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
        center: [`${(248 / 321) * 100}%`, 64],
        emphasis: {
          itemStyle: {
            color: 'inherit',
          },
        },
        progress: {
          show: true,
          width: 20,
        },
        axisLine: {
          lineStyle: {
            width: 20,
          },
        },
        detail: {
          offsetCenter: [0, 74],
          fontSize: 10,
          fontWeight: 'normal',
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
    ],
  }

  return {
    theme,
    useRingChart,
    ringChartOptions,
    useGaugeEChart,
    gaugeChartOptions,
    doubleGaugeChartOptions,
    useLineEChart,
    lineChartOptions,
  }
}
