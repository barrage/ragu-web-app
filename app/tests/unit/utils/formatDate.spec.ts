import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { formatDate } from '@/utils/formatDate'

// Mock the useI18n function from vue-i18n
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    locale: ref('en-US'),
  }),
}))

describe('formatDate', () => {
  it('should format a date with the default format and locale', () => {
    const date = new Date('2024-07-24')
    const formattedDate = formatDate(date)

    expect(formattedDate.value).toBe('24/July/2024')
  })

  it('should format a date with a custom format', () => {
    const date = new Date('2024-07-24')
    const formattedDate = formatDate(date, 'YYYY-MM-DD')

    expect(formattedDate.value).toBe('2024-07-24')
  })

  it('should format a date with a specific locale', () => {
    const date = new Date('2024-07-24')
    const formattedDate = formatDate(date, 'DD/MMMM/YYYY', 'fr-FR')

    // Adjust expected output based on your locale
    expect(formattedDate.value).toBe('24/juillet/2024')
  })

  it('should handle different date input types', () => {
    const dateString = '2024-07-24'
    const dateNumber = new Date('2024-07-24').getTime()

    const formattedString = formatDate(dateString)
    const formattedNumber = formatDate(dateNumber)

    expect(formattedString.value).toBe('24/July/2024')
    expect(formattedNumber.value).toBe('24/July/2024')
  })
})
