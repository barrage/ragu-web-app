import type { LineChartResponseData, LineChartSeriesData, PieChartDataEntry } from '~/types/statistic'

/**
 * Formats API response data into the structure required by a line chart.
 * @param response The API response containing series and legend data.
 * @returns Formatted series data compatible with the line chart component.
 */
export function formatLineChartData(response: LineChartResponseData): LineChartSeriesData[] {
  if (!response || typeof response !== 'object') {
    return []
  }

  const { series, legend } = response

  if (!series || typeof series !== 'object') {
    return []
  }

  if (!legend || typeof legend !== 'object') {
    return []
  }

  return Object.entries(series).map(([id, seriesData]) => {
    if (!seriesData || typeof seriesData !== 'object' || !seriesData.data) {
      return {
        name: legend[id] || 'Unknown Series',
        data: [],
      }
    }

    const formattedData = Object.entries(seriesData.data).map(([date, value]) => {
      if (typeof value !== 'number') {
        return { name: date, value: 0 }
      }

      return { name: date, value }
    })

    return {
      name: legend[id] || 'Unknown Series',
      data: formattedData,
    }
  })
}

/**
 * Formats the response data for a Pie chart, transforming it into an array of `DataEntry` objects.
 *
 * @param {Array<object>} response - The raw response data containing agent information.
 * @returns {Array<DataEntry>} - Returns an array of `DataEntry` objects formatted for a Pie chart.
 */
export function formatPieChartData(response: any[]): PieChartDataEntry[] {
  if (!Array.isArray(response)) {
    console.error('Invalid response: Expected an array')
    return []
  }

  return response.map((item) => {
    // Validate item properties
    if (typeof item.agentName !== 'string' || typeof item.count !== 'number') {
      console.warn('Invalid item structure:', item)
      return { name: 'Unknown Agent', value: 0 } // Return fallback value in case of error
    }

    return {
      name: item.agentName,
      value: item.count,
    }
  })
}
/**
 * Formats the response data for a Pie chart, whether it comes as an object or an array of objects.
 *
 * @param {Record<string, number> | Array<{ name: string, value: number }>} response - The raw response data which could either be an object or an array of objects.
 * @returns {DataEntry[]} - Returns an array of `DataEntry` objects formatted for a Pie chart.
 */
export function formatPieChartDataFromObjects(response: Record<string, number> | Array<{ name: string, value: number }>): PieChartDataEntry[] {
  if (Array.isArray(response)) {
    return response.map(item => ({
      name: item.name,
      value: item.value,
    }))
  }

  if (response && typeof response === 'object') {
    return Object.entries(response).map(([name, value]) => ({
      name,
      value,
    }))
  }
  return []
}
